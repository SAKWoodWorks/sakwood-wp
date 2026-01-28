// Order Service for Sakwood

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';

export interface OrderLineItem {
  id: string;
  name: string;
  quantity: number;
  subtotal: string;
  total: string;
  product_id: number;
  image_url?: string | null;
}

export interface OrderAddress {
  first_name: string;
  last_name: string;
  address_1: string;
  address_2?: string;
  city: string;
  state: string;
  postcode: string;
  country?: string;
  email?: string;
  phone?: string;
}

export interface OrderShippingLine {
  method_id: string;
  method_title: string;
  total: string;
}

export interface OrderDetails {
  success: boolean;
  id: number;
  order_key: string;
  status: string;
  status_label: string;
  currency: string;
  total: string | number;
  subtotal: string | number;
  shipping_total: string | number;
  date_created: string;
  date_modified: string;
  payment_method: string;
  payment_method_title: string;
  payment_url: string;
  billing: OrderAddress;
  shipping: OrderAddress;
  line_items: OrderLineItem[];
  shipping_lines: OrderShippingLine[];
  customer_note?: string;
}

/**
 * Get order details by ID
 */
export async function getOrderDetails(orderId: number): Promise<OrderDetails> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/get-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        order_id: orderId,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order fetch error - Status:', response.status);
      console.error('Order fetch error - Response:', errorText);

      // Try to parse error as JSON
      try {
        const errorJson = JSON.parse(errorText);
        throw new Error(errorJson.message || errorJson.code || `HTTP error! status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Order fetched successfully:', data);
    return data;
  } catch (error) {
    console.error('Error fetching order details:', error);
    throw error;
  }
}
