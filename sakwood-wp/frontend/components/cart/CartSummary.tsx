'use client';

import { useState, useMemo } from 'react';
import { useCart } from '@/lib/context/CartContext';
import { getAllProvinces } from '@/lib/services/deliveryService';
import { generateCartLineMessage } from '@/lib/utils/lineMessage';
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
      order_via_line?: string;
      order_via_line_desc?: string;
      cart_contents?: string;
      line_notice?: string;
      checkout_disabled?: string;
    };
    common: {
      home: string;
    };
  };
}

interface ShippingBreakdown {
  baseRate: number;
  truckSurcharge: number;
  truckType: string;
  priceTierMultiplier: number;
  priceTierLabel: string;
  finalCost: number;
  estimatedDays: string;
}

export function CartSummary({ lang, dictionary }: CartSummaryProps) {
  const { cart: dict, common } = dictionary;
  const { items, getCartTotal } = useCart();

  const [selectedProvince, setSelectedProvince] = useState('');

  const subtotal = getCartTotal();

  // Generate LINE URL with cart details
  const lineUrl = useMemo(() => {
    if (items.length === 0) return '';
    return generateCartLineMessage(items, subtotal, lang);
  }, [items, subtotal, lang]);

  // Calculate detailed shipping breakdown
  const shippingBreakdown = useMemo((): ShippingBreakdown | null => {
    if (!selectedProvince) return null;

    // Free shipping for orders over 10,000 THB
    if (subtotal >= 10000) {
      return {
        baseRate: 0,
        truckSurcharge: 0,
        truckType: 'Standard',
        priceTierMultiplier: 1,
        priceTierLabel: 'Free Shipping',
        finalCost: 0,
        estimatedDays: '1-2',
      };
    }

    // Get province base rate
    const getProvinceRate = (province: string): number => {
      const rates: { [key: string]: number } = {
        'Pathumtani': 5000, 'Nonthaburi': 5000, 'Samut Prakan': 5000, 'Nakhon Pathom': 5000, 'Samut Sakhon': 5000,
        'Phra Nakhon Si Ayutthaya': 6500,
        'Ang Thong': 2000, 'Lopburi': 2000, 'Saraburi': 2000, 'Sing Buri': 2000, 'Chai Nat': 2000, 'Suphan Buri': 2000,
        'Kanchanaburi': 2500, 'Ratchaburi': 2500, 'Phetchaburi': 2500, 'Prachuap Khiri Khan': 3000,
        'Chonburi': 2500, 'Rayong': 2500, 'Chanthaburi': 3000, 'Trat': 3000,
        'Chachoengsao': 2000, 'Prachinburi': 2000, 'Sa Kaeo': 2500, 'Nakhon Nayok': 2000,
        'Kamphaeng Phet': 4000, 'Tak': 4000, 'Uthai Thani': 3500, 'Nakhon Sawan': 3000,
        'Phichit': 3500, 'Phitsanulok': 3500, 'Phichai': 3500, 'Phetchabun': 3500,
        'Chiang Mai': 7500, 'Lamphun': 7500, 'Lampang': 7500, 'Uttaradit': 4500,
        'Phrae': 4500, 'Nan': 7500, 'Phayao': 7500, 'Chiang Rai': 9000, 'Mae Hong Son': 10000,
        'Nakhon Ratchasima': 3500, 'Buri Ram': 3500, 'Surin': 3500, 'Sisaket': 3500,
        'Ubon Ratchathani': 4000, 'Yasothon': 3500, 'Chaiyaphum': 3500, 'Amnat Charoen': 4000,
        'Nong Bua Lamphu': 4000, 'Khon Kaen': 4000, 'Udon Thani': 4000, 'Loei': 4000,
        'Nong Khai': 4000, 'Maha Sarakham': 5000, 'Roi Et': 3500, 'Kalasin': 4000,
        'Sakon Nakhon': 4000, 'Nakhon Phanom': 4000, 'Mukdahan': 4000,
        'Chumphon': 4000, 'Ranong': 4500, 'Surat Thani': 4500, 'Phangnga': 5000,
        'Phuket': 5000, 'Krabi': 5000, 'Phatthalung': 4500, 'Trang': 4500, 'Satun': 5000,
        'Songkhla': 4500, 'Yala': 5000, 'Narathiwat': 5000, 'Pattani': 5000, 'Nakhon Si Thammarat': 4500,
      };
      return rates[province] || 6000;
    };

    const baseRate = getProvinceRate(selectedProvince);

    // Determine truck type and surcharge
    const determineTruckType = (): { type: string; surcharge: number } => {
      let totalLength = 0;
      let totalVolume = 0;

      items.forEach(item => {
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
        const volume = item.volume || 0;
        totalLength += length * item.quantity;
        totalVolume += volume * item.quantity;
      });

      const hasLongItem = items.some(item => {
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
        return length >= 6;
      });
      const totalLengthExceedsLimit = totalLength > 12;
      const totalVolumeExceedsLimit = totalVolume > 5;

      if (hasLongItem || totalLengthExceedsLimit || totalVolumeExceedsLimit) {
        return { type: 'Large Truck (10-wheel)', surcharge: 1500 };
      }

      const hasMediumItem = items.some(item => {
        const length = typeof item.length === 'string' ? parseFloat(item.length) || 0 : (item.length || 0);
        return length >= 3 && length < 6;
      });
      const totalLengthExceedsMedium = totalLength > 6;
      const totalVolumeExceedsMedium = totalVolume > 2;

      if (hasMediumItem || totalLengthExceedsMedium || totalVolumeExceedsMedium) {
        return { type: 'Medium Truck (10-wheel)', surcharge: 500 };
      }

      return { type: 'Small Truck (6-wheel)', surcharge: 0 };
    };

    const { type: truckType, surcharge: truckSurcharge } = determineTruckType();

    // Determine price tier
    const getPriceTier = (): { multiplier: number; label: string } => {
      if (subtotal >= 250000) return { multiplier: 0.9, label: '10% Discount' };
      if (subtotal >= 200000) return { multiplier: 0.95, label: '5% Discount' };
      if (subtotal >= 150000) return { multiplier: 1.0, label: 'Standard Rate' };
      if (subtotal >= 100000) return { multiplier: 1.05, label: '5% Surcharge' };
      if (subtotal >= 75000) return { multiplier: 1.1, label: '10% Surcharge' };
      if (subtotal >= 50000) return { multiplier: 1.15, label: '15% Surcharge' };
      if (subtotal >= 25000) return { multiplier: 1.2, label: '20% Surcharge' };
      if (subtotal >= 10000) return { multiplier: 1.25, label: '25% Surcharge' };
      return { multiplier: 1.0, label: 'Standard Rate' };
    };

    const { multiplier: priceTierMultiplier, label: priceTierLabel } = getPriceTier();

    const finalCost = (baseRate + truckSurcharge) * priceTierMultiplier;

    return {
      baseRate,
      truckSurcharge,
      truckType,
      priceTierMultiplier,
      priceTierLabel,
      finalCost,
      estimatedDays: '3-5',
    };
  }, [selectedProvince, subtotal, items]);

  const shippingCost = shippingBreakdown?.finalCost || 0;
  const total = subtotal + shippingCost;

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
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900"
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

        {/* Shipping Cost Breakdown */}
        {shippingBreakdown && shippingBreakdown.finalCost > 0 && (
          <div className="bg-gray-50 rounded-lg p-4 space-y-2">
            <div className="text-sm font-semibold text-gray-700 mb-2">Shipping Cost Breakdown:</div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Base Rate ({selectedProvince}):</span>
              <span className="font-medium text-blue-900">
                {shippingBreakdown.baseRate.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Truck Type ({shippingBreakdown.truckType}):</span>
              <span className={`font-medium ${shippingBreakdown.truckSurcharge > 0 ? 'text-yellow-600' : 'text-green-600'}`}>
                {shippingBreakdown.truckSurcharge > 0 ? `+${shippingBreakdown.truckSurcharge.toFixed(2)}` : 'No surcharge'}
              </span>
            </div>

            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-600">Price Tier ({shippingBreakdown.priceTierLabel}):</span>
              <span className={`font-medium ${shippingBreakdown.priceTierMultiplier < 1 ? 'text-green-600' : shippingBreakdown.priceTierMultiplier > 1 ? 'text-yellow-600' : 'text-gray-700'}`}>
                {shippingBreakdown.priceTierMultiplier < 0.95 ? '(-10%)' :
                 shippingBreakdown.priceTierMultiplier < 1 ? '(-5%)' :
                 shippingBreakdown.priceTierMultiplier > 1.2 ? '(+25%)' :
                 shippingBreakdown.priceTierMultiplier > 1.15 ? '(+20%)' :
                 shippingBreakdown.priceTierMultiplier > 1.1 ? '(+15%)' :
                 shippingBreakdown.priceTierMultiplier > 1.05 ? '(+10%)' :
                 shippingBreakdown.priceTierMultiplier > 1 ? '(+5%)' :
                 '(Standard)'}
              </span>
            </div>

            <div className="border-t border-gray-300 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-semibold">{dict.shipping}:</span>
                <span className="font-bold text-blue-900 text-lg">
                  {shippingBreakdown.finalCost.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="text-xs text-gray-500 mt-2">
              Estimated delivery: {shippingBreakdown.estimatedDays} days
            </div>
          </div>
        )}

        {/* Free Shipping Message */}
        {shippingBreakdown && shippingBreakdown.finalCost === 0 && subtotal >= 10000 && (
          <div className="text-sm text-green-600 bg-green-50 p-3 rounded border border-green-200">
            <div className="font-semibold">🎉 {dict.free_shipping}!</div>
            <div className="text-xs mt-1">Your order qualifies for free shipping</div>
          </div>
        )}

        {/* No Province Selected Message */}
        {!shippingBreakdown && (
          <div className="flex justify-between items-center">
            <span className="text-gray-600">{dict.shipping}:</span>
            <span className="text-gray-400 italic text-sm">
              Select province to calculate
            </span>
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
        {/* CHECKOUT DISABLED: Redirected to LINE contact - 2025-01-28
        <a
          href={`/${lang}/checkout`}
          className="block w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none text-center"
        >
          {dict.checkout}
        </a>
        */}

        {/* Cart items preview */}
        {items.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-700 mb-2">
              {dict.cart_contents || 'Cart Contents'}:
            </h3>
            <ul className="text-sm space-y-1">
              {items.slice(0, 5).map(item => (
                <li key={item.id} className="text-gray-600">
                  • {item.name} (x{item.quantity}) - {item.price}
                </li>
              ))}
              {items.length > 5 && (
                <li className="text-gray-500 italic">
                  ...and {items.length - 5} more items
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Notice */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
          <p className="font-semibold">
            {dict.checkout_disabled || 'Checkout Disabled'}
          </p>
          <p className="text-xs mt-1">
            {dict.line_notice || 'Please contact us via LINE for orders.'}
          </p>
        </div>

        {/* LINE Button */}
        {lineUrl && (
          <>
            <a
              href={lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-4 bg-[#00B900] text-white font-bold hover:bg-[#00a300] transition-all uppercase tracking-wide rounded-none text-center flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
            >
              <img src="/line-logo.png" alt="LINE" className="w-6 h-6" />
              <span>{dict.order_via_line || 'Order via LINE'}</span>
            </a>

            {/* Description */}
            <p className="text-xs text-gray-500 text-center">
              {dict.order_via_line_desc || 'Click to contact us via LINE for personalized service'}
            </p>
          </>
        )}

        {/* Continue shopping (keep existing) */}
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
