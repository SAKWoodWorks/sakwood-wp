import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

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
    // Construct the full popup API URL
    // Handle different URL formats:
    // - http://localhost:8006/wp-json/sakwood/v1 (has full path)
    // - http://sak_wp:80/wp-json (missing /sakwood/v1)
    // - http://sak_wp:80 (missing /wp-json)
    const baseUrl = WORDPRESS_API_URL;

    let apiUrl;
    if (baseUrl.includes('/sakwood/v1')) {
      // Already has full path, just add /popup
      apiUrl = `${baseUrl}/popup`;
    } else if (baseUrl.includes('/wp-json')) {
      // Has /wp-json but missing /sakwood/v1
      apiUrl = `${baseUrl}/sakwood/v1/popup`;
    } else {
      // Missing both /wp-json and /sakwood/v1
      apiUrl = `${baseUrl}/wp-json/sakwood/v1/popup`;
    }

    const response = await fetch(apiUrl, {
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
