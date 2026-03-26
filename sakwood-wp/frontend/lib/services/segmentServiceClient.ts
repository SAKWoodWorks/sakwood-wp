/**
 * Customer Segmentation Service (Client-Side)
 * 
 * Client-side service for customer segments
 * Used by Client Components for interactive updates
 * 
 * @package SAK WoodWorks Frontend
 */

import { Segment, SegmentAnalytics, SegmentOverview, RuleTypes } from '@/types/segment';

const BASE_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Get all segments (admin only)
 */
export async function getSegmentsClient(
  type: 'all' | 'manual' | 'dynamic' = 'all',
  language: string
): Promise<Segment[]> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments?type=${type}&status=all&per_page=100`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch segments: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching segments:', error);
    return [];
  }
}

/**
 * Get customer's segments
 */
export async function getCustomerSegmentsClient(
  customerId: number,
  language: string
): Promise<Segment[]> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/customers/${customerId}/segments`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch customer segments: ${response.status}`);
    }

    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching customer segments:', error);
    return [];
  }
}

/**
 * Get segment analytics overview (admin only)
 */
export async function getSegmentAnalyticsOverviewClient(language: string): Promise<SegmentOverview | null> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/analytics/overview`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch analytics: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return null;
  }
}

/**
 * Get available rule types (admin only)
 */
export async function getRuleTypesClient(language: string): Promise<RuleTypes> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/rules`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch rule types: ${response.status}`);
    }

    const data = await response.json();
    return data.data || {};
  } catch (error) {
    console.error('Error fetching rule types:', error);
    return {} as RuleTypes;
  }
}

/**
 * Create segment (admin only)
 */
export async function createSegmentClient(
  segmentData: {
    name: string;
    description?: string;
    type: 'manual' | 'dynamic';
    color?: string;
    is_active?: boolean;
    rules?: Array<{
      match: 'all' | 'any';
      rules: Array<{
        type: string;
        operator: string;
        value: string | number;
      }>;
    }>;
  },
  language: string
): Promise<{ success: boolean; data?: Segment; message?: string }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segmentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create segment: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating segment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create segment',
    };
  }
}

/**
 * Update segment (admin only)
 */
export async function updateSegmentClient(
  segmentId: number,
  segmentData: Partial<{
    name: string;
    description?: string;
    type: 'manual' | 'dynamic';
    color?: string;
    is_active?: boolean;
    rules?: Array<{
      match: 'all' | 'any';
      rules: Array<{
        type: string;
        operator: string;
        value: string | number;
      }>;
    }>;
  }>,
  language: string
): Promise<{ success: boolean; data?: Segment; message?: string }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/${segmentId}`;
    
    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(segmentData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update segment: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating segment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update segment',
    };
  }
}

/**
 * Delete segment (admin only)
 */
export async function deleteSegmentClient(
  segmentId: number,
  language: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/${segmentId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to delete segment: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error deleting segment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete segment',
    };
  }
}

/**
 * Add member to segment (admin only)
 */
export async function addSegmentMemberClient(
  segmentId: number,
  customerId: number,
  language: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/${segmentId}/members`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ customer_id: customerId }),
    });

    if (!response.ok) {
      throw new Error(`Failed to add member: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error adding member:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to add member',
    };
  }
}

/**
 * Remove member from segment (admin only)
 */
export async function removeSegmentMemberClient(
  segmentId: number,
  customerId: number,
  language: string
): Promise<{ success: boolean; message?: string }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/${segmentId}/members/${customerId}`;
    
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to remove member: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error removing member:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to remove member',
    };
  }
}

/**
 * Evaluate segment rules (admin only)
 */
export async function evaluateSegmentClient(
  segmentId: number,
  language: string
): Promise<{ success: boolean; message?: string; data?: any }> {
  try {
    const url = `/${language}/wp-json/sakwood/v1/segments/${segmentId}/evaluate`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to evaluate segment: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error evaluating segment:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to evaluate segment',
    };
  }
}
