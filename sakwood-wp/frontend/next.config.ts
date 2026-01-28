/**
 * ============================================================================
 * NEXT.JI CONFIGURATION - MOBILE IMAGE FIX
 * ============================================================================
 *
 * PROBLEM THIS SOLVES:
 * - WordPress serves images from http://localhost:8006/wp-content/uploads/...
 * - Mobile devices on the same network can't access "localhost" of your computer
 * - This causes all product images to be broken on mobile phones/tablets
 *
 * SOLUTION:
 * - Use Next.js rewrite rules to proxy image requests
 * - Browser requests: /wp-content/uploads/image.jpg
 * - Next.js server forwards to: http://localhost:8006/wp-content/uploads/image.jpg
 * - The Next.js server CAN reach WordPress, even if mobile devices can't
 *
 * HOW IT WORKS:
 * 1. Browser (mobile) → Request: /wp-content/uploads/image.jpg
 * 2. Next.js → Rewrite to: http://localhost:8006/wp-content/uploads/image.jpg
 * 3. Next.js → Fetch from WordPress and return to browser
 *
 * REWRITE RULES:
 * - /:lang(en|th)/wp-content/:path* - Handles locale-prefixed URLs (/en/wp-content/...)
 * - /wp-content/:path* - Handles root URLs (/wp-content/...)
 *
 * CHANGES MADE (2025-01-28):
 * - Added rewrite rules for WordPress uploads
 * - Disabled Next.js image optimization (unoptimized: true)
 *   - Optimization was causing errors with proxied images
 *   - Images now load directly from WordPress through Next.js proxy
 *
 * NOTE: You must restart the dev server after changing this file!
 * ============================================================================
 */

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Image optimization settings
  images: {
    unoptimized: true, // Disable Next.js Image optimization for WordPress uploads
    // Reason: Optimization was causing errors with proxied images
    // Result: Images load faster and work on all devices

    // Allowed image sources for remote patterns
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com', // For placeholder images
      },
      {
        protocol: 'https',
        hostname: 'sak_wp', // Docker WordPress container (internal)
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8006', // WordPress development server
      },
    ],
  },

  // Rewrite WordPress uploads to proxy through Next.js
  // This fixes mobile image loading issues where localhost:8006 is not accessible
  async rewrites() {
    const wordpressUrl = process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL?.replace('/graphql', '') || 'http://localhost:8006';

    return [
      // Handle locale-prefixed paths: /en/wp-content/... or /th/wp-content/...
      {
        source: '/:lang(en|th)/wp-content/:path*',
        destination: `${wordpressUrl}/wp-content/:path*`,
      },
      // Handle root paths: /wp-content/...
      {
        source: '/wp-content/:path*',
        destination: `${wordpressUrl}/wp-content/:path*`,
      },
    ];
  },
};

export default nextConfig;
