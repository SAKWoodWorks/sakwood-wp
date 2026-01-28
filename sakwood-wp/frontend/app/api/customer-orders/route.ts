import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = searchParams.get('page') || '1';
    const per_page = searchParams.get('per_page') || '10';
    const status = searchParams.get('status') || '';

    // Get cookie from request
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/orders?page=${page}&per_page=${per_page}&status=${status}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieHeader,
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      console.error('[API CustomerOrders] Failed to fetch from WordPress:', response.statusText);
      return NextResponse.json(
        { orders: [], total: 0, error: 'Failed to fetch orders' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API CustomerOrders] Error:', error);
    return NextResponse.json(
      { orders: [], total: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
