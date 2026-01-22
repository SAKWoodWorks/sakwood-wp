import { NextResponse } from 'next/server';

const WOOCOMMERCE_API_URL = process.env.NEXT_PUBLIC_WOOCOMMERCE_API_URL || 'http://localhost:8006/wp-json/wc/v3';
const WOOCOMMERCE_CONSUMER_KEY = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_KEY || '';
const WOOCOMMERCE_CONSUMER_SECRET = process.env.NEXT_PUBLIC_WOOCOMMERCE_CONSUMER_SECRET || '';

export async function GET() {
  try {
    // Test API connection
    const auth = Buffer.from(`${WOOCOMMERCE_CONSUMER_KEY}:${WOOCOMMERCE_CONSUMER_SECRET}`).toString('base64');

    // Test getting products first
    const productsResponse = await fetch(`${WOOCOMMERCE_API_URL}/products`, {
      headers: {
        'Authorization': `Basic ${auth}`,
      },
    });

    const products = await productsResponse.json();

    return NextResponse.json({
      configured: !!WOOCOMMERCE_CONSUMER_KEY && !!WOOCOMMERCE_CONSUMER_SECRET,
      apiUrl: WOOCOMMERCE_API_URL,
      productsCount: Array.isArray(products) ? products.length : 0,
      firstProducts: Array.isArray(products) ? products.slice(0, 3) : [],
      status: productsResponse.status,
    });
  } catch (error) {
    return NextResponse.json({
      error: error instanceof Error ? error.message : 'Unknown error',
    });
  }
}
