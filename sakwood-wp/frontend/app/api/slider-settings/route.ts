import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Determine WordPress API URL based on environment
    // Production: Use internal Docker hostname for WordPress
    // Development: Use localhost
    const isProduction = process.env.NODE_ENV === 'production';
    const wordpressApiUrl = isProduction
      ? 'http://sak_wp:80/wp-json/sakwood/v1'
      : (process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1');

    const response = await fetch(`${wordpressApiUrl}/slider-settings`, {
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
