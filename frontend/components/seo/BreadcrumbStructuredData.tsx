/**
 * Breadcrumb Schema Component
 * Generates BreadcrumbList structured data for Google rich snippets
 * Helps search engines understand site hierarchy and navigation
 *
 * @see https://schema.org/BreadcrumbList
 */

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbStructuredDataProps {
  items: BreadcrumbItem[];
}

/**
 * BreadcrumbStructuredData Component
 * Generates structured data for breadcrumb navigation
 *
 * @example
 * ```tsx
 * <BreadcrumbStructuredData
 *   items={[
 *     { name: 'Home', url: '/th' },
 *     { name: 'Products', url: '/th/products' },
 *     { name: 'Plywood', url: '/th/products/plywood' }
 *   ]}
 * />
 * ```
 */
export function BreadcrumbStructuredData({ items }: BreadcrumbStructuredDataProps) {
  if (!items || items.length === 0) {
    return null;
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
    />
  );
}

/**
 * Generate breadcrumb items from URL path
 * Useful for dynamic breadcrumb generation
 */
export function generateBreadcrumbsFromPath(
  pathname: string,
  lang: 'th' | 'en' = 'th',
  dictionary?: Record<string, string>
): BreadcrumbItem[] {
  const items: BreadcrumbItem[] = [
    { name: 'Home', url: `/${lang}` }
  ];

  // Split path and remove empty segments
  const segments = pathname.split('/').filter(Boolean);

  // Remove language prefix if present
  const startIndex = segments[0] === lang ? 1 : 0;

  // Build breadcrumb items
  let currentPath = `/${lang}`;
  for (let i = startIndex; i < segments.length; i++) {
    const segment = segments[i];
    currentPath += `/${segment}`;

    // Convert segment to readable name
    // You can customize this based on your routing structure
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    items.push({
      name,
      url: currentPath
    });
  }

  return items;
}

/**
 * Default export for convenience
 */
export default BreadcrumbStructuredData;
