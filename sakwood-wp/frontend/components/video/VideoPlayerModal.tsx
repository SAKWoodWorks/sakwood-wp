'use client';

import { X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoPlayerModalProps {
  video: VideoGalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = useState(false);

  // Ensure client-side only rendering
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Ensuring client-side only rendering
    setMounted(true);
  }, []);

  // Close on Escape key
  useEffect(() => {
    if (!mounted) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, mounted]);

  // Focus management for accessibility
  useEffect(() => {
    if (!mounted || !isOpen) return;

    if (modalRef.current) {
      // Store the currently focused element
      previousActiveElement.current = document.activeElement as HTMLElement;

      // Get all focusable elements within the modal
      const focusableElements = modalRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      // Focus the first element
      firstElement?.focus();

      // Handle Tab key to trap focus within modal
      const handleTab = (e: KeyboardEvent) => {
        if (e.key !== 'Tab') return;

        // If Shift+Tab on first element, move to last element
        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement?.focus();
        }
        // If Tab on last element, move to first element
        else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement?.focus();
        }
      };

      document.addEventListener('keydown', handleTab);

      return () => {
        document.removeEventListener('keydown', handleTab);
        // Restore focus when modal closes
        previousActiveElement.current?.focus();
      };
    }
  }, [isOpen, mounted]);

  // Reset iframe when modal closes
  useEffect(() => {
    if (!isOpen && iframeRef.current) {
      iframeRef.current.src = '';
    }
  }, [isOpen]);

  if (!isOpen || !video) return null;

  // Generate embed URL based on video type
  const getEmbedUrl = () => {
    if (video.videoType === 'youtube' && video.videoId) {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0`;
    }

    if (video.videoType === 'vimeo' && video.videoId) {
      return `https://player.vimeo.com/video/${video.videoId}?autoplay=1`;
    }

    return '';
  };

  const embedUrl = getEmbedUrl();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" suppressHydrationWarning>
      <div
        ref={modalRef}
        className="relative w-full max-w-5xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-title"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-8 h-8" />
        </button>

        {/* Modal Content */}
        <div className="bg-black rounded-xl overflow-hidden shadow-2xl">
          {/* Video Title */}
          <div className="px-6 py-4 bg-gradient-to-r from-gray-900 to-gray-800">
            <h2 id="video-title" className="text-xl font-semibold text-white">{video.title}</h2>
            {video.description && (
              <p className="text-sm text-gray-300 mt-1">{video.description}</p>
            )}
          </div>

          {/* Video Player */}
          <div className="aspect-video">
            {embedUrl ? (
              <iframe
                ref={iframeRef}
                src={embedUrl}
                title={video.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-white">
                <p>Unable to load video</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
