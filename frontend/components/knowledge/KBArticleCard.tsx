'use client';

import Link from 'next/link';
import { Eye, Clock } from 'lucide-react';
import { KBDifficultyBadge } from './KBDifficultyBadge';
import type { KBArticle } from '@/lib/types';

interface KBArticleCardProps {
  article: KBArticle;
  difficultyLabels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

export function KBArticleCard({ article, difficultyLabels }: KBArticleCardProps) {
  const getDifficultyLabel = () => {
    if (!article.difficulty) return null;
    return difficultyLabels[article.difficulty] || article.difficulty;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <Link
      href={`/knowledge/${article.slug}`}
      className="group block bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Article Header */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-3">
          {/* Difficulty Badge */}
          {article.difficulty && getDifficultyLabel() && (
            <KBDifficultyBadge
              difficulty={article.difficulty}
              label={getDifficultyLabel()!}
            />
          )}

          {/* Stats */}
          <div className="flex items-center gap-3 text-sm text-gray-500">
            {article.views !== undefined && (
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {article.views}
              </span>
            )}
            {article.lastUpdated && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {formatDate(article.lastUpdated)}
              </span>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {article.title}
        </h3>

        {/* Excerpt */}
        {article.content && (
          <p
            className="text-gray-600 text-sm line-clamp-3"
            dangerouslySetInnerHTML={{
              __html: article.content.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
            }}
          />
        )}
      </div>

      {/* Category Footer */}
      {article.category && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <span className="text-sm font-medium text-blue-600">
            {article.category.name}
          </span>
        </div>
      )}
    </Link>
  );
}
