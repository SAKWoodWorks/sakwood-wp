import { getDictionary } from '@/lib/get-dictionary';
import ContactPage from '@/app/[lang]/contact/ContactPage';
import type { Locale } from '@/i18n-config';

interface PageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function Page({ params }: PageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <ContactPage lang={lang as Locale} dictionary={dictionary} />;
}
