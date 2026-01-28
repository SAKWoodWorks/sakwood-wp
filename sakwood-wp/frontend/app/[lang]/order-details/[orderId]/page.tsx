import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { OrderDetailsPage } from '@/components/order/OrderDetailsPage';

interface OrderDetailsPageProps {
  params: Promise<{
    lang: string;
    orderId: string;
  }>;
}

export default async function OrderDetails({ params }: OrderDetailsPageProps) {
  const { lang, orderId } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <OrderDetailsPage lang={lang as Locale} dictionary={dictionary} orderId={orderId} />;
}
