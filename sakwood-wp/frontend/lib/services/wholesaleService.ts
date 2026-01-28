// Wholesale Service for Sakwood B2B Portal
import type { WholesaleApplication } from '@/lib/context/AuthContext';

export interface WholesalePricing {
  wholesalePrice: string;
  retailPrice: string;
  savingsPercentage: number;
  minimumOrderQuantity: number;
}

export interface WholesaleApplicationResponse {
  success: boolean;
  applicationId?: string;
  status?: 'pending' | 'approved' | 'rejected';
  message?: string;
  error?: string;
}

export interface WholesaleStatusResponse {
  status: 'pending' | 'approved' | 'rejected' | 'active';
  submittedDate?: string;
  reviewedDate?: string;
  notes?: string;
  businessName?: string;
  creditLimit?: number;
  remainingCredit?: number;
}

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Submit wholesale application
 */
export async function submitWholesaleApplication(
  data: WholesaleApplication,
  token?: string
): Promise<WholesaleApplicationResponse> {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    // Use WordPress API endpoint
    const response = await fetch(`${BASE_URL}/wholesale/apply`, {
      method: 'POST',
      headers,
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || result.error || result.code || 'Application submission failed',
      };
    }

    return {
      success: true,
      applicationId: result.application_id,
      status: result.status,
      message: result.message,
    };
  } catch (error) {
    console.error('Wholesale application error:', error);
    return {
      success: false,
      error: 'Network error. Please try again.',
    };
  }
}

/**
 * Check wholesale application status
 */
export async function getWholesaleStatus(token: string): Promise<WholesaleStatusResponse> {
  try {
    const response = await fetch(`${BASE_URL}/wholesale/status`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch wholesale status');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wholesale status:', error);
    return {
      status: 'pending',
    };
  }
}

/**
 * Get wholesale pricing for a product
 */
export async function getWholesalePricing(
  productId: number,
  token?: string
): Promise<WholesalePricing | null> {
  try {
    const headers: Record<string, string> = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${BASE_URL}/products/${productId}/wholesale-pricing`, {
      headers,
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching wholesale pricing:', error);
    return null;
  }
}

/**
 * Calculate wholesale price based on retail price
 * Wholesale discount: 15% off retail price
 */
export function calculateWholesalePrice(retailPrice: string | number): string {
  const price = typeof retailPrice === 'string'
    ? parseFloat(retailPrice.replace(/[^\d.]/g, ''))
    : retailPrice;

  if (isNaN(price)) return '0';

  const wholesalePrice = price * 0.85; // 15% discount
  return wholesalePrice.toFixed(2);
}

/**
 * Calculate savings percentage
 */
export function calculateSavingsPercentage(retailPrice: string | number): number {
  const price = typeof retailPrice === 'string'
    ? parseFloat(retailPrice.replace(/[^\d.]/g, ''))
    : retailPrice;

  if (isNaN(price)) return 0;

  return 15; // 15% wholesale discount
}

/**
 * Format price with Thai Baht symbol
 */
export function formatPrice(price: string | number): string {
  const num = typeof price === 'string'
    ? parseFloat(price.replace(/[^\d.]/g, ''))
    : price;

  if (isNaN(num)) return '0฿';

  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(num);
}
