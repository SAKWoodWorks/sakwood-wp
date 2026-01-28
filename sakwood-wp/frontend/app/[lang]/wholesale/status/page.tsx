import { WholesaleStatusPage } from './WholesaleStatusPage';
import { getDictionary } from '@/lib/get-dictionary';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';

export interface WholesaleStatusPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export async function generateMetadata({ params }: WholesaleStatusPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.wholesale.status_page_title} | ${process.env.NEXT_PUBLIC_APP_NAME || 'Sakwood'}`,
    description: dictionary.wholesale.status_page_subtitle,
  };
}

export default async function Page({ params }: WholesaleStatusPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <WholesaleStatusPage lang={lang} dictionary={{ wholesale: dictionary.wholesale, common: dictionary.common }} />;
}
