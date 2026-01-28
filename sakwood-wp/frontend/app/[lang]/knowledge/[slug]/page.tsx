import { notFound } from 'next/navigation';
import { getKBArticleBySlug, getKBArticles, getKBCategories } from '@/lib/services/knowledgeBaseService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { HowToStructuredData } from '@/components/seo/HowToStructuredData';
import { SpeakableStructuredData } from '@/components/seo/SpeakableStructuredData';
import {
  KBDifficultyBadge,
  KBTableOfContents,
  KBRelatedArticles,
} from '@/components/knowledge';
import type { Locale } from '@/i18n-config';
import type { KBArticle } from '@/lib/types/knowledge-base';
import Link from 'next/link';

interface KnowledgeArticlePageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function KnowledgeArticlePage({
  params,
}: KnowledgeArticlePageProps) {
  const { lang, slug } = await params;

  const dictionary = await getDictionary(lang as Locale);
  const { knowledge, common } = dictionary;

  // Fetch article
  const articleResult = await getKBArticleBySlug(slug, lang);

  if (!articleResult.success || !articleResult.data) {
    notFound();
  }

  const article = articleResult.data;

  // Fetch related articles (same category, same difficulty, excluding current)
  const relatedResult = await getKBArticles(lang);
  const relatedArticles: KBArticle[] = relatedResult.success && relatedResult.data
    ? relatedResult.data
        .filter((a) =>
          a.id !== article.id &&
          a.category?.id === article.category?.id &&
          a.difficulty === article.difficulty
        )
        .slice(0, 5)
    : [];

  // Increment view count
  if (typeof window === 'undefined') {
    // Server-side: could trigger an API call to increment views
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: knowledge.title, href: `/${lang}/knowledge` },
    ...(article.category
      ? [{ name: article.category.name, href: `/${lang}/knowledge/category/${article.category.slug}` }]
      : []),
    { name: article.title, href: `/${lang}/knowledge/${slug}` },
  ];

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sakwood.com';
  const articleUrl = `${siteUrl}/${lang}/knowledge/${slug}`;

  return (
    <>
      <HowToStructuredData article={article} url={articleUrl} />
      <SpeakableStructuredData cssSelectors={['.kb-content']} />

      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with TOC */}
            <div className="lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                {/* Back to articles */}
                <Link
                  href={`/${lang}/knowledge`}
                  className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 mb-6 font-medium"
                >
                  ← {knowledge.back_to_articles}
                </Link>

                {/* Table of Contents */}
                <KBTableOfContents content={article.content} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Article Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                {/* Category & Difficulty */}
                <div className="flex items-center gap-3 mb-4">
                  {article.category && (
                    <Link
                      href={`/${lang}/knowledge/category/${article.category.slug}`}
                      className="text-sm font-medium text-blue-600 hover:text-blue-700"
                    >
                      {article.category.name}
                    </Link>
                  )}
                  {article.category && article.difficulty && (
                    <span className="text-gray-400">•</span>
                  )}
                  {article.difficulty && (
                    <KBDifficultyBadge
                      difficulty={article.difficulty}
                      label={
                        article.difficulty === 'beginner'
                          ? knowledge.beginner
                          : article.difficulty === 'intermediate'
                          ? knowledge.intermediate
                          : knowledge.advanced
                      }
                    />
                  )}
                </div>

                {/* Title */}
                <h1 className="text-4xl font-bold text-gray-900 mb-6">
                  {article.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                  {article.lastUpdated && (
                    <span>
                      Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
                    </span>
                  )}
                  {article.views !== undefined && (
                    <span>{article.views} views</span>
                  )}
                </div>
              </div>

              {/* Article Content */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 mb-8">
                <div
                  className="kb-content prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: article.content }}
                />
              </div>

              {/* Related Articles */}
              {relatedArticles.length > 0 && (
                <KBRelatedArticles
                  articles={relatedArticles}
                  title={knowledge.related_articles}
                  readMoreLabel={knowledge.read_more}
                  lang={lang}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: KnowledgeArticlePageProps) {
  const { lang, slug } = await params;

  const articleResult = await getKBArticleBySlug(slug, lang);

  if (!articleResult.success || !articleResult.data) {
    return {
      title: 'Article Not Found',
    };
  }

  const article = articleResult.data;

  return {
    title: article.title,
    description: article.content
      ? article.content.replace(/<[^>]*>/g, '').slice(0, 160)
      : undefined,
  };
}

// Generate static params
export async function generateStaticParams() {
  return [];
}
