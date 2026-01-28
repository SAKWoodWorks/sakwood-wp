export interface PopupSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  discount_code: string;
  discount_description: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
  delay: number;
}

/**
 * Fetch popup settings from WordPress
 * Uses Next.js API route as a proxy to avoid CORS issues
 */
export async function getPopupSettings(): Promise<PopupSettings | null> {
  try {
    // Use Next.js API route as proxy to WordPress
    // This avoids CORS issues and works in both dev and production
    const response = await fetch('/api/popup', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[PopupService] Failed to fetch popup settings:', response.status, response.statusText);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[PopupService] Error fetching popup settings:', error);
    // Return null silently to not break the page
    return null;
  }
}

