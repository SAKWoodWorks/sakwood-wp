import { getKBArticles, getKBCategories, getFeaturedKBArticles } from '@/lib/services/knowledgeBaseService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import {
  KBArticleCard,
  KBCategorySidebar,
} from '@/components/knowledge';
import type { Locale } from '@/i18n-config';
import type { KBCategory } from '@/lib/types';

interface KnowledgePageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function KnowledgePage({
  params,
  searchParams,
}: KnowledgePageProps) {
  const { lang } = await params;
  const { category: categorySlug } = await searchParams;

  const dictionary = await getDictionary(lang as Locale);
  const { knowledge, common } = dictionary;

  // Fetch articles
  const articlesResult = await getKBArticles(lang);
  const categoriesResult = await getKBCategories();
  const featuredResult = await getFeaturedKBArticles(lang);

  const articles = articlesResult.success ? (articlesResult.data || []) : [];
  const categories = categoriesResult.success ? (categoriesResult.data || []) : [];
  const featured = featuredResult.success ? (featuredResult.data || []) : [];

  // Filter by category if selected
  const filteredArticles = categorySlug
    ? articles.filter((a) => a.category?.slug === categorySlug)
    : articles;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: knowledge.title, href: `/${lang}/knowledge` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <KBCategorySidebar
                categories={categories}
                lang={lang}
                selectedCategory={categorySlug}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {knowledge.title}
                </h1>
                <p className="text-xl text-gray-600">
                  {knowledge.subtitle}
                </p>
              </div>

              {/* Featured Articles */}
              {featured.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    {knowledge.featured_articles}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {featured.map((article) => (
                      <KBArticleCard
                        key={article.id}
                        article={article}
                        difficultyLabels={{
                          beginner: knowledge.beginner,
                          intermediate: knowledge.intermediate,
                          advanced: knowledge.advanced,
                        }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* All Articles */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  {knowledge.all_articles}
                </h2>
                {filteredArticles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredArticles.map((article) => (
                      <KBArticleCard
                        key={article.id}
                        article={article}
                        difficultyLabels={{
                          beginner: knowledge.beginner,
                          intermediate: knowledge.intermediate,
                          advanced: knowledge.advanced,
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                    <p className="text-gray-600">{knowledge.no_results}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: KnowledgePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { knowledge } = dictionary;

  return {
    title: knowledge.title,
    description: knowledge.subtitle,
  };
}
