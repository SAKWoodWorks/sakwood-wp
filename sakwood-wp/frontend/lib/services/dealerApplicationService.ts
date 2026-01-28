/**
 * Dealer Application Service
 * Handles dealer application submissions
 */

import { DealerApplicationRequest, DealerApplication } from './dealerService';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Submit a dealer application
 */
export async function submitDealerApplication(
  applicationData: DealerApplicationRequest,
  token?: string
): Promise<{ success: boolean; applicationId?: string; error?: string }> {
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${WORDPRESS_API_URL}/dealer/apply`, {
      method: 'POST',
      headers,
      body: JSON.stringify(applicationData),
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || data.error || 'Failed to submit application' };
    }

    return { success: true, applicationId: data.applicationId };
  } catch (error) {
    return { success: false, error: 'Failed to submit application' };
  }
}

/**
 * Parse sales capacity string to numeric value
 * Handles formats like "10k", "50k", "100k", "500k", "1m"
 */
function parseSalesCapacity(capacity: string): number {
  const lower = capacity.toLowerCase().trim();

  if (lower.endsWith('k')) {
    return parseFloat(lower.replace('k', '')) * 1000;
  } else if (lower.endsWith('m')) {
    return parseFloat(lower.replace('m', '')) * 1000000;
  } else {
    return parseFloat(lower);
  }
}

/**
 * Validate dealer application data before submission
 */
export function validateDealerApplication(data: DealerApplicationRequest): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.requestedTier) {
    errors.push('Tier selection is required');
  }

  if (!data.storageFacility || data.storageFacility.trim().length < 20) {
    errors.push('Storage facility details must be at least 20 characters');
  }

  if (!data.deliveryVehicles || data.deliveryVehicles.trim().length < 20) {
    errors.push('Delivery vehicles description must be at least 20 characters');
  }

  if (!data.salesCapacity) {
    errors.push('Sales capacity estimate is required');
  }

  if (!data.dealerExperience || data.dealerExperience.trim().length < 30) {
    errors.push('Dealer experience must be at least 30 characters');
  }

  if (!data.requestedTerritories || data.requestedTerritories.length === 0) {
    errors.push('At least one territory must be requested');
  }

  // Tier-specific validations
  if (data.requestedTier === 2 || data.requestedTier === 3) { // Gold or Platinum
    if (!data.tradeReferences || data.tradeReferences.length < 2) {
      errors.push('At least 2 trade references required for Gold/Platinum tier');
    }
  }

  if (data.requestedTier === 3) { // Platinum
    if (!data.businessReferences || data.businessReferences.length < 3) {
      errors.push('At least 3 business references required for Platinum tier');
    }

    // Check sales capacity for Platinum (parse "500k", "1m" formats)
    const capacityValue = parseSalesCapacity(data.salesCapacity);
    if (isNaN(capacityValue) || capacityValue < 500000) {
      errors.push('Monthly sales capacity must be at least 500,000 THB for Platinum tier');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Format trade references for API submission
 */
export function formatTradeReferences(references: {
  company: string;
  contact: string;
  relationship: string;
}[]): string {
  return JSON.stringify(references);
}

/**
 * Format business references for API submission
 */
export function formatBusinessReferences(references: {
  company: string;
  contact: string;
  accountValue: string;
}[]): string {
  return JSON.stringify(references);
}

/**
 * Get dealer tier requirements for display
 */
export interface TierRequirements {
  tierId: number;
  tierName: string;
  minOrderAmount: number;
  minOrderQuantity: number;
  requirements: string[];
  canApply: boolean;
  reason?: string;
}

export async function checkTierEligibility(
  wholesaleStatus: string,
  wholesaleOrderCount: number,
  wholesaleTotalSpent: number
): Promise<TierRequirements[]> {
  // This would typically come from an API endpoint, but for now we'll calculate client-side
  const tiers: TierRequirements[] = [
    {
      tierId: 1,
      tierName: 'Silver',
      minOrderAmount: 50000,
      minOrderQuantity: 50,
      requirements: [
        'Active wholesale customer',
        'Minimum 1 year in business',
        'Storage facility proof',
        '2 trade references',
      ],
      canApply: wholesaleStatus === 'active',
      reason: wholesaleStatus !== 'active' ? 'Must be an active wholesale customer' : undefined,
    },
    {
      tierId: 2,
      tierName: 'Gold',
      minOrderAmount: 100000,
      minOrderQuantity: 100,
      requirements: [
        'Active wholesale customer for 6+ months',
        'Minimum 2 years in business',
        'Storage facility >100 sqm',
        '5+ trade references',
        'Monthly sales capacity 100k+ THB',
      ],
      canApply: wholesaleStatus === 'active' && wholesaleOrderCount >= 5,
      reason: wholesaleOrderCount < 5 ? 'Must have at least 5 wholesale orders' : undefined,
    },
    {
      tierId: 3,
      tierName: 'Platinum',
      minOrderAmount: 200000,
      minOrderQuantity: 200,
      requirements: [
        'Active wholesale customer for 12+ months',
        'Minimum 3 years in business',
        'Large storage facility >200 sqm',
        '10+ trade references',
        'Monthly sales capacity 500k+ THB',
        'Delivery fleet documentation',
      ],
      canApply: wholesaleStatus === 'active' && wholesaleOrderCount >= 10 && wholesaleTotalSpent >= 500000,
      reason:
        wholesaleOrderCount < 10
          ? 'Must have at least 10 wholesale orders'
          : wholesaleTotalSpent < 500000
          ? 'Must have spent at least 500,000 THB on wholesale orders'
          : undefined,
    },
  ];

  return tiers;
}

/**
 * Calculate estimated discount based on tier
 */
export function getTierDiscount(tierId: number): number {
  const discounts: { [key: number]: number } = {
    1: 20, // Silver
    2: 25, // Gold
    3: 30, // Platinum
  };

  return discounts[tierId] || 0;
}

/**
 * Get Thai provinces list for territory selection
 */
export function getThaiProvinces(): string[] {
  return [
    'Bangkok',
    'Pathumtani',
    'Nonthaburi',
    'Samut Prakan',
    'Nakhon Pathom',
    'Samut Sakhon',
    'Phra Nakhon Si Ayutthaya',
    'Ang Thong',
    'Lopburi',
    'Saraburi',
    'Sing Buri',
    'Chai Nat',
    'Suphan Buri',
    'Kanchanaburi',
    'Ratchaburi',
    'Phetchaburi',
    'Prachuap Khiri Khan',
    'Chonburi',
    'Rayong',
    'Chanthaburi',
    'Trat',
    'Chachoengsao',
    'Prachinburi',
    'Sa Kaeo',
    'Nakhon Nayok',
    'Kamphaeng Phet',
    'Tak',
    'Uthai Thani',
    'Nakhon Sawan',
    'Phichit',
    'Phitsanulok',
    'Phichai',
    'Phetchabun',
    'Chiang Mai',
    'Lamphun',
    'Lampang',
    'Uttaradit',
    'Phrae',
    'Nan',
    'Phayao',
    'Chiang Rai',
    'Mae Hong Son',
    'Nakhon Ratchasima',
    'Buri Ram',
    'Surin',
    'Sisaket',
    'Ubon Ratchathani',
    'Yasothon',
    'Chaiyaphum',
    'Amnat Charoen',
    'Nong Bua Lamphu',
    'Khon Kaen',
    'Udon Thani',
    'Loei',
    'Nong Khai',
    'Maha Sarakham',
    'Roi Et',
    'Kalasin',
    'Sakon Nakhon',
    'Nakhon Phanom',
    'Mukdahan',
    'Chumphon',
    'Ranong',
    'Surat Thani',
    'Phangnga',
    'Phuket',
    'Krabi',
    'Phatthalung',
    'Trang',
    'Satun',
    'Songkhla',
    'Yala',
    'Narathiwat',
    'Pattani',
    'Nakhon Si Thammarat',
  ];
}
