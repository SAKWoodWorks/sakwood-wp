'use client';

import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { useChatState } from '@/lib/context/ChatContext';

interface BackToTopProps {
  backToTopLabel: string;
}

export function BackToTop({ backToTopLabel }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isChatOpen } = useChatState();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Preventing hydration mismatch
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Check initial scroll position
    toggleVisibility();

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [mounted]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className={`fixed right-4 bottom-4 sm:right-8 z-50 bg-blue-600 hover:bg-blue-700 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-500 ease-in-out transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
            isChatOpen ? 'bottom-96 sm:bottom-96' : 'bottom-20 sm:bottom-32'
          }`}
          aria-label={backToTopLabel}
        >
          <ChevronUp className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      )}
    </>
  );
}
