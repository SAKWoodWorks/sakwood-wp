import { BlogPost } from '@/lib/types';

interface ArticleStructuredDataProps {
  article: BlogPost;
  url: string;
}

/**
 * Article Schema Component
 * Generates Article structured data for Google rich snippets
 * @see https://schema.org/Article
 */
export function ArticleStructuredData({ article, url }: ArticleStructuredDataProps) {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "description": article.excerpt || stripHtml(article.content || '').substring(0, 160),
    "image": article.featuredImage?.node?.sourceUrl || undefined,
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": article.author?.node?.name || 'Sakwood Team'
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sakwood",
      "logo": {
        "@type": "ImageObject",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com'}/logo.png`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };

  // Remove undefined values
  const cleanSchema = removeUndefined(articleSchema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}

/**
 * Strip HTML tags from text for schema compliance
 */
function stripHtml(html: string): string {
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
 * Remove undefined values from object
 */
function removeUndefined(obj: any): any {
  if (obj === null || obj === undefined) {
    return undefined;
  }

  if (Array.isArray(obj)) {
    return obj.map(removeUndefined).filter((val) => val !== undefined);
  }

  if (typeof obj === 'object') {
    const result: any = {};
    for (const key in obj) {
      const value = removeUndefined(obj[key]);
      if (value !== undefined) {
        result[key] = value;
      }
    }
    return result;
  }

  return obj;
}
