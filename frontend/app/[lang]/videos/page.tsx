import { getVideos, getVideoCategories } from '@/lib/services/videoService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { VideoGrid, VideoCategories } from '@/components/video';
import { VideoPlayerWrapper } from '@/components/video/VideoPlayerWrapper';
import type { Locale } from '@/i18n-config';

interface VideosPageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function VideosPage({ params, searchParams }: VideosPageProps) {
  const { lang } = await params;
  const { category: categorySlug } = await searchParams;

  const dictionary = await getDictionary(lang as Locale);
  const { videos: videosDict, common } = dictionary;

  // Fetch videos and categories
  const videosResult = await getVideos(lang);
  const categoriesResult = await getVideoCategories();

  const videos = videosResult.success && videosResult.data ? videosResult.data : [];
  const categories = categoriesResult.success && categoriesResult.data ? categoriesResult.data : [];

  // Filter videos by category if specified
  const filteredVideos = categorySlug
    ? videos.filter((v) => v.category === categorySlug)
    : videos;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: videosDict.title, href: `/${lang}/videos` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <VideoPlayerWrapper />

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
                allLabel={videosDict.all_categories}
              />
            </div>
          )}

          {/* Video Grid */}
          {filteredVideos.length > 0 ? (
            <VideoGrid videos={filteredVideos} />
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
