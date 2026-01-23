import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('user_id');
    const cookieHeader = request.headers.get('cookie') || '';

    // Build WordPress URL with user_id if provided
    const wpUrl = userId
      ? `${WORDPRESS_API_URL}/sakwood/v1/customer/crm/tasks?user_id=${userId}`
      : `${WORDPRESS_API_URL}/sakwood/v1/customer/crm/tasks`;

    const response = await fetch(wpUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': cookieHeader,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { tasks: [], error: errorData.message || 'Failed to fetch tasks' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { tasks: [], error: 'Internal server error' },
      { status: 500 }
    );
  }
}
