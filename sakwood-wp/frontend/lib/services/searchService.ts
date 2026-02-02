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
  stockStatus?: string;
  length?: number;
  width?: number;
  thickness?: number;
  grade?: string;
}

interface SearchResponse {
  products: SearchProduct[];
  total: number;
}

export interface SearchFilters {
  query: string;
  priceRange?: [number, number];
  length?: { min: number; max: number };
  width?: { min: number; max: number };
  thickness?: { min: number; max: number };
  grade?: string[];
  inStockOnly?: boolean;
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

/**
 * Advanced search with filters
 */
export async function searchProductsWithFilters(
  filters: SearchFilters,
  lang: string = 'th'
): Promise<SearchResponse> {
  try {
    let searchTerm = filters.query.trim();

    // Remove spaces for Thai searches
    if (lang === 'th') {
      searchTerm = searchTerm.replace(/\s+/g, '');
    }

    // Build GraphQL query with filters
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
            stockStatus
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
      next: { revalidate: 30 },
    });

    if (!response.ok) {
      console.error('[SearchService] Failed to fetch:', response.statusText);
      return { products: [], total: 0 };
    }

    const data = await response.json();
    const products = data.data?.products?.nodes || [];

    // Transform and filter products
    const transformedProducts: SearchProduct[] = products.map((product: any) => {
      // Extract dimensions from product meta or description
      const length = extractDimension(product, 'length');
      const width = extractDimension(product, 'width');
      const thickness = extractDimension(product, 'thickness');
      const grade = extractGrade(product);

      return {
        id: String(product.id),
        name: product.name,
        slug: product.slug,
        price: product.price || undefined,
        regularPrice: product.regularPrice || undefined,
        description: product.description || undefined,
        image: product.image || undefined,
        shortDescription: product.shortDescription || undefined,
        type: product.type || 'simple',
        stockStatus: product.stockStatus || 'UNKNOWN',
        length,
        width,
        thickness,
        grade,
      };
    });

    // Apply filters client-side
    let filteredProducts = transformedProducts;

    // Price range filter
    if (filters.priceRange) {
      const [minPrice, maxPrice] = filters.priceRange;
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.price) return true;
        const price = parsePrice(product.price);
        return price >= minPrice && price <= maxPrice;
      });
    }

    // Dimensions filter
    if (filters.length) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.length) return false;
        return product.length >= filters.length!.min && product.length <= filters.length!.max;
      });
    }

    if (filters.width) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.width) return false;
        return product.width >= filters.width!.min && product.width <= filters.width!.max;
      });
    }

    if (filters.thickness) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.thickness) return false;
        return product.thickness >= filters.thickness!.min && product.thickness <= filters.thickness!.max;
      });
    }

    // Grade filter
    if (filters.grade && filters.grade.length > 0) {
      filteredProducts = filteredProducts.filter((product) => {
        if (!product.grade) return false;
        return filters.grade!.includes(product.grade);
      });
    }

    // In stock only filter
    if (filters.inStockOnly) {
      filteredProducts = filteredProducts.filter((product) => {
        return product.stockStatus === 'INSTOCK';
      });
    }

    return {
      products: filteredProducts,
      total: filteredProducts.length,
    };
  } catch (error) {
    console.error('[SearchService] Error searching products with filters:', error);
    return { products: [], total: 0 };
  }
}

/**
 * Parse price string to number
 */
function parsePrice(priceStr: string): number {
  // Remove currency symbols, commas, and other non-numeric characters (except decimal point)
  const cleaned = priceStr.replace(/[฿$\s,]/g, '');
  return parseFloat(cleaned) || 0;
}

/**
 * Extract dimension from product data
 */
function extractDimension(product: any, dimension: string): number | undefined {
  // Try to extract from description or meta
  const regex = new RegExp(`${dimension}:\\s*(\\d+)`, 'i');
  const match = product.description?.match(regex) || product.shortDescription?.match(regex);
  return match ? parseInt(match[1]) : undefined;
}

/**
 * Extract grade from product data
 */
function extractGrade(product: any): string | undefined {
  // Try to extract grade from description
  const gradeRegex = /grade[:\s]*([A-D])/i;
  const match = product.description?.match(gradeRegex) || product.shortDescription?.match(gradeRegex);
  return match ? match[1].toUpperCase() : undefined;
}
