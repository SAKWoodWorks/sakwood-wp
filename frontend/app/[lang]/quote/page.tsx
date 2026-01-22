import { getDictionary } from '@/lib/get-dictionary';
import QuotePage from '@/app/[lang]/quote/QuotePage';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <QuotePage lang={lang as Locale} dictionary={dictionary} />;
}
