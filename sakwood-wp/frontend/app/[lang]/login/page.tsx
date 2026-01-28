import Link from 'next/link';
import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { LoginForm } from '@/components/auth/LoginForm';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';

interface LoginPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);
  const { auth, common } = dictionary;

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: auth.login, href: `/${lang}/login` }
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      <LoginForm lang={lang as Locale} dictionary={dictionary} />
    </>
  );
}
