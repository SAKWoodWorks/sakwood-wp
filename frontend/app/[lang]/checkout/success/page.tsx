import { OrderSuccessPage } from '../OrderSuccessPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function OrderSuccessPageRoute({
  params,
  searchParams,
}: PageProps) {
  const { lang } = await params;
  const { orderId } = await searchParams;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <OrderSuccessPage
      lang={lang as Locale}
      dictionary={dictionary}
      orderId={orderId}
    />
  );
}
