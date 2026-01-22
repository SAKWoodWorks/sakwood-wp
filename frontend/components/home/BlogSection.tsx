'use client';

import { useState, useEffect } from 'react';
import { getBlogPosts } from '@/lib/services/blogService';
import { BlogPost } from '@/lib/types';
import Link from 'next/link';
import Image from 'next/image';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';

interface BlogSectionProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function BlogSection({ lang, dictionary }: BlogSectionProps) {
  const { blog, common } = dictionary;
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      setLoading(true);
      try {
        const data = await getBlogPosts(lang);
        setPosts(data.slice(0, 3)); // Show only 3 latest posts
      } catch (error) {
        console.error('Failed to load blog posts:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, [lang]);

  // Format date based on locale
  const formatDate = (dateString: string) => {
    const locale = lang === 'th' ? 'th-TH' : 'en-US';
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <section
      className="bg-slate-50 py-24 px-6"
      aria-labelledby="blog-heading"
    >
      <div className="max-w-7xl mx-auto">
        <header className="flex flex-col md:flex-row justify-between items-end mb-12 border-b border-slate-200 pb-6">
          <div>
            <span className="text-blue-600 font-bold tracking-wider uppercase text-sm">{blog.title}</span>
            <h2
              id="blog-heading"
              className="text-3xl md:text-4xl font-extrabold mt-2 uppercase text-slate-900"
            >
              {blog.subtitle}
            </h2>
          </div>
          <Link
            href={`/${lang}/blog`}
            className="hidden md:inline-block px-6 py-3 border border-slate-300 hover:border-blue-600 hover:text-blue-600 transition-colors uppercase text-sm font-bold tracking-wide"
            aria-label={blog.view_all}
          >
            {blog.view_all} →
          </Link>
        </header>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="status" aria-label="Loading blog posts">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white border border-slate-100 rounded-xl overflow-hidden" aria-hidden="true">
                <div className="aspect-video bg-slate-200 animate-pulse" />
                <div className="p-6">
                  <div className="h-4 bg-slate-200 rounded mb-2 animate-pulse w-1/3" />
                  <div className="h-6 bg-slate-200 rounded mb-3 animate-pulse" />
                  <div className="h-6 bg-slate-200 rounded mb-4 animate-pulse" />
                  <div className="h-4 bg-slate-200 rounded w-2/3 animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8" role="list" aria-label="Latest blog articles">
            {posts.map((post) => (
              <article key={post.id} className="bg-white border border-slate-100 rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 group">
                {/* Featured Image */}
                <Link href={`/${lang}/blog/${post.slug}`} className="block" aria-label={`Read article: ${post.title}`}>
                  <div className="aspect-video relative overflow-hidden bg-slate-100">
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
                      <div className="flex items-center justify-center h-full text-slate-400" aria-hidden="true">
                        <span className="text-4xl">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                  </div>
                </Link>

                {/* Content */}
                <div className="p-6">
                  {/* Categories */}
                  {post.categories?.nodes && post.categories.nodes.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {post.categories.nodes.map((category) => (
                        <span
                          key={category.slug}
                          className="text-xs font-bold uppercase tracking-wide text-blue-600 bg-blue-50 px-2 py-1 rounded"
                        >
                          {category.name}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Date */}
                  <time className="text-sm text-slate-500 mb-3 block" dateTime={post.date}>
                    {formatDate(post.date)}
                  </time>

                  {/* Title */}
                  <Link href={`/${lang}/blog/${post.slug}`} aria-label={`Read article: ${post.title}`}>
                    <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {post.title}
                    </h3>
                  </Link>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-slate-600 line-clamp-3">
                      {post.excerpt}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl p-12 text-center max-w-2xl mx-auto border border-blue-100 shadow-lg" role="alert">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6" aria-hidden="true">
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

        {posts.length > 0 && (
          <div className="mt-12 text-center md:hidden">
            <Link
              href={`/${lang}/blog`}
              className="inline-block px-8 py-3 bg-blue-600 text-white font-bold uppercase tracking-wide hover:bg-blue-700 transition rounded-lg"
              aria-label={blog.view_all}
            >
              {blog.view_all}
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
