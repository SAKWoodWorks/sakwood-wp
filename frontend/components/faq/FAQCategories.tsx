'use client';

import { cn } from '@/lib/utils';
import type { FAQCategory } from '@/lib/types';

interface FAQCategoriesProps {
  categories: FAQCategory[];
  selectedCategory?: string;
  onSelectCategory: (slug: string | undefined) => void;
  allLabel: string;
  className?: string;
}

export function FAQCategories({
  categories,
  selectedCategory,
  onSelectCategory,
  allLabel,
  className,
}: FAQCategoriesProps) {
  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <button
          onClick={() => onSelectCategory(undefined)}
          className={cn(
            'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
            !selectedCategory
              ? 'bg-blue-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          )}
        >
          {allLabel}
        </button>

        {/* Category Buttons */}
        {categories?.map((category) => (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.slug)}
            className={cn(
              'px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200',
              selectedCategory === category.slug
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
}
