'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type CookieConsent = 'accepted' | 'declined' | null;

interface CookieContextType {
  consent: CookieConsent;
  setConsent: (consent: CookieConsent) => void;
  hasConsented: (category: 'necessary' | 'functional' | 'analytics' | 'marketing') => boolean;
}

const CookieContext = createContext<CookieContextType | undefined>(undefined);

export function CookieProvider({ children }: { children: ReactNode }) {
  const [consent, setConsentState] = useState<CookieConsent>(null);
  const [mounted, setMounted] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const savedConsent = localStorage.getItem('cookie_consent');
    if (savedConsent === 'accepted' || savedConsent === 'declined') {
      setConsentState(savedConsent);
    }
    setMounted(true);
  }, []);

  const setConsent = (newConsent: CookieConsent) => {
    setConsentState(newConsent);
    if (newConsent) {
      localStorage.setItem('cookie_consent', newConsent);
      localStorage.setItem('cookie_consent_date', new Date().toISOString());

      // Set consent timestamp for 1 year
      const expiryDate = new Date();
      expiryDate.setFullYear(expiryDate.getFullYear() + 1);
      localStorage.setItem('cookie_consent_expiry', expiryDate.toISOString());
    }
  };

  // Check if user has consented to a specific category
  const hasConsented = (category: 'necessary' | 'functional' | 'analytics' | 'marketing'): boolean => {
    if (consent === 'declined') return false;

    const categoryConsent = localStorage.getItem(`cookie_consent_${category}`);
    return categoryConsent === 'true' || category === 'necessary';
  };

  if (!mounted) return null;

  return (
    <CookieContext.Provider value={{ consent, setConsent, hasConsented }}>
      {children}
    </CookieContext.Provider>
  );
}

export function useCookie() {
  const context = useContext(CookieContext);
  if (context === undefined) {
    throw new Error('useCookie must be used within a CookieProvider');
  }
  return context;
}
