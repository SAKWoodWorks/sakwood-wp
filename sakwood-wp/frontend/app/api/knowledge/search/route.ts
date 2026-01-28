import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const language = searchParams.get('language') || 'th';
    const category = searchParams.get('category');

    if (!query) {
      return NextResponse.json(
        { articles: [], error: 'Query parameter is required' },
        { status: 400 }
      );
    }

    // Build WordPress URL with query parameters
    const params = new URLSearchParams({
      q: query,
      language,
    });

    if (category) {
      params.append('category', category);
    }

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/knowledge/search?${params.toString()}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { articles: [], error: 'Failed to search knowledge base' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { articles: [], error: 'Internal server error' },
      { status: 500 }
    );
  }
}
