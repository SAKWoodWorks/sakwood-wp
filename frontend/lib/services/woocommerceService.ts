// WooCommerce API Service for Sakwood
// Using custom WordPress endpoints - no API keys needed

export interface WooCommerceOrderData {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
    email: string;
    phone: string;
  };
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    city: string;
    state: string;
    postcode: string;
  };
  line_items: Array<{
    product_id: number;
    quantity: number;
  }>;
  shipping_lines: Array<{
    method_id: string;
    method_title: string;
    total: string;
  }>;
  customer_note?: string;
}

export interface WooCommerceResponse {
  id: number;
  order_key: string;
  status: string;
  success?: boolean;
}

/**
 * Create order in WooCommerce
 */
export async function createWooCommerceOrder(orderData: WooCommerceOrderData): Promise<WooCommerceResponse> {
  try {
    // Use custom endpoint that bypasses WooCommerce REST API authentication
    const baseUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL || 'http://localhost:8006/wp-json/sakwood/v1';
    const url = `${baseUrl}/create-order`;

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Order creation error - Status:', response.status);
      console.error('Order creation error - Response:', errorText);

      // Try to parse error as JSON
      try {
        const errorJson = JSON.parse(errorText);
        console.error('Parsed error JSON:', errorJson);
        throw new Error(errorJson.message || errorJson.code || `HTTP error! status: ${response.status}`);
      } catch {
        throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
      }
    }

    const data = await response.json();
    console.log('Order created successfully:', data);
    return data;
  } catch (error) {
    console.error('Error creating WooCommerce order:', error);
    throw error;
  }
}
