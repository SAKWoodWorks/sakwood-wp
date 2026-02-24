import { API_CONFIG } from '@/lib/config/constants';

export async function graphqlRequest<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T | null> {
  try {
    // Add cache-busting timestamp to prevent stale data after Quick Edit
    const cacheBuster = { _cache: Date.now() };
    const mergedVariables = { ...variables, ...cacheBuster };

    const res = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
      body: JSON.stringify({ query, variables: mergedVariables }),
      cache: 'no-store',
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
