'use client';

import { useState, useEffect } from 'react';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Locale } from '@/i18n-config';

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
      shipping_info: string;
      billing_info: string;
      payment_method: string;
      order_items: string;
      subtotal: string;
      shipping: string;
      total: string;
      back_to_orders: string;
      status_pending: string;
      status_processing: string;
      status_shipped: string;
      status_delivered: string;
      status_cancelled: string;
    };
  };
  orderId: string;
}

interface OrderItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
  image?: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
    phone: string;
    email: string;
  };
  paymentMethod: 'bank_transfer' | 'cash_on_delivery';
}

export function OrderDetailsPage({ lang, dictionary, orderId }: OrderDetailsPageProps) {
  const { common, order_details } = dictionary;
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load order data from localStorage
    if (typeof window !== 'undefined') {
      try {
        const orders = JSON.parse(localStorage.getItem('sakwood-orders') || '[]');
        const foundOrder = orders.find((o: Order) => o.id === orderId);
        
        if (foundOrder) {
          setOrder(foundOrder);
        } else {
          setError('Order not found');
        }
      } catch (err) {
        console.error('Error loading order:', err);
        setError('Failed to load order');
      }
      setLoading(false);
    }
  }, [orderId]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return order_details.status_pending;
      case 'processing':
        return order_details.status_processing;
      case 'shipped':
        return order_details.status_shipped;
      case 'delivered':
        return order_details.status_delivered;
      case 'cancelled':
        return order_details.status_cancelled;
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={[{ name: common.home, href: `/${lang}` }]} lang={lang} />
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

  if (error || !order) {
    return (
      <main className="min-h-screen py-12">
        <Breadcrumbs items={[{ name: common.home, href: `/${lang}` }]} lang={lang} />
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-white rounded-lg p-12 text-center">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">
              {error || 'Order not found'}
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

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: order_details.page_title, href: `/${lang}/orders` },
    { name: order.id, href: `/${lang}/orders/${order.id}` }
  ];

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang} />
      
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          {order_details.page_title}
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Order Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Info */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="grid md:grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{order_details.order_number}</p>
                  <p className="text-lg font-bold text-blue-900">{order.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{order_details.order_date}</p>
                  <p className="text-lg font-bold text-blue-900">
                    {new Date(order.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">{order_details.order_status}</p>
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                {order_details.order_items}
              </h2>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 pb-4 border-b border-gray-200 last:border-0">
                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No Image</span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-blue-900">{item.price}</p>
                      <p className="text-sm text-gray-600">
                        {(parseFloat(item.price) * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping & Billing Info */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {order_details.shipping_info}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.address}</p>
                  <p>
                    {order.shippingAddress.city}, {order.shippingAddress.province} {order.shippingAddress.postalCode}
                  </p>
                  <p>{order.shippingAddress.phone}</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-blue-900 mb-4">
                  {order_details.billing_info}
                </h2>
                <div className="space-y-2 text-gray-700">
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}
                  </p>
                  <p>{order.shippingAddress.email}</p>
                  <p>{order.shippingAddress.phone}</p>
                  <div className="pt-2">
                    <p className="text-sm text-gray-600">{order_details.payment_method}</p>
                    <p className="font-semibold text-gray-900">
                      {order.paymentMethod === 'bank_transfer' ? 'Bank Transfer' : 'Cash on Delivery'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                Order Summary
              </h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{order_details.subtotal}:</span>
                  <span className="font-semibold text-blue-900">
                    {order.subtotal.toFixed(2)}
                  </span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-gray-600">{order_details.shipping}:</span>
                  <span className="font-semibold text-blue-900">
                    {order.shipping.toFixed(2)}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                  <span className="text-lg font-bold text-blue-900">{order_details.total}:</span>
                  <span className="text-2xl font-bold text-blue-900">
                    {order.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <a
                href={`/${lang}/orders`}
                className="block text-center text-blue-600 hover:text-blue-800 font-semibold transition-colors"
              >
                {order_details.back_to_orders}
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
