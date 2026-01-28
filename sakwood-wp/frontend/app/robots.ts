import type { MetadataRoute } from 'next';

/**
 * Generate robots.txt dynamically
 * Blocks API routes, admin, checkout, and account pages from indexing
 */
export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/admin/',
          '/checkout/',
          '/account/',
          '/th/api/',
          '/th/admin/',
          '/th/checkout/',
          '/th/account/',
          '/en/api/',
          '/en/admin/',
          '/en/checkout/',
          '/en/account/',
          '/_next/',
          '/static/',
        ],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
