'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/lib/context/CartContext';
import type { Locale } from '@/i18n-config';
import { Product } from '@/lib/types';
import { submitQuote, type QuoteData } from '@/lib/services/wordpressService';

interface QuoteProduct {
  id: string;
  name: string;
  quantity: number;
  specifications: string;
}

interface QuoteFormProps {
  lang: Locale;
  dictionary: {
    quote: {
      page_title: string;
      page_subtitle: string;
      personal_info: string;
      first_name: string;
      last_name: string;
      email: string;
      phone: string;
      company: string;
      project_info: string;
      project_type: string;
      project_type_residential: string;
      project_type_commercial: string;
      project_type_industrial: string;
      project_type_other: string;
      estimated_budget: string;
      timeline: string;
      timeline_asap: string;
      timeline_1_month: string;
      timeline_3_months: string;
      timeline_6_months: string;
      timeline_flexible: string;
      product_details: string;
      select_products: string;
      no_products: string;
      additional_notes: string;
      additional_notes_placeholder: string;
      submit_quote: string;
      submitting: string;
      success_title: string;
      success_message: string;
      back_to_home: string;
      error_message: string;
    };
  };
}

export function QuoteForm({ lang, dictionary }: QuoteFormProps) {
  const { quote } = dictionary;
  const { items: cartItems } = useCart();
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Map<string, number>>(
    new Map(cartItems.map(item => [item.id, item.quantity]))
  );
  
  // Fetch available products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setAvailableProducts(data || []);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    projectType: 'residential',
    estimatedBudget: '',
    timeline: 'flexible',
    additionalNotes: '',
  });

  const handleProductSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const productId = e.target.value;
    if (!productId) return;

    setSelectedProducts(prev => {
      const newMap = new Map(prev);
      if (newMap.has(productId)) {
        // Product already exists, increment quantity
        newMap.set(productId, (newMap.get(productId) || 0) + 1);
      } else {
        // Add new product with quantity 1
        newMap.set(productId, 1);
      }
      return newMap;
    });
  };

  const handleQuantityChange = (productId: string, delta: number) => {
    setSelectedProducts(prev => {
      const newMap = new Map(prev);
      const currentQuantity = newMap.get(productId) || 0;
      const newQuantity = currentQuantity + delta;

      if (newQuantity <= 0) {
        // Remove product if quantity is 0 or less
        newMap.delete(productId);
      } else {
        newMap.set(productId, newQuantity);
      }
      return newMap;
    });
  };

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

    // Validate products
    if (selectedProducts.size === 0) {
      setError(quote.error_message);
      return;
    }

    setIsSubmitting(true);

    // Get selected products with their quantities
    const selectedProductList = availableProducts
      .filter(p => selectedProducts.has(p.id))
      .map(p => ({
        id: p.id,
        name: p.name,
        quantity: selectedProducts.get(p.id) || 1,
        specifications: '',
      }));

    // Create quote data object
    const quoteData: QuoteData = {
      id: `QT-${Date.now()}-${Math.random().toString(36).substring(2, 9).toUpperCase()}`,
      date: new Date().toISOString(),
      status: 'pending',
      customer: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
      },
      project: {
        type: formData.projectType,
        estimatedBudget: formData.estimatedBudget,
        timeline: formData.timeline,
      },
      products: selectedProductList,
      additionalNotes: formData.additionalNotes,
    };

    console.log('Quote submitted:', quoteData);

    try {
      // Submit to WordPress API
      await submitQuote(quoteData);
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting quote:', error);
      setError(quote.error_message);
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-8 text-center">
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
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {quote.personal_info}
        </h2>
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
          <div className="md:col-span-2">
            <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
              {quote.company}
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="Company Name (Optional)"
            />
          </div>
        </div>
      </div>

      {/* Project Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {quote.project_info}
        </h2>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="projectType" className="block text-sm font-semibold text-gray-700 mb-1">
                {quote.project_type}
              </label>
              <select
                id="projectType"
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="residential">{quote.project_type_residential}</option>
                <option value="commercial">{quote.project_type_commercial}</option>
                <option value="industrial">{quote.project_type_industrial}</option>
                <option value="other">{quote.project_type_other}</option>
              </select>
            </div>
            <div>
              <label htmlFor="timeline" className="block text-sm font-semibold text-gray-700 mb-1">
                {quote.timeline}
              </label>
              <select
                id="timeline"
                name="timeline"
                value={formData.timeline}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="asap">{quote.timeline_asap}</option>
                <option value="1_month">{quote.timeline_1_month}</option>
                <option value="3_months">{quote.timeline_3_months}</option>
                <option value="6_months">{quote.timeline_6_months}</option>
                <option value="flexible">{quote.timeline_flexible}</option>
              </select>
            </div>
          </div>
          <div>
            <label htmlFor="estimatedBudget" className="block text-sm font-semibold text-gray-700 mb-1">
              {quote.estimated_budget}
            </label>
            <input
              type="number"
              id="estimatedBudget"
              name="estimatedBudget"
              value={formData.estimatedBudget}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              placeholder="100000"
            />
          </div>
        </div>
      </div>

      {/* Product Selection */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {quote.product_details}
        </h2>
        <p className="text-gray-600 mb-4">
          {quote.select_products}
        </p>
        
        {availableProducts.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            {quote.no_products}
          </p>
        ) : (
          <>
            {/* Product Dropdown */}
            <div className="mb-4">
              <select
                value=""
                onChange={handleProductSelect}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="">-- Select a product to add --</option>
                {availableProducts.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name} {product.price ? `(${product.price})` : ''}
                  </option>
                ))}
              </select>
            </div>

            {/* Selected Products List */}
            {selectedProducts.size === 0 ? (
              <p className="text-gray-400 text-center py-4">
                No products selected yet
              </p>
            ) : (
              <div className="space-y-3">
                {Array.from(selectedProducts.entries()).map(([productId, quantity]) => {
                  const product = availableProducts.find(p => p.id === productId);
                  if (!product) return null;
                  return (
                    <div
                      key={productId}
                      className="border-2 border-blue-600 bg-blue-50 rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {product.name}
                          </h3>
                          {product.price && (
                            <p className="text-blue-600 font-bold">
                              {product.price}
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(productId, -1)}
                            className="w-10 h-10 flex items-center justify-center bg-red-500 text-white font-bold rounded-lg hover:bg-red-600 transition-all"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-bold text-gray-900">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleQuantityChange(productId, 1)}
                            className="w-10 h-10 flex items-center justify-center bg-green-500 text-white font-bold rounded-lg hover:bg-green-600 transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold text-blue-900 mb-4">
          {quote.additional_notes}
        </h2>
        <textarea
          id="additionalNotes"
          name="additionalNotes"
          rows={4}
          value={formData.additionalNotes}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none"
          placeholder={quote.additional_notes_placeholder}
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
    </form>
  );
}
