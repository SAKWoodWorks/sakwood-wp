import { searchKBArticles } from '@/lib/services/knowledgeBaseService';
import { getDictionary } from '@/lib/get-dictionary';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { KBArticleCard } from '@/components/knowledge';
import { Search } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { KBArticle } from '@/lib/types';
import KnowledgeSearchClient from './KnowledgeSearchClient';

interface KnowledgeSearchPageProps {
  params: Promise<{
    lang: string;
  }>;
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function KnowledgeSearchPage({
  params,
  searchParams,
}: KnowledgeSearchPageProps) {
  const { lang } = await params;
  const { q: queryParam } = await searchParams;

  const dictionary = await getDictionary(lang as Locale);
  const { knowledge, common } = dictionary;

  const initialArticles = queryParam
    ? await searchKBArticles(queryParam, lang)
    : { success: true, data: [] };

  const breadcrumbItems = [
    { name: common.home, href: `/${lang}` },
    { name: knowledge.title, href: `/${lang}/knowledge` },
    { name: 'Search', href: `/${lang}/knowledge/search` },
  ];

  return (
    <>
      <Breadcrumbs items={breadcrumbItems} lang={lang as Locale} />
      <KnowledgeSearchClient
        lang={lang}
        query={queryParam || ''}
        dictionary={dictionary}
        initialArticles={initialArticles.data || []}
      />
    </>
  );
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
  searchParams,
}: KnowledgeSearchPageProps) {
  const { lang } = await params;
  const { q } = await searchParams;

  const dictionary = await getDictionary(lang as Locale);
  const { knowledge } = dictionary;

  return {
    title: q ? `Search: ${q} - ${knowledge.title}` : `Search - ${knowledge.title}`,
    description: knowledge.subtitle,
  };
}
