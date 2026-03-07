'use client';

import { useEffect, RefObject } from 'react';

/**
 * Focus trap hook for modal accessibility
 * Traps keyboard focus within a modal element
 */
export function useFocusTrap(
  isActive: boolean,
  containerRef: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    if (!isActive || !containerRef.current) return;

    const container = containerRef.current;
    const focusableElements = container.querySelectorAll<
      HTMLElement
    >(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Focus the first element when trap activates
    if (firstElement) {
      firstElement.focus();
    }

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      // If Shift + Tab on first element, move to last
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      }
      // If Tab on last element, move to first
      else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    // Prevent focus from leaving the container
    const handleFocusIn = (e: FocusEvent) => {
      if (!container.contains(e.target as Node)) {
        e.preventDefault();
        firstElement?.focus();
      }
    };

    container.addEventListener('keydown', handleTab);
    document.addEventListener('focusin', handleFocusIn);

    return () => {
      container.removeEventListener('keydown', handleTab);
      document.removeEventListener('focusin', handleFocusIn);
    };
  }, [isActive, containerRef]);
}
