'use client';

import { useCart } from '@/lib/context/CartContext';
import type { Locale } from '@/i18n-config';

interface CartActionsProps {
  lang: Locale;
  dictionary: {
    cart: {
      clear_cart: string;
      update_cart: string;
      request_quote: string;
      contact_us: string;
    };
  };
}

export function CartActions({ lang, dictionary }: CartActionsProps) {
  const { cart: dict } = dictionary;
  const { items, clearCart } = useCart();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        {dict.update_cart}
      </h2>

      <div className="space-y-3">
        <button
          onClick={clearCart}
          className="w-full px-6 py-3 border-2 border-red-600 text-red-600 font-bold hover:bg-red-50 transition-all uppercase tracking-wide rounded-none"
        >
          {dict.clear_cart}
        </button>

        <a
          href={`/${lang}/quote`}
          className="block w-full px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none text-center"
        >
          {dict.request_quote}
        </a>

        <a
          href={`/${lang}/about#contact`}
          className="block w-full px-6 py-3 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none text-center"
        >
          {dict.contact_us}
        </a>
      </div>
    </div>
  );
}
