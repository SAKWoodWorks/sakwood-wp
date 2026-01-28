interface OrganizationStructuredDataProps {
  siteUrl?: string;
}

export function OrganizationStructuredData({ siteUrl = 'https://sakwood.com' }: OrganizationStructuredDataProps) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sakwood",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "description": "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber. Quality wood products for construction, wholesale, and industrial use with same-day delivery in Bangkok.",
    "foundingDate": "2020",
    "founder": {
      "@type": "Person",
      "name": "Sakwood Team"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TH",
      "addressLocality": "Bangkok",
      "addressRegion": "Bangkok",
      "streetAddress": "Bangkok, Thailand"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-2-123-4567",
      "contactType": "customer service",
      "availableLanguage": ["Thai", "English"]
    },
    "sameAs": [
      // Add social media URLs when available
      // "https://facebook.com/sakwood",
      // "https://instagram.com/sakwood",
      // "https://linkedin.com/company/sakwood"
    ],
    "areaServed": {
      "@type": "Country",
      "name": "Thailand"
    },
    "knowsAbout": [
      "Structural Pine",
      "Marine Plywood",
      "Engineering Timber",
      "Construction Wood",
      "Wholesale Plywood",
      "Industrial Timber",
      "Wood Products",
      "Plywood Sheets",
      "Timber Supplies",
      "Building Materials",
      "Wood Flooring",
      "Decorative Plywood",
      "Furniture Grade Plywood",
      "Structural Lumber"
    ],
    "award": [
      // Add awards when available
      // {
      //   "@type": "Award",
      //   "name": "Best Wood Supplier 2023",
      //   "awarder": {
      //     "@type": "Organization",
      //     "name": "Thai Construction Industry Association"
      //   }
      // }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sakwood",
    "url": siteUrl,
    "description": "Premium wood products supplier in Thailand",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${siteUrl}/search?q={search_term_string}`
      },
      "query-input": {
        "@type": "PropertyValueSpecification",
        "valueRequired": true,
        "valueName": "search_term_string"
      }
    }
  };

  return (
    <>
      {/* NOTE: JSON.stringify is safe for structured data - it properly escapes content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
