import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

/**
 * GET /api/chat
 * Proxy chat configuration from WordPress to avoid CORS issues
 */
export async function GET() {
  try {
    // Build the full chat endpoint URL
    // WORDPRESS_API_URL can be either:
    // - http://sak_wp:80/wp-json (from docker-compose)
    // - http://localhost:8006/wp-json/sakwood/v1 (from .env.local)
    const baseUrl = WORDPRESS_API_URL;
    const chatEndpoint = baseUrl.includes('/sakwood/v1')
      ? `${baseUrl}/chat`
      : `${baseUrl}/sakwood/v1/chat`;

    const response = await fetch(chatEndpoint, {
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
