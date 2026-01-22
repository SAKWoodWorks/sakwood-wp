import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface RegisterPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function RegisterPage({ params }: RegisterPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { auth, common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: auth.register, href: `/${lang}/register` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      <RegisterForm lang={lang as Locale} dictionary={dictionary} />
    </>
  );
}
