/**
 * PDF Font utilities for multi-language support
 */

// Base64 encoded Sarabun font for Thai language support
// This is a minimal font subset for Thai characters
const SARABUN_FONT_BASE64 = ""; // To be populated with actual font data

export async function loadThaiFont(): Promise<string | null> {
  // For now, return null to use default font
  // Thai text may not display perfectly but PDF will generate
  console.warn('⚠️ Using default PDF font - Thai text may have display issues');
  return null;
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
  // Always use helvetica for now
  return 'helvetica';
}
