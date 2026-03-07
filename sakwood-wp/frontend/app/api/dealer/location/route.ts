import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

/**
 * Generate CSRF token for session
 */
function generateCSRFToken(sessionId: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);
  return Buffer.from(`${sessionId}-${timestamp}-${random}`).toString('base64');
}

/**
 * Verify CSRF token
 */
function verifyCSRFToken(token: string, sessionId: string): boolean {
  try {
    const decoded = Buffer.from(token, 'base64').toString();
    return decoded.startsWith(sessionId);
  } catch {
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, locationData, csrfToken } = body;

    if (!locationData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // CSRF protection
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get('sakwood-user');

    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    if (csrfToken) {
      const sessionId = sessionCookie.value;
      if (!verifyCSRFToken(csrfToken, sessionId)) {
        return NextResponse.json(
          { error: 'Invalid CSRF token' },
          { status: 403 }
        );
      }
    }

    // Forward to WordPress API
    const wpUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/sakwood/v1', '');

    const response = await fetch(`${wpUrl}/wp-json/sakwood/v1/dealer/location`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        cookie: request.headers.get('cookie') || '',
      },
      body: JSON.stringify(locationData),
    });

    if (!response.ok) {
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || 'Failed to save location' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error saving dealer location:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');

    if (!userId) {
      return NextResponse.json(
        { error: 'Missing user_id parameter' },
        { status: 400 }
      );
    }

    // Forward to WordPress API
    const wpUrl = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL?.replace('/sakwood/v1', '');

    const response = await fetch(`${wpUrl}/wp-json/sakwood/v1/dealer/location?user_id=${userId}`, {
      headers: {
        cookie: request.headers.get('cookie') || '',
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch location' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching dealer location:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
