'use client';

import { useState, useEffect, useRef } from 'react';
import { MessageCircle, Bot } from 'lucide-react';
import { SingleChatButton } from './SingleChatButton';
import { AIChatInterface } from './AIChatInterface';
import { getEnabledPlatforms, type ChatConfig } from '@/lib/config/chatConfig';
import { getChatConfigClient } from '@/lib/services/chatServiceClient';
import { useChatState } from '@/lib/context/ChatContext';
import type { Locale } from '@/i18n-config';

interface ChatButtonsProps {
  dictionary?: Record<string, any>;
  lang?: Locale;
}

export function ChatButtons({ dictionary, lang = 'th' }: ChatButtonsProps) {
  const [config, setConfig] = useState<ChatConfig | null>(null);
  const [mounted, setMounted] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const { isChatOpen, setIsChatOpen } = useChatState();
  const containerRef = useRef<HTMLDivElement>(null);
  const aiChatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
    setMounted(true);

    // Fetch config from WordPress (with fallback to defaults)
    getChatConfigClient()
      .then(setConfig)
      .catch((err) => {
        console.error('[ChatButtons] Unexpected error loading config:', err);
      });
  }, []);

  // Close platform chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close AI chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (aiChatRef.current && !aiChatRef.current.contains(event.target as Node)) {
        setIsAIChatOpen(false);
      }
    };

    if (isAIChatOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isAIChatOpen]);

  // Handle Escape key to close chats
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isAIChatOpen) setIsAIChatOpen(false);
        if (isChatOpen) setIsChatOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isAIChatOpen, isChatOpen, setIsChatOpen]);

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    // Close AI chat when opening platform chat
    if (!isChatOpen) {
      setIsAIChatOpen(false);
    }
  };

  const toggleAIChat = () => {
    setIsAIChatOpen(!isAIChatOpen);
    // Close platform chat when opening AI chat
    if (!isAIChatOpen) {
      setIsChatOpen(false);
    }
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
    <div className="fixed right-4 bottom-4 sm:right-8 sm:bottom-8 z-[9999] flex flex-col items-end gap-3">
      {/* AI Chat Interface - show when opened */}
      {isAIChatOpen && (
        <div
          ref={aiChatRef}
          className="mb-3 w-full max-w-md h-[600px] shadow-2xl animate-slideInRight"
        >
          <AIChatInterface
            language={lang}
            onClose={() => setIsAIChatOpen(false)}
          />
        </div>
      )}

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

      {/* AI Chat Button - show when platform chat is expanded */}
      {isChatOpen && (
        <div className="animate-slideInRight stagger-0">
          <button
            onClick={toggleAIChat}
            className="group relative bg-gradient-to-br from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white p-3 sm:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
            aria-label={lang === 'th' ? 'เปิดแชท AI' : 'Open AI chat'}
          >
            <Bot className="w-5 h-5 sm:w-6 sm:h-6" />

            {/* Tooltip */}
            <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              {lang === 'th' ? 'แชทกับ AI' : 'Chat with AI'}
              <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
            </div>

            {/* Hover glow */}
            <div className="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
          </button>
        </div>
      )}

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
        {!isChatOpen && !isAIChatOpen && (
          <span className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-white"></span>
        )}

        {/* Tooltip when closed - hide on mobile */}
        {!isChatOpen && !isAIChatOpen && (
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
