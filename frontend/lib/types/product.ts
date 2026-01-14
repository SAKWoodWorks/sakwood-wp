export interface ProductImage {
  sourceUrl: string;
  altText?: string;
}

export interface SimpleProduct {
  price: string;
  regularPrice?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  image?: ProductImage;
  galleryImages?: {
    nodes: ProductImage[];
  };
  price?: string;
  regularPrice?: string;
  description?: string;
  length?: number; // Length in meters
  width?: number; // Width in meters
  thickness?: number; // Thickness in meters
  volume?: number; // Volume in cubic meters
}

export interface ProductsResponse {
  products: {
    nodes: Product[];
  };
}

export interface ProductResponse {
  product: Product | null;
}
