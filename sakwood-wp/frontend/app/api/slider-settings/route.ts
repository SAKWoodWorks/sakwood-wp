import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

export async function GET() {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/slider-settings`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[API SliderSettings] Failed to fetch from WordPress:', response.statusText);
      return NextResponse.json(
        { autoplay_delay: 6000 }, // Return default on error
        { status: 200 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API SliderSettings] Error:', error);
    return NextResponse.json(
      { autoplay_delay: 6000 }, // Return default on error
      { status: 200 }
    );
  }
}
