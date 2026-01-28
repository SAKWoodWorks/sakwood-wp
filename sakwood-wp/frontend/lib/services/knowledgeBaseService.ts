import { KBArticle, KBCategory } from '@/lib/types';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Get all knowledge base articles with language, category, and difficulty filtering
 */
export async function getKBArticles(
  language: string = 'th',
  category?: string,
  difficulty?: string,
  featuredOnly: boolean = false,
  perPage: number = 20
): Promise<{ success: boolean; data?: KBArticle[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/knowledge?language=${language}&per_page=${perPage}`;

    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    if (difficulty) {
      url += `&difficulty=${encodeURIComponent(difficulty)}`;
    }

    if (featuredOnly) {
      url += `&featured_only=true`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to fetch articles' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch articles' };
  }
}

/**
 * Get featured knowledge base articles
 */
export async function getFeaturedKBArticles(
  language: string = 'th',
  perPage: number = 5
): Promise<{ success: boolean; data?: KBArticle[]; error?: string }> {
  try {
    const url = `${WORDPRESS_API_URL}/knowledge/featured?language=${language}&per_page=${perPage}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to fetch featured articles' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch featured articles' };
  }
}

/**
 * Get single knowledge base article by slug
 */
export async function getKBArticleBySlug(
  slug: string,
  language: string = 'th'
): Promise<{ success: boolean; data?: KBArticle; error?: string }> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const url = `${WORDPRESS_API_URL}/knowledge/${encodedSlug}?language=${language}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, error: 'Article not found' };
      }
      return { success: false, error: 'Failed to fetch article' };
    }

    const data = await response.json();

    if (data.code === 'article_not_found') {
      return { success: false, error: 'Article not found' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch article' };
  }
}

/**
 * Get knowledge base categories
 */
export async function getKBCategories(): Promise<{
  success: boolean;
  data?: KBCategory[];
  error?: string;
}> {
  try {
    const url = `${WORDPRESS_API_URL}/knowledge-categories`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to fetch categories' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch categories' };
  }
}

/**
 * Search knowledge base articles
 */
export async function searchKBArticles(
  query: string,
  language: string = 'th',
  category?: string
): Promise<{ success: boolean; data?: KBArticle[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/knowledge/search?q=${encodeURIComponent(query)}&language=${language}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to search articles' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to search articles' };
  }
}
