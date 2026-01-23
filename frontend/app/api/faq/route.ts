import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8006/wp-json';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'th';
    const category = searchParams.get('category');
    const page = searchParams.get('page') || '1';
    const perPage = searchParams.get('per_page') || '50';
    const featuredOnly = searchParams.get('featured_only');

    // Build WordPress URL with query parameters
    const params = new URLSearchParams({
      language,
      page,
      per_page: perPage,
    });

    if (category) {
      params.append('category', category);
    }
    if (featuredOnly) {
      params.append('featured_only', featuredOnly);
    }

    const response = await fetch(
      `${WORDPRESS_API_URL}/sakwood/v1/faqs?${params.toString()}`,
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
        { faqs: [], total: 0, error: 'Failed to fetch FAQs' },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { faqs: [], total: 0, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
