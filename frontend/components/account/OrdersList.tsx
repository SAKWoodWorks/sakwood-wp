'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getCustomerOrders, getOrderStatusLabel, getOrderStatusColor, getPaymentStatusLabel, type CustomerOrder } from '@/lib/services/customerOrderService';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';
import { Package, Calendar, CreditCard, ChevronRight, AlertCircle } from 'lucide-react';

interface OrdersListProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function OrdersList({ lang, dictionary }: OrdersListProps) {
  const router = useRouter();
  const [orders, setOrders] = useState<CustomerOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const fetchOrders = async (currentPage: number) => {
    setLoading(true);
    setError(null);

    try {
      const response = await getCustomerOrders(currentPage, 10);
      setOrders(response.orders);
      setTotalPages(response.total_pages);
      setTotal(response.total);

      if (response.orders.length === 0 && currentPage === 1) {
        setError(dictionary.account?.no_orders || 'No orders found');
      }
    } catch (err) {
      console.error('Error fetching orders:', err);
      setError(dictionary.account?.error_loading_orders || 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(page);
  }, [page]);

  const handleOrderClick = (orderId: number) => {
    router.push(`/${lang}/account/orders/${orderId}`);
  };

  if (loading && orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="text-gray-600">{dictionary.account?.loading_orders || 'Loading your orders...'}</p>
        </div>
      </div>
    );
  }

  if (error && orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12">
        <div className="flex flex-col items-center justify-center space-y-4">
          <Package className="w-16 h-16 text-gray-300" />
          <h3 className="text-lg font-semibold text-gray-900">
            {dictionary.account?.no_orders || 'No orders yet'}
          </h3>
          <p className="text-gray-600 text-center max-w-md">
            {error}
          </p>
          <button
            onClick={() => router.push(`/${lang}/shop`)}
            className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            {dictionary.account?.start_shopping || 'Start Shopping'}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Orders Summary */}
      {total > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">
                {dictionary.account?.total_orders || 'Total Orders'}: <span className="font-semibold text-gray-900">{total}</span>
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Orders List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div
              key={order.id}
              onClick={() => handleOrderClick(order.id)}
              className="p-6 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-4">
                    {/* Order Icon */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <Package className="w-6 h-6 text-blue-600" />
                      </div>
                    </div>

                    {/* Order Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {dictionary.account?.order || 'Order'} #{order.id}
                        </h3>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getOrderStatusColor(order.status)}`}
                        >
                          {getOrderStatusLabel(order.status, lang)}
                        </span>
                      </div>

                      <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.date_created).toLocaleDateString(lang === 'th' ? 'th-TH' : 'en-US')}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Package className="w-4 h-4" />
                          <span>{order.items_count} {dictionary.account?.items || 'items'}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <CreditCard className="w-4 h-4" />
                          <span>{getPaymentStatusLabel(order.payment_status, lang)}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Total & Arrow */}
                <div className="flex items-center gap-4 sm:border-l sm:pl-6 sm:border-gray-200">
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{dictionary.account?.total || 'Total'}</p>
                    <p className="text-xl font-bold text-gray-900">{order.total_formatted}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {dictionary.account?.previous || 'Previous'}
              </button>

              <span className="text-sm text-gray-700">
                {dictionary.account?.page || 'Page'} {page} {dictionary.account?.of || 'of'} {totalPages}
              </span>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {dictionary.account?.next || 'Next'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
