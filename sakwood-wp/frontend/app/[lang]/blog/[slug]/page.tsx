import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getBlogPostBySlug } from '@/lib/services/blogService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { sanitizeHTMLSync } from '@/lib/utils/sanitize';
import { ArticleStructuredData } from '@/components/seo/ArticleStructuredData';
import { SpeakableStructuredData } from '@/components/seo/SpeakableStructuredData';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPostBySlug(slug, lang);
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://sakwood.com";

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  const title = post.title || 'Blog Post';
  const description = post.excerpt || post.content?.replace(/<[^>]*>?/gm, '').substring(0, 160) || '';
  const imageUrl = post.featuredImage?.node?.sourceUrl || `${siteUrl}/og-image.jpg`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${lang}/blog/${slug}`,
      siteName: 'Sakwood',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: title,
        }
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [imageUrl],
    },
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
    },
  };
}

// Revalidate this page every 5 minutes (300 seconds)
export const revalidate = 300;

export default async function BlogPostPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { blog, common } = dictionary;

  const post = await getBlogPostBySlug(slug, lang);

  if (!post) {
    notFound();
  }

  // Format date based on locale
  const formatDate = (dateString: string) => {
    const locale = lang === 'th' ? 'th-TH' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: blog.title, href: `/${lang}/blog` },
    { name: post.title, href: `/${lang}/blog/${slug}` },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';
  const articleUrl = `${siteUrl}/${lang}/blog/${slug}`;

  return (
    <>
      <ArticleStructuredData article={post} url={articleUrl} />
      <SpeakableStructuredData cssSelectors={['.prose']} />

      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 text-white py-20 px-6">
          <div className="max-w-4xl mx-auto">
            {/* Categories */}
            {post.categories?.nodes && post.categories.nodes.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.nodes.map((category) => (
                  <span
                    key={category.slug}
                    className="text-xs font-bold uppercase tracking-wide bg-blue-700 text-blue-100 px-3 py-1 rounded-full"
                  >
                    {category.name}
                  </span>
                ))}
              </div>
            )}

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-blue-100">
              {post.author?.node && (
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>{post.author.node.name}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {post.featuredImage?.node?.sourceUrl && (
          <div className="max-w-5xl mx-auto px-6 -mt-10">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-white">
              <Image
                src={post.featuredImage.node.sourceUrl}
                alt={post.featuredImage.node.altText || post.title}
                width={1200}
                height={630}
                className="w-full h-auto"
                unoptimized
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="max-w-4xl mx-auto px-6 py-16">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Excerpt */}
            {post.excerpt && (
              <div className="text-xl text-gray-600 leading-relaxed mb-8 pb-8 border-b border-gray-200">
                {post.excerpt}
              </div>
            )}

            {/* Content */}
            <div
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: sanitizeHTMLSync(post.content || '') }}
            />

            {/* Tags */}
            {post.tags?.nodes && post.tags.nodes.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-4">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.nodes.map((tag) => (
                    <Link
                      key={tag.slug}
                      href={`/${lang}/blog?tag=${tag.slug}`}
                      className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Share/Actions */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <Link
                  href={`/${lang}/blog`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  {blog.view_all}
                </Link>
              </div>
            </div>
          </div>

          {/* Author Bio */}
          {post.author?.node && (
            <div className="mt-8 bg-blue-50 rounded-2xl p-8">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-8 h-8 text-blue-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{post.author.node.name}</h3>
                  <p className="text-sm text-gray-600">
                    {lang === 'th' ? 'ผู้เขียนบทความ' : 'Article Author'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Back to Top */}
        <div className="max-w-4xl mx-auto px-6 pb-16 text-center">
          <a
            href="#top"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
            {lang === 'th' ? 'กลับไปด้านบน' : 'Back to top'}
          </a>
        </div>
      </article>
    </>
  );
}
