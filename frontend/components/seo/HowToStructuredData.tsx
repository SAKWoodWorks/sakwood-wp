import { KBArticle } from '@/lib/types';

interface HowToStructuredDataProps {
  article: KBArticle;
  url: string;
}

interface HowToStep {
  '@type': string;
  position: number;
  name: string;
  text?: string;
  image?: string;
}

/**
 * HowTo Schema Component
 * Generates HowTo structured data for Google rich snippets
 * Extracts steps from knowledge base article content (H2/H3 headings)
 * @see https://schema.org/HowTo
 */
export function HowToStructuredData({ article, url }: HowToStructuredDataProps) {
  const steps = extractStepsFromContent(article.content);

  if (steps.length === 0) {
    // Don't render schema if no steps found
    return null;
  }

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": article.title,
    "description": stripHtml(article.excerpt).substring(0, 160),
    "image": article.featuredImage?.node?.sourceUrl || undefined,
    "totalTime": estimateTime(steps.length),
    "estimatedCost": {
      "@type": "MonetaryAmount",
      "currency": "THB",
      "value": "0"
    },
    "supply": [],
    "tool": [],
    "step": steps
  };

  // Remove undefined values
  const cleanSchema = removeUndefined(howToSchema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
}

/**
 * Extract steps from HTML content by parsing H2 and H3 headings
 */
function extractStepsFromContent(content: string): HowToStep[] {
  const steps: HowToStep[] = [];

  // Create a temporary DOM element to parse HTML
  if (typeof window === 'undefined') {
    // Server-side: Use regex to extract H2/H3 headings
    const headingRegex = /<h[23][^>]*>(.*?)<\/h[23]>/gi;
    const matches = [...content.matchAll(headingRegex)];

    matches.forEach((match, index) => {
      const headingText = stripHtml(match[1]);
      steps.push({
        '@type': 'HowToStep',
        position: index + 1,
        name: headingText
      });
    });
  } else {
    // Client-side: Use DOM parser
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, 'text/html');
    const headings = doc.querySelectorAll('h2, h3');

    headings.forEach((heading, index) => {
      steps.push({
        '@type': 'HowToStep',
        position: index + 1,
        name: heading.textContent || ''
      });
    });
  }

  return steps;
}

/**
 * Strip HTML tags from text
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
 * Estimate time based on number of steps (5 minutes per step)
 */
function estimateTime(stepCount: number): string {
  const minutes = stepCount * 5;
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  if (hours > 0) {
    return `PT${hours}H${remainingMinutes}M`;
  }
  return `PT${minutes}M`;
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
