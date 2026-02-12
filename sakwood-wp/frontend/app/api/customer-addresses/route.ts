import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const cookieHeader = request.headers.get('cookie') || '';

    // Build WordPress URL with user_id if provided
    const wpUrl = userId
      ? `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses?user_id=${userId}`
      : `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses`;

    const response = await fetch(wpUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      return NextResponse.json(
        { addresses: [], total: 0, error: 'Failed to fetch addresses' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { addresses: [], total: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const cookieHeader = request.headers.get('cookie') || '';

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieHeader,
        },
        body: JSON.stringify(body),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to create address' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
