/**
 * ============================================================================
 * CLIENT-SIDE PRODUCT SERVICE
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * - Fetches products from WordPress using Next.js API routes as a proxy
 * - Handles image URL transformation for mobile compatibility
 * - Sorts products by name, price, or date
 *
 * WHY WE CREATED THIS:
 * - Mobile browsers can't access localhost:8006 (WordPress Docker container)
 * - Server-side product fetching doesn't work when user changes filters/sorts
 * - This service runs in the browser and uses Next.js API routes as middleware
 *
 * HOW IT WORKS:
 * Browser → Next.js API Route (/api/products) → WordPress (localhost:8006)
 * The Next.js server can reach WordPress, but the browser can't directly
 *
 * CHANGES MADE (2025-01-28):
 * - Created this new client-side service
 * - Added image URL transformation (localhost:8006 → /wp-content/)
 * - Updated ShopPage.tsx to use this instead of server-side function
 * ============================================================================
 */

import type { Product, ProductCategory } from '@/lib/types';

export type ProductSortBy = 'name' | 'price' | 'date';

/**
 * Interface for REST API product response
 */
interface RestProductCategory {
  id: number;
  name: string;
  slug: string;
}

interface RestProduct {
  id: string | number;
  databaseId: number;
  name: string;
  slug: string;
  sku?: string;
  language?: string;
  price?: string;
  regularPrice?: string;
  priceTypes?: string[];
  prices?: Record<string, string>;
  image?: {
    sourceUrl: string;
  };
  thickness?: string;
  width?: string;
  length?: string;
  categories?: RestProductCategory[];
}

/**
 * Transform WordPress image URLs to work on mobile
 *
 * PROBLEM:
 * - WordPress serves images from http://localhost:8006/wp-content/uploads/...
 * - Mobile devices can't access localhost:8006
 * - This causes broken images on mobile
 *
 * SOLUTION:
 * - Transform URLs to use Next.js proxy path: /wp-content/uploads/...
 * - Next.js rewrites (in next.config.ts) proxy these to WordPress server-side
 * - Browser requests /wp-content/x.jpg → Next.js → http://localhost:8006/wp-content/x.jpg
 *
 * @param url - Original image URL from WordPress
 * @returns Transformed URL that works on all devices
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Check if URL contains localhost:8006 or sak_wp:80 (Docker internal URL)
  if (url.includes('sak_wp:80') || url.includes('localhost:8006')) {
    try {
      const urlObj = new URL(url);
      // Extract the path after /wp-content/
      // Example: /wp-content/uploads/2026/01/image.jpg → uploads/2026/01/image.jpg
      const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

      if (wpContentMatch) {
        // Return proxy path: /wp-content/uploads/2026/01/image.jpg
        // Next.js rewrite rule will forward this to WordPress
        return `/wp-content/${wpContentMatch[1]}`;
      }
    } catch (e) {
      console.error('Error transforming image URL:', e);
      return url;
    }
  }

  return url; // Return original URL if no transformation needed
}

/**
 * Fetch products via Next.js API route
 *
 * PROCESS:
 * 1. Build query parameters (language, category, sort)
 * 2. Call Next.js API route (/api/products)
 * 3. API route forwards request to WordPress server-side
 * 4. Transform image URLs to use proxy paths
 * 5. Sort products if requested
 *
 * @param language - 'th' or 'en'
 * @param categorySlug - Optional category filter
 * @param sortBy - Optional sort field ('name', 'price', 'date')
 * @returns Array of Product objects
 */
export async function getProductsClient(
  language: string = 'th',
  categorySlug?: string,
  sortBy?: ProductSortBy
): Promise<Product[]> {
  try {
    // Step 1: Build query parameters for API request
    const params = new URLSearchParams({
      language,
      per_page: '50', // Get up to 50 products per page
    });

    if (categorySlug) {
      params.set('category', categorySlug);
    }

    // Step 2: Fetch from Next.js API route (not WordPress directly)
    // Browser → /api/products → Next.js server → WordPress
    const response = await fetch(`/api/products?${params.toString()}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache - always get fresh data
    });

    if (!response.ok) {
      console.error('Failed to fetch products:', response.status);
      return [];
    }

    const data = await response.json();

    // Handle error response from API
    if (data.error) {
      console.error('Products API error:', data.error);
      return [];
    }

    // Handle empty response
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Step 3: Transform WordPress data to match Product interface
    const products: Product[] = data.map((product: RestProduct) => ({
      id: String(product.id),
      databaseId: product.databaseId,
      name: product.name,
      slug: product.slug,
      sku: product.sku || undefined,
      language: product.language || 'th',
      price: product.price || product.prices?.piece || undefined,
      regularPrice: product.regularPrice || undefined,
      priceTypes: product.priceTypes || ['piece'],
      prices: product.prices || {},
      // Transform image URL to work on mobile
      image: product.image ? { sourceUrl: transformImageUrl(product.image.sourceUrl) } : undefined,
      description: '',
      galleryImages: undefined,
      // Product dimensions
      thickness: product.thickness || undefined,
      width: product.width || undefined,
      length: product.length || undefined,
      // Product categories
      categories: product.categories ? product.categories.map((cat: RestProductCategory) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) : undefined,
    }));

    // Step 4: Sort products if requested
    if (sortBy) {
      return sortProducts(products, sortBy);
    }

    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch product categories via Next.js API route
 *
 * Uses same proxy pattern as getProductsClient
 *
 * @returns Array of ProductCategory objects
 */
export async function getProductCategoriesClient(): Promise<ProductCategory[]> {
  try {
    const response = await fetch('/api/categories', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
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

/**
 * Helper: Parse price string to number
 *
 * Handles Thai currency format: "1,200฿", "฿1,200", "1,200.00"
 * Removes currency symbols and commas, then converts to number
 */
function parsePrice(priceStr?: string): number {
  if (!priceStr) return 0;
  const numericStr = priceStr.replace(/[฿$,,\s]/g, '');
  const parsed = parseFloat(numericStr);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Sort products by specified field
 *
 * @param products - Array of products to sort
 * @param sortBy - Field to sort by ('name', 'price', 'date')
 * @returns Sorted array of products
 */
function sortProducts(products: Product[], sortBy: ProductSortBy): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'name':
      // Sort alphabetically (Thai language aware)
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'));

    case 'price':
      // Sort by price (low to high)
      return sorted.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceA - priceB;
      });

    case 'date':
      // Sort by database ID as proxy for date (newest first)
      return sorted.sort((a, b) => b.databaseId - a.databaseId);

    default:
      return sorted;
  }
}
