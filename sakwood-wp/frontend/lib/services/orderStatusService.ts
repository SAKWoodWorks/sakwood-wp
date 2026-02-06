/**
 * Order Status Service for checking payment verification
 *
 * SECURITY: Now uses internal API route (/api/orders/[id]) to hide
 * WooCommerce credentials from client-side code. Credentials are only
 * used server-side in the API route.
 */

import { createHmac } from 'node:crypto';

// Use internal API route instead of direct WooCommerce API
const INTERNAL_API_URL = process.env.NEXT_PUBLIC_APP_URL || ''
  + '/api/orders';

export interface OrderStatus {
  id: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded' | 'failed';
  date_created: string;
  payment_method: string;
  payment_method_title: string;
  total: string;
  transaction_id?: string;
}

export interface OrderCheckResult {
  paid: boolean;
  status: string;
  message: string;
}

/**
 * Get order status from internal API route
 *
 * SECURITY: Calls internal API route which has server-side credentials
 * instead of exposing WooCommerce keys in client code.
 */
export async function getOrderStatus(orderId: number): Promise<OrderStatus> {
  const baseUrl = INTERNAL_API_URL.startsWith('http')
    ? INTERNAL_API_URL
    : `${window.location.origin}${INTERNAL_API_URL}`;

  const response = await fetch(`${baseUrl}/${orderId}`, {
    next: { revalidate: 10 }, // Cache for 10 seconds
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch order status: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Check if order is paid
 * An order is considered paid when status is 'processing' or 'completed'
 */
export function isOrderPaid(status: string): boolean {
  return status === 'processing' || status === 'completed';
}

/**
 * Get payment status message based on order status
 */
export function getPaymentStatusMessage(status: string): { paid: boolean; status: string; message: string } {
  const statusMessages: Record<string, { paid: boolean; status: string; message: string }> = {
    pending: {
      paid: false,
      status: 'pending',
      message: 'Waiting for payment confirmation. We will notify you when payment is received.',
    },
    processing: {
      paid: true,
      status: 'processing',
      message: 'Payment received! Your order is being processed.',
    },
    completed: {
      paid: true,
      status: 'completed',
      message: 'Payment confirmed and order completed!',
    },
    cancelled: {
      paid: false,
      status: 'cancelled',
      message: 'This order has been cancelled.',
    },
    failed: {
      paid: false,
      status: 'failed',
      message: 'Payment failed. Please contact support.',
    },
    refunded: {
      paid: false,
      status: 'refunded',
      message: 'Payment has been refunded.',
    },
    on_hold: {
      paid: false,
      status: 'on_hold',
      message: 'Order is on hold.',
    },
  };

  return statusMessages[status] || {
    paid: false,
    status: 'unknown',
    message: 'Unable to determine payment status.',
  };
}

/**
 * Poll order status with automatic retry
 * @param orderId - Order ID to check
 * @param maxAttempts - Maximum number of polling attempts (default: 60 = 5 minutes)
 * @param interval - Polling interval in milliseconds (default: 5000ms = 5 seconds)
 * @param onStatusChange - Callback when status changes
 * @param abortSignal - Optional AbortSignal to cancel polling
 */
export async function pollOrderStatus(
  orderId: number,
  maxAttempts: number = 60,
  interval: number = 5000,
  onStatusChange?: (result: OrderCheckResult) => void,
  abortSignal?: AbortSignal
): Promise<OrderCheckResult> {
  let attempts = 0;

  while (attempts < maxAttempts) {
    // Check if aborted
    if (abortSignal?.aborted) {
      throw new Error('Polling aborted');
    }

    try {
      const order = await getOrderStatus(orderId);
      const result = getPaymentStatusMessage(order.status);

      // Call callback with current status
      if (onStatusChange) {
        onStatusChange(result);
      }

      // If order is paid or in a final state, return immediately
      if (result.paid || ['completed', 'cancelled', 'failed', 'refunded'].includes(order.status)) {
        return result;
      }

      attempts++;

      // Wait before next attempt with abort check
      if (attempts < maxAttempts) {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, interval);

          abortSignal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Polling aborted'));
          });
        });
      }
    } catch (error) {
      if (abortSignal?.aborted || error instanceof Error && error.message === 'Polling aborted') {
        throw new Error('Polling aborted');
      }

      console.error(`Error polling order status (attempt ${attempts + 1}):`, error);
      attempts++;

      // Continue polling even if there's an error
      if (attempts < maxAttempts) {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, interval);

          abortSignal?.addEventListener('abort', () => {
            clearTimeout(timeout);
            reject(new Error('Polling aborted'));
          });
        });
      }
    }
  }

  // Max attempts reached
  return {
    paid: false,
    status: 'timeout',
    message: 'Payment verification timed out. Please check your email for confirmation or contact support.',
  };
}

/**
 * Webhook handler type for server-side webhook processing
 */
export interface PaymentWebhookPayload {
  id: number;
  status: string;
  payment_method: string;
  total: string;
}

/**
 * Verify webhook signature (optional, for security)
 */
export function verifyWebhookSignature(payload: string, signature: string, secret: string): boolean {
  const hmac = createHmac('sha256', secret)
    .update(payload)
    .digest('base64');

  return hmac === signature;
}
