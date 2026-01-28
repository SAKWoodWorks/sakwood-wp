import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

/**
 * Transform WordPress image URL to use Next.js proxy
 * Converts localhost:8006 or sak_wp:80 to /wp-content/ path
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Transform sak_wp:80 to Next.js proxy path
  if (url.includes('sak_wp:80') || url.includes('localhost:8006')) {
    try {
      const urlObj = new URL(url);
      const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

      if (wpContentMatch) {
        return `/wp-content/${wpContentMatch[1]}`;
      }
    } catch (e) {
      console.error('[API Popup] Error transforming image URL:', e);
      return url;
    }
  }

  return url;
}

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

    // Transform image URL to use Next.js proxy
    if (data && data.image_url) {
      data.image_url = transformImageUrl(data.image_url);
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error('[API Popup] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
