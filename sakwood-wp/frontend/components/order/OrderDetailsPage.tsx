'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Locale } from '@/i18n-config';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getOrderDetails, type OrderDetails } from '@/lib/services/orderService';

interface OrderDetailsPageProps {
  lang: Locale;
  dictionary: {
    common: {
      home: string;
    };
    order_details: {
      page_title: string;
      order_number: string;
      order_date: string;
      order_status: string;
      billing_address: string;
      shipping_address: string;
      payment_method: string;
      products: string;
      product: string;
      quantity: string;
      price: string;
      subtotal: string;
      shipping: string;
      total: string;
      back_to_home: string;
      print_order: string;
      loading: string;
      error: string;
      not_found: string;
      retry: string;
      notes: string;
    };
  };
  orderId: string;
}

export function OrderDetailsPage({ lang, dictionary, orderId }: OrderDetailsPageProps) {
  const { common, order_details } = dictionary;
  const [mounted, setMounted] = useState(false);
  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOrder = async () => {
    try {
      setLoading(true);
      setError(null);
      const orderData = await getOrderDetails(parseInt(orderId));
      setOrder(orderData);
    } catch (err) {
      setError(err instanceof Error ? err.message : order_details.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Preventing hydration mismatch
    setMounted(true);
    fetchOrder();
  }, [orderId]);

  if (!mounted) {
    return null;
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: order_details.page_title, href: `/${lang}/order-details/${orderId}` }
  ];

  // Loading state
  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md p-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
            <p className="mt-4 text-gray-600">{order_details.loading}</p>
          </div>
        </div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-red-800 mb-4">{order_details.error}</h2>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={fetchOrder}
              className="px-6 py-3 bg-red-600 text-white font-bold hover:bg-red-700 transition-all rounded"
            >
              {order_details.retry}
            </button>
          </div>
        </div>
      </main>
    );
  }

  // Order not found
  if (!order) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={breadcrumbItems} lang={lang} />
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-yellow-800 mb-4">{order_details.not_found}</h2>
            <Link
              href={`/${lang}`}
              className="inline-block px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all rounded"
            >
              {order_details.back_to_home}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // Get status color
  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      pending: 'bg-yellow-100 text-yellow-800',
      processing: 'bg-blue-100 text-blue-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800',
      refunded: 'bg-gray-100 text-gray-800',
      failed: 'bg-red-100 text-red-800',
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />

      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-blue-900 mb-2">{order_details.page_title}</h1>
              <p className="text-gray-600">
                {order_details.order_number} <span className="font-bold">#{order.id}</span>
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                {order.status_label}
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600">{order_details.order_date}:</span>
              <span className="ml-2 font-semibold">{new Date(order.date_created).toLocaleDateString()}</span>
            </div>
            <div>
              <span className="text-gray-600">{order_details.payment_method}:</span>
              <span className="ml-2 font-semibold">{order.payment_method_title}</span>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Products */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">{order_details.products}</h2>
              <div className="space-y-4">
                {order.line_items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    {item.image_url && (
                      <img
                        src={item.image_url}
                        alt={item.name || 'Product'}
                        className="w-16 h-16 object-cover rounded"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {item.name || `Product #${item.product_id}`}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {order_details.quantity}: {item.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-900">{item.total}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Customer Note */}
            {order.customer_note && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">{order_details.notes}</h2>
                <p className="text-gray-700">{order.customer_note}</p>
              </div>
            )}
          </div>

          {/* Right Column - Details */}
          <div className="space-y-6">
            {/* Billing Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">{order_details.billing_address}</h2>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{order.billing.first_name} {order.billing.last_name}</p>
                {order.billing.address_1 && <p>{order.billing.address_1}</p>}
                {order.billing.address_2 && <p>{order.billing.address_2}</p>}
                {order.billing.city && <p>{order.billing.city}</p>}
                {order.billing.state && <p>{order.billing.state}</p>}
                {order.billing.postcode && <p>{order.billing.postcode}</p>}
                {order.billing.email && <p className="pt-2">{order.billing.email}</p>}
                {order.billing.phone && <p>{order.billing.phone}</p>}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">{order_details.shipping_address}</h2>
              <div className="space-y-1 text-sm">
                <p className="font-semibold">{order.shipping.first_name} {order.shipping.last_name}</p>
                {order.shipping.address_1 && <p>{order.shipping.address_1}</p>}
                {order.shipping.address_2 && <p>{order.shipping.address_2}</p>}
                {order.shipping.city && <p>{order.shipping.city}</p>}
                {order.shipping.state && <p>{order.shipping.state}</p>}
                {order.shipping.postcode && <p>{order.shipping.postcode}</p>}
              </div>
            </div>

            {/* Totals */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold text-blue-900 mb-4">{order_details.total}</h2>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{order_details.subtotal}:</span>
                  <span className="font-semibold">{parseFloat(String(order.subtotal)).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">{order_details.shipping}:</span>
                  <span className="font-semibold">{parseFloat(String(order.shipping_total)).toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-lg font-bold text-blue-900">{order_details.total}:</span>
                  <span className="text-2xl font-bold text-blue-900">{parseFloat(String(order.total)).toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <Link
                href={`/${lang}`}
                className="block w-full px-6 py-3 bg-blue-900 text-white font-bold hover:bg-blue-800 transition-all text-center rounded"
              >
                {order_details.back_to_home}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
