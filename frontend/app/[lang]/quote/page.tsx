import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { QuoteForm } from '@/components/quote';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function QuotePage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common, quote } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: quote.page_title, href: `/${lang}/quote` }
  ];

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-4">
            {quote.page_title}
          </h1>
          <p className="text-gray-600 mb-8">
            {quote.page_subtitle}
          </p>

          <QuoteForm lang={lang as Locale} dictionary={dictionary} />
        </div>
      </div>
    </main>
  );
}
