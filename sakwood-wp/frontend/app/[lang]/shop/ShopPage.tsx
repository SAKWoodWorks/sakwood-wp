'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types';
import { ProductCard, Pagination } from '@/components/ui';
import type { ProductCategory, ProductSortBy } from '@/lib/types';
import { getProductsClient, type ProductsResponse } from '@/lib/services/productServiceClient';

import type { Product } from '@/lib/types';
import { getProductCategories } from '@/lib/services/productServiceCategories';

const PRODUCTS_PER_PAGE = 12;

interface ShopPageProps {
  lang: Locale;
  dictionary: Dictionary;
  initialProducts: Product[];
  initialTotal: number;
}

export function ShopPage({
  lang,
  dictionary,
  initialProducts,
  initialTotal,
}: ShopPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get('category');
  const sortParam = searchParams.get('sort') as ProductSortBy | null;
  const pageParam = searchParams.get('page');

  const [products, setProducts] = useState(initialProducts);
  const [totalProducts, setTotalProducts] = useState(initialTotal);
  const [currentPage, setCurrentPage] = useState(parseInt(pageParam || '1', 10));
  const [categories, setCategories] = useState<ProductCategory[]>([]);

  // Fetch categories from REST API (bypasses GraphQL language field issue)
  useEffect(() => {
    async function fetchCategories() {
      const cats = await getProductCategories(lang);
      setCategories(cats);
    }
    fetchCategories();
  }, [lang]);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam);
  const [sortBy, setSortBy] = useState<ProductSortBy | null>(sortParam);
  const [isLoading, setIsLoading] = useState(false);

  // Update products when category, sort, or page changes
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      const result: ProductsResponse = await getProductsClient(
        lang,
        selectedCategory || undefined,
        sortBy || undefined,
        currentPage,
        PRODUCTS_PER_PAGE
      );
      setProducts(result.products);
      setTotalProducts(result.total);
      setIsLoading(false);
    }

    loadProducts();
  }, [selectedCategory, sortBy, currentPage, lang]);

  const handleCategoryChange = (categorySlug: string | null) => {
    setSelectedCategory(categorySlug);
    setCurrentPage(1); // Reset to page 1 when category changes

    // Update URL
    const params = new URLSearchParams();
    if (categorySlug) params.set('category', categorySlug);
    if (sortBy) params.set('sort', sortBy);

    router.push(`/${lang}/shop${params.toString() ? '?' + params.toString() : ''}`);
  };

  const handleSortChange = (newSortBy: ProductSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1); // Reset to page 1 when sort changes

    // Update URL
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    params.set('sort', newSortBy);

    router.push(`/${lang}/shop${params.toString() ? '?' + params.toString() : ''}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);

    // Update URL
    const params = new URLSearchParams();
    if (selectedCategory) params.set('category', selectedCategory);
    if (sortBy) params.set('sort', sortBy);
    params.set('page', page.toString());

    router.push(`/${lang}/shop${params.toString() ? '?' + params.toString() : ''}`);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            {dictionary.shop.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {dictionary.shop.subtitle}
          </p>
          <p className="text-lg text-blue-600 font-semibold mt-2">
            {totalProducts} {dictionary.shop.products || 'products'}
          </p>
        </div>

        {/* Filters Bar */}
        <div className="mb-12 space-y-6">
          {/* Category Filter */}
          <div>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                {dictionary.shop.filter_by}:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleCategoryChange(null)}
                  className={`px-4 py-2 rounded-lg font-medium transition-all ${
                    selectedCategory === null
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {dictionary.shop.all_categories}
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.slug)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all ${
                      selectedCategory === category.slug
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category.name}
                    {category.count !== undefined && (
                      <span className="ml-2 text-sm opacity-75">({category.count})</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center justify-center gap-4">
            <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              {dictionary.shop.sort_by || 'Sort by'}:
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => handleSortChange('name')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'name'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {dictionary.shop.sort_name || 'Name'}
              </button>
              <button
                onClick={() => handleSortChange('price')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'price'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {dictionary.shop.sort_price || 'Price'}
              </button>
              <button
                onClick={() => handleSortChange('date')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  sortBy === 'date'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {dictionary.shop.sort_newest || 'Newest'}
              </button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-4 text-gray-600">{dictionary.shop.loading}</p>
          </div>
        ) : products.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} lang={lang} dictionary={dictionary} />
              ))}
            </div>

            {/* Pagination */}
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(totalProducts / PRODUCTS_PER_PAGE)}
              totalItems={totalProducts}
              itemsPerPage={PRODUCTS_PER_PAGE}
              onPageChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-16">
            <div className="text-gray-400 text-6xl mb-4">
              <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-700 mb-2">
              {dictionary.shop.no_products}
            </h3>
            <p className="text-gray-500 mb-6">
              {dictionary.shop.no_products_desc}
            </p>
            <Link
              href={`/${lang === 'th' ? 'en' : 'th'}/shop`}
              className="inline-block px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors"
            >
              {dictionary.shop.view_other_lang}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
