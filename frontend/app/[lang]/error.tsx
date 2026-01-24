'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface LocaleErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
  params: Promise<{
    lang: string;
  }>;
}

/**
 * Locale Error Boundary - Client Component
 *
 * Note: This component uses inline translations instead of importing
 * getDictionary() because error.tsx must be a Client Component ('use client'),
 * and getDictionary imports 'server-only' which cannot be used in Client Components.
 *
 * The translations below match the keys in dictionaries/{en,th}.json:
 * - common.error_title
 * - common.error_message
 * - common.try_again
 */
export default function LocaleError({
  error,
  reset,
  params,
}: LocaleErrorProps) {
  const [lang, setLang] = useState<string>('th');

  // Resolve params asynchronously
  useEffect(() => {
    params.then((resolved) => setLang(resolved.lang));
  }, [params]);

  useEffect(() => {
    // Focus management for screen readers
    const errorTitle = document.getElementById('error-title');
    errorTitle?.focus();

    // Development-only error logging
    if (process.env.NODE_ENV === 'development') {
      console.error('Locale error boundary caught an error:', error);
    }
  }, [error]);

  // Dictionary translations with fallbacks
  const common = {
    error_title: lang === 'th' ? 'เกิดข้อผิดพลาด' : 'Something went wrong',
    error_message:
      lang === 'th'
        ? 'เราขออภัยในความไม่สะดวก เกิดข้อผิดพลาดที่ไม่คาดคิด'
        : 'We apologize for the inconvenience. An unexpected error has occurred.',
    try_again: lang === 'th' ? 'ลองอีกครั้ง' : 'Try again',
    home: lang === 'th' ? 'หน้าแรก' : 'Go to homepage',
  };

  return (
    <main
      role="main"
      aria-label="Error page"
      className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6"
    >
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6" aria-hidden="true">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        {/* Error Message with ARIA live region */}
        <div role="alert" aria-live="assertive">
          <h1
            id="error-title"
            className="text-2xl font-bold text-gray-900 mb-2"
            tabIndex={-1}
          >
            {common.error_title}
          </h1>
          <p className="text-gray-600 mb-6">{common.error_message}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            aria-label={common.try_again}
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            {common.try_again}
          </button>
          <Link
            href={`/${lang}`}
            aria-label={common.home}
            className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            {common.home}
          </Link>
        </div>

        {/* Error Details (Development Only) */}
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-6 text-left">
            <summary className="cursor-pointer text-sm font-medium text-gray-700 hover:text-gray-900">
              Error details
            </summary>
            <pre className="mt-2 text-xs bg-gray-100 p-3 rounded-lg overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </main>
  );
}
