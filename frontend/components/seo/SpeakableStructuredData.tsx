interface SpeakableStructuredDataProps {
  /**
   * CSS selectors for speakable sections
   * Example: ['.article-content', '.intro-section']
   */
  cssSelectors?: string[];

  /**
   * XPath expressions for speakable sections
   * Example: ['//h1', '//div[@class="content"]/p[1]']
   */
  xpaths?: string[];
}

/**
 * Speakable Schema Component
 * Generates Speakable structured data for voice search optimization
 * Indicates which parts of a page are best suited for text-to-speech playback
 * @see https://schema.org/SpeakableSpecification
 */
export function SpeakableStructuredData({
  cssSelectors = ['.article-content', '.kb-content', '.prose'],
  xpaths
}: SpeakableStructuredDataProps) {
  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "Article", // or WebPage
    "speakable": {
      "@type": "SpeakableSpecification",
      ...(cssSelectors.length > 0 && {
        "cssSelector": cssSelectors
      }),
      ...(xpaths && xpaths.length > 0 && {
        "xpath": xpaths
      })
    }
  };

  // Remove undefined values
  const cleanSchema = removeUndefined(speakableSchema);

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(cleanSchema) }}
    />
  );
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

/**
 * Default export for convenience
 */
export default SpeakableStructuredData;
