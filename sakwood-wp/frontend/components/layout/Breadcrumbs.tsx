import Link from 'next/link';
import type { Locale } from '@/i18n-config';

export interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  lang: Locale;
}

export function Breadcrumbs({ items, lang }: BreadcrumbsProps) {
  return (
    <nav className="py-4 px-6 bg-slate-50 border-b border-slate-200" aria-label="Breadcrumb navigation">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center gap-2 text-sm text-slate-600">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center gap-2">
              {index > 0 && (
                <span className="text-slate-400" aria-hidden="true">/</span>
              )}
              {index === items.length - 1 ? (
                <span className="font-medium text-slate-900" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link 
                  href={item.href} 
                  className="hover:text-blue-600 transition-colors"
                >
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
