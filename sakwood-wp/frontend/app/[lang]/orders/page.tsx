import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { ClientOrdersPage } from './ClientOrdersPage';

interface OrdersPageProps {
  params: Promise<{ lang: string }>;
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <ClientOrdersPage lang={lang as Locale} dictionary={dictionary} />;
}
