'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getPopupSettings } from '@/lib/services/popupService';

interface PopupSettings {
  enabled: boolean;
  title: string;
  subtitle: string;
  cta_text: string;
  cta_link: string;
  image_url: string;
  delay: number;
}

interface PromotionalPopupProps {
  defaultTitle?: string;
  defaultSubtitle?: string;
  defaultCtaText?: string;
}

export function PromotionalPopup({
  defaultTitle = 'Special Offer!',
  defaultSubtitle = 'Check out our latest promotions',
  defaultCtaText = 'Learn More',
}: PromotionalPopupProps) {
  const [settings, setSettings] = useState<PopupSettings | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    const loadSettings = async () => {
      try {
        const data = await getPopupSettings();
        if (data) {
          if (!data.enabled) {
            setSettings(data);
            return;
          }
          setSettings(data);

          // Check if user has dismissed the popup today
          const dismissedDate = localStorage.getItem('promo-popup-dismissed');
          if (dismissedDate) {
            const today = new Date().toDateString();
            if (dismissedDate === today) {
              // Already dismissed today, don't show
              return;
            }
            // Different day, clear the old dismissal
            localStorage.removeItem('promo-popup-dismissed');
          }

          // Show popup after delay (convert seconds to milliseconds)
          const delay = (data.delay || 5) * 1000;

          const timer = setTimeout(() => {
            setIsVisible(true);
          }, delay);

          return () => clearTimeout(timer);
        }
      } catch (error) {
        console.error('[PromotionalPopup] Error loading settings:', error);
      }
    };
    loadSettings();
  }, []);

  const handleClose = () => {
    if (dontShowAgain) {
      // Store today's date instead of just 'true'
      const today = new Date().toDateString();
      localStorage.setItem('promo-popup-dismissed', today);
    }
    setIsVisible(false);
  };

  // Don't render anything if not visible
  if (!isVisible) {
    return null;
  }

  // Use settings or fall back to defaults
  const title = settings?.title || defaultTitle;
  const subtitle = settings?.subtitle || defaultSubtitle;
  const ctaText = settings?.cta_text || defaultCtaText;
  const ctaLink = settings?.cta_link || '/shop';
  const imageUrl = settings?.image_url;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={handleClose}
      ></div>

      {/* Popup Content */}
      <div className="relative rounded-3xl shadow-2xl max-w-2xl w-full animate-in zoom-in-95 duration-300 slide-in-from-bottom-4 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-colors"
          aria-label="Close popup"
        >
          <X className="w-5 h-5 text-gray-600" />
        </button>

        {/* Full-size Image with Overlay */}
        {imageUrl ? (
          <div className="relative w-full h-96 md:h-[500px]">
            <img
              src={imageUrl}
              alt="Promotion"
              className="w-full h-full object-cover"
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center text-white">
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{title}</h2>
              <p className="text-lg md:text-xl mb-8 max-w-lg drop-shadow-md">{subtitle}</p>

              {/* CTA Button */}
              <a
                href={ctaLink}
                onClick={handleClose}
                className="inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 mb-4"
              >
                {ctaText}
              </a>

              {/* Don't show again checkbox */}
              <label className="flex items-center justify-center gap-3 cursor-pointer group mt-6">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-5 h-5 rounded border-white/50 text-white focus:ring-white/50 cursor-pointer bg-white/20"
                />
                <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                  Don&apos;t show this again today
                </span>
              </label>
            </div>
          </div>
        ) : (
          /* Fallback with gradient if no image */
          <div className="relative w-full h-96 md:h-[500px] bg-gradient-to-br from-blue-600 to-indigo-700">
            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 md:p-12 text-center text-white">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">{title}</h2>
              <p className="text-lg md:text-xl mb-8 max-w-lg drop-shadow-md">{subtitle}</p>

              {/* CTA Button */}
              <a
                href={ctaLink}
                onClick={handleClose}
                className="inline-block bg-white hover:bg-gray-100 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all hover:scale-105 hover:shadow-xl active:scale-95 mb-4"
              >
                {ctaText}
              </a>

              {/* Don't show again checkbox */}
              <label className="flex items-center justify-center gap-3 cursor-pointer group mt-6">
                <input
                  type="checkbox"
                  checked={dontShowAgain}
                  onChange={(e) => setDontShowAgain(e.target.checked)}
                  className="w-5 h-5 rounded border-white/50 text-white focus:ring-white/50 cursor-pointer bg-white/20"
                />
                <span className="text-sm text-white/90 group-hover:text-white transition-colors">
                  Don&apos;t show this again today
                </span>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
