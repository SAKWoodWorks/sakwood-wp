'use client';

import { useCart } from '@/lib/context/CartContext';
import type { Locale } from '@/i18n-config';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';

interface CartItemsProps {
  lang: Locale;
  dictionary: {
    cart: {
      product: string;
      price: string;
      quantity: string;
      remove: string;
      subtotal: string;
    };
  };
}

export function CartItems({ lang, dictionary }: CartItemsProps) {
  const { cart: dict } = dictionary;
  const { items, removeFromCart, updateQuantity } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 sm:p-12 text-center">
        <svg className="w-16 h-16 sm:w-24 sm:h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l-4 4m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6" />
        </svg>
        <h3 className="text-lg sm:text-xl font-semibold text-gray-600 mb-2">
          Your cart is empty
        </h3>
        <Link
          href={`/${lang}/shop`}
          className="inline-block px-4 sm:px-6 py-2 sm:py-3 bg-blue-900 text-white text-sm sm:text-base font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">Product</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-left font-semibold text-xs sm:text-sm">Price</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-center font-semibold text-xs sm:text-sm">{dict.quantity}</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-xs sm:text-sm">Subtotal</th>
              <th className="px-4 sm:px-6 py-3 sm:py-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
              const subtotal = price * item.quantity;

              return (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-start gap-3 sm:gap-4">
                      {item.image?.sourceUrl && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img
                            src={item.image.sourceUrl}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <Link
                          href={`/${lang}/products/${item.slug}`}
                          className="font-semibold text-blue-900 hover:text-blue-700 transition-colors text-sm sm:text-base"
                        >
                          {item.name}
                        </Link>
                        <p className="text-xs sm:text-sm text-gray-500">SKU: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-blue-900 font-semibold text-sm sm:text-base">
                    {item.price}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4">
                    <div className="flex items-center justify-center gap-1 sm:gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors text-sm"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-6 sm:w-8 text-center font-semibold text-gray-900 text-sm sm:text-base">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors text-sm"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right font-semibold text-blue-900 text-sm sm:text-base">
                    {subtotal.toFixed(2)}
                  </td>
                  <td className="px-4 sm:px-6 py-3 sm:py-4 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-1.5 sm:p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200"
                      aria-label={dict.remove}
                      title={dict.remove}
                    >
                      <Trash2 className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {items.map((item) => {
          const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
          const subtotal = price * item.quantity;

          return (
            <div key={item.id} className="bg-white rounded-lg shadow-md p-4 space-y-3">
              {/* Product Info */}
              <div className="flex gap-3">
                {item.image?.sourceUrl && (
                  <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                    <img
                      src={item.image.sourceUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <Link
                    href={`/${lang}/products/${item.slug}`}
                    className="font-semibold text-blue-900 hover:text-blue-700 transition-colors text-sm line-clamp-2"
                  >
                    {item.name}
                  </Link>
                  <p className="text-xs text-gray-500">SKU: {item.id}</p>
                  <p className="text-blue-900 font-bold text-base mt-1">{item.price}</p>
                </div>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="w-8 text-center font-semibold text-gray-900 text-base">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-9 h-9 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <p className="text-blue-900 font-bold text-lg">
                    {subtotal.toFixed(2)}
                  </p>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200 flex-shrink-0"
                    aria-label={dict.remove}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
