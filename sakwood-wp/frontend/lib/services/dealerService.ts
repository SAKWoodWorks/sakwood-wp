/**
 * Dealer Service
 * Handles dealer-related API calls
 */

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

// Types
export type DealerTier = 'silver' | 'gold' | 'platinum';

export interface DealerTierInfo {
  id: number;
  tier_name: DealerTier;
  discount_percentage: number;
  min_order_amount: number;
  min_order_quantity: number;
  credit_multiplier: number;
  benefits: string[];
  requirements: string[];
  is_active: boolean;
}

export interface DealerApplication {
  id: number;
  user_id: number;
  application_id: string;
  current_wholesale_status: string;
  requested_tier_id: number;
  business_registration: string;
  storage_facility: string;
  delivery_vehicles: string;
  sales_capacity: number;
  dealer_experience: string;
  requested_territories: string;
  trade_references: string;
  business_references: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
  assigned_territories: string;
  admin_notes: string;
  submitted_date: string;
  reviewed_date: string | null;
}

export interface DealerInfo {
  tierId: number;
  tierName: DealerTier;
  discountPercentage: number;
  minOrderAmount: number;
  minOrderQuantity: number;
  territories: DealerTerritory[];
  status: string;
}

export interface DealerTerritory {
  id: number;
  dealer_id: number;
  user_id: number;
  province: string;
  district: string | null;
  is_exclusive: boolean;
  assigned_date: string;
  expiry_date: string | null;
}

export interface DealerOrder {
  id: number;
  user_id: number;
  order_id: number;
  dealer_tier_id: number;
  order_total: number;
  discount_amount: number;
  discount_percentage: number;
  created_at: string;
}

export interface DealerApplicationRequest {
  requestedTier: number;
  businessRegistration?: string;
  storageFacility: string;
  deliveryVehicles: string;
  salesCapacity: string;
  dealerExperience: string;
  requestedTerritories: string[];
  tradeReferences?: TradeReference[];
  businessReferences?: BusinessReference[];
}

export interface TradeReference {
  company: string;
  contact: string;
  relationship: string;
}

export interface BusinessReference {
  company: string;
  contact: string;
  accountValue: string;
}

// API Methods

/**
 * Get all available dealer tiers
 */
export async function getDealerTiers(): Promise<{ success: boolean; data?: DealerTierInfo[]; error?: string }> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/dealer/tiers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Failed to fetch dealer tiers' };
    }

    // Parse JSON strings for benefits and requirements
    const tiers = data.map((tier: DealerTierInfo) => ({
      ...tier,
      benefits: typeof tier.benefits === 'string' ? JSON.parse(tier.benefits) : tier.benefits,
      requirements: typeof tier.requirements === 'string' ? JSON.parse(tier.requirements) : tier.requirements,
    }));

    return { success: true, data: tiers };
  } catch (error) {
    return { success: false, error: 'Failed to fetch dealer tiers' };
  }
}

/**
 * Get current user's dealer info
 */
export async function getDealerInfo(userId?: number): Promise<{ success: boolean; data?: DealerInfo; error?: string }> {
  try {
    const url = userId ? `/api/dealer/info?user_id=${userId}` : '/api/dealer/info';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch dealer info' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch dealer info' };
  }
}

/**
 * Get dealer application status by application ID
 */
export async function getDealerApplicationStatus(applicationId: string): Promise<{ success: boolean; data?: DealerApplication; error?: string }> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/dealer/status/${applicationId}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.message || 'Application not found' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch application status' };
  }
}

/**
 * Get dealer territories
 */
export async function getDealerTerritories(userId?: number): Promise<{ success: boolean; data?: DealerTerritory[]; error?: string }> {
  try {
    const url = userId ? `/api/dealer/territories?user_id=${userId}` : '/api/dealer/territories';
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch territories' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch territories' };
  }
}

/**
 * Get dealer order history
 */
export async function getDealerOrders(userId?: number, limit = 20): Promise<{ success: boolean; data?: DealerOrder[]; error?: string }> {
  try {
    const url = userId
      ? `/api/dealer/orders?user_id=${userId}&limit=${limit}`
      : `/api/dealer/orders?limit=${limit}`;
    const response = await fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to fetch orders' };
    }

    return { success: true, data };
  } catch (error) {
    return { success: false, error: 'Failed to fetch orders' };
  }
}

/**
 * Check if territory is available (admin only)
 */
export async function isTerritoryAvailable(province: string, excludeDealerId?: number): Promise<{ success: boolean; available?: boolean; error?: string }> {
  try {
    const params = new URLSearchParams({ province });
    if (excludeDealerId) params.append('exclude_dealer_id', excludeDealerId.toString());

    const response = await fetch(`${WORDPRESS_API_URL}/dealer/check-territory?${params}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      cache: 'no-store',
    });

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.error || 'Failed to check territory' };
    }

    return { success: true, available: data.available };
  } catch (error) {
    return { success: false, error: 'Failed to check territory' };
  }
}
