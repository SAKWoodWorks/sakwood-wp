'use client';

import { useEffect, useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { APP_CONFIG } from '@/lib/config/constants';
import Image from 'next/image';

interface LINEChatButtonProps {
  lineUrl?: string;
  dictionary?: {
    chat?: {
      tooltip: string;
      title: string;
      close: string;
    };
  };
}

export function LINEChatButton({ lineUrl = 'https://lin.ee/ucIAvEC', dictionary }: LINEChatButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const [shouldPulse, setShouldPulse] = useState(true);

  useEffect(() => {
    setMounted(true);

    // Check if user previously dismissed the tooltip
    const wasDismissed = localStorage.getItem('line-chat-dismissed');
    if (wasDismissed) {
      setDismissed(true);
    }

    // Show tooltip after 3 seconds if not dismissed
    const timer = setTimeout(() => {
      if (!wasDismissed) {
        setIsOpen(true);
      }
    }, 3000);

    // Stop pulsing after 5 seconds
    const pulseTimer = setTimeout(() => {
      setShouldPulse(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearTimeout(pulseTimer);
    };
  }, []);

  const handleChatClick = () => {
    // Open LINE OA chat
    window.open(lineUrl, '_blank');
  };

  const handleDismiss = () => {
    setIsOpen(false);
    setDismissed(true);
    localStorage.setItem('line-chat-dismissed', 'true');
  };

  // Don't render anything on the server
  if (!mounted) {
    return null;
  }

  const chatTooltip = dictionary?.chat?.tooltip || 'Need help? Chat with us!';
  const chatTitle = dictionary?.chat?.title || 'Contact us on LINE';
  const closeLabel = dictionary?.chat?.close || 'Close';

  return (
    <>
      {/* Chat Button */}
      <div className="fixed bottom-24 right-8 z-50 flex flex-col items-end gap-3">
        {/* Tooltip */}
        {isOpen && !dismissed && (
          <div className="relative animate-fadeIn">
            <div className="absolute -right-2 bottom-0 w-3 h-3 bg-green-600 transform rotate-45"></div>
            <div className="bg-green-600 text-white px-4 py-3 rounded-lg shadow-xl max-w-xs mr-1 relative mb-2">
              <button
                onClick={handleDismiss}
                className="absolute top-1 right-1 text-green-200 hover:text-white transition-colors"
                aria-label={closeLabel}
              >
                <X className="w-3 h-3" />
              </button>
              <p className="text-sm font-semibold pr-4">{chatTooltip}</p>
              <p className="text-xs text-green-100 mt-1">{chatTitle}</p>
            </div>
          </div>
        )}

        {/* Main Button */}
        <button
          onClick={handleChatClick}
          className={`group relative bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 ${
            shouldPulse ? 'animate-pulse' : ''
          }`}
          aria-label="Chat on LINE"
        >
          {/* LINE Logo */}
          <Image
            src="/line-logo.png"
            alt="LINE"
            width={32}
            height={32}
            className="w-8 h-8"
            unoptimized
          />

          {/* Notification Dot */}
          <span className={`absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white ${
            shouldPulse ? 'animate-bounce' : ''
          }`}></span>

          {/* Hover Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
        </button>
      </div>
    </>
  );
}
