/**
 * PDF Font utilities for multi-language support
 * Loads Thai fonts for jsPDF
 */

export async function loadThaiFont() {
  try {
    // Load Sarabun font from Google Fonts
    const fontUrl = 'https://fonts.gstatic.com/s/sarabun/v13/DtVjJx26TKEr37c9YHZJmnw.woff2';

    const response = await fetch(fontUrl);
    if (!response.ok) {
      throw new Error('Failed to load Thai font');
    }

    const arrayBuffer = await response.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Convert base64 for jsPDF
    const binaryString = uint8Array.reduce((data, byte) => data + String.fromCharCode(byte), '');
    const base64 = btoa(binaryString);

    return base64;
  } catch (error) {
    console.error('Error loading Thai font:', error);
    return null;
  }
}

/**
 * Check if language requires custom font
 */
export function needsCustomFont(lang: string): boolean {
  return lang === 'th' || lang === 'th-TH';
}
