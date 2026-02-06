import type { PriceType, Product } from '@/lib/types';
import { Locale } from '@/i18n-config';

interface DictionaryPriceTable {
  price_table?: {
    [key: string]: string;
  };
}

export const PRICE_TYPE_LABELS: Record<Locale, Record<PriceType, string>> = {
  th: {
    piece: 'บาท/ชิ้น',
    meter: 'บาท/เมตร',
    sqm: 'บาท/ตร.ม.',
    cubic_foot: 'บาท/ค.คิวบิกฟุต',
    cubic_meter: 'บาท/ค.คิวบิกเมตร',
    board_foot: 'บาท/บอร์ดฟุต',
  },
  en: {
    piece: 'THB/piece',
    meter: 'THB/meter',
    sqm: 'THB/m²',
    cubic_foot: 'THB/cu.ft',
    cubic_meter: 'THB/cu.m',
    board_foot: 'THB/bd.ft',
  },
};

/**
 * Get localized label for a price type
 */
export function getPriceLabel(
  priceType: PriceType,
  locale: Locale,
  dictionary?: DictionaryPriceTable
): string {
  return dictionary?.price_table?.[`price_per_${priceType}`]
    || PRICE_TYPE_LABELS[locale][priceType];
}

/**
 * Format price with currency symbol
 */
export function formatPrice(
  amount: string | undefined,
  priceType: PriceType,
  locale: Locale
): string {
  if (!amount) return locale === 'th' ? 'ติดต่อ' : 'Contact';

  // Remove existing currency symbol if present
  const cleanAmount = amount.replace(/[฿THB\s]/g, '');
  const currency = locale === 'th' ? ' บาท' : ' THB';
  const label = getPriceLabel(priceType, locale);

  return `${cleanAmount}${currency}/${label.split('/')[1]}`;
}

/**
 * Get display price (defaults to piece)
 */
export function getDisplayPrice(product: Product, locale: Locale): string {
  const price = product.prices?.piece || product.price;
  return price
    ? `${price}${locale === 'th' ? ' บาท' : ' THB'}`
    : (locale === 'th' ? 'ติดต่อ' : 'Contact');
}

/**
 * Get all available prices for a product
 */
export function getAllPrices(product: Product): Array<{type: PriceType, amount: string}> {
  return (product.priceTypes || ['piece']).map(type => ({
    type,
    amount: product.prices?.[type] || '',
  }));
}

/**
 * Get price for a specific type
 */
export function getPriceByType(product: Product, priceType: PriceType): string | undefined {
  return product.prices?.[priceType];
}
