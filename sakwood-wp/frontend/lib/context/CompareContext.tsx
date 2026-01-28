'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { Product } from '@/lib/types/product';

interface CompareContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: string) => void;
  clearCompare: () => void;
  isInCompare: (productId: string) => boolean;
  isFull: boolean;
}

const CompareContext = createContext<CompareContextType | undefined>(undefined);

const MAX_COMPARE_ITEMS = 4;
const STORAGE_KEY = 'sakwood-compare';

export function CompareProvider({ children }: { children: React.ReactNode }) {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        setCompareItems(JSON.parse(stored));
      }
    } catch (error) {
      console.error('Error loading compare items:', error);
    }
  }, []);

  // Save to localStorage whenever compareItems changes
  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(compareItems));
      } catch (error) {
        console.error('Error saving compare items:', error);
      }
    }
  }, [compareItems, mounted]);

  const addToCompare = useCallback((product: Product) => {
    setCompareItems((prev) => {
      // Check if already in compare
      if (prev.some((item) => item.id === product.id)) {
        return prev;
      }

      // Check if at max capacity
      if (prev.length >= MAX_COMPARE_ITEMS) {
        return prev;
      }

      return [...prev, product];
    });
  }, []);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareItems((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  const isInCompare = useCallback(
    (productId: string) => {
      return compareItems.some((item) => item.id === productId);
    },
    [compareItems]
  );

  const isFull = compareItems.length >= MAX_COMPARE_ITEMS;

  const value: CompareContextType = {
    compareItems,
    addToCompare,
    removeFromCompare,
    clearCompare,
    isInCompare,
    isFull,
  };

  return <CompareContext.Provider value={value}>{children}</CompareContext.Provider>;
}

export function useCompare() {
  const context = useContext(CompareContext);
  if (context === undefined) {
    throw new Error('useCompare must be used within a CompareProvider');
  }
  return context;
}
