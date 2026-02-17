'use client';

import { useCookie } from '@/context/CookieContext';
import { useState } from 'react';
import { X } from 'lucide-react';

interface CookieSettingsProps {
  lang?: 'th' | 'en';
}

export function CookieSettings({ lang = 'th' }: CookieSettingsProps) {
  const { consent, setConsent, hasConsented } = useCookie();
  const [isOpen, setIsOpen] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    functional: hasConsented('functional'),
    analytics: hasConsented('analytics'),
    marketing: hasConsented('marketing'),
  });

  const handleSave = () => {
    // Save preferences
    localStorage.setItem('cookie_consent_necessary', 'true');
    localStorage.setItem('cookie_consent_functional', String(preferences.functional));
    localStorage.setItem('cookie_consent_analytics', String(preferences.analytics));
    localStorage.setItem('cookie_consent_marketing', String(preferences.marketing));

    // Update main consent
    if (preferences.functional || preferences.analytics || preferences.marketing) {
      setConsent('accepted');
    }

    setIsOpen(false);
  };

  if (!isOpen) {
    // Show a small button in footer
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
      >
        {lang === 'th' ? 'ตั้งค่าคุกกี้' : 'Cookie Settings'}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">
            {lang === 'th' ? 'ตั้งค่าคุกกี้' : 'Cookie Settings'}
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <p className="text-sm text-gray-600">
            {lang === 'th'
              ? 'เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณ คุณสามารถเลือกประเภทคุกกี้ที่ต้องการอนุญาตได้'
              : 'We use cookies to enhance your experience. You can choose which types of cookies to allow.'}
          </p>

          {/* Cookie Categories */}
          <div className="space-y-4">
            {/* Necessary - Always enabled */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded">
              <div className="flex-1">
                <label className="font-medium text-gray-900">
                  {lang === 'th' ? 'คุกกี้ที่จำเป็น' : 'Necessary Cookies'}
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {lang === 'th'
                    ? 'จำเป็นสำหรับการทำงานของเว็บไซต์ ไม่สามารถปิดใช้งานได้'
                    : 'Required for the website to function. Cannot be disabled.'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.necessary}
                disabled
                className="mt-1 w-5 h-5 rounded border-gray-300"
              />
            </div>

            {/* Functional */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded">
              <div className="flex-1">
                <label className="font-medium text-gray-900">
                  {lang === 'th' ? 'คุกกี้การทำงาน' : 'Functional Cookies'}
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {lang === 'th'
                    ? 'ใช้สำหรับการจดจำการตั้งค่าและการตั้งค่าของคุณ'
                    : 'Used to remember your settings and preferences.'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.functional}
                onChange={(e) =>
                  setPreferences({ ...preferences, functional: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer"
              />
            </div>

            {/* Analytics */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded">
              <div className="flex-1">
                <label className="font-medium text-gray-900">
                  {lang === 'th' ? 'คุกกี้วิเคราะห์' : 'Analytics Cookies'}
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {lang === 'th'
                    ? 'ช่วยให้เราเข้าใจวิธีการใช้งานเว็บไซต์ของคุณ'
                    : 'Help us understand how you use our website.'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.analytics}
                onChange={(e) =>
                  setPreferences({ ...preferences, analytics: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer"
              />
            </div>

            {/* Marketing */}
            <div className="flex items-start justify-between p-4 bg-gray-50 rounded">
              <div className="flex-1">
                <label className="font-medium text-gray-900">
                  {lang === 'th' ? 'คุกกี้การตลาด' : 'Marketing Cookies'}
                </label>
                <p className="text-sm text-gray-600 mt-1">
                  {lang === 'th'
                    ? 'ใช้สำหรับการโฆษณาและการติดตามพฤติกรรม'
                    : 'Used for advertising and tracking behavior.'}
                </p>
              </div>
              <input
                type="checkbox"
                checked={preferences.marketing}
                onChange={(e) =>
                  setPreferences({ ...preferences, marketing: e.target.checked })
                }
                className="mt-1 w-5 h-5 rounded border-gray-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t px-6 py-4 flex justify-end gap-3">
          <button
            onClick={() => setIsOpen(false)}
            className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-50 transition-colors"
          >
            {lang === 'th' ? 'ยกเลิก' : 'Cancel'}
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {lang === 'th' ? 'บันทึก' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
}
