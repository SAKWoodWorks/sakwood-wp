'use client';

/**
 * CompareIcon Component
 *
 * Header icon showing comparison count with badge.
 * Links to comparison page.
 */

import { useCompare } from '@/context/CompareContext';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import type { Locale } from '@/i18n-config';

interface CompareIconProps {
  lang: Locale;
  className?: string;
}

export function CompareIcon({ lang, className = '' }: CompareIconProps) {
  const { productCount } = useCompare();

  return (
    <Link
      href={`/${lang}/compare`}
      className={`relative flex items-center justify-center p-2 hover:bg-accent rounded-md transition-colors ${className}`}
      aria-label={`Compare products (${productCount} selected)`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </svg>

      {productCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs"
        >
          {productCount > 9 ? '9+' : productCount}
        </Badge>
      )}
    </Link>
  );
}
