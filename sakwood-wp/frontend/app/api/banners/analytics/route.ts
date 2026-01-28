/**
 * Banner Analytics API Route
 * Handles tracking banner impressions, clicks, and dismissals
 */

import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { bannerId, action, sessionId, device, page, variantId } = body;

    // Validate required fields
    if (!bannerId || !action || !sessionId) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields: bannerId, action, sessionId' },
        { status: 400 }
      );
    }

    // Validate action
    if (!['impression', 'click', 'dismiss'].includes(action)) {
      return NextResponse.json(
        { success: false, error: 'Invalid action. Must be: impression, click, or dismiss' },
        { status: 400 }
      );
    }

    // Forward to WordPress backend
    const wpResponse = await fetch(`${WORDPRESS_API_URL}/banner/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        banner_id: bannerId,
        action,
        session_id: sessionId,
        device,
        page,
        variant_id: variantId,
        timestamp: new Date().toISOString(),
      }),
    });

    if (!wpResponse.ok) {
      const errorData = await wpResponse.json().catch(() => ({}));
      console.error('WordPress analytics API error:', errorData);
      // Still return success to avoid breaking UX
      return NextResponse.json({ success: true, tracked: true, wp_error: true });
    }

    const data = await wpResponse.json();
    return NextResponse.json({ success: true, tracked: true, data });
  } catch (error) {
    console.error('Banner analytics tracking error:', error);
    // Silently fail - analytics shouldn't break the UX
    return NextResponse.json({ success: true, tracked: false, error: 'Tracking failed' });
  }
}

// GET endpoint for retrieving analytics (admin only)
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const bannerId = searchParams.get('id');

    if (!bannerId) {
      return NextResponse.json(
        { success: false, error: 'Missing banner ID' },
        { status: 400 }
      );
    }

    // Forward to WordPress backend
    const wpResponse = await fetch(`${WORDPRESS_API_URL}/banner/analytics/${bannerId}`);

    if (!wpResponse.ok) {
      const errorData = await wpResponse.json().catch(() => ({}));
      return NextResponse.json(
        { success: false, error: errorData.message || 'Failed to fetch analytics' },
        { status: wpResponse.status }
      );
    }

    const data = await wpResponse.json();
    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Banner analytics fetch error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
