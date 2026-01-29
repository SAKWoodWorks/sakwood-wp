import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const { orderId } = await params;
    const { searchParams } = new URL(request.url);
    const devUserId = searchParams.get('user_id'); // DEV MODE: Get user_id from query params

    // DEV MODE: If user_id is provided, use it directly
    if (devUserId) {
      const wpResponse = await fetch(
        `${WORDPRESS_API_URL}/sakwood/v1/customer/orders/${orderId}?user_id=${devUserId}&skip_ownership_check=1`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          cache: 'no-store',
        }
      );

      if (!wpResponse.ok) {
        console.error('[API OrderDetails] Dev mode failed:', wpResponse.statusText);
        return NextResponse.json(
          { error: 'Failed to fetch order details' },
          { status: wpResponse.status }
        );
      }

      const data = await wpResponse.json();
      return NextResponse.json(data);
    }

    // Production mode: Get auth token from Authorization header
    const authToken = request.headers.get('authorization')?.replace('Bearer ', '');

    if (!authToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Forward the request to WordPress with JWT token
    const wpResponse = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/orders/${orderId}`,
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
      console.error('[API OrderDetails] Failed to fetch from WordPress:', wpResponse.statusText);
      return NextResponse.json(
        { error: 'Failed to fetch order details' },
        { status: wpResponse.status }
      );
    }

    const data = await wpResponse.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('[API OrderDetails] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
