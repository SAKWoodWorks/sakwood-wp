/**
 * Sentry Error Tracking Utilities
 *
 * Helper functions for tracking errors and performance
 */

import * as Sentry from '@sentry/nextjs';

/**
 * Track custom error with additional context
 */
export function trackError(
  error: Error | string,
  context?: Record<string, any>,
  level: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug' = 'error'
) {
  const errorObj = typeof error === 'string' ? new Error(error) : error;

  Sentry.captureException(errorObj, {
    level,
    user: context?.user ? { id: context.user.id } : undefined,
    tags: context?.tags || {},
    extra: context?.extra || {},
  });
}

/**
 * Track custom message
 */
export function trackMessage(
  message: string,
  level: 'fatal' | 'error' | 'warning' | 'log' | 'info' | 'debug' = 'info',
  context?: Record<string, any>
) {
  Sentry.captureMessage(message, {
    level,
    extra: context || {},
  });
}

/**
 * Set user context for error tracking
 */
export function setSentryUser(user: { id: string | number; email?: string; role?: string }) {
  Sentry.setUser({
    id: String(user.id),
    email: user.email,
    role: user.role,
  });
}

/**
 * Clear user context
 */
export function clearSentryUser() {
  Sentry.setUser(null);
}

/**
 * Track performance metric
 */
export function trackPerformance(
  transactionName: string,
  data: {
    startTime: number;
    endTime: number;
    metadata?: Record<string, any>;
  }
) {
  const duration = data.endTime - data.startTime;

  Sentry.captureMessage(`Performance: ${transactionName}`, {
    level: 'info',
    extra: {
      duration,
      transactionName,
      ...data.metadata,
    },
  });
}

/**
 * Track API call performance
 */
export function trackApiCall(
  endpoint: string,
  duration: number,
  success: boolean,
  statusCode?: number
) {
  Sentry.captureMessage(`API Call: ${endpoint}`, {
    level: success ? 'info' : 'warning',
    extra: {
      endpoint,
      duration,
      success,
      statusCode,
    },
    tags: {
      endpoint,
      status: statusCode?.toString() || 'unknown',
      success: success.toString(),
    },
  });
}

/**
 * Track user action
 */
export function trackUserAction(
  action: string,
  context?: Record<string, any>
) {
  Sentry.addBreadcrumb({
    category: 'user',
    message: action,
    level: 'info',
    data: context,
  });
}

/**
 * Track checkout step
 */
export function trackCheckoutStep(
  step: string,
  success: boolean,
  context?: Record<string, any>
) {
  trackUserAction(`Checkout ${step}`, {
    success,
    ...context,
  });

  if (!success) {
    trackError(`Checkout failed at ${step}`, context, 'warning');
  }
}

/**
 * Track search query
 */
export function trackSearch(
  query: string,
  resultsCount: number,
  searchDuration: number
) {
  trackUserAction('Search', {
    query,
    resultsCount,
    duration: searchDuration,
  });
}

/**
 * Track add to cart
 */
export function trackAddToCart(
  productId: string,
  productName: string,
  price: number,
  quantity: number
) {
  trackUserAction('Add to Cart', {
    productId,
    productName,
    price,
    quantity,
    total: price * quantity,
  });
}

/**
 * Create performance boundary wrapper
 */
export function withPerformanceTracking<T extends (...args: any[]) => any>(
  fn: T,
  transactionName: string
): T {
  return ((...args: any[]) => {
    const startTime = performance.now();
    try {
      const result = fn(...args);
      const endTime = performance.now();

      // Track performance for async functions
      if (result instanceof Promise) {
        return result.finally(() => {
          trackPerformance(transactionName, {
            startTime,
            endTime,
          });
        });
      }

      // Track performance for sync functions
      trackPerformance(transactionName, {
        startTime,
        endTime,
      });

      return result;
    } catch (error) {
      const endTime = performance.now();
      trackPerformance(transactionName, {
        startTime,
        endTime,
      });
      throw error;
    }
  }) as T;
}
