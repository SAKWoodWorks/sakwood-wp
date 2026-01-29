import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';
    const status = searchParams.get('status') || '';

    // Get auth token from localStorage (passed via cookie or Authorization header)
    const cookieStore = await cookies();
    const authToken = cookieStore.get('sakwood_token')?.value || request.headers.get('authorization')?.replace('Bearer ', '');

    if (!authToken) {
      return NextResponse.json(
        { orders: [], total: 0, error: 'Authentication required' },
        { status: 401 }
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
