'use client';

import { useState, useMemo, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PromptPayQR } from '@/components/checkout';
import { useCart } from '@/lib/context/CartContext';
import { calculateShippingCost, getShippingRate, getAllProvinces, TruckType } from '@/lib/services/deliveryService';
import type { Locale } from '@/i18n-config';
import { createWooCommerceOrder, type WooCommerceOrderData } from '@/lib/services/woocommerceService';

interface CheckoutPageProps {
  lang: Locale;
  dictionary: {
    common: {
      home: string;
    };
    cart: {
      page_title: string;
      order_summary: string;
      subtotal: string;
      shipping: string;
      total: string;
      continue_shopping: string;
    };
    checkout: {
      page_title: string;
      contact_info: string;
      email: string;
      phone: string;
      shipping_info: string;
      first_name: string;
      last_name: string;
      address: string;
      city: string;
      province: string;
      postal_code: string;
      notes: string;
      payment_method: string;
      bank_transfer: string;
      bank_transfer_desc: string;
      cash_on_delivery: string;
      cash_on_delivery_desc: string;
      promptpay: string;
      promptpay_desc: string;
      scan_qr: string;
      confirm_payment: string;
      confirm_payment_error: string;
      place_order: string;
      back_to_cart: string;
      select_province: string;
      free_shipping: string;
      estimated_delivery: string;
      price_tier: string;
      contact_sales: string;
      add_line_friend: string;
    };
  };
}

export function CheckoutPage({ lang, dictionary }: CheckoutPageProps) {
  const { common, cart, checkout } = dictionary;
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'bank_transfer',
  });

  const subtotal = getCartTotal();
  const shippingResult = useMemo(() => {
    if (selectedProvince) {
      return calculateShippingCost(selectedProvince, subtotal, items);
    }
    return { cost: 0, truckType: TruckType.SMALL, truckTypeName: 'Small Truck (6-wheel)', priceTier: 'Standard' };
  }, [selectedProvince, subtotal, items]);

  const shippingCost = shippingResult.cost;
  const truckType = shippingResult.truckType;
  const truckTypeName = shippingResult.truckTypeName;
  const priceTier = shippingResult.priceTier;

  const total = subtotal + shippingCost;

  const shippingInfo = useMemo(() => {
    if (selectedProvince) {
      return getShippingRate(selectedProvince);
    }
    return null;
  }, [selectedProvince]);

  const provinces = getAllProvinces();

  const handleProvinceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvince(e.target.value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate payment confirmation for PromptPay
    if (formData.paymentMethod === 'promptpay' && !paymentConfirmed) {
      setPaymentError(checkout.confirm_payment_error);
      return;
    }
    
    // Clear any previous payment error
    setPaymentError('');
    
    // Map payment method to WooCommerce payment method
    const paymentMethodMap: Record<string, { method: string; title: string }> = {
      'bank_transfer': { method: 'bacs', title: 'Bank Transfer' },
      'cash_on_delivery': { method: 'cod', title: 'Cash on Delivery' },
      'promptpay': { method: 'promptpay', title: 'PromptPay' },
    };
    
    const paymentInfo = paymentMethodMap[formData.paymentMethod] || { method: 'bacs', title: 'Bank Transfer' };
    
    // Create WooCommerce order data object
    const orderData: WooCommerceOrderData = {
      payment_method: paymentInfo.method,
      payment_method_title: paymentInfo.title,
      set_paid: false,
      billing: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        state: selectedProvince,
        postcode: formData.postalCode,
        email: formData.email,
        phone: formData.phone,
      },
      shipping: {
        first_name: formData.firstName,
        last_name: formData.lastName,
        address_1: formData.address,
        city: formData.city,
        state: selectedProvince,
        postcode: formData.postalCode,
      },
      line_items: items.map(item => ({
        product_id: parseInt(item.id),
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: truckTypeName || 'Standard Shipping',
          total: shippingCost.toFixed(2),
        },
      ],
      customer_note: formData.notes,
    };
    
    console.log('Order submitted:', orderData);
    
    try {
      // Submit to WooCommerce API
      const result = await createWooCommerceOrder(orderData);
      
      // Clear cart after successful order
      clearCart();
      
      // Redirect to order success page
      router.push(`/${lang}/checkout/success?orderId=${result.id}`);
    } catch (error) {
      console.error('Error submitting order:', error);
      setPaymentError(checkout.confirm_payment_error);
    }
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: cart.page_title, href: `/${lang}/cart` },
    { name: checkout.page_title, href: `/${lang}/checkout` }
  ];

  if (!mounted) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-gray-50 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              Your cart is empty
            </h2>
            <a
              href={`/${lang}/shop`}
              className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />
      
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          {checkout.page_title}
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {checkout.contact_info}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                      {checkout.email} *
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="your_line_id"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                      {checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="081-234-5678"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {checkout.shipping_info}
                </h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                        {checkout.first_name} *
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-semibold text-gray-700 mb-1">
                        {checkout.last_name} *
                      </label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                      {checkout.address} *
                    </label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="123 Street Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
                      {checkout.city} *
                    </label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      placeholder="Bangkok"
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-1">
                        {checkout.province} *
                      </label>
                      <select
                        id="province"
                        name="province"
                        required
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                      >
                        <option value="">{checkout.select_province}</option>
                        {provinces.map((province) => (
                          <option key={province} value={province}>
                            {province}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="postalCode" className="block text-sm font-semibold text-gray-700 mb-1">
                        {checkout.postal_code} *
                      </label>
                      <input
                        type="text"
                        id="postalCode"
                        name="postalCode"
                        required
                        value={formData.postalCode}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                        placeholder="10110"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="notes" className="block text-sm font-semibold text-gray-700 mb-1">
                      {checkout.notes}
                    </label>
                    <textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      value={formData.notes}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                      placeholder="Special instructions for delivery..."
                    />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {checkout.payment_method}
                </h2>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="bank_transfer"
                      checked={formData.paymentMethod === 'bank_transfer'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'bank_transfer' })}
                      className="w-4 h-4 text-blue-900 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">{checkout.bank_transfer}</span>
                      <p className="text-sm text-gray-500">{checkout.bank_transfer_desc}</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="cash_on_delivery"
                      checked={formData.paymentMethod === 'cash_on_delivery'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cash_on_delivery' })}
                      className="w-4 h-4 text-blue-900 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">{checkout.cash_on_delivery}</span>
                      <p className="text-sm text-gray-500">{checkout.cash_on_delivery_desc}</p>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg cursor-pointer hover:border-blue-500 transition-colors">
                    <input
                      type="radio"
                      name="payment"
                      value="promptpay"
                      checked={formData.paymentMethod === 'promptpay'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'promptpay' })}
                      className="w-4 h-4 text-blue-900 focus:ring-blue-500"
                    />
                    <div>
                      <span className="font-semibold text-gray-900">{checkout.promptpay}</span>
                      <p className="text-sm text-gray-500">{checkout.promptpay_desc}</p>
                    </div>
                  </label>
                </div>

                {/* PromptPay QR Code */}
                {formData.paymentMethod === 'promptpay' && (
                  <div className="mt-4 p-6 bg-gray-50 rounded-lg text-center">
                    <h3 className="text-lg font-bold text-blue-900 mb-4">{checkout.scan_qr}</h3>
                    <PromptPayQR
                      merchantId="0225559000467"
                      amount={total}
                      size={256}
                      showMerchantInfo={true}
                    />
                    <p className="text-sm text-gray-600 mt-4">
                      {checkout.promptpay_desc}
                    </p>
                    
                    {/* Payment Confirmation Checkbox */}
                    <div className="mt-6">
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={paymentConfirmed}
                          onChange={(e) => {
                            setPaymentConfirmed(e.target.checked);
                            if (e.target.checked) {
                              setPaymentError('');
                            }
                          }}
                          className="mt-1 w-4 h-4 text-blue-900 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm text-gray-700">
                          {checkout.confirm_payment}
                        </span>
                      </label>
                      {paymentError && (
                        <p className="mt-2 text-sm text-red-600">
                          {paymentError}
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {cart.order_summary}
                </h2>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{cart.subtotal}:</span>
                    <span className="font-semibold text-blue-900">
                      {subtotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">{cart.shipping}:</span>
                    <span className="font-semibold text-blue-900">
                      {shippingCost === 0 && subtotal >= 10000 ? (
                        <span className="text-green-600">{checkout.free_shipping}</span>
                      ) : (
                        `${shippingCost.toFixed(2)}`
                      )}
                    </span>
                  </div>

                  {priceTier && priceTier !== 'Standard' && (
                    <div className="text-sm text-green-600 bg-green-50 p-2 rounded">
                      {priceTier === 'Free' ? checkout.free_shipping : `${checkout.price_tier}: ${priceTier}`}
                    </div>
                  )}

                  {truckTypeName && (
                    <div className="text-sm text-blue-600 bg-blue-50 p-2 rounded">
                      Truck Type: {truckTypeName}
                    </div>
                  )}

                  {shippingInfo && shippingInfo.estimatedDays && (
                    <div className="text-sm text-gray-500 bg-blue-50 p-2 rounded">
                      {checkout.estimated_delivery}: {shippingInfo.estimatedDays} days
                    </div>
                  )}

                  <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-blue-900">{cart.total}:</span>
                    <span className="text-2xl font-bold text-blue-900">
                      {total.toFixed(2)}
                    </span>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-200 flex justify-center">
                    <a
                      href="https://lin.ee/v86CTkq"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block w-full"
                    >
                      <img
                        src="https://scdn.line-apps.com/n/line_add_friends/btn/th.png"
                        alt={checkout.add_line_friend}
                        className="h-16 w-full object-contain"
                      />
                    </a>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none"
                >
                  {checkout.place_order}
                </button>

                <a
                  href={`/${lang}/cart`}
                  className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
                >
                  {checkout.back_to_cart}
                </a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}
