import { CheckoutPage } from './CheckoutPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function CheckoutPageWrapper({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <CheckoutPage lang={lang as Locale} dictionary={dictionary} />;
}
