const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

export interface Product {
  id: number;
  name: string;
  name_th?: string;
  name_en?: string;
  slug: string;
  sku?: string;
  price: string;
  regularPrice?: string;
  priceTypes: string[];
  description: string;
  shortDescription: string;
  images: string[];
  category: {
    id: number;
    name: string;
    slug: string;
  };
  stockStatus: string;
  thickness?: string;
  width?: string;
  length?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  description: string;
}

export interface DealerLocation {
  id: number;
  name: string;
  type: string;
  province: string;
  address: string;
  phone: string;
}

/**
 * Fetch products from WordPress REST API
 */
export async function getProducts(language: 'en' | 'th' = 'th'): Promise<Product[]> {
  try {
    const baseUrl = WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
    const url = `${baseUrl}/products?language=${language}&per_page=100`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.status}`);
    }

    const data = await response.json();
    // WordPress API returns array directly, not wrapped in {products: [...]}
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

/**
 * Fetch categories from WordPress REST API
 */
export async function getCategories(language: 'en' | 'th' = 'th'): Promise<ProductCategory[]> {
  try {
    const baseUrl = WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
    const url = `${baseUrl}/categories?language=${language}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status}`);
    }

    const data = await response.json();
    return data || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}

/**
 * Fetch dealer locations from WordPress REST API
 */
export async function getDealerLocations(): Promise<DealerLocation[]> {
  try {
    const baseUrl = WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
    const url = `${baseUrl}/public-locations`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch dealer locations: ${response.status}`);
    }

    const data = await response.json();
    // WordPress API returns array directly, not wrapped in {locations: [...]}
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error('Error fetching dealer locations:', error);
    return [];
  }
}

/**
 * Format product data for AI prompt
 */
export function formatProductsForAI(products: Product[], language: 'en' | 'th' = 'th'): string {
  if (!products || products.length === 0) {
    return 'No products available.';
  }

  let formatted = `📦 AVAILABLE PRODUCTS (${products.length} items):\n\n`;

  // Group by category
  const byCategory: Record<string, Product[]> = {};
  products.forEach(product => {
    const catName = product.category?.name || 'Uncategorized';
    if (!byCategory[catName]) {
      byCategory[catName] = [];
    }
    byCategory[catName].push(product);
  });

  // Format each category with ALL products
  Object.entries(byCategory).forEach(([category, categoryProducts]) => {
    formatted += `【${category}】(${categoryProducts.length} items)\n`;

    // Sort by price (lowest first) for better recommendations
    const sortedProducts = categoryProducts.sort((a, b) =>
      parseFloat(a.price || '0') - parseFloat(b.price || '0')
    );

    sortedProducts.forEach((product, index) => {
      // Show both Thai and English names if available
      const displayName = product.name;
      const altName = language === 'th' ? product.name_en : product.name_th;
      const nameLine = altName ? `${displayName} / ${altName}` : displayName;

      formatted += `  ${index + 1}. ${nameLine}\n`;

      // Add SKU for identification
      if (product.sku) {
        formatted += `     SKU: ${product.sku}\n`;
      }

      // Add price
      if (product.price) {
        formatted += `     ราคา: ฿${product.price}`;
        if (product.regularPrice && product.regularPrice !== product.price) {
          formatted += ` (ปกติ: ฿${product.regularPrice})`;
        }
        formatted += '\n';
      }

      // Add pricing types
      if (product.priceTypes?.length) {
        formatted += `     หน่วย: ${product.priceTypes.join(', ')}\n`;
      }

      // Add dimensions if available
      if (product.thickness || product.width || product.length) {
        const size = [product.thickness, product.width, product.length]
          .filter(Boolean)
          .join(' × ');
        if (size) formatted += `     ขนาด: ${size} ซม.\n`;
      }

      // Add stock status
      if (product.stockStatus) {
        const stockText = product.stockStatus === 'instock' ? '✅ มีสินค้า' : '❌ หมด';
        formatted += `     สถานะ: ${stockText}\n`;
      }

      // Add URL
      if (product.slug) {
        formatted += `     🔗 /${language}/product/${product.slug}\n`;
      }
    });

    formatted += '\n';
  });

  return formatted;
}

/**
 * Format categories for AI prompt
 */
export function formatCategoriesForAI(categories: ProductCategory[]): string {
  if (!categories || categories.length === 0) {
    return 'No categories available.';
  }

  return `Product Categories:\n${categories.map(cat => `- ${cat.name} (${cat.slug})`).join('\n')}\n`;
}

/**
 * Format dealer locations for AI prompt
 */
export function formatLocationsForAI(locations: DealerLocation[]): string {
  if (!locations || locations.length === 0) {
    return 'No dealer locations available.';
  }

  // Group by province
  const byProvince: Record<string, DealerLocation[]> = {};
  locations.forEach(loc => {
    if (!byProvince[loc.province]) {
      byProvince[loc.province] = [];
    }
    byProvince[loc.province].push(loc);
  });

  let formatted = `Dealer Locations (${locations.length} locations):\n\n`;

  Object.entries(byProvince).forEach(([province, locs]) => {
    formatted += `**${province}** (${locs.length} locations):\n`;
    locs.slice(0, 5).forEach(loc => {
      formatted += `- ${loc.name} (${loc.type})`;
      if (loc.phone) formatted += ` - ${loc.phone}`;
      formatted += '\n';
    });
    formatted += '\n';
  });

  return formatted;
}
