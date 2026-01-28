'use client';

import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Locale } from '@/i18n-config';

interface OrderSuccessPageProps {
  lang: Locale;
  dictionary: {
    common: {
      home: string;
    };
    checkout: {
      page_title: string;
    };
    order_success: {
      page_title: string;
      thank_you: string;
      order_number: string;
      order_placed: string;
      email_confirmation: string;
      continue_shopping: string;
      view_order: string;
      contact_support: string;
    };
  };
  orderId?: string;
}

export function OrderSuccessPage({ lang, dictionary, orderId }: OrderSuccessPageProps) {
  const { common, checkout, order_success } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: checkout.page_title, href: `/${lang}/checkout` },
    { name: order_success.page_title, href: `/${lang}/checkout/success` }
  ];

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />
      
      <div className="max-w-3xl mx-auto px-6">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {order_success.thank_you}
          </h1>

          {/* Order Number */}
          {orderId && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">{order_success.order_number}</p>
              <p className="text-xl font-bold text-blue-900">{orderId}</p>
            </div>
          )}

          {/* Success Message */}
          <p className="text-lg text-gray-700 mb-4">
            {order_success.order_placed}
          </p>

          <p className="text-gray-600 mb-8">
            {order_success.email_confirmation}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`/${lang}/shop`}
              className="inline-block px-8 py-4 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none"
            >
              {order_success.continue_shopping}
            </a>

            {orderId && (
              <a
                href={`/${lang}/orders/${orderId}`}
                className="inline-block px-8 py-4 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none"
              >
                {order_success.view_order}
              </a>
            )}
          </div>

          {/* Contact Support */}
          <p className="mt-8 text-sm text-gray-500">
            {order_success.contact_support}: <a href="https://lin.ee/v86CTkq" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 font-semibold">LINE</a>
          </p>
        </div>
      </div>
    </main>
  );
}
