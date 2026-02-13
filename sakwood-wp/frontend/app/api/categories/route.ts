import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
// GraphQL endpoint is at the same host, different path
const GRAPHQL_URL = WORDPRESS_API_URL.replace('/wp-json', '/graphql');

export async function GET() {
  try {
    // Use GraphQL to fetch categories
    const query = `
      query GetProductCategories {
        categories(first: 100) {
          nodes {
            id
            name
            slug
            count
          }
        }
      }
    `;

    const response = await fetch(GRAPHQL_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status);
      return NextResponse.json([], { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data?.data?.categories?.nodes || []);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
