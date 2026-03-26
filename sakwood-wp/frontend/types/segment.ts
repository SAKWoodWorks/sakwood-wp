/**
 * Customer Segmentation Types
 * 
 * @package SAK WoodWorks Frontend
 */

export interface Segment {
  id: number;
  name: string;
  description: string;
  type: 'manual' | 'dynamic';
  color: string;
  is_active: boolean;
  customer_count: number;
  total_revenue: number;
  rules?: SegmentRule[];
  created_at: string;
  updated_at: string;
}

export interface SegmentRule {
  match: 'all' | 'any';
  rules: SegmentRuleItem[];
}

export interface SegmentRuleItem {
  type: string;
  operator: string;
  value: string | number;
}

export interface SegmentMember {
  id: number;
  segment_id: number;
  customer_id: number;
  assigned_at: string;
  assigned_by: 'system' | 'manual';
  is_active: boolean;
  customer_name?: string;
  customer_email?: string;
}

export interface SegmentAnalytics {
  segment: Segment;
  metrics: {
    customer_count: number;
    total_revenue: number;
    avg_order_value: number;
    total_orders: number;
    revenue_per_customer: number;
  };
}

export interface SegmentOverview {
  total_segments: number;
  total_customers_segmented: number;
  total_revenue_segmented: number;
  segments: Array<{
    id: number;
    name: string;
    type: 'manual' | 'dynamic';
    customer_count: number;
    total_revenue: number;
    color: string;
  }>;
}

export interface RuleType {
  label: string;
  rules: Record<string, string>;
}

export interface RuleTypes {
  purchase: RuleType;
  demographic: RuleType;
  engagement: RuleType;
}
