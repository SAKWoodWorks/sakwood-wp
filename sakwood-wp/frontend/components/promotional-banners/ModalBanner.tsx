/**
 * Modal Banner Component
 * Displays a centered modal/popup promotional banner
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';
import type { PromotionalBanner } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';

interface ModalBannerProps {
  banner: PromotionalBanner;
  lang: Locale;
  dictionary: Dictionary;
  onClose: () => void;
  onClick: () => void;
}

export function ModalBanner({
  banner,
  lang,
  dictionary,
  onClose,
  onClick,
}: ModalBannerProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Trigger animation after mount
    requestAnimationFrame(() => setIsAnimating(true));

    // Store previous active element for focus restoration
    previousActiveElement.current = document.activeElement as HTMLElement;

    // Focus trap implementation
    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
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
      // Restore focus when modal closes
      previousActiveElement.current?.focus();
    };
  }, [onClose]);

  // Get content based on language
  const content = lang === 'th' ? banner.bannerContentTh : banner.bannerContentEn;
  const buttonText = lang === 'th' ? banner.buttonTextTh : banner.buttonTextEn;
  const backgroundColor = banner.backgroundColor || '#1e40af';
  const textColor = banner.textColor || '#ffffff';

  if (!isMounted) return null;

  const modalContent = (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="promo-modal-title"
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
          isAnimating ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative w-full max-w-lg rounded-lg shadow-2xl transition-all duration-300 ${
          isAnimating ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
        }`}
        style={{ backgroundColor, color: textColor }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          type="button"
          className="absolute top-3 right-3 inline-flex items-center justify-center w-8 h-8 rounded-full bg-black/20 hover:bg-black/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
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

        {/* Content */}
        <div className="p-6 sm:p-8">
          {banner.bannerImage?.sourceUrl && (
            <div className="relative w-full h-48 mb-6 rounded-lg overflow-hidden">
              <Image
                src={banner.bannerImage.sourceUrl}
                alt={banner.bannerImage.altText || banner.title}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 512px"
              />
            </div>
          )}

          <h2
            id="promo-modal-title"
            className="text-2xl font-bold mb-4 pr-8"
          >
            {banner.title}
          </h2>

          <p className="text-base mb-6 opacity-90">{content}</p>

          {banner.bannerLink && buttonText ? (
            <Link
              href={banner.bannerLink}
              onClick={() => {
                onClick();
                onClose();
              }}
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
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
          ) : (
            <button
              onClick={onClose}
              type="button"
              className="inline-flex items-center justify-center w-full px-6 py-3 text-base font-semibold rounded-md bg-white/20 hover:bg-white/30 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {dictionary.banner?.dismiss || 'Dismiss'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return modalContent;
}
