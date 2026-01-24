/**
 * Promotional Banner Service
 * Handles fetching banners, targeting logic, and analytics tracking
 */

import { wordpressService } from './wordpressService';
import { GET_PROMO_BANNERS_QUERY } from '@/lib/graphql/queries';
import type {
  PromotionalBanner,
  BannerAnalytics,
  BannerDisplaySettings,
  BannerInteraction,
} from '@/lib/types';
import type { Locale } from '@/i18n-config';

// localStorage keys
const BANNER_IMPRESSIONS_KEY = 'sakwood-banner-impressions';
const BANNER_DISMISSALS_KEY = 'sakwood-banner-dismissals';
const NEW_VISITOR_KEY = 'sakwood-new-visitor';
const SESSION_ID_KEY = 'sakwood-session-id';

// Device detection
export const getDeviceType = (): 'desktop' | 'tablet' | 'mobile' => {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

// Session management
export const getSessionId = (): string => {
  if (typeof window === 'undefined') return 'server';

  let sessionId = localStorage.getItem(SESSION_ID_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_ID_KEY, sessionId);
  }
  return sessionId;
};

export const isNewVisitor = (): boolean => {
  if (typeof window === 'undefined') return false;

  const hasVisited = localStorage.getItem(NEW_VISITOR_KEY);
  if (!hasVisited) {
    localStorage.setItem(NEW_VISITOR_KEY, 'true');
    return true;
  }
  return false;
};

// Banner impression/dismissal tracking
export const getBannerImpressions = (bannerId: number): number => {
  if (typeof window === 'undefined') return 0;

  const impressions = localStorage.getItem(BANNER_IMPRESSIONS_KEY);
  const data = impressions ? JSON.parse(impressions) : {};
  return data[bannerId] || 0;
};

export const incrementBannerImpression = (bannerId: number): void => {
  if (typeof window === 'undefined') return;

  const impressions = localStorage.getItem(BANNER_IMPRESSIONS_KEY);
  const data = impressions ? JSON.parse(impressions) : {};
  data[bannerId] = (data[bannerId] || 0) + 1;
  localStorage.setItem(BANNER_IMPRESSIONS_KEY, JSON.stringify(data));
};

export const isBannerDismissed = (bannerId: number): boolean => {
  if (typeof window === 'undefined') return false;

  const dismissals = localStorage.getItem(BANNER_DISMISSALS_KEY);
  const data = dismissals ? JSON.parse(dismissals) : {};

  // Check if banner was dismissed in the last 24 hours
  const dismissedAt = data[bannerId];
  if (!dismissedAt) return false;

  const hoursSinceDismissal = (Date.now() - dismissedAt) / (1000 * 60 * 60);
  return hoursSinceDismissal < 24;
};

export const dismissBanner = (bannerId: number): void => {
  if (typeof window === 'undefined') return;

  const dismissals = localStorage.getItem(BANNER_DISMISSALS_KEY);
  const data = dismissals ? JSON.parse(dismissals) : {};
  data[bannerId] = Date.now();
  localStorage.setItem(BANNER_DISMISSALS_KEY, JSON.stringify(data));
};

/**
 * Fetch all active promotional banners from WordPress
 */
export async function getPromotionalBanners(
  lang: Locale
): Promise<{ success: boolean; data?: PromotionalBanner[]; error?: string }> {
  try {
    const response = await wordpressService.query<{ promoBanners: { nodes: PromotionalBanner[] } }>(
      GET_PROMO_BANNERS_QUERY
    );

    if (!response || !response.promoBanners) {
      return { success: false, error: 'Failed to fetch promotional banners' };
    }

    return { success: true, data: response.promoBanners.nodes };
  } catch (error) {
    console.error('Error fetching promotional banners:', error);
    return { success: false, error: 'Failed to fetch promotional banners' };
  }
}

/**
 * Check if a banner should be displayed based on targeting rules
 */
export function shouldDisplayBanner(
  banner: PromotionalBanner,
  currentPagePath?: string
): BannerDisplaySettings {
  // Check if banner is active
  if (!banner.isActive) {
    return { canShow: false, reason: 'Banner is not active' };
  }

  // Check scheduling
  const now = new Date();
  if (banner.scheduleStart) {
    const startDate = new Date(banner.scheduleStart);
    if (now < startDate) {
      return { canShow: false, reason: 'Banner has not started yet' };
    }
  }

  if (banner.scheduleEnd) {
    const endDate = new Date(banner.scheduleEnd);
    if (now > endDate) {
      return { canShow: false, reason: 'Banner has expired' };
    }
  }

  // Check if already dismissed
  if (isBannerDismissed(banner.databaseId)) {
    return { canShow: false, reason: 'Banner was recently dismissed' };
  }

  // Check device type targeting
  const currentDevice = getDeviceType();
  if (
    banner.targeting.deviceTypes.length > 0 &&
    !banner.targeting.deviceTypes.includes(currentDevice)
  ) {
    return { canShow: false, reason: `Not targeted at ${currentDevice} devices` };
  }

  // Check visitor type targeting
  const isNew = isNewVisitor();
  if (banner.targeting.visitorType === 'new' && !isNew) {
    return { canShow: false, reason: 'Only for new visitors' };
  }
  if (banner.targeting.visitorType === 'returning' && isNew) {
    return { canShow: false, reason: 'Only for returning visitors' };
  }

  // Check max impressions
  const currentImpressions = getBannerImpressions(banner.databaseId);
  if (banner.targeting.maxImpressions && currentImpressions >= banner.targeting.maxImpressions) {
    return { canShow: false, reason: 'Max impressions reached' };
  }

  // Check page targeting (if specified)
  if (banner.targeting.showOnPages && banner.targeting.showOnPages.length > 0) {
    // This would require mapping current path to page ID
    // For now, we'll skip this check
  }

  return { canShow: true, delay: banner.targeting.displayDelay };
}

/**
 * Get filtered banners that should display on current page
 */
export async function getActiveBanners(
  lang: Locale,
  currentPagePath?: string
): Promise<PromotionalBanner[]> {
  const { success, data } = await getPromotionalBanners(lang);

  if (!success || !data) {
    return [];
  }

  return data.filter((banner) => shouldDisplayBanner(banner, currentPagePath).canShow);
}

/**
 * Track banner analytics (impression, click, dismiss)
 */
export async function trackBannerAnalytics(analytics: BannerAnalytics): Promise<void> {
  try {
    await fetch('/api/banners/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(analytics),
    });
  } catch (error) {
    // Silently fail - analytics shouldn't break the UX
    console.error('Failed to track banner analytics:', error);
  }
}

/**
 * Record impression for a banner
 */
export function recordImpression(bannerId: number): void {
  incrementBannerImpression(bannerId);

  trackBannerAnalytics({
    bannerId,
    sessionId: getSessionId(),
    action: 'impression',
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Record click for a banner
 */
export function recordClick(bannerId: number): void {
  trackBannerAnalytics({
    bannerId,
    sessionId: getSessionId(),
    action: 'click',
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}

/**
 * Record dismissal for a banner
 */
export function recordDismissal(bannerId: number): void {
  dismissBanner(bannerId);

  trackBannerAnalytics({
    bannerId,
    sessionId: getSessionId(),
    action: 'dismiss',
    timestamp: new Date().toISOString(),
    device: getDeviceType(),
    page: typeof window !== 'undefined' ? window.location.pathname : '',
  });
}
