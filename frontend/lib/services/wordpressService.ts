// WordPress API Service for Sakwood

import { graphqlRequest } from '@/lib/graphql/client';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_WORDPRESS_REST_URL || 'http://localhost:8006/wp-json/sakwood/v1';

// GraphQL service wrapper
export const wordpressService = {
  async query<T>(query: string, variables?: Record<string, unknown>): Promise<T | null> {
    return graphqlRequest<T>(query, variables);
  }
};

export interface QuoteData {
  id: string;
  date: string;
  status: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  project: {
    type: string;
    estimatedBudget?: string;
    timeline: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    specifications: string;
  }>;
  additionalNotes: string;
}

export interface OrderData {
  id: string;
  date: string;
  status: string;
  customer: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    company?: string;
  };
  shipping: {
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    province: string;
    postalCode: string;
  };
  products: Array<{
    id: string;
    name: string;
    quantity: number;
    price: string | number | undefined;
  }>;
  paymentMethod: string;
  totalAmount: number;
  notes?: string;
}

export interface WordPressResponse {
  success: boolean;
  quote_id?: number;
  order_id?: number;
  message: string;
}

export interface QuoteResponse {
  id: number;
  title: string;
  date: string;
  quote_id: string;
  quote_date: string;
  status: string;
  customer: Record<string, unknown>;
  project: Record<string, unknown>;
  products: Record<string, unknown>[];
  notes: string;
}

export interface OrderResponse {
  id: number;
  title: string;
  date: string;
  order_id: string;
  order_date: string;
  status: string;
  customer: Record<string, unknown>;
  shipping: Record<string, unknown>;
  products: Record<string, unknown>[];
  payment_method: string;
  total_amount: number;
}

/**
 * Submit quote to WordPress
 */
export async function submitQuote(quoteData: QuoteData): Promise<WordPressResponse> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/quotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(quoteData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting quote:', error);
    throw error;
  }
}

/**
 * Submit order to WordPress
 */
export async function submitOrder(orderData: OrderData): Promise<WordPressResponse> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error submitting order:', error);
    throw error;
  }
}

/**
 * Get quotes from WordPress (admin only)
 */
export async function getQuotes(): Promise<QuoteResponse[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/quotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching quotes:', error);
    throw error;
  }
}

/**
 * Get orders from WordPress (admin only)
 */
export async function getOrders(): Promise<OrderResponse[]> {
  try {
    const response = await fetch(`${WORDPRESS_API_URL}/orders`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
}
