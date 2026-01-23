'use client';

import { useState, useEffect } from 'react';
import { getVideos, getVideoCategories } from '@/lib/services/videoService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { VideoGrid, VideoPlayerModal, VideoCategories } from '@/components/video';
import type { Locale } from '@/i18n-config';
import type { VideoGalleryItem, VideoCategory } from '@/lib/types';

interface VideosPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default function VideosPage({ params }: VideosPageProps) {
  const [lang, setLang] = useState<string>('th');
  const [videos, setVideos] = useState<VideoGalleryItem[]>([]);
  const [categories, setCategories] = useState<VideoCategory[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>();
  const [selectedVideo, setSelectedVideo] = useState<VideoGalleryItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [dictionary, setDictionary] = useState<any>(null);

  useEffect(() => {
    async function loadData() {
      const { lang: langParam } = await params;
      setLang(langParam);

      const dict = await getDictionary(langParam as Locale);
      setDictionary(dict);

      const videosResult = await getVideos(langParam);
      const categoriesResult = await getVideoCategories();

      if (videosResult.success && videosResult.data) {
        setVideos(videosResult.data);
      }
      if (categoriesResult.success && categoriesResult.data) {
        setCategories(categoriesResult.data);
      }

      setLoading(false);
    }

    loadData();
  }, [params]);

  const handlePlayVideo = (video: VideoGalleryItem) => {
    setSelectedVideo(video);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedVideo(null);
  };

  const handleSelectCategory = (slug: string | undefined) => {
    setSelectedCategory(slug);
  };

  // Filter videos by category
  const filteredVideos = selectedCategory
    ? videos.filter((v) => v.category === selectedCategory)
    : videos;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 rounded w-1/3 mb-4 mx-auto"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!dictionary) return null;

  const { videos: videosDict, common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: videosDict.title, href: `/${lang}/videos` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <VideoPlayerModal
        video={selectedVideo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {videosDict.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {videosDict.subtitle}
            </p>
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <VideoCategories
                categories={categories}
                selectedCategory={selectedCategory}
                onSelectCategory={handleSelectCategory}
                allLabel={videosDict.all_categories}
              />
            </div>
          )}

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos} onPlay={handlePlayVideo} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600">{videosDict.no_results}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: VideosPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { videos } = dictionary;

  return {
    title: videos.title,
    description: videos.subtitle,
  };
}
