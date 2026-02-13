/**
 * ============================================================================
 * NEXT.JI API ROUTE - PRODUCTS
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * - Acts as a middleware between browser and WordPress
 * - Receives product requests from browser
 * - Forwards requests to WordPress server (which can access localhost:8006)
 * - Returns product data to browser
 *
 * WHY WE NEED THIS API ROUTE:
 * - Mobile browsers can't access WordPress at localhost:8006
 * - Next.js server CAN access WordPress
 * - This route acts as a proxy/bridge between browser and WordPress
 *
 * REQUEST FLOW:
 * Browser → /api/products?language=th → This API Route → WordPress (localhost:8006)
 *
 * ENDPOINTS:
 * - GET /api/products?language=th&category=slug&per_page=20
 *
 * CHANGES MADE (2025-01-28):
 * - Created this API route to proxy product requests
 * - Added support for language, category, and pagination parameters
 * - Added error handling with fallback responses
 * ============================================================================
 */

import { NextResponse } from 'next/server';

// WordPress API URL from environment or default to localhost
// Include /sakwood/v1 path for custom endpoints
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Transform WordPress image URLs to work on mobile and all devices
 * Converts http://localhost:8006/wp-content/... to /wp-content/...
 * This uses Next.js rewrite rules in next.config.ts
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Check if URL contains localhost:8006 or sak_wp:80 (Docker internal URL)
  if (url.includes('sak_wp:80') || url.includes('localhost:8006')) {
    try {
      const urlObj = new URL(url);
      // Extract path after /wp-content/
      const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

      if (wpContentMatch) {
        // Return proxy path: /wp-content/uploads/...
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
 * GET handler for products API
 *
 * PROCESS:
 * 1. Extract query parameters (language, category, per_page)
 * 2. Build WordPress API URL
 * 3. Forward request to WordPress server-side
 * 4. Return product data to browser
 *
 * Query Parameters:
 * - language: 'th' or 'en' (default: 'th')
 * - category: Category slug to filter products (optional)
 * - per_page: Number of products per page (default: '20')
 *
 * @returns JSON array of products or error message
 */
export async function GET(request: Request) {
  try {
    // Step 1: Extract query parameters from browser request
    const { searchParams } = new URL(request.url);
    const language = searchParams.get('language') || 'th';
    const category = searchParams.get('category');
    const perPage = searchParams.get('per_page') || '20';

    // Step 2: Build WordPress REST API URL
    let wpUrl = `${WORDPRESS_API_URL}/products?language=${language}&per_page=${perPage}`;

    // Add category filter if provided
    if (category) {
      wpUrl += `&category=${encodeURIComponent(category)}`;
    }

    // Step 3: Forward request to WordPress (server-side)
    // This works because Next.js server can reach localhost:8006
    const response = await fetch(wpUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Always get fresh data
    });

    // Step 4: Handle errors from WordPress
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        { error: errorData.message || 'Failed to fetch products' },
        { status: response.status }
      );
    }

    // Step 5: Transform image URLs to use Next.js proxy
    const data = await response.json();

    // Transform image URLs in each product
    const transformedData = Array.isArray(data) ? data.map((product: any) => {
      if (product.image?.sourceUrl) {
        product.image.sourceUrl = transformImageUrl(product.image.sourceUrl);
      }
      // Transform gallery images too
      if (product.galleryImages?.nodes) {
        product.galleryImages.nodes = product.galleryImages.nodes.map((img: any) => ({
          ...img,
          sourceUrl: img.sourceUrl ? transformImageUrl(img.sourceUrl) : img.sourceUrl
        }));
      }
      return product;
    }) : data;

    return NextResponse.json(transformedData);
  } catch (error) {
    // Handle any unexpected errors (network issues, invalid data, etc.)
    console.error('Products API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
