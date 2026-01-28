import { NextResponse } from 'next/server';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';

export async function GET() {
  try {
    // Use GraphQL to fetch categories
    const query = `
      query GetProductCategories {
        productCategories(first: 100) {
          nodes {
            id
            name
            slug
            count
          }
        }
      }
    `;

    const response = await fetch(`${WORDPRESS_API_URL}/graphql`, {
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
    return NextResponse.json(data?.data?.productCategories?.nodes || []);
  } catch (error) {
    console.error('Categories API error:', error);
    return NextResponse.json([], { status: 500 });
  }
}
