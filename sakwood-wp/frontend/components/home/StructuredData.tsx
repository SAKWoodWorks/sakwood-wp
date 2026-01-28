export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sakwood",
    "url": "https://sakwood.com",
    "description": "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber. Quality wood products for construction, wholesale, and industrial use.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sakwood.com/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Sakwood",
      "logo": {
        "@type": "ImageObject",
        "url": "https://sakwood.com/logo.png"
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+66-2-XXX-XXXX",
        "contactType": "customer service",
        "areaServed": "TH",
        "availableLanguage": "English, Thai"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "TH",
        "addressRegion": "Bangkok"
      }
    }
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sakwood",
    "url": "https://sakwood.com",
    "logo": "https://sakwood.com/logo.png",
    "description": "Thailand's trusted supplier of structural pine, marine plywood, and engineering timber.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "TH",
      "addressRegion": "Bangkok"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+66-2-XXX-XXXX",
      "contactType": "customer service",
      "areaServed": "TH"
    },
    "sameAs": [
      "https://www.facebook.com/sakwood",
      "https://www.instagram.com/sakwood",
      "https://www.linkedin.com/company/sakwood"
    ]
  };

  const productData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Sakwood Premium Wood Products",
    "description": "Featured wood products including structural pine, marine plywood, and engineering timber",
    "itemListElement": [
      {
        "@type": "Product",
        "position": 1,
        "name": "Structural Pine",
        "description": "High-strength timber perfectly suited for structural framing, roofing, and formwork. ISO certified durability.",
        "category": "Construction Wood",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "THB",
          "url": "https://sakwood.com/shop"
        }
      },
      {
        "@type": "Product",
        "position": 2,
        "name": "Marine Plywood",
        "description": "Premium marine plywood for boat building and outdoor applications. Water-resistant and durable.",
        "category": "Plywood",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "THB",
          "url": "https://sakwood.com/shop"
        }
      },
      {
        "@type": "Product",
        "position": 3,
        "name": "Commercial Plywood",
        "description": "Direct factory supply of Commercial plywood for contractors and dealers. High quality at competitive prices.",
        "category": "Plywood",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "THB",
          "url": "https://sakwood.com/shop"
        }
      },
      {
        "@type": "Product",
        "position": 4,
        "name": "Engineering Timber",
        "description": "Engineered wood products for specialized construction applications. Custom sizing available.",
        "category": "Engineering Timber",
        "offers": {
          "@type": "Offer",
          "availability": "https://schema.org/InStock",
          "priceCurrency": "THB",
          "url": "https://sakwood.com/shop"
        }
      }
    ]
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sakwood.com"
      }
    ]
  };

  return (
    <>
      {/* NOTE: JSON.stringify is safe for structured data - it properly escapes content */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
    </>
  );
}
