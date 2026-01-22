import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/sakwood/v1/popup`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch popup settings from WordPress' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Popup] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
