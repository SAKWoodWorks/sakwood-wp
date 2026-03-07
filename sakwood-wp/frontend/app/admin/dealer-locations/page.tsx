import { DealerLocationAdmin } from '@/components/admin/DealerLocationAdmin';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';

export default async function AdminDealerLocationsPage() {
  // Default to 'en' for admin pages
  const lang: Locale = 'en';
  const dictionary = await getDictionary(lang);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <DealerLocationAdmin lang={lang} dictionary={dictionary} />
      </div>
    </div>
  );
}
