'use client';

import { cn } from '@/lib/utils';

interface VideoCategory {
  id: string;
  name: string;
  slug: string;
  count?: number;
}

interface VideoCategoriesProps {
  categories: VideoCategory[];
  selectedCategory?: string;
  onSelectCategory: (slug: string | undefined) => void;
  allLabel: string;
  className?: string;
}

export function VideoCategories({
  categories,
  selectedCategory,
  onSelectCategory,
  allLabel,
  className,
}: VideoCategoriesProps) {
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
            {category.count !== undefined && (
              <span className="ml-1 text-xs opacity-75">
                ({category.count})
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
