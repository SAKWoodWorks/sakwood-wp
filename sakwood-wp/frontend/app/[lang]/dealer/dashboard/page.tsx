import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { DealerLocationForm } from '@/components/dealer/DealerLocationForm';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function DealerDashboardPage({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { common } = dictionary;

  // Check if user is logged in (basic check - frontend validation only)
  const cookieStore = await cookies();
  const userToken = cookieStore.get('sakwood-user');

  if (!userToken) {
    redirect(`/${lang}/account?redirect=${encodeURIComponent(`/${lang}/dealer/dashboard`)}`);
  }

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: 'Dealer Dashboard', href: `/${lang}/dealer/dashboard` }
  ];

  return (
    <main className="min-h-screen py-12">
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />

      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-900 mb-8">
          {lang === 'th' ? 'แดชบอร์ดดีลเลอร์' : 'Dealer Dashboard'}
        </h1>

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          <DealerLocationForm lang={lang as Locale} dictionary={dictionary} />
        </div>
      </div>
    </main>
  );
}
