export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

export interface VideoImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}

export interface Video {
  id: number;
  databaseId: number;
  title: string;
  slug: string;
  description: string;
  excerpt: string;
  date: string;
  videoUrl?: string;
  videoType: 'youtube' | 'vimeo';
  videoId?: string;
  videoDuration?: string;
  duration?: string;
  videoCategory: string;
  category?: string;
  videoPosition: number;
  thumbnailUrl?: string;
  thumbnail?: string;
  featuredImage?: VideoImage;
  views: number;
  language: string;
}

// Type for the video components (alias for compatibility with component expectations)
export interface VideoGalleryItem extends Video {
  // Add any additional fields needed by components
  duration?: string;
  category?: string;
}

export interface VideoListResponse {
  videos: Video[];
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}
