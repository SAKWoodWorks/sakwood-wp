'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
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
      company: string;
      project_info: string;
      project_type: string;
      estimated_budget: string;
      timeline: string;
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

export default function QuotePage({ lang, dictionary }: QuotePageProps) {
  const { common, quote } = dictionary;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    lineId: '',
    address: '',
    requirements: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.requirements) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsSubmitting(true);

    // Construct formatted message
    const fullMessage = `Name: ${formData.name}
Phone: ${formData.phone}
Email: ${formData.email}
LINE ID: ${formData.lineId || 'N/A'}

Shipping Address:
${formData.address}

Items or Details you need:
${formData.requirements}`;

    // Prepare payload for WordPress API
    const payload = {
      names: formData.name,
      email: formData.email,
      subject: `New Quote Request: ${formData.name}`,
      message: fullMessage,
      estimated_total: 0,
      phone: formData.phone,
      address: formData.address,
    };

    try {
      // Submit to WordPress API
      const response = await fetch('http://localhost:8006/wp-json/headless/v1/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Error response:', errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setError(`Failed to submit quote: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: quote.page_title, href: `/${lang}/quote` }
  ];

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
              Thank You
            </h2>
            <p className="text-green-700 mb-6">
              Your quote request has been submitted successfully. We will contact you soon.
            </p>
            <a
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
            >
              Back to Home
            </a>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="max-w-3xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
          {quote.page_title}
        </h1>
        <p className="text-gray-600 mb-8">
          {quote.page_subtitle}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Personal Information
            </h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="Your full name"
                />
              </div>
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                  placeholder="081-234-5678"
                />
              </div>
              <div>
                <label htmlFor="lineId" className="block text-sm font-semibold text-gray-700 mb-1">
                  LINE ID (Optional)
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
            </div>
          </div>

          {/* Shipping Address */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Shipping Address *
            </h2>
            <div>
              <textarea
                id="address"
                name="address"
                rows={4}
                required
                value={formData.address}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                placeholder="Enter your complete shipping address..."
              />
            </div>
          </div>

          {/* Items or Details */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">
              Items or Details you need *
            </h2>
            <div>
              <textarea
                id="requirements"
                name="requirements"
                rows={6}
                required
                value={formData.requirements}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                placeholder="Describe the items or details you need for your quote..."
              />
            </div>
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
            {isSubmitting ? 'Submitting...' : 'Submit Quote Request'}
          </button>
        </form>
      </div>
    </main>
  );
}
