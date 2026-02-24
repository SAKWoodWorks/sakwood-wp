/**
 * PDF Font utilities for multi-language support
 *
 * For Thai language, we dynamically load the font from a reliable CDN.
 * This avoids embedding large base64 strings in the code.
 */

const FONT_CACHE = new Map<string, string>();

/**
 * Load Thai font for jsPDF from our API route
 * Returns base64 encoded font data
 */
export async function loadThaiFont(): Promise<string> {
  // Check cache first
  if (FONT_CACHE.has('Sarabun')) {
    return FONT_CACHE.get('Sarabun')!;
  }

  try {
    // Use our API route which proxies the font from CDN (bypasses CORS)
    const response = await fetch('/api/font/thai');

    if (!response.ok) {
      throw new Error(`Failed to fetch font: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.fontData) {
      throw new Error('No font data received');
    }

    // Cache the result
    FONT_CACHE.set('Sarabun', data.fontData);

    return data.fontData;
  } catch (error) {
    console.error('Failed to load Thai font:', error);
    throw error;
  }
}

/**
 * Check if language requires custom font
 */
export function needsCustomFont(lang: string): boolean {
  return lang === 'th' || lang === 'th-TH';
}

/**
 * Get font name for jsPDF based on language
 */
export function getFontName(lang: string): string {
  return needsCustomFont(lang) ? 'Sarabun' : 'helvetica';
}
