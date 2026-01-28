import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;

    // Get cookie from request
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/orders/${orderId}`,
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
      console.error('[API OrderDetails] Failed to fetch from WordPress:', response.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch order details' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API OrderDetails] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
