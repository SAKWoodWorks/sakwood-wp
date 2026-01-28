import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { OrderSuccess } from '@/components/checkout/OrderSuccess';

interface OrderSuccessPageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    orderId?: string;
  }>;
}

export default async function OrderSuccessPage({ params, searchParams }: OrderSuccessPageProps) {
  const { lang } = await params;
  const { orderId } = await searchParams;
  const dictionary = await getDictionary(lang as Locale);

  return <OrderSuccess lang={lang as Locale} dictionary={dictionary} orderId={orderId} />;
}
