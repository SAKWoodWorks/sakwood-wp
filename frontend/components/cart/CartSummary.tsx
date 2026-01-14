'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { calculateShippingCost, getAllProvinces, TruckType } from '@/lib/services/deliveryService';
import type { Locale } from '@/i18n-config';

interface CartSummaryProps {
  lang: Locale;
  dictionary: {
    cart: {
      order_summary: string;
      subtotal: string;
      shipping: string;
      total: string;
      checkout: string;
      continue_shopping: string;
      select_province: string;
      estimated_delivery: string;
      free_shipping: string;
    };
    common: {
      home: string;
    };
  };
}

export function CartSummary({ lang, dictionary }: CartSummaryProps) {
  const { cart: dict, common } = dictionary;
  const { items, getCartTotal } = useCart();

  const [selectedProvince, setSelectedProvince] = useState('');

  const subtotal = getCartTotal();
  const shipping = useMemo(() => {
    if (selectedProvince) {
      const result = calculateShippingCost(selectedProvince, subtotal, items);
      return result.cost;
    }
    return 0;
  }, [selectedProvince, subtotal, items]);

  const total = subtotal + shipping;

  const shippingResult = useMemo(() => {
    if (selectedProvince) {
      return calculateShippingCost(selectedProvince, subtotal, items);
    }
    return { cost: 0, truckType: TruckType.SMALL, truckTypeName: 'Small Truck (4-wheel)', priceTier: 'Standard' };
  }, [selectedProvince, subtotal, items]);

  const shippingCost = shippingResult.cost;
  const priceTier = shippingResult.priceTier;
  const provinces = getAllProvinces();

  if (items.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6 sticky top-4">
      <h2 className="text-xl font-bold text-blue-900 mb-4">
        {dict.order_summary}
      </h2>

      <div>
        <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-2">
          {dict.select_province}
        </label>
        <select
          id="province"
          value={selectedProvince}
          onChange={(e) => setSelectedProvince(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
        >
          <option value="">Select Province</option>
          {provinces.map((province) => (
            <option key={province} value={province}>
              {province}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">{dict.subtotal}:</span>
          <span className="font-semibold text-blue-900">
            {subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-600">{dict.shipping}:</span>
          <span className="font-semibold text-blue-900">
            {shipping === 0 && subtotal >= 10000 ? (
              <span className="text-green-600">{dict.free_shipping}</span>
            ) : (
              `${shipping.toFixed(2)}`
            )}
          </span>
        </div>

        {subtotal >= 10000 && (
          <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
            Free shipping for orders over 10,000 THB!
          </div>
        )}

        <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
          <span className="text-lg font-bold text-blue-900">{dict.total}:</span>
          <span className="text-2xl font-bold text-blue-900">
            {total.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={`/${lang}/checkout`}
          className="block w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none text-center"
        >
          {dict.checkout}
        </a>

        <a
          href={`/${lang}/shop`}
          className="block text-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
        >
          {dict.continue_shopping}
        </a>
      </div>
    </div>
  );
}
