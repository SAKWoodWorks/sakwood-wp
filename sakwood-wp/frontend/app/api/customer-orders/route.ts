import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';
    const status = searchParams.get('status') || '';
    const devUserId = searchParams.get('user_id'); // DEV MODE: Get user_id from query params

    // DEV MODE: If user_id is provided, use it directly (bypass auth)
    if (devUserId) {
      const wpResponse = await fetch(
        `${WORDPRESS_API_URL}/sakwood/v1/customer/orders?page=${page}&per_page=${per_page}&status=${status}&user_id=${devUserId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!wpResponse.ok) {
        console.error('[API CustomerOrders] Dev mode failed:', wpResponse.statusText);
        return NextResponse.json(
          { orders: [], total: 0, error: 'Failed to fetch orders' },
          { status: wpResponse.status }
        );
      }

      const data = await wpResponse.json();
      return NextResponse.json(data);
    }

    // Production mode: Check for auth token
    const cookieStore = await cookies();
    const authToken = cookieStore.get('sakwood_token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

    if (!authToken) {
      return NextResponse.json(
        { orders: [], total: 0, page: 1, per_page: 10, total_pages: 0, dev_notice: 'No user_id found. Pass ?user_id=1 to test' },
        { status: 200 } // Return 200 with empty orders instead of 401
      );
    }

    // Forward the request to WordPress with JWT token
    const wpResponse = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/orders?page=${page}&per_page=${per_page}&status=${status}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        cache: 'no-store',
      }
    );

    if (!wpResponse.ok) {
      console.error('[API CustomerOrders] Failed to fetch from WordPress:', wpResponse.statusText);
      return NextResponse.json(
        { orders: [], total: 0, error: 'Failed to fetch orders' },
        { status: wpResponse.status }
      );
    }

    const data = await wpResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API CustomerOrders] Error:', error);
    return NextResponse.json(
      { orders: [], total: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
