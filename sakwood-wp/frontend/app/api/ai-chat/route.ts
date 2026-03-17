import { NextRequest, NextResponse } from 'next/server';
import { getAIChatResponse } from '@/lib/services/aiChatService';
import type { AIChatRequest } from '@/lib/types/ai-chat';

// Validate API key on module load
if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY environment variable is not set');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { message, language, history }: AIChatRequest = body;

    // Validate request
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    const trimmedMessage = message.trim();

    if (trimmedMessage.length === 0) {
      return NextResponse.json(
        { error: 'Message cannot be empty' },
        { status: 400 }
      );
    }

    if (trimmedMessage.length > 5000) {
      return NextResponse.json(
        { error: 'Message is too long (max 5000 characters)' },
        { status: 400 }
      );
    }

    if (!language || (language !== 'en' && language !== 'th')) {
      return NextResponse.json(
        { error: 'Invalid language' },
        { status: 400 }
      );
    }

    if (!Array.isArray(history)) {
      return NextResponse.json(
        { error: 'Invalid history format' },
        { status: 400 }
      );
    }

    // Validate history array items
    if (history.length > 0) {
      for (const item of history) {
        if (!item.role || !item.content || typeof item.content !== 'string') {
          return NextResponse.json(
            { error: 'Invalid history item structure' },
            { status: 400 }
          );
        }
      }
    }

    // Prepare request for AI service
    const aiRequest: AIChatRequest = {
      message: trimmedMessage,
      language,
      history,
    };

    // Get AI response
    const response = await getAIChatResponse(aiRequest);

    return NextResponse.json(response);
  } catch (error) {
    console.error('AI chat API error:', error);

    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    );
  }
}

export const config = {
  runtime: 'nodejs',
};
