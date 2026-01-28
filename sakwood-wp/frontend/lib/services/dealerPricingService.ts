/**
 * Dealer Pricing Service
 * Handles dealer pricing calculations
 */

import { DealerTier, DealerInfo } from './dealerService';

export interface DealerPricing {
  retailPrice: number;
  wholesalePrice: number;
  dealerPrice: number;
  discount: number;
  savings: number;
  tier: DealerTier;
  meetsMinOrder: boolean;
  minOrderAmount: number;
  minOrderQuantity: number;
}

export interface Product {
  id?: number;
  price?: string;
  regular_price?: string;
}

/**
 * Calculate dealer pricing for a product
 */
export function getDealerPricing(
  product: Product,
  dealerInfo: DealerInfo,
  cartTotal: number,
  cartQuantity: number
): DealerPricing {
  const retailPrice = parseFloat(product?.price?.replace(/[^0-9.]/g, '') || '0');
  const wholesalePrice = retailPrice * 0.85; // 15% off standard wholesale

  const tierDiscounts: { [key in DealerTier]: number } = {
    silver: 0.8, // 20% off
    gold: 0.75, // 25% off
    platinum: 0.7, // 30% off
  };

  const discount = tierDiscounts[dealerInfo.tierName] || 0.85;
  const dealerPrice = retailPrice * discount;

  const meetsMinOrder =
    cartTotal >= dealerInfo.minOrderAmount &&
    cartQuantity >= dealerInfo.minOrderQuantity;

  return {
    retailPrice,
    wholesalePrice,
    dealerPrice,
    discount: (1 - discount) * 100,
    savings: retailPrice - dealerPrice,
    tier: dealerInfo.tierName,
    meetsMinOrder,
    minOrderAmount: dealerInfo.minOrderAmount,
    minOrderQuantity: dealerInfo.minOrderQuantity,
  };
}

/**
 * Get dealer pricing for multiple products
 */
export function getBulkDealerPricing(
  products: Product[],
  dealerInfo: DealerInfo,
  cartTotal: number,
  cartQuantity: number
): DealerPricing[] {
  return products.map((product) => getDealerPricing(product, dealerInfo, cartTotal, cartQuantity));
}

/**
 * Calculate if cart meets minimum order requirements
 */
export function meetsMinimumOrderRequirements(
  cartTotal: number,
  cartQuantity: number,
  dealerInfo: DealerInfo
): boolean {
  return (
    cartTotal >= dealerInfo.minOrderAmount &&
    cartQuantity >= dealerInfo.minOrderQuantity
  );
}

/**
 * Get amount needed to reach minimum order
 */
export function getAmountNeededForMinimumOrder(
  cartTotal: number,
  dealerInfo: DealerInfo
): number {
  const needed = dealerInfo.minOrderAmount - cartTotal;
  return needed > 0 ? needed : 0;
}

/**
 * Get quantity needed to reach minimum order
 */
export function getQuantityNeededForMinimumOrder(
  cartQuantity: number,
  dealerInfo: DealerInfo
): number {
  const needed = dealerInfo.minOrderQuantity - cartQuantity;
  return needed > 0 ? needed : 0;
}

/**
 * Format price with currency symbol
 */
export function formatDealerPrice(price: number, locale = 'th-TH'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
}

/**
 * Calculate total savings with dealer pricing
 */
export function calculateDealerSavings(
  products: Product[],
  dealerInfo: DealerInfo
): number {
  let totalSavings = 0;

  const tierDiscounts: { [key in DealerTier]: number } = {
    silver: 0.8,
    gold: 0.75,
    platinum: 0.7,
  };

  const discount = tierDiscounts[dealerInfo.tierName] || 0.85;

  products.forEach((product) => {
    const retailPrice = parseFloat(product?.price?.replace(/[^0-9.]/g, '') || '0');
    const dealerPrice = retailPrice * discount;
    totalSavings += retailPrice - dealerPrice;
  });

  return totalSavings;
}

/**
 * Get dealer tier display name
 */
export function getTierDisplayName(tier: DealerTier): string {
  const names: { [key in DealerTier]: string } = {
    silver: 'Silver',
    gold: 'Gold',
    platinum: 'Platinum',
  };

  return names[tier] || tier;
}

/**
 * Get tier color for UI display
 */
export function getTierColor(tier: DealerTier): string {
  const colors: { [key in DealerTier]: string } = {
    silver: '#C0C0C0',
    gold: '#FFD700',
    platinum: '#E5E4E2',
  };

  return colors[tier] || '#000000';
}

/**
 * Calculate credit limit based on tier
 */
export function calculateCreditLimit(
  baseWholesaleCredit: number,
  dealerInfo: DealerInfo
): number {
  const multipliers: { [key in DealerTier]: number } = {
    silver: 1.5,
    gold: 2.0,
    platinum: 3.0,
  };

  const multiplier = multipliers[dealerInfo.tierName] || 1.0;
  return baseWholesaleCredit * multiplier;
}

/**
 * Check if dealer can purchase on credit
 */
export function canPurchaseOnCredit(
  currentCreditUsed: number,
  baseWholesaleCredit: number,
  dealerInfo: DealerInfo
): boolean {
  const creditLimit = calculateCreditLimit(baseWholesaleCredit, dealerInfo);
  return currentCreditUsed < creditLimit;
}

/**
 * Get available credit amount
 */
export function getAvailableCredit(
  currentCreditUsed: number,
  baseWholesaleCredit: number,
  dealerInfo: DealerInfo
): number {
  const creditLimit = calculateCreditLimit(baseWholesaleCredit, dealerInfo);
  return Math.max(0, creditLimit - currentCreditUsed);
}
