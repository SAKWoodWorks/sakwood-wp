import { notFound } from 'next/navigation';
import { getVideoBySlug, getVideos } from '@/lib/services/videoService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Locale } from '@/i18n-config';
import type { VideoGalleryItem } from '@/lib/types';

interface VideoPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function VideoPage({ params }: VideoPageProps) {
  const { lang, slug } = await params;

  const dictionary = await getDictionary(lang as Locale);
  const { videos: videosDict, common } = dictionary;

  // Fetch video by slug
  const videoResult = await getVideoBySlug(slug, lang);

  if (!videoResult.success || !videoResult.data) {
    notFound();
  }

  const video = videoResult.data;

  // Fetch related videos (same category, excluding current video)
  const relatedVideosResult = await getVideos(lang, video.category);
  const relatedVideos = relatedVideosResult.success && relatedVideosResult.data
    ? relatedVideosResult.data.filter((v) => v.id !== video.id).slice(0, 6)
    : [];

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: videosDict.title, href: `/${lang}/videos` },
    { name: video.title, href: `/${lang}/videos/${slug}` },
  ];

  // Generate embed URL based on video type
  const getEmbedUrl = () => {
    if (video.videoType === 'youtube' && video.videoId) {
      return `https://www.youtube.com/embed/${video.videoId}?autoplay=0&rel=0`;
    }

    if (video.videoType === 'vimeo' && video.videoId) {
      return `https://player.vimeo.com/video/${video.videoId}?autoplay=0`;
    }

    return '';
  };

  const embedUrl = getEmbedUrl();

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Video Player */}
          <div className="bg-black rounded-xl overflow-hidden shadow-2xl mb-8">
            <div className="aspect-video">
              {embedUrl ? (
                <iframe
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

          {/* Video Info */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {video.title}
                </h1>
                {video.category && (
                  <span className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                    {video.category}
                  </span>
                )}
              </div>
              {video.duration && (
                <div className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                  {videosDict.duration}: {video.duration}
                </div>
              )}
            </div>

            {video.description && (
              <div className="prose prose-sm max-w-none text-gray-600">
                <p>{video.description}</p>
              </div>
            )}
          </div>

          {/* Related Videos */}
          {relatedVideos.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {videosDict.related_videos}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedVideos.map((v) => (
                  <a
                    key={v.id}
                    href={`/${lang}/videos/${v.slug}`}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video bg-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
                      {v.thumbnail ? (
                        <img
                          src={v.thumbnail}
                          alt={v.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : v.videoType === 'youtube' && v.videoId ? (
                        <img
                          src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                          alt={v.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <span className="text-4xl">🎬</span>
                        </div>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 mt-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {v.title}
                    </h3>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: VideoPageProps) {
  const { lang, slug } = await params;

  const videoResult = await getVideoBySlug(slug, lang);

  if (!videoResult.success || !videoResult.data) {
    return {
      title: 'Video Not Found',
    };
  }

  const video = videoResult.data;

  return {
    title: video.title,
    description: video.description || `Watch ${video.title} on Sakwood`,
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  // In production, you might want to fetch actual slugs from WordPress
  // For now, return empty array to use dynamic rendering
  return [];
}
