import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, AIChatRequest, AIChatResponse } from '@/lib/types/ai-chat';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getAIChatResponse(request: AIChatRequest): Promise<AIChatResponse> {
  try {
    // Input validation
    if (!request.message?.trim()) {
      throw new Error('Message cannot be empty');
    }

    if (request.history.length > 50) {
      throw new Error('Conversation history too long');
    }

    const model = genAI.getGenerativeModel({ model: 'models/gemini-pro' });

    // Build conversation history (map 'assistant' to 'model' for Gemini)
    const conversationHistory = request.history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const chat = model.startChat({
      history: conversationHistory,
      systemInstruction: {
        parts: [{ text: SYSTEM_PROMPT }],
      },
      generationConfig: {
        temperature: 0.7,
        topK: 40,
        topP: 0.95,
        maxOutputTokens: 2048,
      },
    });

    const result = await chat.sendMessage(request.message);
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
