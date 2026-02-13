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

  // Server-side: use absolute URL with correct protocol
  // Production Docker environment: use http:// for internal Docker network
  // Development: use http://localhost:8006
  const isProduction = process.env.NODE_ENV === 'production';
  const protocol = isProduction ? 'http' : 'http';

  // Determine host based on environment
  let host: string;
  if (isProduction) {
    // Production: Use internal Docker hostname for WordPress services
    // Skip API routes (they proxy to WordPress)
    if (path.startsWith('/api/')) {
      // API routes already handle proxying, just need base URL
      host = 'localhost:8006';
    } else {
      // Direct WordPress services (slider settings, etc.)
      host = 'sak_wp:80';
    }
  } else if (process.env.NEXT_PUBLIC_SITE_URL) {
    host = new URL(process.env.NEXT_PUBLIC_SITE_URL).host;
  } else if (process.env.VERCEL_URL) {
    host = process.env.VERCEL_URL;
  } else {
    // Development: Use localhost
    host = 'localhost:8006';
  }

  return `${protocol}://${host}${cleanPath}`;
}
