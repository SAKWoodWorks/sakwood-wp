import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, AIChatRequest, AIChatResponse } from '@/lib/types/ai-chat';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';
import {
  getProducts,
  getCategories,
  getDealerLocations,
  formatProductsForAI,
  formatCategoriesForAI,
  formatLocationsForAI
} from '@/lib/services/productDataService';
import { getOllamaChatResponse, checkOllamaHealth } from './ollamaService';
import { getResponseLanguage } from '@/lib/utils/languageDetection';

export async function getAIChatResponse(request: AIChatRequest): Promise<AIChatResponse> {
  try {
    // Input validation
    if (!request.message?.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (request.history.length > 50) {
      throw new Error('Conversation history too long');
    }

    // Detect user's message language (not context language)
    const userLanguage = getResponseLanguage(request.message, request.language);

    // Fetch real product data from WordPress (use detected language)
    const [products, categories, locations, ollamaAvailable] = await Promise.all([
      getProducts(userLanguage),
      getCategories(userLanguage),
      getDealerLocations(),
      checkOllamaHealth()
    ]);

    // Format data for AI prompt
    const productContext = formatProductsForAI(products, userLanguage);
    const categoryContext = formatCategoriesForAI(categories);
    const locationContext = formatLocationsForAI(locations);

    // Build language instruction (MOST IMPORTANT - goes first)
    const languageInstruction = userLanguage === 'th'
      ? '🔴 CRITICAL: You MUST respond in THAI language ONLY. The user wrote in Thai. All responses must be in Thai.'
      : '🔴 CRITICAL: You MUST respond in ENGLISH language ONLY. The user wrote in English. All responses must be in English.';

    // Build enhanced prompt with language instruction FIRST, then system prompt, then product data
    const enhancedPrompt = `${languageInstruction}\n\n${SYSTEM_PROMPT}\n\n${productContext}\n\n${categoryContext}\n\n${locationContext}`;

    let responseText: string;

    // Use Ollama if available, otherwise fall back to Google Gemini
    if (ollamaAvailable && process.env.OLLAMA_ENABLED === 'true') {
      responseText = await getOllamaChatResponse(
        request.message,
        enhancedPrompt,
        request.history
      );
    } else {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY is not set and Ollama is not available');
      }

      // Initialize the client
      const genAI = new GoogleGenerativeAI(apiKey);

      // Use gemini-2.5-flash which is the latest and available for new users
      // Add system instruction for language
      const systemInstruction = userLanguage === 'th'
        ? 'You MUST respond in THAI language ONLY. All responses must be in Thai.'
        : 'You MUST respond in ENGLISH language ONLY. All responses must be in English.';

      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction,
      });

      // Build chat history for context
      const historyParts = request.history.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }],
      }));

      // Create a chat session
      const chat = model.startChat({
        history: historyParts,
        generationConfig: {
          temperature: 0.7,
          topK: 40,
          topP: 0.95,
          maxOutputTokens: 2048,
        },
      });

      // Send message with system instruction and real data
      // Add language reminder to user message as well
      const languageReminder = userLanguage === 'th'
        ? '[REMEMBER: Respond in THAI only]'
        : '[REMEMBER: Respond in ENGLISH only]';

      const result = await chat.sendMessage(
        `${enhancedPrompt}\n\n${languageReminder} User says: ${request.message}`
      );

      const response = result.response;
      responseText = response.text();
    }

    // Response validation
    if (!responseText?.trim()) {
      throw new Error('AI returned empty response');
    }

    return {
      response: responseText,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('AI chat error:', error);

    // Preserve error details
    if (error instanceof Error) {
      throw error;
    }

    throw new Error('Failed to get AI response');
  }
}
