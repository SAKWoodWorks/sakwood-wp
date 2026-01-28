'use client';

import { Play } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';
import { useVideoPlayerStore } from './VideoPlayerWrapper';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoCardProps {
  video: VideoGalleryItem;
}

export function VideoCard({ video }: VideoCardProps) {
  const [imageError, setImageError] = useState(false);
  const { openModal } = useVideoPlayerStore();

  // Generate thumbnail URL based on video type
  const getThumbnailUrl = () => {
    if (video.thumbnailUrl) {
      return video.thumbnailUrl;
    }

    if (video.videoType === 'youtube' && video.videoId) {
      return `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    }

    // Fallback placeholder
    return '/images/video-placeholder.jpg';
  };

  const duration = video.videoDuration
    ? video.videoDuration
    : null;

  return (
    <div
      onClick={() => openModal(video)}
      className="group cursor-pointer"
    >
      <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
        {/* Thumbnail */}
        {!imageError ? (
          <Image
            src={getThumbnailUrl()}
            alt={video.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
            unoptimized
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <span className="text-6xl">🎬</span>
          </div>
        )}

        {/* Play Button Overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
          <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300">
            <Play className="w-8 h-8 text-blue-600 ml-1" />
          </div>
        </div>

        {/* Duration Badge */}
        {duration && (
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
            {duration}
          </div>
        )}

        {/* Category Badge */}
        {video.videoCategory && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded">
            {video.videoCategory}
          </div>
        )}
      </div>

      {/* Video Info */}
      <div className="mt-3">
        <h3 className="font-semibold text-gray-900 line-clamp-2 group-hover:text-blue-600 transition-colors">
          {video.title}
        </h3>
        {video.description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {video.description}
          </p>
        )}
      </div>
    </div>
  );
}
