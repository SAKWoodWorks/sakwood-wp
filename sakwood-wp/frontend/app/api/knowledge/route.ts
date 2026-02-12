import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'th';
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '50';

    // Build WordPress URL with query parameters
    const params = new URLSearchParams({
      language,
      page,
      per_page: perPage,
    });

    if (category) {
      params.append('category', category);
    }
    if (difficulty) {
      params.append('difficulty', difficulty);
    }

    const response = await fetch(
      `${WORDPRESS_API_URL}/knowledge?${params.toString()}`,
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
        { articles: [], total: 0, error: 'Failed to fetch knowledge base articles' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { articles: [], total: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
