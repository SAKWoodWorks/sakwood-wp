/**
 * AuthContext Unit Tests
 *
 * Tests authentication functionality:
 * - Login/logout
 * - User registration
 * - User roles (retail/wholesale)
 * - Wholesale status flow
 * - Dealer tier system
 * - localStorage persistence
 */

import { renderHook, act, waitFor } from '@testing-library/react';
import { AuthProvider, useAuth } from '@/lib/context/AuthContext';
import fetchMock from 'jest-fetch-mock';

// Mock fetch
fetchMock.enableMocks();

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <AuthProvider>{children}</AuthProvider>
);

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    fetchMock.resetMocks();
  });

  test('should start with no authenticated user', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
  });

  test('should login user successfully', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      role: 'retail' as const,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: mockUser,
      token: 'mock-token-123',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('test@example.com', 'password123');
    });

    expect(loginResult.success).toBe(true);
    await waitFor(() => {
      expect(result.current.user).toEqual(mockUser);
      expect(result.current.isAuthenticated).toBe(true);
    });
  });

  test('should handle login failure', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({
      success: false,
      error: 'Invalid credentials',
    }), { status: 401 });

    const { result } = renderHook(() => useAuth(), { wrapper });

    let loginResult;
    await act(async () => {
      loginResult = await result.current.login('test@example.com', 'wrong-password');
    });

    expect(loginResult.success).toBe(false);
    expect(loginResult.error).toBe('Invalid credentials');
    expect(result.current.user).toBeNull();
  });

  test('should logout user', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      role: 'retail' as const,
    };

    // Set initial state
    localStorage.setItem('sakwood-user', JSON.stringify(mockUser));
    localStorage.setItem('sakwood-token', 'mock-token');

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: mockUser,
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Wait for initial load
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    act(() => {
      result.current.logout();
    });

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(localStorage.getItem('sakwood-user')).toBeNull();
    expect(localStorage.getItem('sakwood-token')).toBeNull();
  });

  test('should identify wholesale users correctly', async () => {
    const wholesaleUser = {
      id: 2,
      email: 'wholesale@example.com',
      firstName: 'Wholesale',
      lastName: 'Buyer',
      displayName: 'Wholesale Buyer',
      role: 'wholesale' as const,
      wholesaleStatus: 'active' as const,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: wholesaleUser,
      token: 'mock-token',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('wholesale@example.com', 'password123');
    });

    await waitFor(() => {
      expect(result.current.isWholesale).toBe(true);
      expect(result.current.user?.role).toBe('wholesale');
    });
  });

  test('should identify dealer users correctly', async () => {
    const dealerUser = {
      id: 3,
      email: 'dealer@example.com',
      firstName: 'Dealer',
      lastName: 'Partner',
      displayName: 'Dealer Partner',
      role: 'wholesale' as const,
      isDealer: true,
      dealerInfo: {
        tierName: 'gold' as const,
        discountPercentage: 15,
        status: 'active' as const,
      },
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: dealerUser,
      token: 'mock-token',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('dealer@example.com', 'password123');
    });

    await waitFor(() => {
      expect(result.current.isDealer).toBe(true);
      expect(result.current.user?.dealerInfo?.tierName).toBe('gold');
    });
  });

  test('should change password successfully', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      role: 'retail' as const,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: mockUser,
      token: 'mock-token',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Login first
    await act(async () => {
      await result.current.login('test@example.com', 'oldpassword');
    });

    // Mock password change API
    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
    }));

    let changePasswordResult;
    await act(async () => {
      changePasswordResult = await result.current.changePassword('oldpassword', 'newpassword123');
    });

    expect(changePasswordResult.success).toBe(true);
  });

  test('should handle password change with wrong current password', async () => {
    const mockUser = {
      id: 1,
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      displayName: 'Test User',
      role: 'retail' as const,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: mockUser,
      token: 'mock-token',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    // Login first
    await act(async () => {
      await result.current.login('test@example.com', 'correctpassword');
    });

    // Mock failed password change
    fetchMock.mockResponseOnce(JSON.stringify({
      success: false,
      error: 'Current password is incorrect',
    }), { status: 401 });

    let changePasswordResult;
    await act(async () => {
      changePasswordResult = await result.current.changePassword('wrongpassword', 'newpassword123');
    });

    expect(changePasswordResult.success).toBe(false);
    expect(changePasswordResult.error).toBe('Current password is incorrect');
  });

  test('should get dealer pricing correctly', () => {
    const { result } = renderHook(() => useAuth(), { wrapper });

    // Test different tier pricing
    expect(result.current.getDealerPricing('silver')).toBe(10); // 10% discount
    expect(result.current.getDealerPricing('gold')).toBe(15);   // 15% discount
    expect(result.current.getDealerPricing('platinum')).toBe(20); // 20% discount
  });

  test('should check dealer eligibility correctly', async () => {
    const wholesaleUser = {
      id: 2,
      email: 'wholesale@example.com',
      firstName: 'Wholesale',
      lastName: 'Buyer',
      displayName: 'Wholesale Buyer',
      role: 'wholesale' as const,
      wholesaleStatus: 'active' as const,
    };

    fetchMock.mockResponseOnce(JSON.stringify({
      success: true,
      user: wholesaleUser,
      token: 'mock-token',
    }));

    const { result } = renderHook(() => useAuth(), { wrapper });

    await act(async () => {
      await result.current.login('wholesale@example.com', 'password123');
    });

    await waitFor(() => {
      // Active wholesale users can apply for dealer
      expect(result.current.canApplyForDealer()).toBe(true);
    });
  });
});
