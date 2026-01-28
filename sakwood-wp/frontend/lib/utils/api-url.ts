/**
 * Helper to construct URLs for fetch requests in Next.js App Router
 * Handles both server-side and client-side contexts correctly
 */

export function getApiUrl(path: string): string {
  // Remove leading slash if present
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  // Client-side: use relative URL
  if (typeof window !== 'undefined') {
    return cleanPath;
  }

  // Server-side: construct absolute URL
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';

  // Try to get host from environment variables
  let host = 'localhost:3000';

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    try {
      host = new URL(process.env.NEXT_PUBLIC_SITE_URL).host;
    } catch {
      // If parsing fails, use default
    }
  } else if (process.env.VERCEL_URL) {
    host = process.env.VERCEL_URL;
  }

  return `${protocol}://${host}${cleanPath}`;
}
