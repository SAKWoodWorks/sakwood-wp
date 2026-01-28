import { graphqlRequest } from '@/lib/graphql/client';
import { GET_PRODUCTS_QUERY, GET_PRODUCT_QUERY, GET_PRODUCT_CATEGORIES_QUERY } from '@/lib/graphql/queries';
import { Product, ProductResponse, ProductImage, ProductCategory, ProductCategoriesResponse } from '@/lib/types';
import { APP_CONFIG } from '@/lib/config/constants';

/**
 * Transform internal Docker URLs to publicly accessible URLs
 * Replaces http://sak_wp:80/ with Next.js proxy path /wp-content/
 * This works for both localhost and network access (mobile)
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;

  // Transform sak_wp:80 to Next.js proxy path
  if (url.includes('sak_wp:80')) {
    const urlObj = new URL(url);
    const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

    if (wpContentMatch) {
      return `/wp-content/${wpContentMatch[1]}`;
    }
  }

  // Transform localhost:8006 to Next.js proxy path (for consistency)
  if (url.includes('localhost:8006')) {
    const urlObj = new URL(url);
    const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

    if (wpContentMatch) {
      return `/wp-content/${wpContentMatch[1]}`;
    }
  }

  return url;
}

/**
 * Transform product image URLs
 */
function transformProductImage(image?: ProductImage): ProductImage | undefined {
  if (!image) return undefined;
  const transformedUrl = transformImageUrl(image.sourceUrl);
  if (!transformedUrl) return undefined;
  return {
    ...image,
    sourceUrl: transformedUrl,
  };
}

/**
 * Get product categories
 * Returns list of categories with product counts
 */
export async function getProductCategories(): Promise<ProductCategory[]> {
  try {
    const data = await graphqlRequest<ProductCategoriesResponse>(GET_PRODUCT_CATEGORIES_QUERY);
    return data?.productCategories?.nodes || [];
  } catch (error) {
    console.error('Error fetching product categories:', error);
    return [];
  }
}

export type ProductSortBy = 'name' | 'price' | 'date';

/**
 * Helper function to parse price string to number
 * Handles Thai currency format (฿) and commas
 */
function parsePrice(priceStr?: string): number {
  if (!priceStr) return 0;
  // Remove currency symbol, commas, and whitespace
  const numericStr = priceStr.replace(/[฿$,,\s]/g, '');
  const parsed = parseFloat(numericStr);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Sort products by specified field
 */
function sortProducts(products: Product[], sortBy: ProductSortBy): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case 'name':
      return sorted.sort((a, b) => a.name.localeCompare(b.name, 'th'));

    case 'price':
      return sorted.sort((a, b) => {
        const priceA = parsePrice(a.price);
        const priceB = parsePrice(b.price);
        return priceA - priceB;
      });

    case 'date':
      // For now, sort by database ID as a proxy for date
      // You may want to add a date field to the Product type in the future
      return sorted.sort((a, b) => b.databaseId - a.databaseId);

    default:
      return sorted;
  }
}

/**
 * Get products via REST API with language filtering
 * Uses custom endpoint: /wp-json/sakwood/v1/products?language=th
 * @param language - Language code ('th' or 'en')
 * @param categorySlug - Optional category slug to filter by
 * @param sortBy - Optional sort field ('name', 'price', 'date')
 */
export async function getProducts(
  language: string = 'th',
  categorySlug?: string,
  sortBy?: ProductSortBy
): Promise<Product[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';
    let url = `${baseUrl}/wp-json/sakwood/v1/products?language=${language}&per_page=${APP_CONFIG.productsPerPage}`;

    // Add category filter if provided
    if (categorySlug) {
      url += `&category=${encodeURIComponent(categorySlug)}`;
    }

    const response = await fetch(url);
    if (!response.ok) {
      console.error('Failed to fetch products:', response.status);
      // Fall back to GraphQL
      return getProductsViaGraphQL(language);
    }

    const data = await response.json();

    // Handle empty array
    if (!Array.isArray(data) || data.length === 0) {
      return [];
    }

    // Transform data to match Product interface
    const products = data.map((product: any) => ({
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
      image: product.image ? { sourceUrl: transformImageUrl(product.image.sourceUrl) } : undefined,
      description: '',
      galleryImages: undefined,
      // Include dimensions
      thickness: product.thickness || undefined,
      width: product.width || undefined,
      length: product.length || undefined,
      // Include categories if available
      categories: product.categories ? product.categories.map((cat: any) => ({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
      })) : undefined,
    }));

    // Sort products if sortBy is provided
    if (sortBy) {
      return sortProducts(products, sortBy);
    }

    return products;
  } catch (error) {
    console.error('Error fetching products via REST API:', error);
    // Fall back to GraphQL
    return getProductsViaGraphQL(language);
  }
}

/**
 * Fallback: Get products via GraphQL (no language filtering)
 */
async function getProductsViaGraphQL(language: string = 'th'): Promise<Product[]> {
  const data = await graphqlRequest<any>(GET_PRODUCTS_QUERY, { first: 10 });
  const products = data?.products?.nodes || [];

  // Transform image URLs
  return products.map((product: any) => ({
    ...product,
    image: product.image ? transformProductImage(product.image) : undefined,
    categories: product.productCategories?.nodes?.map((cat: any) => ({
      id: cat.id,
      name: cat.name,
      slug: cat.slug,
    })) || [],
  }));
}

/**
 * Get single product by slug with language filtering
 * Uses custom REST API endpoint: /wp-json/sakwood/v1/products/{slug}?language=th
 */
export async function getProductBySlug(slug: string, language: string = 'th'): Promise<Product | null> {
  try {
    // The slug from Next.js is already decoded, but we need to URL-encode it for the API request
    // This ensures Thai characters are properly encoded for the HTTP request
    const encodedSlug = encodeURIComponent(slug);
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';
    const url = `${baseUrl}/wp-json/sakwood/v1/products/${encodedSlug}?language=${language}`;

    const response = await fetch(url);

    if (!response.ok) {
      // If 404, product not found in this language
      if (response.status === 404) {
        return null;
      }
      console.error('Failed to fetch product:', response.status);
      // Fall back to GraphQL
      return getProductBySlugViaGraphQL(slug);
    }

    const product = await response.json();

    if (!product || (product as any).code === 'product_not_found') {
      return null;
    }

    // Transform data to match Product interface
    return {
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
      image: product.image ? { sourceUrl: transformImageUrl(product.image.sourceUrl) } : undefined,
      description: product.description || '',
      galleryImages: product.galleryImages ? {
        nodes: (product.galleryImages.nodes || []).map((img: any) => ({
          ...img,
          sourceUrl: transformImageUrl(img.sourceUrl)
        }))
      } : undefined,
      thickness: product.thickness || undefined,
      width: product.width || undefined,
      length: product.length || undefined,
    };
  } catch (error) {
    console.error('Error fetching product via REST API:', error);
    // Fall back to GraphQL
    return getProductBySlugViaGraphQL(slug);
  }
}

/**
 * Fallback: Get product by slug via GraphQL (no language filtering)
 */
async function getProductBySlugViaGraphQL(slug: string): Promise<Product | null> {
  const data = await graphqlRequest<ProductResponse>(GET_PRODUCT_QUERY, {
    slug,
  });
  const product = data?.product;

  if (!product) return null;

  // Transform image URLs
  return {
    ...product,
    image: transformProductImage(product.image),
    galleryImages: product.galleryImages
      ? {
          nodes: product.galleryImages.nodes
            .map(transformProductImage)
            .filter((img): img is ProductImage => img !== undefined),
        }
      : undefined,
  };
}
