import { WholesaleApplyForm } from './WholesaleApplyForm';
import { getDictionary } from '@/lib/get-dictionary';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n-config';

export interface WholesaleApplyPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export async function generateMetadata({ params }: WholesaleApplyPageProps): Promise<Metadata> {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.wholesale.apply_title} | ${process.env.NEXT_PUBLIC_APP_NAME || 'Sakwood'}`,
    description: dictionary.wholesale.apply_subtitle,
  };
}

export default async function WholesaleApplyPage({ params }: WholesaleApplyPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang);

  return <WholesaleApplyForm lang={lang} dictionary={{ wholesale: dictionary.wholesale, common: dictionary.common }} />;
}
