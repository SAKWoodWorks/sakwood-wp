/**
 * CartContext Unit Tests
 *
 * Tests shopping cart functionality:
 * - Adding items to cart
 * - Removing items from cart
 * - Updating quantities
 * - Calculating totals
 * - localStorage persistence
 * - Image URL transformation for mobile
 */

import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/lib/context/CartContext';
import { Product } from '@/lib/types';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const mockProduct: Product = {
  id: '123',
  name: 'Test Wood Product',
  slug: 'test-wood-product',
  price: '1500.00',
  regularPrice: '2000.00',
  description: 'Test description',
  shortDescription: 'Short description',
  image: {
    sourceUrl: 'http://localhost:8006/wp-content/uploads/2026/01/test.jpg',
    altText: 'Test Product',
    title: 'Test',
  },
  stockStatus: 'INSTOCK',
};

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe('CartContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should add item to cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe('123');
    expect(result.current.items[0].quantity).toBe(1);
    expect(result.current.getCartCount()).toBe(1);
  });

  test('should increase quantity if item already exists', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.getCartCount()).toBe(2);
  });

  test('should remove item from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    expect(result.current.items).toHaveLength(1);

    act(() => {
      result.current.removeFromCart('123');
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.getCartCount()).toBe(0);
  });

  test('should update item quantity', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    act(() => {
      result.current.updateQuantity('123', 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.getCartCount()).toBe(5);
  });

  test('should calculate cart total correctly', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const product1: Product = { ...mockProduct, id: '1', price: '1000' };
    const product2: Product = { ...mockProduct, id: '2', price: '500' };

    act(() => {
      result.current.addToCart(product1);
      result.current.addToCart(product2);
    });

    act(() => {
      result.current.updateQuantity('1', 2);
      result.current.updateQuantity('2', 3);
    });

    // 2 * 1000 + 3 * 500 = 2000 + 1500 = 3500
    expect(result.current.getCartTotal()).toBe(3500);
  });

  test('should clear all items from cart', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
      result.current.addToCart({ ...mockProduct, id: '2' });
    });

    expect(result.current.items).toHaveLength(2);

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });

  test('should transform localhost image URLs for mobile compatibility', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    // Image URL should be transformed from localhost:8006 to /wp-content/
    expect(result.current.items[0].image?.sourceUrl).toBe('/wp-content/uploads/2026/01/test.jpg');
    expect(result.current.items[0].image?.sourceUrl).not.toContain('localhost:8006');
  });

  test('should transform Docker internal image URLs', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const dockerProduct: Product = {
      ...mockProduct,
      image: {
        ...mockProduct.image,
        sourceUrl: 'http://sak_wp:80/wp-content/uploads/2026/01/test.jpg',
      },
    };

    act(() => {
      result.current.addToCart(dockerProduct);
    });

    expect(result.current.items[0].image?.sourceUrl).toBe('/wp-content/uploads/2026/01/test.jpg');
    expect(result.current.items[0].image?.sourceUrl).not.toContain('sak_wp:80');
  });

  test('should not transform external image URLs', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const externalProduct: Product = {
      ...mockProduct,
      image: {
        ...mockProduct.image,
        sourceUrl: 'https://images.unsplash.com/photo-123.jpg',
      },
    };

    act(() => {
      result.current.addToCart(externalProduct);
    });

    expect(result.current.items[0].image?.sourceUrl).toBe('https://images.unsplash.com/photo-123.jpg');
  });

  test('should persist cart to localStorage', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart(mockProduct);
    });

    const savedCart = localStorage.getItem('sakwood-cart');
    expect(savedCart).toBeDefined();

    const parsedCart = JSON.parse(savedCart!);
    expect(parsedCart).toHaveLength(1);
    expect(parsedCart[0].id).toBe('123');
  });

  test('should handle items without images', () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    const noImageProduct: Product = {
      ...mockProduct,
      image: undefined,
    };

    act(() => {
      result.current.addToCart(noImageProduct);
    });

    expect(result.current.items[0].image).toBeUndefined();
  });
});
