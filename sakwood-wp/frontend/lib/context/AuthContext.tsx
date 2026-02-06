'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Announcer } from '@/components/ui/Announcer';

export type UserRole = 'retail' | 'wholesale';
export type WholesaleStatus = 'pending' | 'approved' | 'rejected' | 'active';
export type DealerTier = 'silver' | 'gold' | 'platinum';
export type DealerStatus = 'pending' | 'approved' | 'rejected' | 'active';

export interface DealerInfo {
  tierId?: number;
  tierName?: DealerTier;
  discountPercentage?: number;
  territories?: string[];
  status?: DealerStatus;
  expiryDate?: string;
  assignedDate?: string;
  minOrderAmount?: number;
  minOrderQuantity?: number;
  creditLimit?: number;
}

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
  dealerInfo?: DealerInfo;
  isDealer?: boolean;
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
  isDealer: boolean;
  canPurchaseOnCredit: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
  applyForWholesale: (data: WholesaleApplication) => Promise<{ success: boolean; error?: string }>;
  applyForDealer: (data: DealerApplication) => Promise<{ success: boolean; applicationId?: string; error?: string }>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (data: ProfileData) => Promise<{ success: boolean; error?: string }>;
  getDealerPricing: (tier: DealerTier) => number;
  canApplyForDealer: () => boolean;
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

export interface DealerApplication {
  requestedTier: number;
  businessRegistration?: string;
  storageFacility: string;
  deliveryVehicles: string;
  salesCapacity: string;
  dealerExperience: string;
  requestedTerritories: string[];
  tradeReferences?: Array<{
    company: string;
    contact: string;
    relationship: string;
  }>;
  businessReferences?: Array<{
    company: string;
    contact: string;
    accountValue: string;
  }>;
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
  const [announcement, setAnnouncement] = useState('');

  // Set mounted state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
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
      setAnnouncement(`Welcome back, ${data.user.displayName || data.user.firstName}`);

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
    setAnnouncement('You have been logged out successfully');
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

  // Computed state values - MUST be declared before useCallback hooks that use them
  const isWholesale = user?.role === 'wholesale' && user?.wholesaleStatus === 'active';
  const isDealer = user?.isDealer === true && user?.dealerInfo?.status === 'active';
  const canPurchaseOnCredit = (isWholesale || isDealer) && (user?.creditLimit || 0) > (user?.remainingCredit || 0);

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

  const applyForDealer = useCallback(async (data: DealerApplication) => {
    if (!isWholesale) {
      return { success: false, error: 'Must be an active wholesale customer to apply for dealer status' };
    }

    try {
      const response = await fetch('/api/dealer/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return { success: false, error: result.error || 'Dealer application failed' };
      }

      return { success: true, applicationId: result.applicationId };
    } catch (error) {
      console.error('Dealer application error:', error);
      return { success: false, error: 'An error occurred during dealer application' };
    }
  }, [token, isWholesale]);

  const getDealerPricing = useCallback((tier: DealerTier): number => {
    const tierMap = {
      silver: 0.80,    // 20% off
      gold: 0.75,      // 25% off
      platinum: 0.70   // 30% off
    };
    return tierMap[tier] || 0.85; // Default to wholesale (15% off)
  }, []);

  const canApplyForDealer = useCallback((): boolean => {
    // Must be active wholesale customer
    if (!isWholesale) {
      return false;
    }

    // Must not already be a dealer
    if (user?.isDealer || user?.dealerInfo?.status === 'active') {
      return false;
    }

    return true;
  }, [isWholesale, user?.isDealer, user?.dealerInfo?.status]);

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated: !!user && !!token,
    isWholesale,
    isDealer,
    canPurchaseOnCredit,
    login,
    register,
    logout,
    refreshUser,
    applyForWholesale,
    applyForDealer,
    changePassword,
    updateProfile,
    getDealerPricing,
    canApplyForDealer,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
      <Announcer message={announcement} role="status" />
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
