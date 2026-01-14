'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product } from '@/lib/types';

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

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setMounted(true);
    try {
      const savedCart = localStorage.getItem('sakwood-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        console.log('CartContext: Loaded from localStorage', parsed);
        setItems(parsed);
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
        console.log('CartContext: Saved to localStorage', items);
      } catch (error) {
        console.error('CartContext: Error saving to localStorage', error);
      }
    }
  }, [items]);

  const addToCart = useCallback((product: Product) => {
    console.log('CartContext: Adding to cart', product);
    setItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        const updated = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        console.log('CartContext: Updated existing item', updated);
        return updated;
      }
      const newItems = [...prevItems, { ...product, quantity: 1 }];
      console.log('CartContext: Added new item', newItems);
      return newItems;
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    console.log('CartContext: Removing from cart', productId);
    setItems(prevItems => {
      const filtered = prevItems.filter(item => item.id !== productId);
      console.log('CartContext: Remaining items', filtered);
      return filtered;
    });
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    console.log('CartContext: Updating quantity', productId, quantity);
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
    console.log('CartContext: Clearing cart');
    setItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    const total = items.reduce((total, item) => {
      const price = parseFloat(item.price?.replace(/[^0-9.]/g, '') || '0');
      return total + (price * item.quantity);
    }, 0);
    console.log('CartContext: Calculated total', total);
    return total;
  }, [items]);

  const getCartCount = useCallback(() => {
    const count = items.reduce((count, item) => count + item.quantity, 0);
    console.log('CartContext: Calculated count', count);
    return count;
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
