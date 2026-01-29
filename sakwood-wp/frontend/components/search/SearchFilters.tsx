'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface SearchFiltersProps {
  lang: 'th' | 'en';
  dictionary: any;
  onFiltersChange: (filters: SearchFiltersState) => void;
  initialFilters?: SearchFiltersState;
}

export interface SearchFiltersState {
  priceRange: [number, number];
  length?: { min: number; max: number };
  width?: { min: number; max: number };
  thickness?: { min: number; max: number };
  grade?: string[];
  inStockOnly: boolean;
}

const GRADES = {
  th: ['เอ', 'บี', 'ซี', 'ดี'],
  en: ['A', 'B', 'C', 'D'],
};

export function SearchFilters({
  lang,
  dictionary,
  onFiltersChange,
  initialFilters,
}: SearchFiltersProps) {
  const [filters, setFilters] = useState<SearchFiltersState>(
    initialFilters || {
      priceRange: [0, 100000],
      inStockOnly: false,
    }
  );

  const dict = dictionary.search || {};

  useEffect(() => {
    const timeout = setTimeout(() => {
      onFiltersChange(filters);
    }, 300);

    return () => clearTimeout(timeout);
  }, [filters, onFiltersChange]);

  const updatePriceRange = (index: number, value: number) => {
    const newRange = [...filters.priceRange] as [number, number];
    newRange[index] = value;
    setFilters({ ...filters, priceRange: newRange });
  };

  const toggleGrade = (grade: string) => {
    const currentGrades = filters.grade || [];
    const newGrades = currentGrades.includes(grade)
      ? currentGrades.filter((g) => g !== grade)
      : [...currentGrades, grade];
    setFilters({ ...filters, grade: newGrades });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 100000],
      inStockOnly: false,
    });
  };

  const hasActiveFilters =
    filters.priceRange[0] > 0 ||
    filters.priceRange[1] < 100000 ||
    (filters.grade && filters.grade.length > 0) ||
    filters.inStockOnly;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-gray-900">
          {dict.filters || 'Filters'}
        </h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-700 font-medium"
          >
            {dict.clear_all || 'Clear All'}
          </button>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {dict.price_range || 'Price Range'}
        </h4>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{lang === 'th' ? '฿' : 'THB'}</span>
            <input
              type="number"
              value={filters.priceRange[0]}
              onChange={(e) => updatePriceRange(0, parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="100000"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={filters.priceRange[1]}
              onChange={(e) => updatePriceRange(1, parseInt(e.target.value) || 0)}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="100000"
            />
          </div>
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[0]}
            onChange={(e) => updatePriceRange(0, parseInt(e.target.value))}
            className="w-full"
          />
          <input
            type="range"
            min="0"
            max="100000"
            value={filters.priceRange[1]}
            onChange={(e) => updatePriceRange(1, parseInt(e.target.value))}
            className="w-full"
          />
        </div>
      </div>

      {/* Dimensions Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {dict.dimensions || 'Dimensions'}
        </h4>

        {/* Length */}
        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">
            {dict.length || 'Length'} ({lang === 'th' ? 'มม.' : 'mm'})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={dict.min || 'Min'}
              value={filters.length?.min || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  length: { min: parseInt(e.target.value) || 0, max: filters.length?.max || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder={dict.max || 'Max'}
              value={filters.length?.max || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  length: { min: filters.length?.min || 0, max: parseInt(e.target.value) || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Width */}
        <div className="mb-4">
          <label className="block text-xs text-gray-600 mb-1">
            {dict.width || 'Width'} ({lang === 'th' ? 'มม.' : 'mm'})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={dict.min || 'Min'}
              value={filters.width?.min || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  width: { min: parseInt(e.target.value) || 0, max: filters.width?.max || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder={dict.max || 'Max'}
              value={filters.width?.max || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  width: { min: filters.width?.min || 0, max: parseInt(e.target.value) || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Thickness */}
        <div>
          <label className="block text-xs text-gray-600 mb-1">
            {dict.thickness || 'Thickness'} ({lang === 'th' ? 'มม.' : 'mm'})
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder={dict.min || 'Min'}
              value={filters.thickness?.min || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  thickness: { min: parseInt(e.target.value) || 0, max: filters.thickness?.max || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
            <input
              type="number"
              placeholder={dict.max || 'Max'}
              value={filters.thickness?.max || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  thickness: { min: filters.thickness?.min || 0, max: parseInt(e.target.value) || 0 },
                })
              }
              className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Grade Filter */}
      <div className="mb-6">
        <h4 className="text-sm font-semibold text-gray-900 mb-3">
          {dict.grade || 'Grade'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {GRADES[lang].map((grade) => (
            <button
              key={grade}
              onClick={() => toggleGrade(grade)}
              className={`px-4 py-2 rounded-lg border-2 transition-colors ${
                filters.grade?.includes(grade)
                  ? 'border-blue-600 bg-blue-600 text-white'
                  : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>

      {/* Stock Status */}
      <div className="mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) =>
              setFilters({ ...filters, inStockOnly: e.target.checked })
            }
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <span className="text-sm text-gray-700">
            {dict.in_stock_only || 'In Stock Only'}
          </span>
        </label>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="pt-4 border-t border-gray-200">
          <h4 className="text-sm font-semibold text-gray-900 mb-2">
            {dict.active_filters || 'Active Filters'}
          </h4>
          <div className="flex flex-wrap gap-2">
            {filters.priceRange[0] > 0 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                {dict.price || 'Price'} &gt;= {filters.priceRange[0]}
                <button
                  onClick={() => updatePriceRange(0, 0)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.priceRange[1] < 100000 && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                {dict.price || 'Price'} &lt;= {filters.priceRange[1]}
                <button
                  onClick={() => updatePriceRange(1, 100000)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filters.grade?.map((grade) => (
              <span
                key={grade}
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded"
              >
                {grade}
                <button
                  onClick={() => toggleGrade(grade)}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.inStockOnly && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                {dict.in_stock || 'In Stock'}
                <button
                  onClick={() => setFilters({ ...filters, inStockOnly: false })}
                  className="hover:text-blue-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
