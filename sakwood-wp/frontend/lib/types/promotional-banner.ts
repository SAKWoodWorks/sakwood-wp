/**
 * Promotional Banner Type Definitions
 * @module lib/types/promotional-banner
 */

export type BannerType = 'top_bar' | 'modal' | 'slide_in' | 'fullscreen';

export type DeviceType = 'desktop' | 'tablet' | 'mobile';

export type VisitorType = 'all' | 'new' | 'returning';

export interface BannerTargeting {
  deviceTypes: DeviceType[];
  showOnPages?: number[]; // Page IDs where banner should show
  visitorType: VisitorType;
  maxImpressions?: number;
  displayDelay: number; // seconds
}

export interface BannerImage {
  sourceUrl: string;
  altText?: string;
  mediaItemId: number;
}

export interface PromotionalBanner {
  id: string;
  databaseId: number;
  title: string;
  slug: string;
  date: string;

  // Banner Content
  bannerType: BannerType;
  bannerContentTh: string;
  bannerContentEn: string;
  bannerLink?: string;
  buttonTextTh?: string;
  buttonTextEn?: string;
  backgroundColor?: string;
  textColor?: string;
  bannerImage?: BannerImage;

  // Scheduling
  scheduleStart?: string; // ISO date string
  scheduleEnd?: string; // ISO date string

  // Targeting
  targeting: BannerTargeting;

  // A/B Testing
  abTestGroup?: string;

  // Status
  isActive: boolean;

  // Analytics (optional, from tracking)
  impressions?: number;
  clicks?: number;
  dismissals?: number;
}

export interface BannerAnalytics {
  bannerId: number;
  variantId?: string;
  userId?: string;
  sessionId: string;
  action: 'impression' | 'click' | 'dismiss';
  timestamp: string;
  device: string;
  page: string;
}

export interface PromoBannersResponse {
  promoBanners: {
    nodes: PromotionalBanner[];
  };
}

export interface BannerDisplaySettings {
  canShow: boolean;
  reason?: string;
  delay?: number;
}

export interface BannerInteraction {
  type: 'impression' | 'click' | 'dismiss';
  timestamp: number;
}
