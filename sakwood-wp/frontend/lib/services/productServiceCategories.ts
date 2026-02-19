/**
 * Fetch product categories from WordPress REST API
 *
 * This bypasses the GraphQL language field issue by using REST instead
 *
 * IMPORTANT: Must use language prefix in URL to avoid middleware redirect issues
 * - Correct: /en/wp-json/sakwood/v1/categories?language=en
 * - Wrong: /wp-json/sakwood/v1/categories?language=en (gets redirected, loses language param)
 */
export async function getProductCategories(language: string = 'th'): Promise<ProductCategory[]> {
  try {
    // MUST use language prefix to avoid middleware redirect
    const url = `/${language}/wp-json/sakwood/v1/categories?language=${language}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('Failed to fetch categories:', response.status);
      return [];
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}
