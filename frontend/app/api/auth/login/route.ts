import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'http://localhost:8006';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // First, get the JWT token from WordPress
    const tokenResponse = await fetch(`${WORDPRESS_URL}/wp-json/jwt-auth/v1/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        password: password,
      }),
    });

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Invalid credentials' },
        { status: 401 }
      );
    }

    const tokenData = await tokenResponse.json();

    // Now get the user data using the token
    const userResponse = await fetch(`${WORDPRESS_URL}/wp-json/wp/v2/users/me`, {
      headers: {
        'Authorization': `Bearer ${tokenData.token}`,
      },
    });

    if (!userResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch user data' },
        { status: 500 }
      );
    }

    const wpUser = await userResponse.json();

    // Transform WordPress user data to our format
    const user = {
      id: wpUser.id,
      email: wpUser.email,
      firstName: wpUser.meta?.first_name || wpUser.name?.split(' ')[0] || '',
      lastName: wpUser.meta?.last_name || wpUser.name?.split(' ').slice(1).join(' ') || '',
      displayName: wpUser.name,
    };

    return NextResponse.json({
      token: tokenData.token,
      user,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}
