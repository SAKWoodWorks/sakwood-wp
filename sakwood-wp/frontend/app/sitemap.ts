import { MetadataRoute } from 'next';
import { getProducts } from '@/lib/services/productService';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';
const languages = ['th', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = ['', '/shop', '/about', '/contact', '/blog'];

  // Build sitemap entries
  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Add static pages for all languages
  staticPages.forEach((page) => {
    languages.forEach((lang) => {
      sitemapEntries.push({
        url: `${siteUrl}/${lang}${page}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: page === '' ? 1 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            languages.map((l) => [l, `${siteUrl}/${l}${page}`])
          ),
        },
      });
    });
  });

  // Add product pages
  try {
    const products = await getProducts();

    products.forEach((product) => {
      languages.forEach((lang) => {
        sitemapEntries.push({
          url: `${siteUrl}/${lang}/products/${product.slug}`,
          lastModified: new Date(),
          changeFrequency: 'daily',
          priority: 0.7,
          alternates: {
            languages: Object.fromEntries(
              languages.map((l) => [l, `${siteUrl}/${l}/products/${product.slug}`])
            ),
          },
        });
      });
    });
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  return sitemapEntries;
}
