import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface LocaleNotFoundProps {
  params: Promise<{
    lang: string;
  }>;
}

/**
 * Locale Not Found Page
 * Displayed when a route doesn't exist within a locale
 */
export default async function LocaleNotFound({ params }: LocaleNotFoundProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center">
        {/* 404 Icon */}
        <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-3xl font-bold text-blue-600">404</span>
        </div>

        {/* Error Message */}
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          {common.not_found_title || 'Page not found'}
        </h1>
        <p className="text-gray-600 mb-6">
          {common.not_found_message || 'The page you are looking for doesn\'t exist or has been moved.'}
        </p>

        {/* Action Button */}
        <Link
          href={`/${lang}`}
          className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
        >
          {common.home || 'Go to homepage'}
        </Link>
      </div>
    </div>
  );
}
