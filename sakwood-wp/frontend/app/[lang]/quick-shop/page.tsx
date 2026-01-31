import { Suspense } from 'react';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { QuickShopHero } from '@/components/quick-shop/QuickShopHero';
import { QuickShopProducts } from '@/components/quick-shop/QuickShopProducts';
import { QuickShopTrust } from '@/components/quick-shop/QuickShopTrust';
import { QuickShopBenefits } from '@/components/quick-shop/QuickShopBenefits';
import { QuickShopCTA } from '@/components/quick-shop/QuickShopCTA';

export const revalidate = 60; // ISR every 60 seconds

interface QuickShopPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function QuickShopPage({ params }: QuickShopPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return (
    <main className="min-h-screen bg-white">
      <QuickShopHero lang={lang as Locale} dictionary={dictionary} />
      <QuickShopTrust lang={lang as Locale} dictionary={dictionary} />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <QuickShopProducts lang={lang as Locale} dictionary={dictionary} />
      </Suspense>
      <QuickShopBenefits lang={lang as Locale} dictionary={dictionary} />
      <QuickShopCTA lang={lang as Locale} dictionary={dictionary} />
    </main>
  );
}

export async function generateMetadata({ params }: QuickShopPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as any);

  return {
    title: lang === 'th' ? 'ช้อปปิ้ง - SAK WoodWorks' : 'Quick Shop - SAK WoodWorks',
    description: lang === 'th'
      ? 'สั่งซื้อไม้คุณภาพสูงออนไลน์ จัดส่งทั่วประเทศไทย'
      : 'Order premium wood online with fast delivery across Thailand',
  };
}
