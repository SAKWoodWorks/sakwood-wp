/**
 * ============================================================================
 * SHOPPING CART CONTEXT
 * ============================================================================
 *
 * WHAT THIS FILE DOES:
 * - Manages shopping cart state (add, remove, update items)
 * - Persists cart data in browser localStorage
 * - Displays cart item images properly on mobile devices
 *
 * WHY IMAGE TRANSFORMATION IS NEEDED:
 * - Cart items are stored in localStorage with WordPress image URLs
 * - Old URLs like http://localhost:8006/wp-content/... don't work on mobile
 * - We transform them to /wp-content/... which works via Next.js proxy
 *
 * CHANGES MADE (2025-01-28):
 * - Added transformCartImageUrls() function
 * - Transform image URLs when loading from localStorage (line 68)
 * - Transform image URLs when adding new items (line 89)
 * - This fixes broken cart images on mobile devices
 * ============================================================================
 */

'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/types';
import { Announcer } from '@/components/ui/Announcer';

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

/**
 * Transform WordPress image URLs to work on mobile
 *
 * PROBLEM:
 * - Cart items are saved with URLs like: http://localhost:8006/wp-content/uploads/image.jpg
 * - Mobile devices can't access localhost:8006
 * - Cart images appear broken on mobile
 *
 * SOLUTION:
 * - Transform to: /wp-content/uploads/image.jpg
 * - Next.js rewrite rule proxies this to WordPress server-side
 * - Images load correctly on all devices
 *
 * @param item - Cart item with potentially broken image URL
 * @returns Cart item with transformed image URL
 */
function transformCartImageUrls(item: CartItem): CartItem {
  // If item has no image, return as-is
  if (!item.image?.sourceUrl) {
    return item;
  }

  const imageUrl = item.image.sourceUrl;

  // Check if URL contains localhost:8006 or sak_wp:80 (Docker internal)
  if (imageUrl.includes('sak_wp:80') || imageUrl.includes('localhost:8006')) {
    try {
      const urlObj = new URL(imageUrl);
      // Extract path after /wp-content/
      // Example: /wp-content/uploads/2026/01/product.jpg → uploads/2026/01/product.jpg
      const wpContentMatch = urlObj.pathname.match(/\/wp-content\/(.*)/);

      if (wpContentMatch) {
        // Return transformed item with proxied URL
        return {
          ...item,
          image: {
            ...item.image,
            sourceUrl: `/wp-content/${wpContentMatch[1]}` // Works on mobile!
          }
        };
      }
    } catch (e) {
      // If URL parsing fails, return original item
      console.error('CartContext: Error transforming image URL', e);
    }
  }

  return item; // Return original if no transformation needed
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('sakwood-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        // Transform image URLs for all items
        const transformedItems = parsed.map(transformCartImageUrls);
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Loading saved cart data on mount
        setItems(transformedItems);
      }
    } catch (error) {
      console.error('CartContext: Error loading from localStorage', error);
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('sakwood-cart', JSON.stringify(items));
      } catch (error) {
        console.error('CartContext: Error saving to localStorage', error);
      }
    }
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    // Transform image URLs before adding to cart
    const transformedProduct = transformCartImageUrls({ ...product, quantity: 1 });

    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        setAnnouncement(`Updated ${product.name}: quantity increased to ${existingItem.quantity + 1}`);
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      setAnnouncement(`Added ${product.name} to cart`);
      return [...prevItems, transformedProduct];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setItems(prevItems => {
      const itemToRemove = prevItems.find(item => item.id === productId);
      if (itemToRemove) {
        setAnnouncement(`Removed ${itemToRemove.name} from cart`);
      }
      return prevItems.filter(item => item.id !== productId);
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(productId);
      return;
    }
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return items.reduce((total, item) => {
      const priceStr = typeof item.price === 'string' ? item.price : '';
      const price = parseFloat(priceStr.replace(/[^0-9.]/g, '') || '0');
      return total + (price * item.quantity);
    }, 0);
  }, [items]);

  const getCartCount = useCallback(() => {
    return items.reduce((count, item) => count + item.quantity, 0);
  }, [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
      <Announcer message={announcement} role="status" />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
