'use client';

import Link from 'next/link';
import { Product } from '@/lib/types';
import { Card, CardContent, Badge } from '@/components/ui';
import type { Locale } from '@/i18n-config';
import { useCart } from '@/lib/context/CartContext';

interface ProductCardProps {
  product: Product;
  lang?: Locale;
}

export function ProductCard({ product, lang = 'th' }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/${lang}/products/${product.slug}`} className="block group">
      <Card className="overflow-hidden h-full hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-gray-100">
        {/* Image Area */}
        <div className="h-72 bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
          {product.image?.sourceUrl ? (
            <img 
              src={product.image.sourceUrl} 
              alt={product.name} 
              className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-blue-300">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}
          
          {/* Quick view overlay */}
          <div className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/20 transition-colors duration-300 flex items-center justify-center">
            <Badge className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white text-blue-700 hover:bg-blue-50 border-0 shadow-lg px-4 py-2 text-sm font-semibold">
              Quick View
            </Badge>
          </div>
        </div>

        {/* Content Area */}
        <CardContent className="p-6">
          <h3 className="font-bold text-xl text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-700 transition-colors">
            {product.name}
          </h3>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-blue-700 font-bold text-2xl">
                {product.price || "Contact Us"}
              </span>
              {product.regularPrice && product.price !== product.regularPrice && (
                <span className="text-gray-400 line-through text-sm">
                  {product.regularPrice}
                </span>
              )}
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors duration-300"
              aria-label="Add to cart"
            >
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </button>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export function ProductCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full border-gray-100">
      <div className="h-72 bg-gradient-to-br from-blue-50 to-indigo-50 animate-pulse" />
      <CardContent className="p-6">
        <div className="h-6 bg-gray-200 rounded mb-3 animate-pulse" />
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse" />
      </CardContent>
    </Card>
  );
}
