import { FAQ } from '@/lib/types';

interface FAQPageStructuredDataProps {
  faqs: FAQ[];
}

/**
 * FAQPage Schema Component
 * Generates FAQPage structured data for Google rich snippets
 * @see https://schema.org/FAQPage
 */
export function FAQPageStructuredData({ faqs }: FAQPageStructuredDataProps) {
  const faqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": stripHtml(faq.answer)
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPageSchema) }}
    />
  );
}

/**
 * Strip HTML tags from text for schema compliance
 * Schema.org requires plain text in Answer.text field
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
