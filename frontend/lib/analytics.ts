/**
 * Google Analytics 4 Integration
 * Provides page view tracking and event measurement
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID || '';

/**
 * Track page view
 */
export function pageView(url: string) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('config', GA_ID, {
      page_path: url,
    });
  }
}

/**
 * Track custom event
 */
export function trackEvent(
  action: string,
  category: string,
  label?: string,
  value?: number
) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
}

/**
 * E-commerce events
 */
export const ecommerceEvents = {
  /**
   * Track product view
   */
  viewItem: (item: {
    id: string;
    name: string;
    category?: string;
    price?: number;
  }) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'view_item', {
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
          },
        ],
      });
    }
  },

  /**
   * Track add to cart
   */
  addToCart: (item: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'add_to_cart', {
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
            quantity: item.quantity || 1,
          },
        ],
      });
    }
  },

  /**
   * Track remove from cart
   */
  removeFromCart: (item: {
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'remove_from_cart', {
        items: [
          {
            item_id: item.id,
            item_name: item.name,
            item_category: item.category,
            price: item.price,
            quantity: item.quantity || 1,
          },
        ],
      });
    }
  },

  /**
   * Track begin checkout
   */
  beginCheckout: (items: Array<{
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'begin_checkout', {
        items: items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity || 1,
        })),
      });
    }
  },

  /**
   * Track purchase
   */
  purchase: (transactionId: string, value: number, items: Array<{
    id: string;
    name: string;
    category?: string;
    price?: number;
    quantity?: number;
  }>) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        transaction_id: transactionId,
        value: value,
        currency: 'THB',
        items: items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          item_category: item.category,
          price: item.price,
          quantity: item.quantity || 1,
        })),
      });
    }
  },

  /**
   * Track search
   */
  search: (searchTerm: string) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'search', {
        search_term: searchTerm,
      });
    }
  },
};
