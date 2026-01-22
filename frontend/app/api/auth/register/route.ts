import { NextRequest, NextResponse } from 'next/server';

const WORDPRESS_URL = process.env.WORDPRESS_URL || 'http://localhost:8006';

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName, phone } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Register user using our custom WordPress endpoint
    const registerResponse = await fetch(`${WORDPRESS_URL}/wp-json/sakwood/v1/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: email,
        email: email,
        password: password,
        first_name: firstName,
        last_name: lastName,
      }),
    });

    if (!registerResponse.ok) {
      const errorData = await registerResponse.json().catch(() => ({}));
      const errorMessage = errorData.message || errorData.code || 'Registration failed';
      return NextResponse.json(
        { error: errorMessage },
        { status: registerResponse.status }
      );
    }

    const registeredUser = await registerResponse.json();

    // Auto-login after registration by getting JWT token
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
      // User was created but login failed
      return NextResponse.json({
        success: true,
        message: 'Registration successful. Please login.',
      });
    }

    const tokenData = await tokenResponse.json();

    // Transform WordPress user data to our format
    const user = {
      id: registeredUser.user_id,
      email: registeredUser.email,
      firstName: registeredUser.first_name || '',
      lastName: registeredUser.last_name || '',
      displayName: registeredUser.name || email,
    };

    return NextResponse.json({
      token: tokenData.token,
      user,
      success: true,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'An error occurred during registration' },
      { status: 500 }
    );
  }
}
