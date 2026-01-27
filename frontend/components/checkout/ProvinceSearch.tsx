'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, ChevronDown, X } from 'lucide-react';

interface ProvinceSearchProps {
  provinces: string[];
  value: string;
  onChange: (province: string) => void;
  placeholder?: string;
  lang?: 'th' | 'en';
  disabled?: boolean;
}

export function ProvinceSearch({
  provinces,
  value,
  onChange,
  placeholder = 'Search province...',
  lang = 'th',
  disabled = false,
}: ProvinceSearchProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Display name for selected value
  const displayName = value || '';

  // Filter provinces based on search query
  const filteredProvinces = useCallback(() => {
    if (!searchQuery) {
      return provinces.slice(0, 10); // Show first 10 when no search
    }

    const query = searchQuery.toLowerCase();
    return provinces.filter((province) =>
      province.toLowerCase().includes(query)
    ).slice(0, 10); // Max 10 results
  }, [provinces, searchQuery]);

  const results = filteredProvinces();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !inputRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        setIsOpen(true);
        e.preventDefault();
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleSelect(results[highlightedIndex]);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  // Handle selecting a province
  const handleSelect = (province: string) => {
    onChange(province);
    setSearchQuery('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Handle clearing selection
  const handleClear = () => {
    onChange('');
    setSearchQuery('');
    inputRef.current?.focus();
  };

  // Handle input focus
  const handleFocus = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  // Highlight matching text
  const highlightMatch = (text: string, query: string) => {
    if (!query) return text;

    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-gray-900 rounded px-0.5">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Input with search icon */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-4 w-4 text-gray-400" />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={isOpen ? searchQuery : displayName}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all disabled:bg-gray-100 disabled:cursor-not-allowed text-gray-900 placeholder:text-gray-400"
          autoComplete="off"
        />

        {/* Clear button */}
        {value && !isOpen && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        {/* Dropdown arrow */}
        {!value && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <ChevronDown className="h-4 w-4 text-gray-400" />
          </div>
        )}
      </div>

      {/* Dropdown results */}
      {isOpen && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.length > 0 ? (
            results.map((province, index) => (
              <button
                key={province}
                type="button"
                onClick={() => handleSelect(province)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`w-full px-4 py-2 text-left text-sm transition-colors ${
                  highlightedIndex === index
                    ? 'bg-blue-50 text-blue-900'
                    : value === province
                    ? 'bg-green-50 text-green-900 font-medium'
                    : 'text-gray-900 hover:bg-gray-50'
                }`}
              >
                {highlightMatch(province, searchQuery)}
              </button>
            ))
          ) : (
            <div className="px-4 py-3 text-sm text-gray-500 text-center">
              {lang === 'th' ? 'ไม่พบจังหวัด' : 'No provinces found'}
            </div>
          )}
        </div>
      )}

      {/* Selected province display (when dropdown is closed) */}
      {value && !isOpen && (
        <input type="hidden" name="province" value={value} />
      )}
    </div>
  );
}
