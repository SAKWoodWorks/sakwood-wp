'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export type UserRole = 'retail' | 'wholesale';
export type WholesaleStatus = 'pending' | 'approved' | 'rejected' | 'active';

interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  role?: UserRole;
  wholesaleStatus?: WholesaleStatus;
  businessName?: string;
  taxId?: string;
  pricingTier?: string;
  creditLimit?: number;
  remainingCredit?: number;
}

export interface ProfileData {
  firstName?: string;
  lastName?: string;
  phone?: string;
  billingAddress?: {
    address1?: string;
    address2?: string;
    city?: string;
    province?: string;
    postcode?: string;
    country?: string;
  };
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isWholesale: boolean;
  canPurchaseOnCredit: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  applyForWholesale: (data: WholesaleApplication) => Promise<{ success: boolean; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: ProfileData) => Promise<{ success: boolean; error?: string }>;
}

export interface WholesaleApplication {
  companyName: string;
  taxId: string;
  businessType: string;
  businessAddress: string;
  businessCity: string;
  businessProvince: string;
  businessPostalCode: string;
  businessPhone: string;
  estimatedMonthlyVolume: string;
  references?: string;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'sakwood_token';
const USER_KEY = 'sakwood_user';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Load token and user from localStorage on mount
  useEffect(() => {
    if (!mounted) return;

    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);

    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Error parsing stored user:', error);
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }

    setIsLoading(false);
  }, [mounted]);

  const login = useCallback(async (email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Login failed' };
      }

      // Save token and user to state and localStorage
      setToken(data.token);
      setUser(data.user);
      localStorage.setItem(TOKEN_KEY, data.token);
      localStorage.setItem(USER_KEY, JSON.stringify(data.user));

      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: 'An error occurred during login' };
    }
  }, []);

  const register = useCallback(async (data: RegisterData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Registration failed' };
      }

      // Auto-login after successful registration
      if (result.token && result.user) {
        setToken(result.token);
        setUser(result.user);
        localStorage.setItem(TOKEN_KEY, result.token);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
      }

      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'An error occurred during registration' };
    }
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const refreshUser = useCallback(async () => {
    if (!token) return;

    try {
      const response = await fetch('/api/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem(USER_KEY, JSON.stringify(userData));
      } else {
        // Token might be expired, logout
        logout();
      }
    } catch (error) {
      console.error('Error refreshing user:', error);
    }
  }, [token, logout]);

  const applyForWholesale = useCallback(async (data: WholesaleApplication) => {
    try {
      const response = await fetch('/api/wholesale/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Application failed' };
      }

      // Update user status to pending
      if (result.user) {
        setUser(result.user);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
      }

      return { success: true };
    } catch (error) {
      console.error('Wholesale application error:', error);
      return { success: false, error: 'An error occurred during application' };
    }
  }, [token]);

  const changePassword = useCallback(async (currentPassword: string, newPassword: string) => {
    try {
      const response = await fetch('/api/user/password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        return { success: false, error: data.error || 'Password change failed' };
      }

      return { success: true };
    } catch (error) {
      console.error('Password change error:', error);
      return { success: false, error: 'An error occurred while changing password' };
    }
  }, [token]);

  const updateProfile = useCallback(async (data: ProfileData) => {
    try {
      const response = await fetch('/api/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Profile update failed' };
      }

      // Update user data in context
      if (result.user) {
        setUser(result.user);
        localStorage.setItem(USER_KEY, JSON.stringify(result.user));
      }

      return { success: true };
    } catch (error) {
      console.error('Profile update error:', error);
      return { success: false, error: 'An error occurred while updating profile' };
    }
  }, [token]);

  const isWholesale = user?.role === 'wholesale' && user?.wholesaleStatus === 'active';
  const canPurchaseOnCredit = isWholesale && (user?.creditLimit || 0) > (user?.remainingCredit || 0);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isWholesale,
    canPurchaseOnCredit,
    login,
    register,
    logout,
    refreshUser,
    applyForWholesale,
    changePassword,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
