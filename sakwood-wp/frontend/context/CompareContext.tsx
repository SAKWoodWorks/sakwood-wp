'use client';

/**
 * CompareContext - Product Comparison State Management
 *
 * Provides SSR-safe state management for product comparison feature.
 * Uses localStorage persistence with mounted state pattern.
 */

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { CompareState } from '@/lib/types/compare';
import { COMPARE_STORAGE_KEY, MAX_COMPARE_PRODUCTS } from '@/lib/types/compare';

const CompareContext = createContext<CompareState | undefined>(undefined);

/**
 * CompareProvider Component
 *
 * Wraps the application to provide comparison state to all components.
 * Must be added to app/layout.tsx
 */
export function CompareProvider({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const [productIds, setProductIds] = useState<string[]>([]);

  // SSR-safe mounted state pattern
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    if (!mounted) return;

    try {
      const saved = localStorage.getItem(COMPARE_STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        if (Array.isArray(data.productIds)) {
          setProductIds(data.productIds);
        }
      }
    } catch (error) {
      console.error('Failed to load comparison data:', error);
    }
  }, [mounted]);

  // Save to localStorage whenever productIds changes
  useEffect(() => {
    if (!mounted) return;

    try {
      const data = {
        productIds,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(COMPARE_STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Failed to save comparison data:', error);
    }
  }, [productIds, mounted]);

  /**
   * Add product to comparison
   * Validates maximum 4 products limit
   */
  const addProduct = (productId: string) => {
    setProductIds((prev) => {
      // Don't add if already exists
      if (prev.includes(productId)) {
        return prev;
      }

      // Enforce maximum limit
      if (prev.length >= MAX_COMPARE_PRODUCTS) {
        // Could show toast notification here
        console.warn(`Maximum ${MAX_COMPARE_PRODUCTS} products allowed in comparison`);
        return prev;
      }

      return [...prev, productId];
    });
  };

  /**
   * Remove product from comparison
   */
  const removeProduct = (productId: string) => {
    setProductIds((prev) => prev.filter((id) => id !== productId));
  };

  /**
   * Clear all products from comparison
   */
  const clearProducts = () => {
    setProductIds([]);
  };

  /**
   * Check if product is in comparison
   */
  const hasProduct = (productId: string) => {
    return productIds.includes(productId);
  };

  const value: CompareState = {
    productIds,
    addProduct,
    removeProduct,
    clearProducts,
    hasProduct,
    productCount: productIds.length,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

/**
 * useCompare Hook
 *
 * Access comparison state from any component.
 * Throws error if used outside CompareProvider.
 *
 * @example
 * const { productIds, addProduct, removeProduct, productCount } = useCompare();
 */
export const useCompare = () => {
  const context = useContext(CompareContext);
  if (!context) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
};
