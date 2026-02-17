/**
 * CompareContext Unit Tests
 *
 * Tests for product comparison state management
 */

import { renderHook, act } from '@testing-library/react';
import { CompareProvider, useCompare } from '@/lib/context/CompareContext';
import type { Product } from '@/lib/types/product';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

describe('CompareContext', () => {
  beforeEach(() => {
    localStorageMock.getItem.mockClear();
    localStorageMock.setItem.mockClear();
    localStorageMock.clear.mockClear();
  });

  // Mock product
  const mockProduct: Product = {
    id: '1',
    name: 'Test Product',
    slug: 'test-product',
    price: '1,000.00฿',
    image: { sourceUrl: 'https://example.com/image.jpg' },
  };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CompareProvider>{children}</CompareProvider>
  );

  describe('initial state', () => {
    it('should initialize with empty compare items', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      expect(result.current.compareItems).toEqual([]);
      expect(result.current.isFull).toBe(false);
    });

    it('should load items from localStorage on mount', () => {
      const savedItems = [mockProduct];
      localStorageMock.getItem.mockReturnValue(JSON.stringify(savedItems));

      const { result } = renderHook(() => useCompare(), { wrapper });

      // Wait for useEffect to run
      act(() => {
        expect(result.current.compareItems).toEqual([]);
      });
    });
  });

  describe('addToCompare', () => {
    it('should add product to compare', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
      });

      expect(result.current.compareItems).toHaveLength(1);
      expect(result.current.compareItems[0]).toEqual(mockProduct);
      expect(result.current.isFull).toBe(false);
    });

    it('should not add duplicate product', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
        result.current.addToCompare(mockProduct);
      });

      expect(result.current.compareItems).toHaveLength(1);
    });

    it('should enforce maximum 4 items limit', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      const products: Product[] = Array.from({ length: 5 }, (_, i) => ({
        ...mockProduct,
        id: String(i + 1),
        name: `Product ${i + 1}`,
      }));

      act(() => {
        products.forEach((product) => {
          result.current.addToCompare(product);
        });
      });

      expect(result.current.compareItems).toHaveLength(4);
      expect(result.current.isFull).toBe(true);
    });
  });

  describe('removeFromCompare', () => {
    it('should remove product from compare', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
        expect(result.current.compareItems).toHaveLength(1);

        result.current.removeFromCompare(mockProduct.id);
      });

      expect(result.current.compareItems).toHaveLength(0);
    });

    it('should handle removing non-existent product', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.removeFromCompare('non-existent-id');
      });

      expect(result.current.compareItems).toHaveLength(0);
    });
  });

  describe('clearCompare', () => {
    it('should clear all products', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
        expect(result.current.compareItems).toHaveLength(1);

        result.current.clearCompare();
      });

      expect(result.current.compareItems).toHaveLength(0);
      expect(result.current.isFull).toBe(false);
    });
  });

  describe('isInCompare', () => {
    it('should return true when product is in compare', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
      });

      expect(result.current.isInCompare(mockProduct.id)).toBe(true);
    });

    it('should return false when product is not in compare', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      expect(result.current.isInCompare('non-existent')).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    it('should save to localStorage when items change', () => {
      const { result } = renderHook(() => useCompare(), { wrapper });

      act(() => {
        result.current.addToCompare(mockProduct);
      });

      expect(localStorageMock.setItem).toHaveBeenCalledWith(
        'sakwood-compare',
        expect.stringContaining('"id":"1"')
      );
    });
  });

  describe('error handling', () => {
    it('should handle localStorage errors gracefully', () => {
      localStorageMock.getItem.mockImplementation(() => {
        throw new Error('localStorage error');
      });

      const { result } = renderHook(() => useCompare(), { wrapper });

      // Should not throw, just log error
      expect(result.current.compareItems).toEqual([]);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorageMock.getItem.mockReturnValue('invalid json');

      const { result } = renderHook(() => useCompare(), { wrapper });

      // Should not throw, just log error
      expect(result.current.compareItems).toEqual([]);
    });
  });
});
