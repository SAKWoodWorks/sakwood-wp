'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PaymentVerification } from '@/components/checkout/PaymentVerification';

interface OrderSuccessProps {
  lang: Locale;
  dictionary: {
    common: {
      home: string;
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

export function OrderSuccess({ lang, dictionary, orderId }: OrderSuccessProps) {
  const { common, order_success } = dictionary;
  const [mounted, setMounted] = useState(false);
  const [paymentVerified, setPaymentVerified] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: order_success.page_title, href: `/${lang}/checkout/success` }
  ];

  const numericOrderId = orderId ? parseInt(orderId) : null;

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="max-w-3xl mx-auto px-6 space-y-6">
        {/* Payment Verification */}
        {numericOrderId && !paymentVerified && (
          <PaymentVerification
            orderId={numericOrderId}
            onComplete={(paid) => setPaymentVerified(paid)}
          />
        )}

        {/* Order Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full">
              <svg
                className="w-10 h-10 text-green-600"
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
          </div>

          {/* Thank You Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {order_success.thank_you}
          </h1>

          <p className="text-xl text-gray-600 mb-8">
            {order_success.order_placed}
          </p>

          {/* Order Number */}
          {orderId && (
            <div className="bg-blue-50 rounded-lg p-6 mb-6">
              <p className="text-sm text-gray-600 mb-2">{order_success.order_number}</p>
              <p className="text-2xl font-bold text-blue-900">#{orderId}</p>
            </div>
          )}

          {/* Confirmation Message */}
          <p className="text-gray-600 mb-8">
            {order_success.email_confirmation}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}`}
              className="px-8 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all uppercase tracking-wide rounded-none"
            >
              {order_success.continue_shopping}
            </Link>

            {orderId && (
              <Link
                href={`/${lang}/order-details/${orderId}`}
                className="px-8 py-3 border-2 border-blue-900 text-blue-900 font-bold hover:bg-blue-50 transition-all uppercase tracking-wide rounded-none"
              >
                {order_success.view_order}
              </Link>
            )}
          </div>

          {/* Contact Support */}
          <p className="mt-8 text-sm text-gray-500">
            {order_success.contact_support}
          </p>
        </div>
      </div>
    </main>
  );
}
