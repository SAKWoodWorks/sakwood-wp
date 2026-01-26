import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const response = await fetch(`${WORDPRESS_API_URL}/headless/v1/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to submit contact form' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Contact] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
