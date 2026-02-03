import Link from 'next/link';

/**
 * Root Not Found Page
 * Displayed when a route doesn't exist at the root level (non-locale routes)
 *
 * This is a simplified version that redirects to the Thai homepage
 * since all content should be accessed through locale routes
 */
export default function NotFound() {
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
            หน้าไม่พบ / Page Not Found
          </h1>
          <p className="text-gray-600 mb-8 text-lg">
            หน้าที่คุณค้นหาไม่มีอยู่หรือถูกย้ายไปแล้ว
          </p>

          {/* Helpful Links */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
              ลิงก์ที่เป็นประโยชน์ / Helpful Links
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <Link
                href="/th"
                className="inline-flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
              >
                🇹🇭 ไทย
              </Link>
              <Link
                href="/en"
                className="inline-flex items-center justify-center px-4 py-3 border-2 border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-all font-medium"
              >
                🇺🇸 English
              </Link>
            </div>
          </div>

          {/* Info Message */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
            <p>
              💡 All pages are accessed through locale routes. Please select your preferred language above.
            </p>
          </div>
        </div>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/"
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
            กลับหน้าแรก / Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
