/**
 * HTML Sanitization Utility
 *
 * Provides XSS protection by sanitizing HTML content before rendering.
 * Uses DOMPurify to remove malicious scripts while preserving safe HTML.
 *
 * IMPORTANT: Always use this before dangerouslySetInnerHTML
 */

import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';

/**
 * Sanitization configuration options
 */
export interface SanitizeOptions {
  /** Allowed HTML tags (default: common safe tags) */
  ALLOWED_TAGS?: string[];
  /** Allowed HTML attributes (default: common safe attributes) */
  ALLOWED_ATTR?: string[];
  /** Whether to allow unknown protocols (default: false for security) */
  ALLOW_UNKNOWN_PROTOCOLS?: boolean;
  /** Whether to allow data URIs (default: false for security) */
  ALLOW_DATA_URI?: boolean;
}

/**
 * Default safe configuration for product descriptions and blog content
 */
const DEFAULT_CONFIG: SanitizeOptions = {
  ALLOWED_TAGS: [
    'p', 'br', 'strong', 'b', 'em', 'i', 'u', 'a',
    'ul', 'ol', 'li', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'code', 'pre', 'span', 'div',
    'table', 'thead', 'tbody', 'tr', 'th', 'td',
    'img', 'figure', 'figcaption',
  ],
  ALLOWED_ATTR: [
    'href', 'title', 'alt', 'src', 'class', 'id',
    'target', 'rel', 'width', 'height',
  ],
  ALLOW_UNKNOWN_PROTOCOLS: false,
  ALLOW_DATA_URI: false,
};

/**
 * Strict configuration for user-generated content
 */
export const STRICT_CONFIG: SanitizeOptions = {
  ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u'],
  ALLOWED_ATTR: ['class'],
  ALLOW_UNKNOWN_PROTOCOLS: false,
  ALLOW_DATA_URI: false,
};

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * @param html - The HTML string to sanitize
 * @param options - Optional sanitization configuration
 * @returns Sanitized HTML safe to render
 *
 * @example
 * ```tsx
 * <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(product.description) }} />
 * ```
 */
export function sanitizeHTML(html: string, options?: SanitizeOptions): string {
  if (!html || typeof html !== 'string') {
    return '';
  }

  const config = { ...DEFAULT_CONFIG, ...options };

  // Server-side: create DOMPurify instance with jsdom
  if (typeof window === 'undefined') {
    const jsdomWindow = new JSDOM('').window;
    const createDOMPurify = DOMPurify as unknown as (window: Window) => typeof DOMPurify;
    const serverPurify = createDOMPurify(jsdomWindow);

    return serverPurify.sanitize(html, config);
  }

  // Client-side: use browser DOMPurify
  return DOMPurify.sanitize(html, config);
}

/**
 * Sanitize HTML with strict configuration (for user content)
 *
 * @param html - The HTML string to sanitize
 * @returns Sanitized HTML with minimal tags allowed
 */
export function sanitizeStrict(html: string): string {
  return sanitizeHTML(html, STRICT_CONFIG);
}

/**
 * Sanitize URL to prevent javascript: and data: attacks
 *
 * @param url - The URL to sanitize
 * @returns Sanitized URL or empty string if unsafe
 *
 * @example
 * ```tsx
 * <a href={sanitizeURL(userInputUrl)}>Link</a>
 * ```
 */
export function sanitizeURL(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  // Remove whitespace
  const trimmed = url.trim();

  // Block dangerous protocols
  const dangerousProtocols = ['javascript:', 'data:', 'vbscript:', 'file:'];
  const lowerUrl = trimmed.toLowerCase();

  for (const protocol of dangerousProtocols) {
    if (lowerUrl.startsWith(protocol)) {
      return '';
    }
  }

  // Allow http, https, mailto, tel
  const allowedProtocols = ['http://', 'https://', 'mailto:', 'tel:'];
  const hasAllowedProtocol = allowedProtocols.some(p => lowerUrl.startsWith(p));

  if (hasAllowedProtocol) {
    return trimmed;
  }

  // If no protocol, treat as relative URL
  return trimmed;
}

/**
 * Type guard to check if content is safe HTML
 * (useful for TypeScript validation)
 */
export function isValidHTML(html: string): boolean {
  try {
    const sanitized = sanitizeHTML(html);
    return sanitized.length > 0;
  } catch {
    return false;
  }
}
