'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X, Loader2 } from 'lucide-react';
import { searchProducts } from '@/lib/services/searchService';
import type { Locale } from '@/i18n-config';
import Link from 'next/link';

interface SearchResultProduct {
  id: string;
  name: string;
  slug: string;
  price?: string;
  regularPrice?: string;
  description?: string;
  image?: {
    sourceUrl: string;
    altText?: string;
  };
}

interface SearchResultsProps {
  lang: Locale;
  dictionary: any;
  searchQuery: string;
  initialResults: {
    products: SearchResultProduct[];
    total: number;
  };
}

export function SearchResults({
  lang,
  dictionary,
  searchQuery,
  initialResults,
}: SearchResultsProps) {
  const router = useRouter();
  const [query, setQuery] = useState(searchQuery);
  const [results, setResults] = useState(initialResults);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(true);

  const dict = dictionary.search || {
    title: lang === 'th' ? 'ค้นหาสินค้า' : 'Search Products',
    search_placeholder: lang === 'th' ? 'ค้นหาชื่อสินค้า...' : 'Search products...',
    search_button: lang === 'th' ? 'ค้นหา' : 'Search',
    no_results: lang === 'th' ? 'ไม่พบสินค้า' : 'No products found',
    no_results_text: lang === 'th'
      ? 'ลอค้นหาด้วยคำค้นอื่น'
      : 'Try searching with different keywords',
    results_found: lang === 'th' ? 'พบ {count} สินค้า' : 'Found {count} products',
    view_details: lang === 'th' ? 'ดูรายละเอียด' : 'View Details',
  };

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm || searchTerm.trim().length === 0) return;

    setIsLoading(true);
    setHasSearched(true);

    try {
      const data = await searchProducts(searchTerm, lang);
      setResults(data);
    } catch (error) {
      console.error('Search error:', error);
      setResults({ products: [], total: 0 });
    } finally {
      setIsLoading(false);
    }

    // Update URL without full page reload
    const params = new URLSearchParams({ q: searchTerm });
    router.replace(`/${lang}/search?${params.toString()}`, { scroll: false });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(query);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 text-center">
              {dict.title}
            </h1>

            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={dict.search_placeholder}
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
                      setResults({ products: [], total: 0 });
                      setHasSearched(false);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Clear search"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}

                <button
                  type="submit"
                  disabled={isLoading || !query.trim()}
                  className="px-4 sm:px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm sm:text-base"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4 sm:w-5 sm:h-5" />
                      <span className="hidden sm:inline">{dict.search_button}</span>
                    </>
                  )}
                </button>
              </div>
            </form>

            {hasSearched && !isLoading && (
              <div className="mt-4 text-center text-sm text-gray-600">
                {results.total > 0 ? (
                  dict.results_found.replace('{count}', String(results.total))
                ) : (
                  dict.no_results
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Results */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="w-8 h-8 sm:w-12 sm:h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {!isLoading && hasSearched && results.products.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {results.products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                {/* Product Image */}
                <Link href={`/${lang}/products/${product.slug}`} className="block">
                  <div className="relative aspect-square bg-gray-100 overflow-hidden">
                    {product.image?.sourceUrl ? (
                      <img
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-300">
                        <svg className="w-16 h-16 sm:w-24 sm:h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    )}
                  </div>
                </Link>

                {/* Product Info */}
                <div className="p-4">
                  <Link href={`/${lang}/products/${product.slug}`}>
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors text-sm sm:text-base">
                      {product.name}
                    </h3>
                  </Link>

                  {product.price && (
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex flex-col">
                        <span className="text-lg sm:text-xl font-bold text-blue-600">
                          {product.price}
                        </span>
                        {product.regularPrice && product.regularPrice !== product.price && (
                          <span className="text-xs sm:text-sm text-gray-400 line-through">
                            {product.regularPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <Link
                    href={`/${lang}/products/${product.slug}`}
                    className="mt-3 sm:mt-4 block w-full text-center px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors text-sm font-semibold"
                  >
                    {dict.view_details}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && hasSearched && results.products.length === 0 && (
          <div className="text-center py-12 sm:py-16">
            <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 bg-gray-100 rounded-full mb-4 sm:mb-6">
              <Search className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2">
              {dict.no_results}
            </h3>
            <p className="text-gray-500 text-sm sm:text-base mb-4 sm:mb-6">
              {dict.no_results_text}
            </p>
            <p className="text-sm text-gray-600">
              {lang === 'th' ? 'คำค้นที่ค้นหา: ' : 'Search query: '} <strong>"{query}"</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
