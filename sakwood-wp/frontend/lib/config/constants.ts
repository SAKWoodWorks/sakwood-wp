export const API_CONFIG = {
  // Server-side uses WORDPRESS_GRAPHQL_URL (internal Docker network)
  // Client-side falls back to NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL (browser access)
  endpoint: process.env.WORDPRESS_GRAPHQL_URL || process.env.NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL || 'http://localhost:8006/graphql',
  cache: 'no-store' as RequestCache,
};

export const APP_CONFIG = {
  name: process.env.NEXT_PUBLIC_APP_NAME || 'SAK WoodWorks',
  description: process.env.NEXT_PUBLIC_APP_DESCRIPTION || 'Premium Construction Materials',
  phone: process.env.NEXT_PUBLIC_APP_PHONE || '+66 2 123 4567',
  productsPerPage: 6,
  blogPerPage: 10,
};
