import { OrderDetailsPage } from '../OrderDetailsPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
    orderId: string;
  }>;
}

export default async function OrderDetailsPageRoute({
  params,
}: PageProps) {
  const { lang, orderId } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <OrderDetailsPage
      lang={lang as Locale}
      dictionary={dictionary}
      orderId={orderId}
    />
  );
}
