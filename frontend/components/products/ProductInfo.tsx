'use client';

import type { Locale } from '@/i18n-config';
import { Product } from '@/lib/types';
import { useState } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { useRouter } from 'next/navigation';

interface ProductInfoProps {
  product: Product;
  lang: Locale;
  dictionary: {
    product: {
      sku_label: string;
      category_label: string;
      availability_label: string;
      in_stock: string;
      out_of_stock: string;
      description_title: string;
      add_to_quote: string;
      add_to_cart: string;
      contact_for_price: string;
      added_to_cart: string;
      added_to_quote: string;
    };
  };
}

export function ProductInfo({ product, lang, dictionary }: ProductInfoProps) {
  const { product: dict } = dictionary;
  const { addToCart } = useCart();
  const router = useRouter();
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'info' | ''>('');
  
  const hasPrice = product.price && product.price !== '';

  const handleAddToCart = () => {
    addToCart(product);
    setMessage(dict.added_to_cart);
    setMessageType('success');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleAddToQuote = () => {
    addToCart(product);
    setMessage(dict.added_to_quote);
    setMessageType('info');
    setTimeout(() => {
      router.push(`/${lang}/quote`);
    }, 1000);
  };

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-2">
          {product.name}
        </h1>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span>SKU: {product.id}</span>
        </div>
      </div>

      {/* Price */}
      <div className="border-b border-gray-200 pb-6">
        {hasPrice ? (
          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-bold text-blue-900">
              {product.price}
            </span>
            {product.regularPrice && product.regularPrice !== product.price && (
              <span className="text-lg text-gray-400 line-through">
                {product.regularPrice}
              </span>
            )}
          </div>
        ) : (
          <span className="text-2xl font-semibold text-blue-600">
            {dict.contact_for_price}
          </span>
        )}
      </div>

      {/* Description */}
      <div>
        <h2 className="text-lg font-semibold text-blue-900 mb-3">
          {dict.description_title}
        </h2>
        <div 
          className="prose prose-sm text-gray-600 leading-relaxed"
          dangerouslySetInnerHTML={{ 
            __html: product.description || '<p>No description available.</p>' 
          }} 
        />
      </div>

      {/* Message */}
      {message && (
        <div className={`p-4 rounded-lg ${
          messageType === 'success' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
        }`}>
          {message}
        </div>
      )}

      {/* Action Buttons */}
      <div className="space-y-3">
        <button 
          onClick={handleAddToCart}
          className="w-full px-8 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none"
        >
          {hasPrice ? dict.add_to_cart : dict.add_to_quote}
        </button>
        <button 
          onClick={handleAddToQuote}
          className="w-full px-8 py-4 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none"
        >
          {dict.add_to_quote}
        </button>
      </div>

      {/* Additional Info */}
      <div className="space-y-3 pt-4 border-t border-gray-200">
        <div className="flex justify-between">
          <span className="text-gray-500">{dict.availability_label}:</span>
          <span className="font-semibold text-green-600">
            {dict.in_stock}
          </span>
        </div>
      </div>
    </div>
  );
}
