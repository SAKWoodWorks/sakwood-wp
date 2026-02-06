'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Locale } from '@/i18n-config';

import type { Dictionary } from '@/lib/types/dictionary';

interface ContactPageProps {
  lang: Locale;
  dictionary: Pick<Dictionary, 'common' | 'contact'>;
}

export default function ContactPage({ lang, dictionary }: ContactPageProps) {
  const { common, contact } = dictionary;
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      setError(contact.required_fields);
      return;
    }

    setIsSubmitting(true);

    // Construct formatted message
    const fullMessage = `Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'N/A'}
Company: ${formData.company || 'N/A'}

Message:
${formData.message}`;

    // Prepare payload for WordPress API
    const payload = {
      names: formData.name,
      email: formData.email,
      subject: formData.subject || `Contact Form: ${formData.name}`,
      message: fullMessage,
      phone: formData.phone || '',
      company: formData.company || '',
    };

    try {
      // Submit to Next.js API route (proxies to WordPress)
      const response = await fetch('/api/contact', {
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
      console.error('Error submitting contact form:', err);
      setError(`${contact.error_message}: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setIsSubmitting(false);
    }
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: contact.page_title, href: `/${lang}/contact` }
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
              {contact.success_title}
            </h2>
            <p className="text-green-700 mb-6">
              {contact.success_message}
            </p>
            <a
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded-none uppercase tracking-wide"
            >
              {contact.back_to_home}
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
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {contact.page_title}
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {contact.page_subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-blue-900 mb-6">
                {contact.form_title}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                      {contact.name} *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder={contact.name_placeholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1">
                      {contact.email} *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder={contact.email_placeholder}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1">
                      {contact.phone}
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder={contact.phone_placeholder}
                    />
                  </div>
                  <div>
                    <label htmlFor="company" className="block text-sm font-semibold text-gray-700 mb-1">
                      {contact.company}
                    </label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-gray-900 placeholder:text-gray-400"
                      placeholder={contact.company_placeholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-1">
                    {contact.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder={contact.subject_placeholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1">
                    {contact.message} *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all resize-none text-gray-900 placeholder:text-gray-400"
                    placeholder={contact.message_placeholder}
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
                  {isSubmitting ? contact.submitting : contact.submit}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="lg:col-span-1">
            <div className="bg-blue-900 text-white rounded-lg shadow-md p-6 sticky top-6">
              <h3 className="text-xl font-bold mb-6">
                {contact.contact_info_title}
              </h3>

              <div className="space-y-6">
                {/* Branch Addresses */}
                <div>
                  <h4 className="font-semibold mb-3 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {contact.address_title}
                  </h4>
                  <div className="ml-7 space-y-3">
                    <div className="border-l-2 border-blue-700 pl-3">
                      <p className="font-medium text-white">{contact.pathumthani_branch}</p>
                      <p className="text-sm text-blue-100">{contact.pathumthani_address}</p>
                    </div>
                    <div className="border-l-2 border-blue-700 pl-3">
                      <p className="font-medium text-white">{contact.chanthaburi_branch}</p>
                      <p className="text-sm text-blue-100">{contact.chanthaburi_address}</p>
                    </div>
                    <div className="border-l-2 border-blue-700 pl-3">
                      <p className="font-medium text-white">{contact.chiangmai_branch}</p>
                      <p className="text-sm text-blue-100">{contact.chiangmai_address}</p>
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contact.email_label}
                  </h4>
                  <a
                    href={`mailto:${contact.email_value}`}
                    className="text-blue-100 hover:text-white ml-7 block"
                  >
                    {contact.email_value}
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contact.phone_label}
                  </h4>
                  <a
                    href={`tel:${contact.phone_value}`}
                    className="text-blue-100 hover:text-white ml-7 block"
                  >
                    {contact.phone_value}
                  </a>
                </div>

                {/* LINE */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 5.91 2 10.5c0 2.92 1.9 5.48 4.8 7.07-.21.78-.76 2.8-.87 3.23-.14.54.18.53.38.39.16-.11 2.48-1.69 3.49-2.38.77.11 1.57.17 2.38.17.09 0 .18 0 .27-.01-1.49-.94-2.5-2.49-2.5-4.25 0-2.89 2.84-5.23 6.35-5.23 3.51 0 6.35 2.34 6.35 5.23 0 2.89-2.84 5.23-6.35 5.23-.39 0-.77-.03-1.14-.08-.84.56-1.93 1.26-2.73 1.76-.06.04-.13.08-.19.12.01-.01.02-.02.03-.03l.02-.02c.27-.28.72-.76 1.07-1.16.14-.16.26-.31.35-.43l.01-.01c.05-.07.08-.12.09-.15C18.1 15.98 20 13.42 20 10.5 20 5.91 15.52 2 12 2z"/>
                    </svg>
                    {contact.line_label}
                  </h4>
                  <p className="text-blue-100 ml-7">
                    {contact.line_value}
                  </p>
                </div>

                {/* Business Hours */}
                <div>
                  <h4 className="font-semibold mb-2 flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {contact.hours_title}
                  </h4>
                  <div className="text-blue-100 ml-7 space-y-1">
                    <p>{contact.hours_weekday}</p>
                    <p>{contact.hours_weekend}</p>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-4 border-t border-blue-800">
                  <h4 className="font-semibold mb-3">{contact.social_title}</h4>
                  <p className="text-blue-100 text-sm">{contact.follow_us}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
