import { API_CONFIG } from '@/lib/config/constants';

interface SearchProduct {
  id: string;
  name: string;
  slug: string;
  price?: string;
  regularPrice?: string;
  description?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
  shortDescription?: string;
  type?: string;
}

interface SearchResponse {
  products: SearchProduct[];
  total: number;
}

/**
 * Search products using WordPress GraphQL API
 */
export async function searchProducts(
  query: string,
  lang: string = 'th'
): Promise<SearchResponse> {
  if (!query || query.trim().length === 0) {
    return { products: [], total: 0 };
  }

  try {
    let searchTerm = query.trim();

    // Remove spaces for Thai searches to improve matching
    // Thai product names often don't need spaces between characters
    if (lang === 'th') {
      searchTerm = searchTerm.replace(/\s+/g, '');
    }

    // GraphQL query to search products by name, description, or short description
    const graphqlQuery = `
      query SearchProducts($search: String!) {
        products(where: { search: $search }) {
          nodes {
            id: databaseId
            slug
            name
            type
            description
            shortDescription(format: RENDERED)
            ... on SimpleProduct {
              price
              regularPrice
            }
            ... on VariableProduct {
              price
              regularPrice
            }
            image {
              sourceUrl
              altText
            }
          }
        }
      }
    `;

    const response = await fetch(API_CONFIG.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: graphqlQuery,
        variables: {
          search: searchTerm,
        },
      }),
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (!response.ok) {
      console.error('[SearchService] Failed to fetch:', response.statusText);
      return { products: [], total: 0 };
    }

    const data = await response.json();
    const products = data.data?.products?.nodes || [];

    // Transform data to match our Product type
    const transformedProducts: SearchProduct[] = products.map((product: any) => ({
      id: String(product.id),
      name: product.name,
      slug: product.slug,
      price: product.price || undefined,
      regularPrice: product.regularPrice || undefined,
      description: product.description || undefined,
      image: product.image || undefined,
      shortDescription: product.shortDescription || undefined,
      type: product.type || 'simple',
    }));

    return {
      products: transformedProducts,
      total: transformedProducts.length,
    };
  } catch (error) {
    console.error('[SearchService] Error searching products:', error);
    return { products: [], total: 0 };
  }
}
