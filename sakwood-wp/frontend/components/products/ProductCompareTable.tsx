'use client';

import { useCompare } from '@/lib/context/CompareContext';
import { type Product } from '@/lib/types/product';
import Link from 'next/link';
import Image from 'next/image';
import { X, Check, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';

interface ProductCompareTableProps {
  lang: string;
  dictionary: {
    compare?: {
      compare_products: string;
      remove: string;
      specifications: string;
      price: string;
      dimensions: string;
      price_per_sqm: string;
      price_per_sqft: string;
      image: string;
      product: string;
      view_product: string;
      add_to_compare: string;
      clear_all: string;
      difference: string;
      no_products: string;
      back_to_shopping: string;
    };
    common?: {
      home: string;
      products: string;
    };
  };
}

export function ProductCompareTable({ lang, dictionary }: ProductCompareTableProps) {
  const { compareItems, removeFromCompare, clearCompare } = useCompare();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const compare = dictionary.compare || {
    compare_products: 'Compare Products',
    remove: 'Remove',
    specifications: 'Specifications',
    price: 'Price',
    dimensions: 'Dimensions',
    price_per_sqm: 'Price per m²',
    price_per_sqft: 'Price per ft²',
    image: 'Image',
    product: 'Product',
    view_product: 'View Product',
    add_to_compare: 'Add to Compare',
    clear_all: 'Clear All',
    difference: 'Difference',
    no_products: 'No products to compare',
    back_to_shopping: 'Back to Shopping',
  };

  const common = dictionary.common || {
    home: 'Home',
    products: 'Products',
  };

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded mb-4 w-1/3 mx-auto"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto"></div>
          </div>
        </div>
      </div>
    );
  }

  if (compareItems.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2a2 2 0 012-2m-6 9l6-6m0 0l6-6m-6 6h6" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">{compare.no_products}</h2>
          <p className="text-gray-600 mb-6">Add products to compare their features and prices.</p>
          <Link
            href={`/${lang}/shop`}
            className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-lg"
          >
            {compare.back_to_shopping}
          </Link>
        </div>
      </div>
    );
  }

  // Helper function to get unique values
  const getUniqueValues = (key: string) => {
    const values = compareItems
      .map((p) => {
        const value = (p as unknown as Record<string, unknown>)[key];
        return value ?? null;
      })
      .filter((v): v is string | number | boolean => v !== null);
    return Array.from(new Set(values));
  };

  // Check if value is unique (different from others)
  const isUniqueValue = (key: string, value: unknown) => {
    const values = compareItems
      .map((p) => {
        const val = (p as unknown as Record<string, unknown>)[key];
        return val ?? null;
      })
      .filter((v): v is string | number | boolean => v !== null);
    return values.filter((v) => v === value).length === 1;
  };

  // Parse price to number for comparison
  const parsePrice = (priceStr: string) => {
    if (!priceStr) return 0;
    const numStr = priceStr.replace(/[฿,\s]/g, '');
    return parseFloat(numStr) || 0;
  };

  // Calculate surface area from dimensions
  // length is in meters, width is in cm
  // surfaceArea = length (m) × (width (cm) / 100)
  const getSurfaceArea = (product: Product) => {
    const length = parseFloat(String(product.length || '0'));
    const width = parseFloat(String(product.width || '0'));
    if (length > 0 && width > 0) {
      return length * (width / 100); // Convert width from cm to meters
    }
    return null;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900">{compare.compare_products}</h1>
          {compareItems.length > 0 && (
            <button
              onClick={clearCompare}
              className="px-4 py-2 text-red-600 hover:text-red-700 font-medium transition-colors"
            >
              {compare.clear_all}
            </button>
          )}
        </div>

        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href={`/${lang}`} className="hover:text-blue-900">{common.home}</Link>
          <span>/</span>
          <Link href={`/${lang}/shop`} className="hover:text-blue-900">{common.products}</Link>
          <span>/</span>
          <span className="text-gray-900">{compare.compare_products}</span>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {/* Product Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              {compare.product}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => (
                <div key={product.id} className="p-4 relative">
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-600 transition-colors z-10"
                    title={compare.remove}
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="space-y-3">
                    {product.image?.sourceUrl && (
                      <Link href={`/${lang}/products/${product.slug}`} className="block">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                          <Image
                            src={product.image.sourceUrl}
                            alt={product.image.altText || product.name}
                            fill
                            className="object-cover hover:scale-110 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        </div>
                      </Link>
                    )}
                    <h3 className="font-semibold text-gray-900 line-clamp-2">
                      <Link
                        href={`/${lang}/products/${product.slug}`}
                        className="hover:text-blue-900 transition-colors"
                      >
                        {product.name}
                      </Link>
                    </h3>
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {compare.view_product}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Price Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              {compare.price}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => {
                const price = parsePrice(product.price || '');
                const regularPrice = parsePrice(product.regularPrice || '');
                const hasDiscount = regularPrice > price;
                const isLowestPrice = compareItems.every((p) => parsePrice(p.price || '') >= price);

                return (
                  <div
                    key={product.id}
                    className={`p-4 ${isUniqueValue('price', product.price) ? 'bg-green-50' : ''}`}
                  >
                    {hasDiscount ? (
                      <div>
                        <div className="text-lg font-bold text-green-600">
                          ฿{product.price}
                        </div>
                        <div className="text-sm text-gray-400 line-through">
                          ฿{product.regularPrice}
                        </div>
                      </div>
                    ) : (
                      <div className={`text-lg font-bold ${isLowestPrice ? 'text-green-600' : 'text-gray-900'}`}>
                        {product.price || 'N/A'}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Dimensions Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              {compare.dimensions}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => {
                const dimensions = [product.length, product.width, product.thickness]
                  .filter(Boolean)
                  .join(' × ');

                return (
                  <div
                    key={product.id}
                    className={`p-4 ${isUniqueValue('length', product.length) ? 'bg-blue-50' : ''}`}
                  >
                    {dimensions ? `${dimensions} m` : 'N/A'}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price per Square Meter Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              {compare.price_per_sqm}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => {
                const price = parsePrice(product.price || '');
                const surfaceArea = getSurfaceArea(product);
                const pricePerSqm = surfaceArea !== null && surfaceArea > 0 ? price / surfaceArea : null;
                const pricesPerSqm = compareItems
                  .map((p) => {
                    const pPrice = parsePrice(p.price || '');
                    const pSurfaceArea = getSurfaceArea(p);
                    return pSurfaceArea !== null && pSurfaceArea > 0 ? pPrice / pSurfaceArea : null;
                  })
                  .filter((v): v is number => v !== null);
                const isLowest = pricePerSqm !== null && pricesPerSqm.every((v) => v >= pricePerSqm);

                return (
                  <div
                    key={product.id}
                    className={`p-4 ${isLowest ? 'bg-green-50' : ''}`}
                  >
                    <div className={`text-lg font-bold ${isLowest ? 'text-green-600' : 'text-gray-900'}`}>
                      {pricePerSqm !== null ? `฿${pricePerSqm.toFixed(2)} /m²` : 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Price per Square Foot Row */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              {compare.price_per_sqft}
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => {
                const price = parsePrice(product.price || '');
                const surfaceArea = getSurfaceArea(product);
                // 1 square meter = 10.7639 square feet
                const pricePerSqft = surfaceArea !== null && surfaceArea > 0 ? (price / surfaceArea) / 10.7639 : null;
                const pricesPerSqft = compareItems
                  .map((p) => {
                    const pPrice = parsePrice(p.price || '');
                    const pSurfaceArea = getSurfaceArea(p);
                    return pSurfaceArea !== null && pSurfaceArea > 0 ? (pPrice / pSurfaceArea) / 10.7639 : null;
                  })
                  .filter((v): v is number => v !== null);
                const isLowest = pricePerSqft !== null && pricesPerSqft.every((v) => v >= pricePerSqft);

                return (
                  <div
                    key={product.id}
                    className={`p-4 ${isLowest ? 'bg-green-50' : ''}`}
                  >
                    <div className={`text-lg font-bold ${isLowest ? 'text-green-600' : 'text-gray-900'}`}>
                      {pricePerSqft !== null ? `฿${pricePerSqft.toFixed(2)} /ft²` : 'N/A'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Stock Status Row */}
        <div>
          <div className="flex">
            <div className="w-48 md:w-56 p-4 bg-gray-50 font-semibold text-gray-700 flex items-center">
              Availability
            </div>
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-x divide-gray-200">
              {compareItems.map((product) => (
                <div key={product.id} className="p-4">
                  <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    <Check className="w-4 h-4" />
                    In Stock
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-6 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 rounded border border-green-200"></div>
          <span className="text-gray-600">Best Value (Lowest Price)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-blue-50 rounded border border-blue-200"></div>
          <span className="text-gray-600">Unique Feature</span>
        </div>
      </div>
    </div>
  );
}
