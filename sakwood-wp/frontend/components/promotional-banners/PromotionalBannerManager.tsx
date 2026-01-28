/**
 * Promotional Banner Manager
 * Main container component that renders all active banner types
 */

'use client';

import { useEffect, useCallback } from 'react';
import { TopBarBanner } from './TopBarBanner';
import { ModalBanner } from './ModalBanner';
import { SlideInBanner } from './SlideInBanner';
import { FullscreenBanner } from './FullscreenBanner';
import { usePromotionalBanners } from '@/lib/hooks/usePromotionalBanners';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';

interface PromotionalBannerManagerProps {
  lang: Locale;
  dictionary: Dictionary;
  currentPagePath?: string;
}

export function PromotionalBannerManager({
  lang,
  dictionary,
  currentPagePath,
}: PromotionalBannerManagerProps) {
  const { banners, loading, getFirstBannerByType, closeBanner, trackClick } =
    usePromotionalBanners({
      lang,
      currentPagePath,
      autoTrack: true,
    });

  // Prevent body scroll when modal is open
  const topBarBanner = getFirstBannerByType('top_bar');
  const modalBanner = getFirstBannerByType('modal');
  const slideInBanner = getFirstBannerByType('slide_in');
  const fullscreenBanner = getFirstBannerByType('fullscreen');

  // Stable callbacks to prevent unnecessary effect re-runs
  const handleTopBarClose = useCallback(() => {
    if (topBarBanner) closeBanner(topBarBanner.banner.databaseId);
  }, [topBarBanner, closeBanner]);

  const handleTopBarClick = useCallback(() => {
    if (topBarBanner) trackClick(topBarBanner.banner.databaseId);
  }, [topBarBanner, trackClick]);

  const handleModalClose = useCallback(() => {
    if (modalBanner) closeBanner(modalBanner.banner.databaseId);
  }, [modalBanner, closeBanner]);

  const handleModalClick = useCallback(() => {
    if (modalBanner) trackClick(modalBanner.banner.databaseId);
  }, [modalBanner, trackClick]);

  const handleSlideInClose = useCallback(() => {
    if (slideInBanner) closeBanner(slideInBanner.banner.databaseId);
  }, [slideInBanner, closeBanner]);

  const handleSlideInClick = useCallback(() => {
    if (slideInBanner) trackClick(slideInBanner.banner.databaseId);
  }, [slideInBanner, trackClick]);

  const handleFullscreenClose = useCallback(() => {
    if (fullscreenBanner) closeBanner(fullscreenBanner.banner.databaseId);
  }, [fullscreenBanner, closeBanner]);

  const handleFullscreenClick = useCallback(() => {
    if (fullscreenBanner) trackClick(fullscreenBanner.banner.databaseId);
  }, [fullscreenBanner, trackClick]);

  useEffect(() => {
    const hasModal = modalBanner?.isVisible || fullscreenBanner?.isVisible;
    if (hasModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [modalBanner?.isVisible, fullscreenBanner?.isVisible]);

  if (loading) {
    return null;
  }

  return (
    <>
      {/* Top Bar Banner - appears at top of page */}
      {topBarBanner?.isVisible && (
        <TopBarBanner
          banner={topBarBanner.banner}
          lang={lang}
          dictionary={dictionary}
          onClose={handleTopBarClose}
          onClick={handleTopBarClick}
        />
      )}

      {/* Modal Banner - centered popup */}
      {modalBanner?.isVisible && (
        <ModalBanner
          banner={modalBanner.banner}
          lang={lang}
          dictionary={dictionary}
          onClose={handleModalClose}
          onClick={handleModalClick}
        />
      )}

      {/* Slide-in Banner - bottom or side */}
      {slideInBanner?.isVisible && (
        <SlideInBanner
          banner={slideInBanner.banner}
          lang={lang}
          dictionary={dictionary}
          onClose={handleSlideInClose}
          onClick={handleSlideInClick}
        />
      )}

      {/* Fullscreen Banner - overlay */}
      {fullscreenBanner?.isVisible && (
        <FullscreenBanner
          banner={fullscreenBanner.banner}
          lang={lang}
          dictionary={dictionary}
          onClose={handleFullscreenClose}
          onClick={handleFullscreenClick}
        />
      )}
    </>
  );
}
