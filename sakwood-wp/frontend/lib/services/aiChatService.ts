import { GoogleGenerativeAI } from '@google/generative-ai';
import type { ChatMessage, AIChatRequest, AIChatResponse } from '@/lib/types/ai-chat';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function getAIChatResponse(request: AIChatRequest): Promise<AIChatResponse> {
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    // Build conversation history
    const conversationHistory = request.history.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    // Add system prompt
    const systemMessage = {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }],
    };

    const chat = model.startChat({
      history: [systemMessage, ...conversationHistory],
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

    return {
      response: text,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error('AI chat error:', error);
    throw new Error('Failed to get AI response');
  }
}

export async function getProductContext(language: 'en' | 'th'): Promise<any[]> {
  // This will be implemented to fetch products from WordPress
  return [];
}

export async function getShippingContext(province: string): Promise<any> {
  // This will be implemented to fetch shipping info
  return null;
}
