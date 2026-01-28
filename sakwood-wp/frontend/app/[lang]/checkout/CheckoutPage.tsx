'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PromptPayQR } from '@/components/checkout';
import { PromptPayInstructions } from '@/components/checkout/PromptPayInstructions';
import { ProvinceSearch } from '@/components/checkout/ProvinceSearch';
import { useCart } from '@/lib/context/CartContext';
import { calculateShippingCost, getShippingRate, getAllProvinces, TruckType } from '@/lib/services/deliveryService';
import { useFormPersistence } from '@/lib/hooks/useFormPersistence';
import { validateEmail, validateThaiPhone, validateThaiPostalCode, validateRequired } from '@/lib/utils/formValidation';
import { generateCartLineMessage } from '@/lib/utils/lineMessage';
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
      restore_draft?: string;
      search_province?: string;
      no_province_results?: string;
      invalid_email?: string;
      invalid_phone?: string;
      invalid_postal_code?: string;
      field_required?: string;
      network_error?: string;
      timeout_error?: string;
      line_notice_title?: string;
      line_notice_desc?: string;
      prices_may_vary?: string;
      checkout_disabled_message?: string;
    };
    cart: {
      order_via_line?: string;
    };
  };
}

export function CheckoutPage({ lang, dictionary }: CheckoutPageProps) {
  const { common, cart, checkout } = dictionary;
  const { items, getCartTotal, clearCart } = useCart();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const formInitializedRef = useRef(false);

  // Form persistence hook
  const { saveForm, loadForm, clearForm, hasSavedForm } = useFormPersistence('sakwood-checkout');

  // Validation state
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  useEffect(() => {
    setMounted(true);
  }, []);

  const [selectedProvince, setSelectedProvince] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    lineId: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    notes: '',
    paymentMethod: 'bank_transfer',
  });

  // Load saved form data on mount
  useEffect(() => {
    if (mounted && !formInitializedRef.current) {
      const saved = loadForm();
      if (saved) {
        setFormData({
          email: saved.email || '',
          lineId: saved.lineId || '',
          phone: saved.phone || '',
          firstName: saved.firstName || '',
          lastName: saved.lastName || '',
          address: saved.address || '',
          city: saved.city || '',
          postalCode: saved.postalCode || '',
          notes: saved.notes || '',
          paymentMethod: saved.paymentMethod || 'bank_transfer',
        });
        setSelectedProvince(saved.province || '');
      }
      formInitializedRef.current = true;
    }
  }, [mounted, loadForm]);

  // Auto-save form data on change
  useEffect(() => {
    if (mounted && formInitializedRef.current) {
      saveForm({
        ...formData,
        province: selectedProvince,
      });
    }
  }, [formData, selectedProvince, mounted, saveForm]);

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

  // Generate LINE URL with cart details
  const lineUrl = useMemo(() => {
    if (items.length === 0) return '';
    return generateCartLineMessage(items, total, lang);
  }, [items, total, lang]);

  const shippingInfo = useMemo(() => {
    if (selectedProvince) {
      return getShippingRate(selectedProvince);
    }
    return null;
  }, [selectedProvince]);

  const provinces = getAllProvinces();

  // Field validation function
  const validateField = (name: string, value: string): string | null => {
    // Use dictionary keys for error messages if available
    const errorMessages = {
      email: checkout.invalid_email || 'Please enter a valid email address',
      phone: checkout.invalid_phone || 'Please enter a valid Thai phone number (e.g., 081-234-5678)',
      postalCode: checkout.invalid_postal_code || 'Please enter a 5-digit postal code',
      firstName: checkout.field_required?.replace('This field', 'First name') || 'First name is required',
      lastName: checkout.field_required?.replace('This field', 'Last name') || 'Last name is required',
      address: checkout.field_required?.replace('This field', 'Address') || 'Address is required',
      city: checkout.field_required?.replace('This field', 'City') || 'City is required',
    };

    switch (name) {
      case 'email':
        const emailResult = validateEmail(value);
        return emailResult.valid ? null : errorMessages.email;
      case 'phone':
        const phoneResult = validateThaiPhone(value);
        return phoneResult.valid ? null : errorMessages.phone;
      case 'postalCode':
        const postalResult = validateThaiPostalCode(value);
        return postalResult.valid ? null : errorMessages.postalCode;
      case 'firstName':
      case 'lastName':
      case 'address':
      case 'city': {
        const requiredResult = validateRequired(value, name === 'firstName' ? 'First name' : name === 'lastName' ? 'Last name' : name);
        return requiredResult.valid ? null : errorMessages[name as keyof typeof errorMessages];
      }
      default:
        return null;
    }
  };

  // Handle blur validation
  const handleBlur = (fieldName: string) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
    const error = validateField(fieldName, formData[fieldName as keyof typeof formData]);
    setFieldErrors(prev => ({ ...prev, [fieldName]: error || '' }));
  };

  const handleProvinceChange = (province: string) => {
    setSelectedProvince(province);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error for this field if user is typing
    if (touchedFields.has(name)) {
      const error = validateField(name, value);
      setFieldErrors(prev => ({ ...prev, [name]: error || '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent double submission
    if (isSubmitting) {
      return;
    }

    // Validate all required fields
    const requiredFields = ['email', 'phone', 'firstName', 'lastName', 'address', 'city', 'postalCode'];
    const errors: Record<string, string> = {};

    for (const field of requiredFields) {
      const error = validateField(field, formData[field as keyof typeof formData]);
      if (error) {
        errors[field] = error;
      }
    }

    // Validate province
    if (!selectedProvince) {
      errors.province = checkout.field_required?.replace('This field', 'Province') || 'Please select a province';
    }

    // Validate PromptPay confirmation
    if (formData.paymentMethod === 'promptpay' && !paymentConfirmed) {
      setPaymentError(checkout.confirm_payment_error);
      return;
    }

    // Set all fields as touched
    setTouchedFields(new Set(requiredFields));

    // If there are errors, display them and prevent submission
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);

      // Scroll to first error
      const firstErrorField = document.querySelector(`[name="${Object.keys(errors)[0]}"]`) as HTMLElement;
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstErrorField.focus();
      }
      return;
    }

    // Clear any previous payment error
    setPaymentError('');
    setIsSubmitting(true);

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
        product_id: item.databaseId,
        quantity: item.quantity,
      })),
      shipping_lines: [
        {
          method_id: 'flat_rate',
          method_title: truckTypeName || 'Standard Shipping',
          total: shippingCost.toFixed(2),
        },
      ],
      customer_note: formData.notes + (formData.lineId ? `\n\nLINE ID: ${formData.lineId}` : ''),
    };

    try {
      // Submit to WooCommerce API
      const result = await createWooCommerceOrder(orderData);

      // Clear saved form data and cart after successful order
      clearForm();
      clearCart();

      // Redirect to order success page
      router.push(`/${lang}/checkout/success?orderId=${result.id}`);
    } catch (error) {
      console.error('Error submitting order:', error);

      // Better error messages based on error type
      let errorMessage = 'Failed to submit order. Please try again.';

      if (error instanceof Error) {
        const errorLower = error.message.toLowerCase();
        if (errorLower.includes('network') || errorLower.includes('fetch')) {
          errorMessage = checkout.network_error || 'Network error. Please check your connection and try again.';
        } else if (errorLower.includes('timeout')) {
          errorMessage = checkout.timeout_error || 'Request timed out. Please try again.';
        } else {
          errorMessage = error.message;
        }
      }

      setPaymentError(errorMessage);
      setIsSubmitting(false);

      // Scroll to error message
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

        {/* Restore Draft Indicator */}
        {hasSavedForm() && (
          <div className="mb-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3">
            <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-sm text-yellow-800">
              {checkout.restore_draft || 'We found your unfinished order. Your information has been restored.'}
            </p>
          </div>
        )}

        {/* LINE Contact Notice - Checkout Disabled */}
        <div className="bg-gradient-to-r from-green-50 to-blue-50 border-2 border-[#00B900] rounded-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
            <img src="/line-logo.png" alt="LINE" className="w-16 h-16 flex-shrink-0" />
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {checkout.line_notice_title || 'Order via LINE'}
              </h2>
              <p className="text-gray-700 mb-3">
                {checkout.line_notice_desc || 'For accurate pricing and personalized service, please contact us via LINE to complete your order.'}
              </p>
              {lineUrl && (
                <a
                  href={lineUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-8 py-3 bg-[#00B900] text-white font-bold hover:bg-[#00a300] transition-all uppercase tracking-wide rounded flex items-center gap-2"
                >
                  <img src="/line-logo.png" alt="LINE" className="w-5 h-5" />
                  <span>{cart.order_via_line || 'Order via LINE'}</span>
                </a>
              )}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-yellow-700 font-semibold">
              ⚠️ {checkout.prices_may_vary || 'Prices may vary. Contact us for current pricing.'}
            </p>
          </div>
        </div>

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
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => handleBlur('email')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                        fieldErrors.email ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="your@email.com"
                    />
                    {touchedFields.has('email') && fieldErrors.email && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.email}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="lineId" className="block text-sm font-semibold text-gray-700 mb-1">
                      LINE ID
                    </label>
                    <input
                      type="text"
                      id="lineId"
                      name="lineId"
                      value={formData.lineId}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
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
                      onBlur={() => handleBlur('phone')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                        fieldErrors.phone ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="081-234-5678"
                    />
                    {touchedFields.has('phone') && fieldErrors.phone && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.phone}</p>
                    )}
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
                        onBlur={() => handleBlur('firstName')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                          fieldErrors.firstName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="John"
                      />
                      {touchedFields.has('firstName') && fieldErrors.firstName && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.firstName}</p>
                      )}
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
                        onBlur={() => handleBlur('lastName')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                          fieldErrors.lastName ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="Doe"
                      />
                      {touchedFields.has('lastName') && fieldErrors.lastName && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.lastName}</p>
                      )}
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
                      onBlur={() => handleBlur('address')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                        fieldErrors.address ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="123 Street Name"
                    />
                    {touchedFields.has('address') && fieldErrors.address && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.address}</p>
                    )}
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
                      onBlur={() => handleBlur('city')}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                        fieldErrors.city ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                      }`}
                      placeholder="Bangkok"
                    />
                    {touchedFields.has('city') && fieldErrors.city && (
                      <p className="mt-1 text-sm text-red-600">{fieldErrors.city}</p>
                    )}
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="province" className="block text-sm font-semibold text-gray-700 mb-1">
                        {checkout.province} *
                      </label>
                      <ProvinceSearch
                        provinces={provinces}
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        placeholder={checkout.search_province || checkout.select_province}
                        lang={lang}
                      />
                      {fieldErrors.province && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.province}</p>
                      )}
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
                        onBlur={() => handleBlur('postalCode')}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-blue-500 outline-none transition-all ${
                          fieldErrors.postalCode ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                        }`}
                        placeholder="10110"
                      />
                      {touchedFields.has('postalCode') && fieldErrors.postalCode && (
                        <p className="mt-1 text-sm text-red-600">{fieldErrors.postalCode}</p>
                      )}
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
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
                  <div className="mt-4 space-y-6">
                    <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-lg p-6 border border-blue-200">
                      <h3 className="text-lg font-bold text-blue-900 mb-4 text-center">{checkout.scan_qr}</h3>
                      <div className="flex justify-center">
                        <PromptPayQR
                          merchantId="0225559000467"
                          amount={total}
                          size={280}
                          showMerchantInfo={true}
                          orderRef={`ORDER-${Date.now()}`}
                        />
                      </div>
                    </div>

                    {/* Payment Instructions */}
                    <PromptPayInstructions />

                    {/* Payment Confirmation Checkbox */}
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
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
                          className="mt-1 w-5 h-5 text-blue-900 focus:ring-blue-500 rounded"
                        />
                        <span className="text-sm text-gray-700">
                          {checkout.confirm_payment}
                        </span>
                      </label>
                      {paymentError && (
                        <p className="mt-3 text-sm text-red-600 font-semibold bg-red-50 p-2 rounded">
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

                {/* CHECKOUT DISABLED: Submit button commented out - 2025-01-28
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Processing...' : checkout.place_order}
                </button>
                */}

                {/* LINE Contact Button */}
                {lineUrl && (
                  <>
                    <a
                      href={lineUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full px-6 py-4 bg-[#00B900] text-white font-bold hover:bg-[#00a300] transition-all uppercase tracking-wide rounded flex items-center justify-center gap-2 shadow-lg"
                    >
                      <img src="/line-logo.png" alt="LINE" className="w-6 h-6" />
                      <span>{cart.order_via_line || 'Order via LINE'}</span>
                    </a>

                    <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 text-center">
                      {checkout.checkout_disabled_message || 'Online checkout is temporarily disabled. Please use LINE to place your order.'}
                    </div>
                  </>
                )}

                {paymentError && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
                    <p className="font-semibold">Order Failed</p>
                    <p className="text-sm">{paymentError}</p>
                  </div>
                )}

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
