/**
 * PDF Font utilities for multi-language support
 * Loads Thai fonts for jsPDF
 */

export async function loadThaiFont(): Promise<string | null> {
  try {
    // Use jsdelivr CDN which allows CORS
    const fontUrl = 'https://cdn.jsdelivr.net/npm/@canvas-fonts/sarabun@1.0.3/Sarabun-Regular.ttf';

    const response = await fetch(fontUrl);
    if (!response.ok) {
      console.warn('Font fetch failed, using default font');
      return null;
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
