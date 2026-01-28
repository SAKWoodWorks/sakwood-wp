interface ProductStructuredDataProps {
  product: any;
  lang: string;
  siteUrl?: string;
}

export function ProductStructuredData({ product, lang, siteUrl = 'https://sakwood.com' }: ProductStructuredDataProps) {
  if (!product) return null;

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Quality ${product.name} from Sakwood`,
    "image": product.image?.sourceUrl || `${siteUrl}/og-image.jpg`,
    "url": `${siteUrl}/${lang}/products/${product.slug}`,
    "sku": product.databaseId?.toString() || product.id,
    "offers": {
      "@type": "Offer",
      "availability": "https://schema.org/InStock",
      "priceCurrency": "THB",
      "url": `${siteUrl}/${lang}/products/${product.slug}`,
      "seller": {
        "@type": "Organization",
        "name": "Sakwood",
        "url": siteUrl
      }
    },
    "additionalProperty": [
      {
        "@type": "PropertyValue",
        "name": "Category",
        "value": "Wood Products"
      },
      {
        "@type": "PropertyValue",
        "name": "Material",
        "value": "Pine Wood"
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": `${siteUrl}/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": `${siteUrl}/${lang}/shop`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.name,
        "item": `${siteUrl}/${lang}/products/${product.slug}`
      }
    ]
  };

  return (
    <>
      {/* NOTE: JSON.stringify is safe for structured data - it properly escapes content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
    </>
  );
}
