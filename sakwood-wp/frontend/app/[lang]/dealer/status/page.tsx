import { Metadata } from 'next';
import { getDictionary } from '@/lib/get-dictionary';
import { DealerStatusPage } from './DealerStatusPage';

type Props = {
  params: { lang: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang || 'th';
  const dictionary = await getDictionary(lang);

  return {
    title: `${dictionary.dealer.status_title} | SAK WoodWorks`,
    description: dictionary.dealer.page_subtitle,
  };
}

export default async function DealerStatusRoute({ params }: Props) {
  const lang = params.lang || 'th';
  const dictionary = await getDictionary(lang);

  return <DealerStatusPage lang={lang} dictionary={dictionary} />;
}
