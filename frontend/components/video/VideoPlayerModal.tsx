'use client';

import { X } from 'lucide-react';
import { useEffect, useRef } from 'react';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoPlayerModalProps {
  video: VideoGalleryItem | null;
  isOpen: boolean;
  onClose: () => void;
}

export function VideoPlayerModal({ video, isOpen, onClose }: VideoPlayerModalProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Close on Escape key
  useEffect(() => {
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
  }, [isOpen, onClose]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-5xl">
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
            <h2 className="text-xl font-semibold text-white">{video.title}</h2>
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
