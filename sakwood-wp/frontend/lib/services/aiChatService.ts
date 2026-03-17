import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, AIChatRequest, AIChatResponse } from '@/lib/types/ai-chat';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';

export async function getAIChatResponse(request: AIChatRequest): Promise<AIChatResponse> {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set');
    }

    // Input validation
    if (!request.message?.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (request.history.length > 50) {
      throw new Error('Conversation history too long');
    }

    // Initialize the client
    const genAI = new GoogleGenerativeAI(apiKey);

    // Use gemini-2.0-flash which is available and fast for chat
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

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

    // Send message with system instruction prepended
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
