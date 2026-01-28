import { getDictionary } from '@/lib/get-dictionary';
import type { Locale } from '@/i18n-config';
import { AccountDashboard } from '@/components/auth/AccountDashboard';

interface AccountPageProps {
  params: Promise<{
    lang: string;
  }>;
}

export default async function AccountPage({ params }: AccountPageProps) {
  const { lang } = await params;
  const dictionary = await getDictionary(lang as Locale);

  return <AccountDashboard lang={lang as Locale} dictionary={dictionary} />;
}
