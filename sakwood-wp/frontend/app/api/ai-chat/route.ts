import { NextRequest, NextResponse } from 'next/server';
import { getAIChatResponse } from '@/lib/services/aiChatService';
import type { AIChatRequest, ChatMessage } from '@/lib/types/ai-chat';

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

    // Prepare request for AI service
    const aiRequest: AIChatRequest = {
      message,
      language,
      history: history || [],
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
