import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { Locale } from '@/i18n-config';
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { OrdersList } from '@/components/account/OrdersList';

interface OrdersPageProps {
  params: Promise<{ lang: Locale }>;
}

export async function generateMetadata({ params }: OrdersPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.account?.orders || 'My Orders'} - ${dictionary.site_name || 'SAK WoodWorks'}`,
    description: dictionary.account?.orders_description || 'View your order history',
  };
}

export default async function OrdersPage({ params }: OrdersPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);
  const cookieStore = await cookies();

  // Check if user is logged in via auth token
  const token = cookieStore.get('sakwood-auth-token')?.value;

  if (!token) {
    redirect(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/account/orders`)}`);
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {dictionary.account?.orders || 'My Orders'}
          </h1>
          <p className="mt-2 text-gray-600">
            {dictionary.account?.orders_description || 'View and track your orders'}
          </p>
        </div>

        {/* Orders List */}
        <OrdersList lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
