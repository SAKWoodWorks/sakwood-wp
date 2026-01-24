import { getApiUrl } from '@/lib/utils/api-url';

export interface SliderSettings {
  autoplay_delay: number;
}

/**
 * Fetch slider settings from WordPress
 * Uses Next.js API route as a proxy to avoid CORS issues
 */
export async function getSliderSettings(): Promise<SliderSettings> {
  try {
    // Use getApiUrl helper to handle server-side vs client-side URL construction
    const url = getApiUrl('/api/slider-settings');

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      console.error('[SliderSettingsService] Failed to fetch slider settings:', response.statusText);
      return { autoplay_delay: 6000 }; // Default fallback
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[SliderSettingsService] Error fetching slider settings:', error);
    return { autoplay_delay: 6000 }; // Default fallback
  }
}
