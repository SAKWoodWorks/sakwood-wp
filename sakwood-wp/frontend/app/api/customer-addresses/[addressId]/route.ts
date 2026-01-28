import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = 'http://localhost:8006/wp-json';

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const { addressId } = await params;
    const body = await request.json();
    const cookieHeader = request.headers.get('cookie') || '';

    // Include user_id in the body
    const bodyWithUserId = { ...body, user_id: body.user_id };

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses/${addressId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': cookieHeader,
        },
        body: JSON.stringify(bodyWithUserId),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to update address' },
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

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ addressId: string }> }
) {
  try {
    const { addressId } = await params;
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const cookieHeader = request.headers.get('cookie') || '';

    // Include user_id as query parameter
    const wpUrl = userId
      ? `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses/${addressId}?user_id=${userId}`
      : `${WORDPRESS_API_URL}/sakwood/v1/customer/addresses/${addressId}`;

    const response = await fetch(wpUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to delete address' },
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
