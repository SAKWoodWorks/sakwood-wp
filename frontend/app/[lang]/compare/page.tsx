import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { ProductCompareTable } from '@/components/products/ProductCompareTable';

interface ComparePageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function ComparePage({ params }: ComparePageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <ProductCompareTable lang={lang} dictionary={dictionary} />;
}
