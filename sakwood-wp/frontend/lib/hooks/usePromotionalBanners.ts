/**
 * Custom hook for managing promotional banners
 * Handles banner display, targeting, and user interactions
 */

'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import type { Locale } from '@/i18n-config';
import type { PromotionalBanner, BannerInteraction } from '@/lib/types';
import {
  getActiveBanners,
  shouldDisplayBanner,
  recordImpression,
  recordClick,
  recordDismissal,
} from '@/lib/services/promotionalBannerService';

interface UsePromotionalBannersOptions {
  lang: Locale;
  currentPagePath?: string;
  autoTrack?: boolean; // Automatically track impressions
}

interface BannerState {
  banner: PromotionalBanner;
  isVisible: boolean;
  interactions: BannerInteraction[];
}

export function usePromotionalBanners({
  lang,
  currentPagePath,
  autoTrack = true,
}: UsePromotionalBannersOptions) {
  const [banners, setBanners] = useState<BannerState[]>([]);
  const [loading, setLoading] = useState(true);
  const trackedImpressions = useRef<Set<number>>(new Set());

  // Fetch banners on mount
  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      const activeBanners = await getActiveBanners(lang, currentPagePath);

      const bannerStates: BannerState[] = activeBanners.map((banner) => {
        const { canShow, delay } = shouldDisplayBanner(banner, currentPagePath);

        return {
          banner,
          isVisible: canShow,
          interactions: [],
        };
      });

      setBanners(bannerStates);
      setLoading(false);
    };

    fetchBanners();
  }, [lang, currentPagePath]);

  // Track impressions when banners become visible
  useEffect(() => {
    if (!autoTrack) return;

    const timers: NodeJS.Timeout[] = [];

    banners.forEach(({ banner, isVisible }) => {
      if (isVisible && !trackedImpressions.current.has(banner.databaseId)) {
        // Apply display delay if specified
        const delay = banner.targeting.displayDelay * 1000;
        const timer = setTimeout(() => {
          recordImpression(banner.databaseId);
          trackedImpressions.current.add(banner.databaseId);
        }, delay);
        timers.push(timer);
      }
    });

    // Clean up all timers on unmount or dependency change
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [banners, autoTrack]);

  // Get banners by type
  const getBannersByType = useCallback(
    (type: PromotionalBanner['bannerType']) => {
      return banners.filter((b) => b.banner.bannerType === type && b.isVisible);
    },
    [banners]
  );

  // Get first banner by type (for single display)
  const getFirstBannerByType = useCallback(
    (type: PromotionalBanner['bannerType']) => {
      return banners.find((b) => b.banner.bannerType === type && b.isVisible);
    },
    [banners]
  );

  // Close (dismiss) a banner
  const closeBanner = useCallback((bannerId: number) => {
    setBanners((prev) =>
      prev.map((b) =>
        b.banner.databaseId === bannerId ? { ...b, isVisible: false } : b
      )
    );
    recordDismissal(bannerId);
  }, []);

  // Track banner click
  const trackClick = useCallback((bannerId: number) => {
    recordClick(bannerId);
  }, []);

  // Manually trigger impression (for delayed banners)
  const triggerImpression = useCallback((bannerId: number) => {
    if (!trackedImpressions.current.has(bannerId)) {
      recordImpression(bannerId);
      trackedImpressions.current.add(bannerId);
    }
  }, []);

  return {
    banners,
    loading,
    getBannersByType,
    getFirstBannerByType,
    closeBanner,
    trackClick,
    triggerImpression,
  };
}

/**
 * Hook for managing a single banner
 */
export function usePromotionalBanner(banner: PromotionalBanner, autoTrack = true) {
  const [isVisible, setIsVisible] = useState(false);
  const impressionTracked = useRef(false);

  useEffect(() => {
    const { canShow, delay } = shouldDisplayBanner(banner);

    if (!canShow) {
      setIsVisible(false);
      return;
    }

    // Apply display delay
    const delayMs = (delay || 0) * 1000;
    const timer = setTimeout(() => {
      setIsVisible(true);

      if (autoTrack && !impressionTracked.current) {
        recordImpression(banner.databaseId);
        impressionTracked.current = true;
      }
    }, delayMs);

    return () => clearTimeout(timer);
  }, [banner, autoTrack]);

  const close = useCallback(() => {
    setIsVisible(false);
    recordDismissal(banner.databaseId);
  }, [banner.databaseId]);

  const handleClick = useCallback(() => {
    recordClick(banner.databaseId);
  }, [banner.databaseId]);

  return {
    isVisible,
    close,
    handleClick,
  };
}
