/**
 * Form persistence hook for auto-saving checkout data to localStorage
 * Prevents data loss if user navigates away or page reloads
 */

import { useState, useEffect } from 'react';

export interface CheckoutFormData {
  email: string;
  lineId: string;
  phone: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  postalCode: string;
  notes: string;
  paymentMethod: string;
  province: string;
}

interface StoredFormData extends CheckoutFormData {
  timestamp: number;
}

interface FormPersistenceStorage {
  data: StoredFormData;
  version: number;
}

const STORAGE_VERSION = 1;
const DEFAULT_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours

/**
 * Hook for persisting form data to localStorage
 */
export function useFormPersistence(formKey: string, expiryMs: number = DEFAULT_EXPIRY_MS) {
  const [isLoaded, setIsLoaded] = useState(false);

  /**
   * Save form data to localStorage with timestamp
   */
  const saveForm = (data: CheckoutFormData): void => {
    try {
      const storageData: FormPersistenceStorage = {
        data: {
          ...data,
          timestamp: Date.now(),
        },
        version: STORAGE_VERSION,
      };

      localStorage.setItem(formKey, JSON.stringify(storageData));
    } catch (error) {
      // Silently fail if localStorage is not available
      console.warn('Failed to save form data to localStorage:', error);
    }
  };

  /**
   * Load form data from localStorage if not expired
   */
  const loadForm = (): CheckoutFormData | null => {
    try {
      const stored = localStorage.getItem(formKey);

      if (!stored) {
        return null;
      }

      const parsed: FormPersistenceStorage = JSON.parse(stored);

      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        clearForm();
        return null;
      }

      // Check expiration
      const age = Date.now() - parsed.data.timestamp;
      if (age > expiryMs) {
        clearForm();
        return null;
      }

      // Return data without timestamp
      const { timestamp, ...formData } = parsed.data;
      return formData;
    } catch (error) {
      console.warn('Failed to load form data from localStorage:', error);
      clearForm();
      return null;
    }
  };

  /**
   * Clear saved form data from localStorage
   */
  const clearForm = (): void => {
    try {
      localStorage.removeItem(formKey);
    } catch (error) {
      console.warn('Failed to clear form data from localStorage:', error);
    }
  };

  /**
   * Check if saved form data exists and is valid
   */
  const hasSavedForm = (): boolean => {
    try {
      const stored = localStorage.getItem(formKey);

      if (!stored) {
        return false;
      }

      const parsed: FormPersistenceStorage = JSON.parse(stored);

      // Check version compatibility
      if (parsed.version !== STORAGE_VERSION) {
        return false;
      }

      // Check expiration
      const age = Date.now() - parsed.data.timestamp;
      return age <= expiryMs;
    } catch (error) {
      return false;
    }
  };

  /**
   * Get age of saved form data in minutes
   */
  const getFormAge = (): number | null => {
    try {
      const stored = localStorage.getItem(formKey);

      if (!stored) {
        return null;
      }

      const parsed: FormPersistenceStorage = JSON.parse(stored);
      return Math.floor((Date.now() - parsed.data.timestamp) / (1000 * 60)); // minutes
    } catch (error) {
      return null;
    }
  };

  return {
    saveForm,
    loadForm,
    clearForm,
    hasSavedForm,
    getFormAge,
    isLoaded,
    setIsLoaded,
  };
}

/**
 * Check if localStorage is available
 */
export function isLocalStorageAvailable(): boolean {
  try {
    const test = '__storage_test__';
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}
