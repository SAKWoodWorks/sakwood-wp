'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { KBArticle } from '@/lib/types';

interface KBRelatedArticlesProps {
  articles: KBArticle[];
  title: string;
  readMoreLabel: string;
  lang: string;
  className?: string;
}

export function KBRelatedArticles({
  articles,
  title,
  readMoreLabel,
  lang,
  className,
}: KBRelatedArticlesProps) {
  if (!articles || articles.length === 0) {
    return null;
  }

  return (
    <div className={className}>
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <ArrowRight className="w-5 h-5 text-blue-600" />
          {title}
        </h3>

        <ul className="space-y-3">
          {articles.map((article) => (
            <li key={article.id}>
              <Link
                href={`/${lang}/knowledge/${article.slug}`}
                className="group flex items-start gap-3 p-3 rounded-lg hover:bg-white transition-colors"
              >
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {article.title}
                  </h4>
                  {article.category && (
                    <span className="text-xs text-gray-500 mt-1 block">
                      {article.category.name}
                    </span>
                  )}
                </div>
                <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 flex-shrink-0 mt-1 transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
