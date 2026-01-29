'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/context/AuthContext';
import { OrdersList } from '@/components/account/OrdersList';
import type { Locale } from '@/i18n-config';
import type { Dictionary } from '@/lib/types/dictionary';

interface ClientOrdersPageProps {
  lang: Locale;
  dictionary: Dictionary;
}

export function ClientOrdersPage({ lang, dictionary }: ClientOrdersPageProps) {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!user) {
      router.push(`/${lang}/login?redirect=${encodeURIComponent(`/${lang}/orders`)}`);
    }
  }, [user, lang, router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg p-12 text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    );
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
            {dictionary.account?.orders_description || 'View your order history'}
          </p>
        </div>

        {/* Orders List */}
        <OrdersList lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
