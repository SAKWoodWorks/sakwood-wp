import { API_CONFIG } from '@/lib/config/constants';

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  try {
    const res = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
      cache: API_CONFIG.cache,
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error('GraphQL Errors:', json.errors.map((e: any) => e.message));
      console.error('Full error details:', json.errors);
      return null;
    }

    return json.data;
  } catch (error) {
    console.error('GraphQL request failed:', error);
    return null;
  }
}
