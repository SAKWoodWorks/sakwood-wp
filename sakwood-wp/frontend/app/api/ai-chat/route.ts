import { NextRequest, NextResponse } from 'next/server';
import { getAIChatResponse } from '@/lib/services/aiChatService';
import type { AIChatRequest } from '@/lib/types/ai-chat';

export async function POST(request: NextRequest) {
  // Validate API key at request time (not module load time)
  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: 'AI service configuration error' },
      { status: 500 }
    );
  }
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

    // Return actual error message for debugging
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: 'Failed to process chat request', details: errorMessage },
      { status: 500 }
    );
  }
}

export const runtime = 'nodejs';
