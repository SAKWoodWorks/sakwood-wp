import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

/**
 * GET /api/chat
 * Proxy chat configuration from WordPress to avoid CORS issues
 */
export async function GET() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/sakwood/v1/chat`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always get fresh settings
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch chat settings from WordPress' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
