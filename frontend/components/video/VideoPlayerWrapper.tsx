'use client';

import { createContext, useContext, useState } from 'react';
import { VideoPlayerModal } from '@/components/video/VideoPlayerModal';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoPlayerContextType {
  selectedVideo: VideoGalleryItem | null;
  isOpen: boolean;
  openModal: (video: VideoGalleryItem) => void;
  closeModal: () => void;
}

const VideoPlayerContext = createContext<VideoPlayerContextType | null>(null);

interface VideoPlayerWrapperProps {
  children: React.ReactNode;
}

export function VideoPlayerWrapper({ children }: VideoPlayerWrapperProps) {
  const [state, setState] = useState({
    selectedVideo: null as VideoGalleryItem | null,
    isOpen: false,
  });

  const openModal = (video: VideoGalleryItem) => {
    setState({ selectedVideo: video, isOpen: true });
  };

  const closeModal = () => {
    setState({ selectedVideo: null, isOpen: false });
  };

  return (
    <VideoPlayerContext.Provider value={{ ...state, openModal, closeModal }}>
      {children}
      <VideoPlayerModal
        video={state.selectedVideo}
        isOpen={state.isOpen}
        onClose={closeModal}
      />
    </VideoPlayerContext.Provider>
  );
}

export function useVideoPlayerStore() {
  const context = useContext(VideoPlayerContext);
  if (!context) {
    throw new Error('useVideoPlayerStore must be used within VideoPlayerWrapper');
  }
  return context;
}
