import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, AIChatRequest, AIChatResponse } from '@/lib/types/ai-chat';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getAIChatResponse(request: AIChatRequest): Promise<AIChatResponse> {
  try {
    // Debug: Check if API key is available
    const apiKey = process.env.GEMINI_API_KEY;
    console.log('GEMINI_API_KEY exists:', !!apiKey);
    console.log('GEMINI_API_KEY prefix:', apiKey?.substring(0, 10));

    // Input validation
    if (!request.message?.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (request.history.length > 50) {
      throw new Error('Conversation history too long');
    }

    // Try getting the model with explicit configuration
    // Use gemini-1.5-flash for faster responses and lower cost
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Model created:', !!model);

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

    // Send message with system instruction
    const result = await chat.sendMessage(
      `${SYSTEM_PROMPT}\n\nUser: ${request.message}`
    );

    const response = result.response;
    const text = response.text();

    // Response validation
    if (!text?.trim()) {
      throw new Error('AI returned empty response');
    }

    return {
      response: text,
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
