/**
 * Top Bar Banner Component
 * Displays a promotional banner at the top of the page
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import type { PromotionalBanner } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';

interface TopBarBannerProps {
  banner: PromotionalBanner;
  lang: Locale;
  dictionary: Dictionary;
  onClose: () => void;
  onClick: () => void;
}

export function TopBarBanner({
  banner,
  lang,
  dictionary,
  onClose,
  onClick,
}: TopBarBannerProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Get content based on language
  const content = lang === 'th' ? banner.bannerContentTh : banner.bannerContentEn;
  const buttonText = lang === 'th' ? banner.buttonTextTh : banner.buttonTextEn;
  const backgroundColor = banner.backgroundColor || '#1e40af';
  const textColor = banner.textColor || '#ffffff';

  if (!isMounted) return null;

  const bannerContent = (
    <div
      className="relative w-full py-3 px-4"
      style={{ backgroundColor, color: textColor }}
      role="banner"
      aria-label="Promotional announcement"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Banner Content */}
        <div className="flex items-center gap-4 flex-1">
          {banner.bannerImage?.sourceUrl && (
            <div className="relative w-12 h-12 flex-shrink-0">
              <Image
                src={banner.bannerImage.sourceUrl}
                alt={banner.bannerImage.altText || banner.title}
                fill
                className="object-cover rounded"
                sizes="48px"
              />
            </div>
          )}
          <div className="flex-1">
            <p className="text-sm font-medium">{content}</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {banner.bannerLink && buttonText && (
            <Link
              href={banner.bannerLink}
              onClick={onClick}
              className="inline-flex items-center px-4 py-1.5 text-sm font-semibold rounded-md bg-white text-gray-900 hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              {buttonText}
            </Link>
          )}
          <button
            onClick={onClose}
            type="button"
            className="inline-flex items-center justify-center w-8 h-8 rounded-md hover:bg-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-900"
            aria-label={dictionary.banner?.close || 'Close banner'}
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
