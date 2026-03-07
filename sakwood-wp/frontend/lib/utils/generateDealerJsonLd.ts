import type { DealerLocation } from '@/lib/services/dealerLocationService';

/**
 * Generate JSON-LD structured data for dealer locations
 * Follows schema.org/LocalBusiness specification
 */
export function generateDealerJsonLd(dealers: DealerLocation[]): string {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': dealers.map((dealer) => ({
      '@type': 'LocalBusiness',
      '@id': `https://sakwood.com/dealer/${dealer.id}`,
      name: dealer.business_name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: dealer.address,
        addressLocality: dealer.district || '',
        addressRegion: dealer.province,
        postalCode: dealer.postal_code || '',
        addressCountry: 'TH',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: dealer.latitude,
        longitude: dealer.longitude,
      },
      telephone: dealer.phone || undefined,
      email: dealer.email || undefined,
      openingHoursSpecification: dealer.business_hours
        ? {
            '@type': 'OpeningHoursSpecification',
            name: dealer.business_hours,
          }
        : undefined,
      areaServed: dealer.territories?.map((territory) => ({
        '@type': 'City',
        name: territory,
      })),
    })),
  };

  // Remove undefined values
  const cleaned = JSON.parse(JSON.stringify(jsonLd, (_, value) => {
    if (value === undefined || value === null) return undefined;
    if (Array.isArray(value) && value.length === 0) return undefined;
    return value;
  }));

  return JSON.stringify(cleaned);
}
