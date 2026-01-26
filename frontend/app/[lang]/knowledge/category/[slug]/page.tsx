import { notFound } from 'next/navigation';
import { getKBArticles, getKBCategories } from '@/lib/services/knowledgeBaseService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import {
  KBArticleCard,
  KBCategorySidebar,
} from '@/components/knowledge';
import type { Locale } from '@/i18n-config';
import type { KBCategory as KBCategoryType } from '@/lib/types';

interface KnowledgeCategoryPageProps {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
}

export default async function KnowledgeCategoryPage({
  params,
}: KnowledgeCategoryPageProps) {
  const { lang, slug } = await params;

  const dictionary = await getDictionary(lang as Locale);
  const { knowledge, common } = dictionary;

  // Fetch categories to find the current one
  const categoriesResult = await getKBCategories();

  if (!categoriesResult.success || !categoriesResult.data) {
    notFound();
  }

  // Find category and its parent categories
  const findCategory = (
    categories: KBCategoryType[],
    targetSlug: string,
    parentPath: KBCategoryType[] = []
  ): { category: KBCategoryType; path: KBCategoryType[] } | null => {
    for (const cat of categories) {
      if (cat.slug === targetSlug) {
        return { category: cat, path: [...parentPath, cat] };
      }
      if (cat.children) {
        const result = findCategory(cat.children, targetSlug, [...parentPath, cat]);
        if (result) return result;
      }
    }
    return null;
  };

  const categoryResult = findCategory(categoriesResult.data, slug);

  if (!categoryResult) {
    notFound();
  }

  const { category, path } = categoryResult;

  // Fetch articles in this category and its children
  const articlesResult = await getKBArticles(lang);

  const articles = articlesResult.success && articlesResult.data
    ? articlesResult.data.filter((a) => {
        if (a.category?.slug === slug) return true;
        // Check if article belongs to a subcategory
        const isInSubcategory = (cats: KBCategoryType[]): boolean => {
          for (const cat of cats) {
            if (cat.slug === slug) return true;
            if (cat.children) {
              if (isInSubcategory(cat.children)) return true;
            }
          }
          return false;
        };
        return a.category && categoriesResult.data && isInSubcategory(categoriesResult.data);
      })
    : [];

  // Get subcategories
  const subcategories = category.children || [];

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: knowledge.title, href: `/${lang}/knowledge` },
    { name: category.name, href: `/${lang}/knowledge/category/${slug}` },
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
                categories={categoriesResult.data}
                lang={lang}
                selectedCategory={slug}
              />
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Category Header */}
              <div className="mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  {category.name}
                </h1>
                {category.description && (
                  <p className="text-xl text-gray-600">{category.description}</p>
                )}
                {category.count !== undefined && (
                  <p className="text-sm text-gray-500 mt-2">
                    {category.count} {category.count === 1 ? 'article' : 'articles'}
                  </p>
                )}
              </div>

              {/* Subcategories */}
              {subcategories.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Subcategories
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subcategories.map((sub) => (
                      <a
                        key={sub.id}
                        href={`/${lang}/knowledge/category/${sub.slug}`}
                        className="bg-white rounded-lg p-4 border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
                      >
                        <h3 className="font-medium text-gray-900 hover:text-blue-600">
                          {sub.name}
                        </h3>
                        {sub.count !== undefined && (
                          <p className="text-sm text-gray-500 mt-1">
                            {sub.count} {sub.count === 1 ? 'article' : 'articles'}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles */}
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">
                  Articles
                </h2>
                {articles.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map((article) => (
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
export async function generateMetadata({ params }: KnowledgeCategoryPageProps) {
  const { lang, slug } = await params;

  const categoriesResult = await getKBCategories();

  if (!categoriesResult.success || !categoriesResult.data) {
    return {
      title: 'Category Not Found',
    };
  }

  // Find category
  const findCategory = (
    categories: KBCategoryType[],
    targetSlug: string
  ): KBCategoryType | null => {
    for (const cat of categories) {
      if (cat.slug === targetSlug) return cat;
      if (cat.children) {
        const result = findCategory(cat.children, targetSlug);
        if (result) return result;
      }
    }
    return null;
  };

  const category = findCategory(categoriesResult.data, slug);

  return {
    title: category ? category.name : 'Category',
    description: category?.description || `Browse articles in ${category?.name}`,
  };
}
