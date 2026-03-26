/**
 * Customer Segmentation Service (Server-Side)
 * 
 * Server-side service for fetching customer segments
 * Used by Server Components for SSR
 * 
 * @package SAK WoodWorks Frontend
 */

import { Segment, SegmentAnalytics, SegmentOverview, RuleTypes } from '@/types/segment';

const BASE_URL = process.env.WORDPRESS_API_URL || process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

/**
 * Get all segments (admin only)
 */
export async function getSegments(type: 'all' | 'manual' | 'dynamic' = 'all'): Promise<Segment[]> {
  try {
    const url = `${BASE_URL}/segments?type=${type}&status=all&per_page=100`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
 * Get segment by ID (admin only)
 */
export async function getSegmentById(segmentId: number): Promise<Segment | null> {
  try {
    const url = `${BASE_URL}/segments/${segmentId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch segment: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching segment:', error);
    return null;
  }
}

/**
 * Get customer's segments
 */
export async function getCustomerSegments(customerId: number): Promise<Segment[]> {
  try {
    const url = `${BASE_URL}/customers/${customerId}/segments`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
export async function getSegmentAnalyticsOverview(): Promise<SegmentOverview | null> {
  try {
    const url = `${BASE_URL}/segments/analytics/overview`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
 * Get segment-specific analytics (admin only)
 */
export async function getSegmentAnalytics(segmentId: number): Promise<SegmentAnalytics | null> {
  try {
    const url = `${BASE_URL}/segments/${segmentId}/analytics`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch segment analytics: ${response.status}`);
    }

    const data = await response.json();
    return data.data || null;
  } catch (error) {
    console.error('Error fetching segment analytics:', error);
    return null;
  }
}

/**
 * Get available rule types (admin only)
 */
export async function getRuleTypes(): Promise<RuleTypes> {
  try {
    const url = `${BASE_URL}/segments/rules`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
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
