/**
 * Product Comparison Types
 */

import type { Locale } from '@/i18n-config';

/**
 * Minimal product data for comparison
 */
export interface CompareProduct {
  id: string;
  name: string;
  slug: string;
  price: string;
  regularPrice?: string;
  image?: string;
  gallery?: string[];
  dimensions?: {
    length?: number;
    width?: number;
    thickness?: number;
    surfaceArea?: number;
  };
  language: Locale;
}

/**
 * Comparison state stored in context
 */
export interface CompareState {
  productIds: string[];
  addProduct: (productId: string) => void;
  removeProduct: (productId: string) => void;
  clearProducts: () => void;
  hasProduct: (productId: string) => boolean;
  productCount: number;
}

/**
 * LocalStorage data structure
 */
interface CompareStorage {
  productIds: string[];
  timestamp: string;
}

/**
 * Maximum number of products allowed in comparison
 */
export const MAX_COMPARE_PRODUCTS = 4;

/**
 * LocalStorage key
 */
export const COMPARE_STORAGE_KEY = 'sakwood-compare';
