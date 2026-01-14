'use client';

import { useCart } from '@/lib/context/CartContext';
import type { Locale } from '@/i18n-config';
import Link from 'next/link';

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
  const { items, removeFromCart, updateQuantity, getCartTotal } = useCart();

  if (items.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-12 text-center">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l-4 4m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6m0 0h-6m0 0v6m0 0h6m-4 4h2m-4 4v6" />
        </svg>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          Your cart is empty
        </h3>
        <Link
          href={`/${lang}/shop`}
          className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-blue-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left font-semibold">Product</th>
              <th className="px-6 py-4 text-left font-semibold">Price</th>
              <th className="px-6 py-4 text-center font-semibold">{dict.quantity}</th>
              <th className="px-6 py-4 text-right font-semibold">Subtotal</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => {
              const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
              const subtotal = price * item.quantity;

              return (
                <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start gap-4">
                      {item.image?.sourceUrl && (
                        <div className="w-20 h-20 bg-gray-100 rounded overflow-hidden flex-shrink-0">
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
                          className="font-semibold text-blue-900 hover:text-blue-700 transition-colors"
                        >
                          {item.name}
                        </Link>
                        <p className="text-sm text-gray-500">SKU: {item.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-blue-900 font-semibold">
                    {item.price}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded bg-gray-200 hover:bg-gray-300 flex items-center justify-center font-bold text-gray-700 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-blue-900">
                    {subtotal.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200"
                      aria-label={dict.remove}
                      title={dict.remove}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
