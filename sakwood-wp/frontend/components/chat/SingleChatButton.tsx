'use client';

import { useEffect, useState } from 'react';
import type { ChatPlatform, ChatConfig } from '@/lib/config/chatConfig';

interface SingleChatButtonProps {
  platform: ChatPlatform;
  config: ChatConfig;
  dictionary?: {
    chat?: {
      tooltip: string;
      title: string;
      close: string;
    };
  };
  index: number;
  isExpanded?: boolean;
}

export function SingleChatButton({ platform, config, dictionary, index, isExpanded }: SingleChatButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleChatClick = () => {
    // For call button, use direct navigation (tel: links don't work with window.open)
    if (platform.id === 'call') {
      // Ensure the URL has tel: prefix
      let phoneUrl = platform.url;
      if (!phoneUrl.startsWith('tel:')) {
        // Remove any non-numeric characters except + at the start
        const cleaned = phoneUrl.replace(/[^0-9+]/g, '');
        phoneUrl = `tel:${cleaned}`;
      }
      window.location.href = phoneUrl;
    } else {
      window.open(platform.url, '_blank', 'noopener,noreferrer');
    }
  };

  if (!mounted) return null;

  // Icon images or emoji for call
  const iconImages = {
    line: '/line-logo.png',
    telegram: '/telegram-logo.png',
    messenger: '/msg-logo.png',
    call: '📞', // Use emoji for call button
  };

  // Color mapping
  const colorClasses = {
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    indigo: 'from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700',
    black: 'from-gray-800 to-gray-900 hover:from-gray-900 hover:to-black',
    red: 'from-red-500 to-red-600 hover:from-red-600 hover:to-red-700',
  };

  const gradient = colorClasses[platform.color as keyof typeof colorClasses] || colorClasses.green;
  const iconSrc = iconImages[platform.id as keyof typeof iconImages] || iconImages.line;
  const isCallIcon = typeof iconSrc === 'string' && iconSrc === '📞';

  return (
    <button
      onClick={handleChatClick}
      className="group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-2 sm:p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
      aria-label={`Chat on ${platform.name}`}
    >
      {/* Platform icon */}
      {isCallIcon ? (
        <span className="text-lg sm:text-xl">{iconSrc}</span>
      ) : (
        <img src={iconSrc} alt={platform.name} width="20" height="20" className="sm:w-[24px] sm:h-[24px]" />
      )}

      {/* Platform name tooltip on hover - hide on mobile */}
      <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        {platform.name}
        <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>

      {/* Notification dot */}
      <span className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full border-2 border-white"></span>

      {/* Hover glow */}
      <div className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>
    </button>
  );
}
