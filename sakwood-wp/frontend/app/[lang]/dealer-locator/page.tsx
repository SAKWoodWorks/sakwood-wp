import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DealerLocator } from '@/components/dealer/DealerLocator';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function DealerLocatorPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: 'Dealer Locator', href: `/${lang}/dealer-locator` }
  ];

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          {lang === 'th' ? 'ค้นหาตัวแทนจำหน่าย' : 'Find a Dealer'}
        </h1>

        <DealerLocator lang={lang as Locale} dictionary={dictionary} />
      </div>
    </main>
  );
}
