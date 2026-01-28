/**
 * API Route for Order Status
 *
 * SECURITY: This server-side route hides WooCommerce API credentials
 * from the client. The consumer key/secret are only available server-side.
 *
 * Endpoint: /api/orders/[id]
 * Method: GET
 */

import { NextRequest, NextResponse } from 'next/server';

interface WooCommerceOrder {
  id: number;
  status: string;
  date_created: string;
  payment_method: string;
  payment_method_title: string;
  total: string;
  transaction_id?: string;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const orderId = parseInt(id);

    if (isNaN(orderId)) {
      return NextResponse.json(
        { error: 'Invalid order ID' },
        { status: 400 }
      );
    }

    // Server-side only - credentials never exposed to client
    const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
    const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;
    const apiUrl = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL || 'http://localhost:8006/wp-json/wc/v3';

    if (!consumerKey || !consumerSecret) {
      console.error('WooCommerce credentials not configured on server');
      return NextResponse.json(
        { error: 'Server configuration error' },
        { status: 500 }
      );
    }

    // Fetch from WooCommerce API with authentication
    const response = await fetch(`${apiUrl}/orders/${orderId}`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      // Cache for 10 seconds to reduce API load
      next: { revalidate: 10 },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return NextResponse.json(
          { error: 'Order not found' },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { error: 'Failed to fetch order status' },
        { status: response.status }
      );
    }

    const order: WooCommerceOrder = await response.json();

    // Return only necessary order data
    return NextResponse.json({
      id: order.id,
      status: order.status,
      date_created: order.date_created,
      payment_method: order.payment_method,
      payment_method_title: order.payment_method_title,
      total: order.total,
      transaction_id: order.transaction_id,
    });
  } catch (error) {
    console.error('Error fetching order status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
