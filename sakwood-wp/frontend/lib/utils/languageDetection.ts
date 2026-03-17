/**
 * Language detection utilities
 */

/**
 * Detect if text is primarily in Thai language
 * Checks for Thai characters (U+0E00 to U+0E7F)
 */
export function detectThaiLanguage(text: string): boolean {
  // Remove whitespace and common punctuation
  const cleanText = text.replace(/\s+/g, '').replace(/[.,!?;:'"(){}[\]]/g, '');

  if (cleanText.length === 0) return false;

  // Count Thai characters
  const thaiChars = cleanText.match(/[\u0E00-\u0E7F]/g);
  const thaiCharCount = thaiChars ? thaiChars.length : 0;

  // If more than 30% of characters are Thai, consider it Thai text
  const thaiRatio = thaiCharCount / cleanText.length;
  return thaiRatio > 0.3;
}

/**
 * Detect the language of a message
 * @returns 'en' for English, 'th' for Thai
 */
export function detectMessageLanguage(message: string): 'en' | 'th' {
  return detectThaiLanguage(message) ? 'th' : 'en';
}

/**
 * Get the appropriate language for AI response
 * Uses detected message language, falls back to context language
 */
export function getResponseLanguage(
  message: string,
  contextLanguage: 'en' | 'th'
): 'en' | 'th' {
  return detectMessageLanguage(message);
}
