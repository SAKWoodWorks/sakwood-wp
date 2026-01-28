'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, Badge } from '@/components/ui';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import type { Locale } from '@/i18n-config';
import { useCart } from '@/lib/context/CartContext';
import { AddToCompareButton } from '@/components/products/AddToCompareButton';
import { Eye, ShoppingCart, Check } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  lang?: Locale;
  dictionary?: Record<string, any>;
}

export function ProductCard({ product, lang = 'th', dictionary }: ProductCardProps) {
  const { addToCart } = useCart();
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showCartSuccess, setShowCartSuccess] = useState(false);

  // Currency symbol based on language
  const currency = lang === 'th' ? 'บาท' : 'THB';

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setIsAddingToCart(true);

    // Simulate animation delay
    await new Promise(resolve => setTimeout(resolve, 600));

    addToCart(product);
    setIsAddingToCart(false);
    setShowCartSuccess(true);

    // Reset success state after animation
    setTimeout(() => setShowCartSuccess(false), 2000);
  };

  return (
    <>
      <Link href={`/${lang}/products/${product.slug}`} className="block group">
        <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-gray-100 hover:border-blue-300">
          {/* Image Area */}
          <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
            {product.image?.sourceUrl ? (
              <img
                src={product.image.sourceUrl}
                alt={product.name}
                className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            ) : (
              <div className="flex items-center justify-center h-full text-blue-300">
                <svg className="w-12 h-12 sm:w-16 sm:h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}

            {/* Quick view overlay */}
            <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/40 transition-colors duration-300 flex items-center justify-center">
              <button
                onClick={handleQuickView}
                className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white hover:bg-blue-50 text-blue-700 border-0 shadow-lg px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold rounded-lg flex items-center gap-1.5 sm:gap-2 hover:scale-105 active:scale-95"
              >
                <Eye className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span className="hidden sm:inline">{dictionary?.quick_view?.quick_view || (lang === 'th' ? 'ดูสินค้า' : 'Quick View')}</span>
              </button>
            </div>
          </div>

        {/* Content Area */}
        <CardContent className="p-4 sm:p-5 lg:p-6">
          <h3 className="font-bold text-base sm:text-lg lg:text-xl text-gray-900 mb-2 sm:mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>

          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-blue-700 font-bold text-lg sm:text-xl lg:text-2xl">
                {product.price ? `${product.price} ${currency}` : "Contact Us"}
              </span>
              {product.regularPrice && product.price !== product.regularPrice && (
                <span className="text-gray-400 line-through text-xs sm:text-sm">
                  {product.regularPrice} {currency}
                </span>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-1.5 sm:gap-2">
              {/* Add to Compare Button */}
              <AddToCompareButton
                product={product}
                variant="icon"
                dictionary={dictionary}
              />

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isAddingToCart}
                className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 active:scale-90 ${
                  showCartSuccess
                    ? 'bg-green-600 hover:bg-green-700 shadow-lg shadow-green-200'
                    : 'bg-blue-900 hover:bg-blue-800 shadow-lg shadow-blue-200'
                }`}
                aria-label="Add to cart"
              >
                {isAddingToCart ? (
                  <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : showCartSuccess ? (
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white animate-[bounce_0.5s_ease-out]" />
                ) : (
                  <ShoppingCart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                )}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>

    <QuickViewModal
      product={product}
      isOpen={isQuickViewOpen}
      onClose={() => setIsQuickViewOpen(false)}
      lang={lang}
      dictionary={dictionary}
    />
  </>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full border-gray-100">
      <div className="h-48 sm:h-56 md:h-64 lg:h-72 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />
      <CardContent className="p-4 sm:p-5 lg:p-6">
        <div className="h-5 sm:h-6 bg-gray-200 rounded mb-2 sm:mb-3 animate-pulse" />
        <div className="h-7 sm:h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
      </CardContent>
    </Card>
  );
}
