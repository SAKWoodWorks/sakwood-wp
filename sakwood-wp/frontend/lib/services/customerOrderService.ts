/**
 * Customer Order Service
 * Fetches customer orders from WordPress via Next.js API routes
 */

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  subtotal: string;
  subtotal_formatted: string;
  total: string;
  total_formatted: string;
  product_id: number;
  variation_id: number;
  product: {
    id: number;
    name: string;
    slug: string;
    image: string | null;
  } | null;
}

export interface CustomerOrder {
  id: number;
  order_key: string;
  status: string;
  date_created: string;
  date_created_gmt: string;
  currency: string;
  total: string;
  total_formatted: string;
  payment_method: string;
  payment_method_title: string;
  payment_status: string;
  shipping_total: string;
  shipping_total_formatted: string;
  discount_total: string;
  discount_total_formatted: string;
  items_count: number;
}

export interface CustomerOrderDetails extends CustomerOrder {
  date_modified: string;
  subtotal: string;
  subtotal_formatted: string;
  customer_note: string;
  items: OrderItem[];
  billing: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    company: string;
    address_1: string;
    address_2: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
  };
  shipping_lines: Array<{
    id: string;
    method_id: string;
    instance_id: string;
    title: string;
    total: string;
    total_formatted: string;
  }>;
}

export interface OrdersResponse {
  orders: CustomerOrder[];
  total: number;
  page: number;
  per_page: number;
  total_pages: number;
}

/**
 * Fetch customer orders
 */
export async function getCustomerOrders(
  page: number = 1,
  perPage: number = 10,
  status: string = ''
): Promise<OrdersResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      per_page: perPage.toString(),
    });

    if (status) {
      params.append('status', status);
    }

    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('sakwood_token') : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`/api/customer-orders?${params.toString()}`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[CustomerOrderService] Failed to fetch orders:', errorData);
      return { orders: [], total: 0, page: 1, per_page: 10, total_pages: 0 };
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[CustomerOrderService] Error fetching orders:', error);
    return { orders: [], total: 0, page: 1, per_page: 10, total_pages: 0 };
  }
}

/**
 * Fetch single order details
 */
export async function getCustomerOrderDetails(orderId: string | number): Promise<CustomerOrderDetails | null> {
  try {
    // Get auth token from localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('sakwood_token') : null;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`/api/customer-orders/${orderId}`, {
      method: 'GET',
      headers,
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('[CustomerOrderService] Failed to fetch order details:', errorData);
      return null;
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('[CustomerOrderService] Error fetching order details:', error);
    return null;
  }
}

/**
 * Get order status label
 */
export function getOrderStatusLabel(status: string, lang: 'th' | 'en'): string {
  const labels: Record<string, { th: string; en: string }> = {
    'pending': { th: 'รอดำเนินการ', en: 'Pending' },
    'processing': { th: 'กำลังดำเนินการ', en: 'Processing' },
    'on-hold': { th: 'ระงับชั่วคราว', en: 'On Hold' },
    'completed': { th: 'เสร็จสิ้น', en: 'Completed' },
    'cancelled': { th: 'ยกเลิก', en: 'Cancelled' },
    'refunded': { th: 'คืนเงินแล้ว', en: 'Refunded' },
    'failed': { th: 'ล้มเหลว', en: 'Failed' },
  };

  return labels[status]?.[lang] || status;
}

/**
 * Get payment status label
 */
export function getPaymentStatusLabel(paymentStatus: string, lang: 'th' | 'en'): string {
  const labels: Record<string, { th: string; en: string }> = {
    'paid': { th: 'ชำระแล้ว', en: 'Paid' },
    'pending': { th: 'รอชำระเงิน', en: 'Pending' },
    'unpaid': { th: 'ยังไม่ชำระ', en: 'Unpaid' },
  };

  return labels[paymentStatus]?.[lang] || paymentStatus;
}

/**
 * Get status color for UI
 */
export function getOrderStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'pending': 'bg-yellow-100 text-yellow-800 border-yellow-200',
    'processing': 'bg-blue-100 text-blue-800 border-blue-200',
    'on-hold': 'bg-orange-100 text-orange-800 border-orange-200',
    'completed': 'bg-green-100 text-green-800 border-green-200',
    'cancelled': 'bg-red-100 text-red-800 border-red-200',
    'refunded': 'bg-purple-100 text-purple-800 border-purple-200',
    'failed': 'bg-red-100 text-red-800 border-red-200',
  };

  return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
}
