import Link from 'next/link';
import Image from 'next/image';
import { getBlogPosts } from '@/lib/services/blogService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import type { Locale } from '@/i18n-config';

interface BlogPageProps {
  params: Promise<{
    lang: string;
  }>;
}

// Revalidate this page every 3 minutes (180 seconds)
export const revalidate = 180;

export default async function BlogPage({ params }: BlogPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { blog, common } = dictionary;

  const posts = await getBlogPosts(lang);

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
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">
              {blog.title}
            </span>
            <h1 className="text-5xl font-bold text-gray-900 mt-3 mb-4">
              {blog.subtitle}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {lang === 'th'
                ? 'บทความและความรู้เกี่ยวกับไม้ ไม้สน และวัสดุก่อสร้าง'
                : 'Articles and knowledge about wood, pine, and construction materials'}
            </p>
          </div>

          {/* Blog Posts Grid */}
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Featured Image */}
                  <Link href={`/${lang}/blog/${post.slug}`} className="block">
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      {post.featuredImage?.node?.sourceUrl ? (
                        <Image
                          src={post.featuredImage.node.sourceUrl}
                          alt={post.featuredImage.node.altText || post.title}
                          width={640}
                          height={360}
                          className="object-cover w-full h-full group-hover:scale-110 transition duration-500"
                          unoptimized
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                          <span className="text-4xl">📝</span>
                        </div>
                      )}
                    </div>
                  </Link>

                  {/* Content */}
                  <div className="p-6">
                    {/* Categories */}
                    {post.categories?.nodes && post.categories.nodes.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {post.categories.nodes.map((category) => (
                          <Link
                            key={category.slug}
                            href={`/${lang}/blog?category=${category.slug}`}
                            className="text-xs font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded hover:bg-blue-100 transition-colors"
                          >
                            {category.name}
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Date */}
                    <time className="text-sm text-gray-500 mb-3 block" dateTime={post.date}>
                      {formatDate(post.date)}
                    </time>

                    {/* Title */}
                    <Link href={`/${lang}/blog/${post.slug}`}>
                      <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-3 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Read More Link */}
                    <Link
                      href={`/${lang}/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium transition-colors"
                    >
                      {lang === 'th' ? 'อ่านต่อ' : 'Read More'}
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto border border-blue-100 shadow-lg">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {blog.title}
              </h3>
              <p className="text-gray-600 mb-6">
                {blog.no_articles_desc}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
