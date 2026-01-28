'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle } from 'lucide-react';
import { SingleChatButton } from './SingleChatButton';
import { getEnabledPlatforms, type ChatConfig } from '@/lib/config/chatConfig';
import { getChatConfigClient } from '@/lib/services/chatServiceClient';
import { useChatState } from '@/lib/context/ChatContext';

interface ChatButtonsProps {
  dictionary?: Record<string, any>;
}

export function ChatButtons({ dictionary }: ChatButtonsProps) {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isChatOpen, setIsChatOpen } = useChatState();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    // Fetch config from WordPress (with fallback to defaults)
    getChatConfigClient()
      .then(setConfig)
      .catch((err) => {
        console.error('[ChatButtons] Unexpected error loading config:', err);
      });
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
  };

  if (!mounted) return null;
  if (!config) {
    // Show nothing while loading (prevents flash)
    return null;
  }

  const enabledPlatforms = getEnabledPlatforms(config);

  if (enabledPlatforms.length === 0) {
    return null;
  }

  return (
    <div ref={containerRef} className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-[9999] flex flex-col items-end gap-3">
      {/* Platform buttons - show when expanded */}
      {isChatOpen && enabledPlatforms.map((platform, index) => (
        <div
          key={platform.id}
          className={`animate-slideInRight stagger-${index + 1}`}
        >
          <SingleChatButton
            platform={platform}
            config={config}
            dictionary={dictionary}
            index={index}
            isExpanded={isChatOpen}
          />
        </div>
      ))}

      {/* Main toggle button */}
      <button
        onClick={toggleChat}
        className={`group relative bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 ${
          isChatOpen ? 'rotate-45' : ''
        }`}
        aria-label={isChatOpen ? 'Close chat' : 'Open chat'}
      >
        {/* Chat icon */}
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />

        {/* Notification dot - only show when closed */}
        {!isChatOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white"></span>
        )}

        {/* Tooltip when closed - hide on mobile */}
        {!isChatOpen && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            Chat with us!
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        )}

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
      </button>
    </div>
  );
}
