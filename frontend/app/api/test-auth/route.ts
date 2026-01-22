import { NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL || 'http://localhost:8006/wp-json/wc/v3';
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || '';
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET || '';

export async function GET() {
  // Test basic auth
  const auth = Buffer.from(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64');

  // Test 1: Check if credentials are loaded
  const credentialsStatus = {
    api_url: WOOCOMMERCE_API_URL,
    consumer_key_present: !!WOOCOMMERCE_CONSUMER_KEY,
    consumer_key_length: WOOCOMMERCE_CONSUMER_KEY.length,
    consumer_secret_present: !!WOOCOMMERCE_CONSUMER_SECRET,
    consumer_secret_length: WOOCOMMERCE_CONSUMER_SECRET.length,
    consumer_key_starts: WOOCOMMERCE_CONSUMER_KEY.substring(0, 5),
    consumer_secret_starts: WOOCOMMERCE_CONSUMER_SECRET.substring(0, 5),
  };

  // Test 2: Try to GET orders (should work with Read/Write)
  const getResponse = await fetch(`${WOOCOMMERCE_API_URL}/orders`, {
    headers: {
      'Authorization': `Basic ${auth}`,
    },
  });

  const getOrders = await getResponse.json();

  // Test 3: Try to create a simple test order
  const testOrder = {
    payment_method: 'cod',
    payment_method_title: 'Cash on Delivery',
    set_paid: false,
    billing: {
      first_name: 'Test',
      last_name: 'User',
      address_1: '123 Test St',
      city: 'Bangkok',
      state: 'Bangkok',
      postcode: '10110',
      email: 'test@example.com',
      phone: '0812345678',
    },
    shipping: {
      first_name: 'Test',
      last_name: 'User',
      address_1: '123 Test St',
      city: 'Bangkok',
      state: 'Bangkok',
      postcode: '10110',
    },
    line_items: [],
  };

  const postResponse = await fetch(`${WOOCOMMERCE_API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Basic ${auth}`,
    },
    body: JSON.stringify(testOrder),
  });

  const postResult = await postResponse.text();

  return NextResponse.json({
    credentials: credentialsStatus,
    get_orders_status: getResponse.status,
    get_orders_result: getOrders,
    create_order_status: postResponse.status,
    create_order_response: postResult,
  });
}
