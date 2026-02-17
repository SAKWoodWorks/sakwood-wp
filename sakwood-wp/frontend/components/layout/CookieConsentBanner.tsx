'use client';

import { useCookie } from '@/context/CookieContext';
import Link from 'next/link';
import { X } from 'lucide-react';

interface CookieConsentBannerProps {
  lang?: 'th' | 'en';
}

export function CookieConsentBanner({ lang = 'th' }: CookieConsentBannerProps) {
  const { consent, setConsent } = useCookie();

  // Don't show if user already made a choice
  if (consent) return null;

  const handleAccept = () => {
    setConsent('accepted');
    // Store individual category consents
    localStorage.setItem('cookie_consent_necessary', 'true');
    localStorage.setItem('cookie_consent_functional', 'true');
    localStorage.setItem('cookie_consent_analytics', 'true');
    localStorage.setItem('cookie_consent_marketing', 'true');
  };

  const handleDecline = () => {
    setConsent('declined');
    // Only necessary cookies
    localStorage.setItem('cookie_consent_necessary', 'true');
    localStorage.setItem('cookie_consent_functional', 'false');
    localStorage.setItem('cookie_consent_analytics', 'false');
    localStorage.setItem('cookie_consent_marketing', 'false');
  };

  const handleCustomize = () => {
    // For now, just accept - can be extended with a modal
    setConsent('accepted');
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-lg border-t border-gray-700">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Message */}
          <div className="flex-1 pr-8">
            <p className="text-sm leading-relaxed">
              {lang === 'th' ? (
                <>
                  เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานและวิเคราะห์การใช้งานเว็บไซต์
                  การคลิก&nbsp;
                  <strong>&quot;ยอมรับทั้งหมด&quot;</strong>
                  &nbsp;ถือว่าคุณยอมรับ{' '}
                  <Link
                    href={`/${lang}/privacy-policy`}
                    className="underline hover:text-blue-400 transition-colors"
                  >
                    นโยบายความเป็นส่วนตัว
                  </Link>
                  &nbsp;ของเรา
                </>
              ) : (
                <>
                  We use cookies to enhance your experience and analyze site usage.
                  By clicking&nbsp;
                  <strong>&quot;Accept All&quot;</strong>
                  , you agree to our{' '}
                  <Link
                    href={`/${lang}/privacy-policy`}
                    className="underline hover:text-blue-400 transition-colors"
                  >
                    Privacy Policy
                  </Link>
                </>
              )}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={handleDecline}
              className="px-4 py-2 border border-white text-white rounded hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              {lang === 'th' ? 'ปฏิเสธ' : 'Decline'}
            </button>
            <button
              onClick={handleCustomize}
              className="px-4 py-2 border border-gray-600 text-gray-300 rounded hover:bg-gray-800 transition-colors text-sm font-medium"
            >
              {lang === 'th' ? 'ปรับแต่ง' : 'Customize'}
            </button>
            <button
              onClick={handleAccept}
              className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-sm font-medium"
            >
              {lang === 'th' ? 'ยอมรับทั้งหมด' : 'Accept All'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
