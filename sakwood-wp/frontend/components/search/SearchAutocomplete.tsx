'use client';

import { useState, useEffect, useRef } from 'react';
import { Search, Clock, X } from 'lucide-react';
import { searchProducts } from '@/lib/services/searchService';
import type { Locale } from '@/i18n-config';
import Link from 'next/link';

interface SearchAutocompleteProps {
  lang: Locale;
  dictionary: any;
  onClose?: () => void;
}

interface RecentSearch {
  query: string;
  timestamp: number;
}

const MAX_RECENT_SEARCHES = 5;

export function SearchAutocomplete({ lang, dictionary, onClose }: SearchAutocompleteProps) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [recentSearches, setRecentSearches] = useState<RecentSearch[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const dict = dictionary.search || {};

  // Load recent searches from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sakwood-recent-searches');
        if (saved) {
          const searches: RecentSearch[] = JSON.parse(saved);
          setRecentSearches(searches.slice(0, MAX_RECENT_SEARCHES));
        }
      } catch (error) {
        console.error('Failed to load recent searches:', error);
      }
    }
  }, []);

  // Save recent searches to localStorage
  const saveRecentSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) return;

    const newSearch: RecentSearch = {
      query: searchQuery,
      timestamp: Date.now(),
    };

    const updated = [newSearch, ...recentSearches.filter((s) => s.query !== searchQuery)];
    const trimmed = updated.slice(0, MAX_RECENT_SEARCHES);

    setRecentSearches(trimmed);

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sakwood-recent-searches', JSON.stringify(trimmed));
      } catch (error) {
        console.error('Failed to save recent search:', error);
      }
    }
  };

  // Clear recent searches
  const clearRecentSearches = () => {
    setRecentSearches([]);
    if (typeof window !== 'undefined') {
      try {
        localStorage.removeItem('sakwood-recent-searches');
      } catch (error) {
        console.error('Failed to clear recent searches:', error);
      }
    }
  };

  // Fetch suggestions as user types
  useEffect(() => {
    const delay = setTimeout(async () => {
      if (query.length >= 2) {
        setIsLoading(true);
        try {
          const results = await searchProducts(query, lang);
          setSuggestions(results.products.slice(0, 5)); // Top 5 suggestions
          setShowSuggestions(true);
        } catch (error) {
          console.error('Failed to fetch suggestions:', error);
          setSuggestions([]);
        } finally {
          setIsLoading(false);
        }
      } else {
        setSuggestions([]);
        setShowSuggestions(query.length > 0);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [query, lang]);

  // Close suggestions when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;

    saveRecentSearch(searchQuery);
    setShowSuggestions(false);
    window.location.href = `/${lang}/search?q=${encodeURIComponent(searchQuery)}`;
  };

  const handleSuggestionClick = (product: any) => {
    window.location.href = `/${lang}/products/${product.slug}`;
  };

  const handleRecentSearchClick = (searchQuery: string) => {
    setQuery(searchQuery);
    handleSearch(searchQuery);
  };

  const removeRecentSearch = (searchQuery: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = recentSearches.filter((s) => s.query !== searchQuery);
    setRecentSearches(updated);
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sakwood-recent-searches', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to update recent searches:', error);
      }
    }
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl mx-auto">
      {/* Search Input */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
          placeholder={dict.search_placeholder || 'Search products...'}
          className="w-full pl-12 pr-24 py-3 sm:py-4 text-base border-2 border-gray-300 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
          autoFocus
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />

        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-2">
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setSuggestions([]);
                inputRef.current?.focus();
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Clear search"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <button
            type="button"
            onClick={() => handleSearch()}
            disabled={isLoading || !query.trim()}
            className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
          >
            {isLoading ? (
              <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{dict.search_button || 'Search'}</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && (
        <div className="absolute z-50 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden">
          {/* Recent Searches */}
          {query.length === 0 && recentSearches.length > 0 && (
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {dict.recent_searches || 'Recent Searches'}
                </h4>
                <button
                  onClick={clearRecentSearches}
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  {dict.clear || 'Clear'}
                </button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search) => (
                  <button
                    key={search.query}
                    onClick={() => handleRecentSearchClick(search.query)}
                    className="w-full flex items-center justify-between px-3 py-2 text-left hover:bg-gray-50 rounded transition-colors group"
                  >
                    <span className="text-sm text-gray-700">{search.query}</span>
                    <button
                      onClick={(e) => removeRecentSearch(search.query, e)}
                      className="opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-red-600 transition-all"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Product Suggestions */}
          {query.length >= 2 && (
            <div className="p-2">
              {isLoading ? (
                <div className="px-4 py-8 text-center text-gray-500">
                  <div className="inline-block w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                  <p className="mt-2 text-sm">{dict.loading || 'Loading...'}</p>
                </div>
              ) : suggestions.length > 0 ? (
                <div className="space-y-1">
                  <div className="px-3 py-2 text-xs font-semibold text-gray-500 uppercase">
                    {dict.suggestions || 'Suggestions'}
                  </div>
                  {suggestions.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleSuggestionClick(product)}
                      className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded transition-colors"
                    >
                      {product.image?.sourceUrl && (
                        <img
                          src={product.image.sourceUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded"
                        />
                      )}
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-gray-900 line-clamp-1">
                          {product.name}
                        </div>
                        {product.price && (
                          <div className="text-sm text-blue-600">{product.price}</div>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="px-4 py-8 text-center text-gray-500">
                  <Search className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p className="text-sm">{dict.no_suggestions || 'No suggestions found'}</p>
                </div>
              )}
            </div>
          )}

          {/* Search for full query */}
          {query.length >= 2 && (
            <div className="p-2 border-t border-gray-200">
              <button
                onClick={() => handleSearch()}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 rounded transition-colors text-left"
              >
                <Search className="w-5 h-5 text-gray-400" />
                <span className="text-sm font-medium text-blue-600">
                  {dict.search_for || 'Search for'} &quot;{query}&quot;
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
