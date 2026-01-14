'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { useCart } from '@/lib/context/CartContext';
import { getShippingRate, getAllProvinces } from '@/lib/services/deliveryService';
import type { Locale } from '@/i18n-config';

interface QuotePageProps {
  lang: Locale;
  dictionary: {
    common: {
      home: string;
    };
    quote: {
      page_title: string;
      page_subtitle: string;
      personal_info: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      line_id: string;
      message: string;
      delivery_province: string;
      estimated_total: string;
      submit_quote: string;
      submitting: string;
      success_title: string;
      success_message: string;
      back_to_home: string;
      error_message: string;
      cart_empty: string;
      back_to_shop: string;
      select_province: string;
    };
  };
}

export function QuotePage({ lang, dictionary }: QuotePageProps) {
  const { common, quote } = dictionary;
  const { items, getCartTotal } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    lineId: '',
    message: '',
    province: '',
  });

  const provinces = getAllProvinces();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone) {
      setError(quote.error_message);
      return;
    }

    // Validate cart
    if (items.length === 0) {
      setError(quote.cart_empty);
      return;
    }

    setIsSubmitting(true);

    // Calculate delivery cost
    const subtotal = getCartTotal();
    const shippingRate = getShippingRate(formData.province);
    const deliveryCost = shippingRate.rate;
    const estimatedTotal = subtotal + deliveryCost;

    // Prepare payload for FluentCRM
    const payload = {
      names: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      subject: `Quote Request - ${formData.province}`,
      message: `Phone/Line: ${formData.phone || formData.lineId}\nProvince: ${formData.province}\n\nCart Items:\n${items.map(item => `- ${item.name} x${item.quantity} (${item.price})`).join('\n')}\n\nMessage:\n${formData.message}\n\nEstimated Total: ${estimatedTotal.toFixed(2)} THB`,
    };

    try {
      // Submit to FluentCRM API
      const response = await fetch('http://localhost:8006/wp-json/headless/v1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Quote submitted:', result);
      
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setError(quote.error_message);
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: quote.page_title, href: `/${lang}/quote` }
  ];

  const cartSummary = useMemo(() => {
    if (items.length === 0) return null;
    
    const subtotal = getCartTotal();
    const shippingRate = getShippingRate(formData.province);
    const deliveryCost = shippingRate.rate;
    const total = subtotal + deliveryCost;

    return (
      <div className="bg-gray-50 rounded-lg p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Cart Summary</h3>
        <div className="space-y-2">
          {items.map(item => (
            <div key={item.id} className="flex justify-between items-center text-sm">
              <span className="text-gray-700">{item.name}</span>
              <span className="text-gray-900">x{item.quantity}</span>
              <span className="text-gray-600">{item.price}</span>
            </div>
          ))}
          <div className="border-t border-gray-300 pt-2 mt-4">
            <div className="flex justify-between items-center font-semibold">
              <span>Subtotal:</span>
              <span>{subtotal.toFixed(2)} THB</span>
            </div>
            <div className="flex justify-between items-center font-semibold">
              <span>Delivery Cost:</span>
              <span>{deliveryCost.toFixed(2)} THB</span>
            </div>
            <div className="flex justify-between items-center font-bold text-lg text-blue-900 pt-2">
              <span>Estimated Total:</span>
              <span>{total.toFixed(2)} THB</span>
            </div>
          </div>
        </div>
      );
    });
  }, [items, formData.province, getCartTotal]);

  if (isSubmitted) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              {quote.success_title}
            </h2>
            <p className="text-green-700 mb-6">
              {quote.success_message}
            </p>
            <a
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
            >
              {quote.back_to_home}
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />
      
      <div className="max-w-6xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          {quote.page_title}
        </h1>
        <p className="text-gray-600 mb-8">
          {quote.page_subtitle}
        </p>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Quote Form */}
          <div className="space-y-6">
            {/* Cart Summary */}
            {cartSummary}

            {/* Personal Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                {quote.personal_info}
              </h2>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-semibold text-gray-700 mb-1">
                      {quote.first_name} *
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
                      {quote.last_name} *
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
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                    {quote.email} *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                    {quote.phone} *
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
                <div>
                  <label htmlFor="lineId" className="block text-sm font-semibold text-gray-700 mb-1">
                    {quote.line_id}
                  </label>
                  <input
                    type="text"
                    id="lineId"
                    name="lineId"
                    value={formData.lineId}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="your_line_id"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Delivery Province
              </h2>
              <div>
                <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-1">
                  {quote.delivery_province}
                </label>
                <select
                  id="province"
                  name="province"
                  required
                  value={formData.province}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                >
                  <option value="">{quote.select_province}</option>
                  {provinces.map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Message */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                {quote.message}
              </h2>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
                placeholder="Special requests or additional information..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? quote.submitting : quote.submit_quote}
            </button>

            {/* Back to Shop */}
            {items.length === 0 && (
              <a
                href={`/${lang}/shop`}
                className="block text-center mt-4 text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                {quote.back_to_shop}
              </a>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
