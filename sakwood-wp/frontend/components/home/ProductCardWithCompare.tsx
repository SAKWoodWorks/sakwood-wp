'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import type { Product } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import { AddToCompareButton } from '@/components/products/AddToCompareButton';
import { QuickViewModal } from '@/components/products/QuickViewModal';
import { Eye } from 'lucide-react';

interface ProductCardWithCompareProps {
  product: Product;
  lang: Locale;
  index: number;
  dictionary?: Record<string, any>;
}

export function ProductCardWithCompare({ product, lang, index, dictionary }: ProductCardWithCompareProps) {
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsQuickViewOpen(true);
  };

  return (
    <>
    <article
      role="listitem"
      className="opacity-0 animate-fadeIn"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="group bg-white border border-slate-100 hover:border-blue-300 hover:shadow-2xl transition-all duration-500 rounded-xl overflow-hidden transform hover:-translate-y-2">
        {/* Product Image */}
        <div className="aspect-square relative overflow-hidden bg-slate-100">
          <div
            className="absolute inset-0 bg-blue-900/0 group-hover:bg-blue-900/10 transition-all duration-500 z-10"
            aria-hidden="true"
          ></div>
          <Link href={`/${lang}/products/${product.slug}`} className="block h-full w-full">
            {product.image?.sourceUrl ? (
              <Image
                src={product.image.sourceUrl}
                alt={`${product.name} - Premium wood product`}
                width={400}
                height={400}
                className="object-cover w-full h-full group-hover:scale-110 transition duration-700"
                unoptimized
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-400" aria-hidden="true">
                <span className="text-4xl mb-2">📦</span>
                <span>No Image</span>
              </div>
            )}
          </Link>
          <div className="absolute top-3 right-3 z-20 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase transform scale-0 group-hover:scale-100 transition-transform duration-300">
            In Stock
          </div>
          {/* Quick View Overlay */}
          <div className="absolute inset-0 bg-blue-900/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <button
              onClick={handleQuickView}
              className="bg-white hover:bg-green-50 text-green-700 border-0 shadow-lg px-4 py-2 text-sm font-semibold rounded-lg flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <Eye className="w-4 h-4" />
              {dictionary?.quick_view?.quick_view || (lang === 'th' ? 'ดูสินค้า' : 'Quick View')}
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-5 border-t-4 border-transparent group-hover:border-blue-600 transition-all bg-white">
          <div className="flex items-start justify-between gap-2">
            <Link
              href={`/${lang}/products/${product.slug}`}
              className="flex-1"
            >
              <h3 className="font-bold text-lg mb-2 truncate text-slate-900 group-hover:text-blue-600 transition-colors">
                {product.name}
              </h3>
            </Link>
            {/* Compare Button */}
            <AddToCompareButton product={product} variant="icon" dictionary={dictionary} />
          </div>
          <div className="flex justify-between items-center mt-4">
            <span className="text-slate-500 text-sm">{lang === 'th' ? 'เริ่มต้นที่' : 'Starting at'}</span>
            <span className="text-xl font-bold text-blue-900">
              {product.price ? `${product.price}${lang === 'th' ? ' บาท' : ' THB'}` : (lang === 'th' ? 'ติดต่อ' : 'Contact')}
            </span>
          </div>
        </div>
      </div>
    </article>

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
