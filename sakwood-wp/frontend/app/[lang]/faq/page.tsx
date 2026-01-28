import { getFAQs, getFAQCategories } from '@/lib/services/faqService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQList, FAQSearch, FAQCategories } from '@/components/faq';
import { FAQPageStructuredData } from '@/components/seo/FAQPageStructuredData';
import type { Locale } from '@/i18n-config';
import type { FAQ, FAQCategory } from '@/lib/types';

interface FAQPageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    category?: string;
    q?: string;
  }>;
}

export default async function FAQPage({ params, searchParams }: FAQPageProps) {
  const { lang } = await params;
  const { category: categorySlug, q: searchQuery } = await searchParams;

  const dictionary = await getDictionary(lang as Locale);
  const { faq, common } = dictionary;

  // Fetch FAQs with optional category filter
  const faqsResult = await getFAQs(
    lang,
    categorySlug,
    100 // Get more FAQs for better search results
  );

  const categoriesResult = await getFAQCategories();

  const faqs: FAQ[] = faqsResult.success ? (faqsResult.data || []) : [];
  const categories: FAQCategory[] = categoriesResult.success ? (categoriesResult.data || []) : [];

  // Filter FAQs by search query if provided
  let filteredFAQs = faqs;
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    // Remove spaces for Thai search optimization
    const optimizedQuery = lang === 'th' ? query.replace(/\s+/g, '') : query;

    filteredFAQs = faqs.filter((faq) => {
      const question = faq.question.toLowerCase();
      const answer = faq.answer.toLowerCase();
      const optimizedQuestion = lang === 'th' ? question.replace(/\s+/g, '') : question;
      const optimizedAnswer = lang === 'th' ? answer.replace(/\s+/g, '') : answer;

      return (
        optimizedQuestion.includes(optimizedQuery) ||
        optimizedAnswer.includes(optimizedQuery)
      );
    });
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: faq.title, href: `/${lang}/faq` },
  ];

  return (
    <>
      <FAQPageStructuredData faqs={filteredFAQs} />

      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {faq.title}
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {faq.subtitle}
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <FAQSearch
              placeholder={faq.search_placeholder}
            />
          </div>

          {/* Categories */}
          {categories.length > 0 && (
            <div className="mb-8">
              <FAQCategories
                categories={categories}
                allLabel={faq.all_categories}
              />
            </div>
          )}

          {/* Results Count */}
          {(searchQuery || categorySlug) && (
            <div className="mb-6 text-sm text-gray-600">
              {searchQuery && (
                <span>
                  ค้นหา: &quot;{searchQuery}&quot; •{' '}
                </span>
              )}
              <span>
                พบ {filteredFAQs.length} คำถาม
              </span>
            </div>
          )}

          {/* FAQ List */}
          {filteredFAQs.length > 0 ? (
            <FAQList faqs={filteredFAQs} />
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <p className="text-gray-600 mb-2">{faq.no_results}</p>
              <p className="text-sm text-gray-500">{faq.no_results_desc}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({ params }: FAQPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { faq } = dictionary;

  return {
    title: faq.title,
    description: faq.subtitle,
  };
}
