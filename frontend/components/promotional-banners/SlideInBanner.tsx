/**
 * Slide-in Banner Component
 * Displays a promotional banner that slides in from the bottom of the screen
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import type { PromotionalBanner } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';

interface SlideInBannerProps {
  banner: PromotionalBanner;
  lang: Locale;
  dictionary: Dictionary;
  onClose: () => void;
  onClick: () => void;
}

export function SlideInBanner({
  banner,
  lang,
  dictionary,
  onClose,
  onClick,
}: SlideInBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Trigger animation after mount
    requestAnimationFrame(() => setIsAnimating(true));

    // Store previous active element for focus restoration
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus trap implementation
    const banner = bannerRef.current;
    if (!banner) return;

    const focusableElements = banner.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    firstElement?.focus();

    // Handle Tab key for focus trap
    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      }
    };

    // Handle ESC key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleTab);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('keydown', handleTab);
      document.removeEventListener('keydown', handleEscape);
      // Restore focus when banner closes
      previousActiveElement.current?.focus();
    };
  }, [onClose]);

  // Get content based on language
  const content = lang === 'th' ? banner.bannerContentTh : banner.bannerContentEn;
  const buttonText = lang === 'th' ? banner.buttonTextTh : banner.buttonTextEn;
  const backgroundColor = banner.backgroundColor || '#1e40af';
  const textColor = banner.textColor || '#ffffff';

  if (!isMounted) return null;

  const bannerContent = (
    <div
      className={`fixed bottom-0 left-0 right-0 z-40 p-4 transition-transform duration-300 ${
        isAnimating ? 'translate-y-0' : 'translate-y-full'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="slide-in-title"
    >
      {/* Banner */}
      <div
        ref={bannerRef}
        className="max-w-2xl mx-auto rounded-lg shadow-2xl"
        style={{ backgroundColor, color: textColor }}
      >
        <div className="flex items-start gap-4 p-4 sm:p-6">
          {/* Image */}
          {banner.bannerImage?.sourceUrl && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={banner.bannerImage.sourceUrl}
                alt={banner.bannerImage.altText || banner.title}
                fill
                className="object-cover rounded"
                sizes="80px"
              />
            </div>
          )}

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3
              id="slide-in-title"
              className="text-lg font-bold mb-1 pr-6"
            >
              {banner.title}
            </h3>
            <p className="text-sm opacity-90 mb-3">{content}</p>

            {/* Actions */}
            <div className="flex items-center gap-3 flex-wrap">
              {banner.bannerLink && buttonText ? (
                <Link
                  href={banner.bannerLink}
                  onClick={() => {
                    onClick();
                    onClose();
                  }}
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  {buttonText}
                  <svg
                    className="w-4 h-4 ml-1.5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Link>
              ) : (
                <button
                  onClick={onClose}
                  type="button"
                  className="inline-flex items-center px-4 py-2 text-sm font-semibold rounded-md bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                >
                  {dictionary.banner?.dismiss || 'Dismiss'}
                </button>
              )}
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            type="button"
            className="absolute top-4 right-4 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
            aria-label={dictionary.banner?.close || 'Close'}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );

  return bannerContent;
}
