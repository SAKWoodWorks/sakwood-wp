import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { DealerStatusPage } from './DealerStatusPage';
import type { Locale } from '@/i18n-config';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (params.lang || 'th') as Locale;
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.dealer.status_title} | SAK WoodWorks`,
    description: dictionary.dealer.page_subtitle,
  };
}

export default async function DealerStatusRoute({ params }: Props) {
  const lang = (params.lang || 'th') as Locale;
  const dictionary = await getDictionary(lang);

  return <DealerStatusPage lang={lang} dictionary={dictionary} />;
}
