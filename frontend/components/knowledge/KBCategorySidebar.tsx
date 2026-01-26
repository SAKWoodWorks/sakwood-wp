'use client';

import Link from 'next/link';
import { ChevronRight, FolderOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { KBCategory } from '@/lib/types/knowledge-base';

interface KBCategorySidebarProps {
  categories: KBCategory[];
  selectedCategory?: string;
  lang: string;
  className?: string;
}

export function KBCategorySidebar({
  categories,
  selectedCategory,
  lang,
  className,
}: KBCategorySidebarProps) {
  // Render a single category (can be recursive for children)
  const renderCategory = (category: KBCategory, depth: number = 0) => {
    const hasChildren = category.children && category.children.length > 0;
    const isSelected = selectedCategory === category.slug;

    return (
      <div key={category.id} className={depth > 0 ? 'ml-4 mt-2' : ''}>
        <Link
          href={`/${lang}/knowledge/category/${category.slug}`}
          className={cn(
            'flex items-center justify-between py-2 px-3 rounded-lg text-sm transition-colors',
            isSelected
              ? 'bg-blue-600 text-white font-medium'
              : 'text-gray-700 hover:bg-gray-100'
          )}
        >
          <span className="flex items-center gap-2">
            {depth === 0 && <FolderOpen className="w-4 h-4" />}
            <span className="flex-1">{category.name}</span>
            {category.count !== undefined && (
              <span className={cn(
                'text-xs',
                isSelected ? 'text-white/80' : 'text-gray-400'
              )}>
                ({category.count})
              </span>
            )}
          </span>
          {hasChildren && (
            <ChevronRight
              className={cn(
                'w-4 h-4 transition-transform',
                isSelected ? 'text-white' : 'text-gray-400'
              )}
            />
          )}
        </Link>

        {/* Render children if they exist */}
        {hasChildren && category.children!.map((child) =>
          renderCategory(child, depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
          Categories
        </h3>

        <div className="space-y-1">
          {categories.map((category) => renderCategory(category))}
        </div>
      </div>
    </div>
  );
}
