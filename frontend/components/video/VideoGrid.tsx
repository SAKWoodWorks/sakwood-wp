import { VideoCard } from './VideoCard';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoGridProps {
  videos: VideoGalleryItem[];
  onPlay: (video: VideoGalleryItem) => void;
  className?: string;
}

export function VideoGrid({ videos, onPlay, className }: VideoGridProps) {
  if (!videos || videos.length === 0) {
    return (
      <div className={className}>
        <p className="text-center text-gray-500 py-12">ไม่พบวิดีโอ</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} onPlay={onPlay} />
        ))}
      </div>
    </div>
  );
}
