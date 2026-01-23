import { Video, VideoCategory } from '@/lib/types';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Get all videos with language and category filtering
 */
export async function getVideos(
  language: string = 'th',
  category?: string,
  perPage: number = 50
): Promise<{ success: boolean; data?: Video[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/videos?language=${language}&per_page=${perPage}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { success: false, error: errorData.message || 'Failed to fetch videos' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch videos' };
  }
}

/**
 * Get single video by slug
 */
export async function getVideoBySlug(
  slug: string,
  language: string = 'th'
): Promise<{ success: boolean; data?: Video; error?: string }> {
  try {
    const encodedSlug = encodeURIComponent(slug);
    const url = `${WORDPRESS_API_URL}/videos/${encodedSlug}?language=${language}`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        return { success: false, error: 'Video not found' };
      }
      return { success: false, error: 'Failed to fetch video' };
    }

    const data = await response.json();

    if (data.code === 'video_not_found') {
      return { success: false, error: 'Video not found' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch video' };
  }
}

/**
 * Get video categories
 */
export async function getVideoCategories(): Promise<{
  success: boolean;
  data?: VideoCategory[];
  error?: string;
}> {
  try {
    const url = `${WORDPRESS_API_URL}/video-categories`;

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to fetch video categories' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch video categories' };
  }
}

/**
 * Search videos
 */
export async function searchVideos(
  query: string,
  language: string = 'th',
  category?: string
): Promise<{ success: boolean; data?: Video[]; error?: string }> {
  try {
    let url = `${WORDPRESS_API_URL}/videos/search?q=${encodeURIComponent(query)}&language=${language}`;
    if (category) {
      url += `&category=${encodeURIComponent(category)}`;
    }

    const response = await fetch(url, {
      cache: 'no-store',
    });

    if (!response.ok) {
      return { success: false, error: 'Failed to search videos' };
    }

    const data = await response.json();
    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to search videos' };
  }
}
