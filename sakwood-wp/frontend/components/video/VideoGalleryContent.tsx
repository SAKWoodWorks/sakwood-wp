'use client';

import { VideoGrid, VideoCategories } from '@/components/video';
import type { VideoGalleryItem, VideoCategory } from '@/lib/types';

interface VideoGalleryContentProps {
  videos: VideoGalleryItem[];
  categories: VideoCategory[];
  videosDict: {
    title?: string;
    subtitle?: string;
    all_categories?: string;
    no_results?: string;
  };
}

export function VideoGalleryContent({
  videos,
  categories,
  videosDict,
}: VideoGalleryContentProps) {
  return (
    <>
      {/* Categories */}
      {categories.length > 0 && (
        <div className="mb-8">
          <VideoCategories categories={categories} allLabel={videosDict.all_categories || 'All'} />
        </div>
      )}

      {/* Video Grid */}
      {videos.length > 0 ? (
        <VideoGrid videos={videos} />
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-600">{videosDict.no_results || 'No videos found'}</p>
        </div>
      )}
    </>
  );
}
