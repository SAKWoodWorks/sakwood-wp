'use client';

import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface LanguageSwitcherProps {
  currentLang: Locale;
  slug: string;
  availableLanguages: Locale[];
  dictionary?: {
    read_in: string;
    english: string;
    thai: string;
  };
}

/**
 * Language switcher for blog posts
 * Shows links to view the same post in different languages
 */
export function LanguageSwitcher({
  currentLang,
  slug,
  availableLanguages,
  dictionary
}: LanguageSwitcherProps) {
  const dict = dictionary || {
    read_in: 'Read this in',
    english: 'English',
    thai: 'Thai',
  };

  // Only show if there are multiple languages available
  if (availableLanguages.length <= 1) {
    return null;
  }

  const otherLanguages = availableLanguages.filter(lang => lang !== currentLang);

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <p className="text-sm font-medium text-blue-900 mb-2">
        {dict.read_in}:
      </p>
      <div className="flex flex-wrap gap-2">
        {otherLanguages.map((lang) => (
          <Link
            key={lang}
            href={`/${lang}/blog/${slug}`}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-blue-300 rounded-md text-sm font-medium text-blue-700 hover:bg-blue-100 transition-colors"
          >
            <span className="text-lg">
              {lang === 'en' ? '🇬🇧' : '🇹🇭'}
            </span>
            <span>{lang === 'en' ? dict.english : dict.thai}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

/**
 * Simple language badge component
 * Shows a small badge indicating the post's language
 */
export function LanguageBadge({
  language,
  showFlag = true,
}: {
  language: string;
  showFlag?: boolean;
}) {
  if (!language) return null;

  const langConfig = {
    en: { label: 'EN', flag: '🇬🇧' },
    th: { label: 'TH', flag: '🇹🇭' },
  };

  const config = langConfig[language as keyof typeof langConfig];
  if (!config) return null;

  return (
    <span
      className="inline-flex items-center gap-1.5 px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded"
    >
      {showFlag && <span>{config.flag}</span>}
      <span>{config.label}</span>
    </span>
  );
}
