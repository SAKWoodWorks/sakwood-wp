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
  videoCategory: string;
  videoPosition: number;
  thumbnailUrl?: string;
  featuredImage?: VideoImage;
  views: number;
  language: string;
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
