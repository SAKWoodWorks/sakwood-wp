'use client';

import { useRef, useEffect } from 'react';

interface AnnouncerProps {
  /** Message to announce to screen readers */
  message: string;
  /** Role of the live region (status or alert) */
  role?: 'status' | 'alert';
  /** Politeness level */
  ariaLive?: 'polite' | 'assertive';
}

/**
 * ARIA Live Region / Announcer
 * Announces dynamic content changes to screen readers
 *
 * Use this component when:
 * - Adding items to cart
 * - Form submission success/error
 * - Loading state changes
 * - Any dynamic content update
 *
 * @example
 * <Announcer message="Item added to cart" role="status" />
 *
 * WCAG 2.1 Success Criterion 4.1.3 - Status Messages
 */
export function Announcer({
  message,
  role = 'status',
  ariaLive = 'polite'
}: AnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (announcerRef.current && message) {
      // Update the announcement
      announcerRef.current.textContent = message;

      // Clear after announcement to allow re-announcing same message
      const timeoutId = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = '';
        }
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
  }, [message]);

  return (
    <div
      ref={announcerRef}
      role={role}
      aria-live={ariaLive}
      aria-atomic="true"
      className="sr-only"
    />
  );
}

/**
 * Convenience hook for announcements
 */
export function useAnnouncer() {
  const [announcement, setAnnouncement] = React.useState('');

  const announce = React.useCallback((message: string, role: 'status' | 'alert' = 'status') => {
    setAnnouncement(message);
  }, []);

  return { announcement, announce };
}

import React from 'react';
