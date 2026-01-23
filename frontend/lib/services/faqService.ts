import { FAQ, FAQCategory } from '@/lib/types';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Transform internal Docker URLs to publicly accessible URLs
 */
function transformImageUrl(url: string | undefined): string | undefined {
  if (!url) return undefined;
  return url.replace('http://sak_wp:80/', 'http://localhost:8006/');
}

/**
 * Get all FAQs with language and category filtering
 */
export async function getFAQs(
  language: string = 'th',
  category?: string,
  perPage: number = 50
): Promise<{ success: boolean; data?: FAQ[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/faqs?language=${language}&per_page=${perPage}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to fetch FAQs' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch FAQs' };
  }
}

/**
 * Get featured FAQs
 */
export async function getFeaturedFAQs(
  language: string = 'th',
  perPage: number = 10
): Promise<{ success: boolean; data?: FAQ[]; error?: string }> {
  try {
    const url = `${WORDPRESS_API_URL}/faqs?language=${language}&featured_only=true&per_page=${perPage}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to fetch featured FAQs' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch featured FAQs' };
  }
}

/**
 * Get single FAQ by slug
 */
export async function getFAQBySlug(
  slug: string,
  language: string = 'th'
): Promise<{ success: boolean; data?: FAQ; error?: string }> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const url = `${WORDPRESS_API_URL}/faqs/${encodedSlug}?language=${language}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, error: 'FAQ not found' };
      }
      return { success: false, error: 'Failed to fetch FAQ' };
    }

    const data = await response.json();

    if (data.code === 'faq_not_found') {
      return { success: false, error: 'FAQ not found' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch FAQ' };
  }
}

/**
 * Get FAQ categories
 */
export async function getFAQCategories(): Promise<{
  success: boolean;
  data?: FAQCategory[];
  error?: string;
}> {
  try {
    const url = `${WORDPRESS_API_URL}/faq-categories`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to fetch FAQ categories' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch FAQ categories' };
  }
}

/**
 * Search FAQs
 */
export async function searchFAQs(
  query: string,
  language: string = 'th',
  category?: string
): Promise<{ success: boolean; data?: FAQ[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/faqs/search?q=${encodeURIComponent(query)}&language=${language}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to search FAQs' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to search FAQs' };
  }
}
