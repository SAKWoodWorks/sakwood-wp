import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

/**
 * Enhanced Locale Not Found Page
 * Displayed when a route doesn't exist within a locale
 *
 * Features:
 * - Search functionality
 * - Helpful links to popular pages
 * - Language toggle (Thai/English)
 * - Improved visual design
 *
 * Note: not-found.tsx files do NOT receive params in Next.js App Router.
 * They are rendered when no route matches, so there's no lang parameter available.
 * We use a default locale (th) and provide links to both locales.
 */
export default async function LocaleNotFound() {
  const dictionary = await getDictionary('th');
  const { common } = dictionary;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-4 py-12">
      <div className="max-w-lg w-full">
        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 md:p-12 text-center mb-6">
          {/* 404 Icon with Animation */}
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mb-8 shadow-lg hover:scale-110 transition-transform duration-300">
            <span className="text-4xl font-bold text-white">404</span>
          </div>

          {/* Error Message */}
          <h1 className="text-3xl font-bold text-gray-900 mb-3">
            {common.not_found_title || 'หน้าไม่พบ'}
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            {common.not_found_message || 'หน้าที่คุณค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว'}
          </p>

          {/* Search Box */}
          <div className="mb-8">
            <p className="text-sm text-gray-500 mb-3">
              {common.not_found_try_searching || 'ลองค้นหาสิ่งที่คุณต้องการ'}
            </p>
            <Link
              href="/th/search"
              className="block w-full"
            >
              <div className="relative">
                <input
                  type="text"
                  readOnly
                  placeholder={common.not_found_search_placeholder || 'ค้นหาสินค้า...'}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer hover:border-blue-400 transition-colors"
                />
                <svg
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Helpful Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              {common.not_found_helpful_links || 'ลิงก์ที่เป็นประโยชน์'}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/th/products"
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                {common.not_found_browse_products || 'ดูสินค้า'}
              </Link>
              <Link
                href="/th/contact"
                className="inline-flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all font-medium"
              >
                {common.not_found_contact_us || 'ติดต่อเรา'}
              </Link>
            </div>
          </div>

          {/* Language Toggle Buttons */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-3">
              {common.select_language || 'เลือกภาษา / Select Language'}
            </p>
            <div className="flex justify-center gap-3">
              <Link
                href="/th"
                className="inline-flex items-center justify-center px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                🇹🇭 ไทย
              </Link>
              <Link
                href="/en"
                className="inline-flex items-center justify-center px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors font-medium"
              >
                🇺🇸 English
              </Link>
            </div>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/th"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            {common.not_found_go_back || 'กลับหน้าแรก'}
          </Link>
        </div>
      </div>
    </div>
  );
}
