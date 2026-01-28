'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { FAQCategory } from '@/lib/types';

interface FAQCategoriesProps {
  categories: FAQCategory[];
  allLabel: string;
  className?: string;
}

export function FAQCategories({
  categories,
  allLabel,
  className,
}: FAQCategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedCategory = searchParams.get('category');

  const handleCategorySelect = (slug: string | undefined) => {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set('category', slug);
    } else {
      params.delete('category');
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className={className}>
      <div className="flex flex-wrap gap-2">
        {/* All Categories Button */}
        <button
          onClick={() => handleCategorySelect(undefined)}
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
            onClick={() => handleCategorySelect(category.slug)}
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
