export interface ProductImage {
  sourceUrl: string;
  altText?: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface SimpleProduct {
  price: string;
  regularPrice?: string;
}

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
