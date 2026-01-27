export interface ProductImage {
  sourceUrl: string;
  altText?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  count?: number;
  description?: string;
}

export interface ProductCategoriesResponse {
  productCategories: {
    nodes: ProductCategory[];
  };
}

export interface SimpleProduct {
  price: string;
  regularPrice?: string;
}

export type PriceType = 'piece' | 'meter' | 'sqm' | 'cubic_foot' | 'cubic_meter' | 'board_foot';

export interface Product {
  id: string;
  databaseId: number;
  name: string;
  slug: string;
  sku?: string;
  language?: string;
  image?: ProductImage;
  galleryImages?: {
    nodes: ProductImage[];
  };
  price?: string;
  regularPrice?: string;
  priceTypes?: PriceType[];  // Array of enabled price types for this product
  prices?: Record<PriceType, string>;  // Map of price type to amount
  description?: string;
  thickness?: string; // Thickness in cm
  width?: string; // Width in cm
  length?: string; // Length in meters
  volume?: number; // Calculated volume in cubic meters
  surfaceArea?: string | number; // Surface area in square meters
  categories?: ProductCategory[];
}

export interface ProductsResponse {
  products: {
    nodes: Product[];
  };
}

export interface ProductResponse {
  product: Product | null;
}
