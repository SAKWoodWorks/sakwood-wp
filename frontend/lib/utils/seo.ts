/**
 * SEO Utility Functions
 * Helpers for generating SEO-friendly metadata
 */

/**
 * Strip HTML tags from text
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ') // Replace &nbsp; with space
    .replace(/&amp;/g, '&') // Replace &amp; with &
    .replace(/&lt;/g, '<') // Replace &lt; with <
    .replace(/&gt;/g, '>') // Replace &gt; with >
    .replace(/&quot;/g, '"') // Replace &quot; with "
    .replace(/&#39;/g, "'") // Replace &#39; with '
    .trim();
}

/**
 * Generate meta description with Thai optimization
 * - Strips HTML tags
 * - Removes spaces for Thai text (better indexing)
 * - Truncates to optimal length (150-160 characters)
 */
export function generateMetaDescription(
  content: string,
  lang: 'th' | 'en' = 'th',
  maxLength: number = 160
): string {
  // Strip HTML
  let text = stripHtml(content);

  // Thai-specific optimization: remove spaces for better indexing
  if (lang === 'th') {
    text = text.replace(/\s+/g, '');
  } else {
    // For English, normalize whitespace
    text = text.replace(/\s+/g, ' ');
  }

  // Truncate to max length
  if (text.length > maxLength) {
    text = text.substring(0, maxLength - 3).trim() + '...';
  }

  return text;
}

/**
 * Generate product meta description
 */
export function generateProductMetaDescription(
  product: {
    name: string;
    description?: string;
    category?: string;
    price?: string;
  },
  lang: 'th' | 'en' = 'th'
): string {
  const parts: string[] = [];

  // Product name
  parts.push(product.name);

  // Category
  if (product.category) {
    parts.push(lang === 'th' ? `จำหน่าย${product.category}` : `Quality ${product.category}`);
  }

  // Price
  if (product.price) {
    parts.push(lang === 'th' ? `ราคา ${product.price}` : `Price: ${product.price}`);
  }

  // Description snippet
  if (product.description) {
    const snippet = generateMetaDescription(product.description, lang, 100);
    parts.push(snippet);
  }

  // Call to action
  if (lang === 'th') {
    parts.push('สั่งซื้อออนไลน์ จัดส่งทั่วประเทศไทย บริการดีเมื่อรับสินค้า');
  } else {
    parts.push('Order online. Nationwide delivery in Thailand. Quality service guaranteed.');
  }

  return generateMetaDescription(parts.join(' '), lang);
}

/**
 * Generate blog post meta description
 */
export function generateBlogMetaDescription(
  post: {
    title: string;
    excerpt?: string;
    content?: string;
  },
  lang: 'th' | 'en' = 'th'
): string {
  const content = post.excerpt || post.content || '';
  return generateMetaDescription(content, lang);
}

/**
 * Generate structured data URL
 */
export function generateUrl(
  path: string,
  lang: 'th' | 'en' = 'th'
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';
  return `${siteUrl}/${lang}${path.startsWith('/') ? path : `/${path}`}`;
}

/**
 * Generate canonical URL
 */
export function generateCanonicalUrl(
  path: string,
  lang: 'th' | 'en' = 'th'
): string {
  return generateUrl(path, lang);
}

/**
 * Generate OG image URL
 */
export function generateOgImageUrl(
  imagePath?: string
): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';
  if (imagePath) {
    return imagePath.startsWith('http') ? imagePath : `${siteUrl}${imagePath}`;
  }
  return `${siteUrl}/og-image.jpg`;
}

/**
 * Truncate text for title tags (optimal: 50-60 characters)
 */
export function truncateTitle(title: string, maxLength: number = 60): string {
  if (title.length <= maxLength) {
    return title;
  }
  return title.substring(0, maxLength - 3).trim() + '...';
}
