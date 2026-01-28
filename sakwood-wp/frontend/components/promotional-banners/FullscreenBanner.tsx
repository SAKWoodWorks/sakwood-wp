/**
 * Fullscreen Banner Component
 * Displays a fullscreen promotional announcement/overlay
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import type { PromotionalBanner } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';

interface FullscreenBannerProps {
  banner: PromotionalBanner;
  lang: Locale;
  dictionary: Dictionary;
  onClose: () => void;
  onClick: () => void;
}

export function FullscreenBanner({
  banner,
  lang,
  dictionary,
  onClose,
  onClick,
}: FullscreenBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Trigger animation after mount
    requestAnimationFrame(() => setIsAnimating(true));

    // Store previous active element for focus restoration
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus trap implementation
    const container = containerRef.current;
    if (!container) return;

    const focusableElements = container.querySelectorAll(
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
      ref={containerRef}
      className={`fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-300 ${
        isAnimating ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ backgroundColor, color: textColor }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="fullscreen-title"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />

      {/* Close Button */}
      <button
        onClick={onClose}
        type="button"
        className="absolute top-6 right-6 inline-flex items-center justify-center w-10 h-10 rounded-full bg-black/20 hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 z-10"
        aria-label={dictionary.banner?.close || 'Close'}
      >
        <svg
          className="w-6 h-6"
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

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Banner Image */}
        {banner.bannerImage?.sourceUrl && (
          <div className="relative w-full h-64 sm:h-80 mb-8 rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={banner.bannerImage.sourceUrl}
              alt={banner.bannerImage.altText || banner.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 1024px"
              priority
            />
          </div>
        )}

        {/* Title */}
        <h1
          id="fullscreen-title"
          className="text-4xl sm:text-5xl font-bold mb-6"
        >
          {banner.title}
        </h1>

        {/* Description */}
        <p className="text-lg sm:text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          {content}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          {banner.bannerLink && buttonText ? (
            <Link
              href={banner.bannerLink}
              onClick={() => {
                onClick();
                onClose();
              }}
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 shadow-lg"
            >
              {buttonText}
              <svg
                className="w-5 h-5 ml-2"
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
          ) : null}

          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold rounded-lg bg-white/10 hover:bg-white/20 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900 border-2 border-white/30"
          >
            {dictionary.banner?.dismiss || 'Continue to Site'}
          </button>
        </div>

        {/* Additional Info */}
        {banner.scheduleEnd && (
          <p className="mt-8 text-sm opacity-75">
            {dictionary.banner?.expires_soon || 'Offer ends'}:{' '}
            {new Date(banner.scheduleEnd).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </p>
        )}
      </div>
    </div>
  );

  return bannerContent;
}
