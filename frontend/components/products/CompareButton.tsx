'use client';

import { useCompare } from '@/lib/context/CompareContext';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, X } from 'lucide-react';
import { useState } from 'react';

interface CompareButtonProps {
  lang: string;
  dictionary?: {
    compare?: {
      compare_products: string;
      items: string;
    };
  };
  textColor?: string;
  hoverColor?: string;
}

export function CompareButton({ lang, dictionary, textColor = 'text-gray-700', hoverColor = 'hover:text-blue-900' }: CompareButtonProps) {
  const { compareItems, removeFromCompare } = useCompare();
  const [isOpen, setIsOpen] = useState(false);

  const compare = dictionary?.compare || {
    compare_products: 'Compare',
    items: 'items',
  };

  if (compareItems.length === 0) {
    return null;
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 ${textColor} ${hoverColor} transition-colors`}
        title={`${compareItems.length} ${compare.items}`}
      >
        <Scale className="w-5 h-5" />
        {compareItems.length > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-blue-900 text-white text-xs font-bold rounded-full">
            {compareItems.length}
          </span>
        )}
      </button>

      {/* Quick View Panel */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />

          {/* Panel */}
          <div className="fixed top-16 right-4 z-50 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 animate-in fade-in slide-in-from-top-2">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <Scale className="w-5 h-5 text-blue-900" />
                <h3 className="font-semibold text-gray-900">{compare.compare_products}</h3>
                <span className="text-sm text-gray-500">({compareItems.length})</span>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Product List */}
            <div className="max-h-80 overflow-y-auto p-4 space-y-3">
              {compareItems.map((product) => (
                <div
                  key={product.id}
                  className="flex items-start gap-3 p-2 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {product.image?.sourceUrl && (
                    <div className="relative w-16 h-16 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
                      <Image
                        src={product.image.sourceUrl}
                        alt={product.image.altText || product.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/${lang}/products/${product.slug}`}
                      className="block text-sm font-medium text-gray-900 hover:text-blue-900 line-clamp-2"
                    >
                      {product.name}
                    </Link>
                    {product.price && (
                      <div className="text-sm text-gray-600 mt-1">{product.price}</div>
                    )}
                  </div>
                  <button
                    onClick={() => removeFromCompare(product.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Remove"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-200 space-y-2">
              <Link
                href={`/${lang}/compare`}
                onClick={() => setIsOpen(false)}
                className="block w-full px-4 py-2.5 bg-blue-900 text-white text-center font-semibold rounded-lg hover:bg-blue-800 transition-colors"
              >
                {compare.compare_products}
              </Link>
            </div>
          </div>
        </>
      )}
    </>
  );
}
