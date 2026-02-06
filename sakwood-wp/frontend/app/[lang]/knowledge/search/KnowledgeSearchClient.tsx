'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { searchKBArticles } from '@/lib/services/knowledgeBaseService';
import { KBArticleCard } from '@/components/knowledge';
import { Search } from 'lucide-react';
import type { Locale } from '@/i18n-config';
import type { KBArticle, Dictionary } from '@/lib/types';

interface KnowledgeSearchClientProps {
  lang: string;
  query: string;
  dictionary: Pick<Dictionary, 'knowledge'>;
  initialArticles: KBArticle[];
}

export default function KnowledgeSearchClient({
  lang,
  query,
  dictionary,
  initialArticles,
}: KnowledgeSearchClientProps) {
  const [searchQuery, setSearchQuery] = useState(query);
  const [articles, setArticles] = useState<KBArticle[]>(initialArticles);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(!!query);
  const router = useRouter();

  const { knowledge } = dictionary;

  const performSearch = async (q: string) => {
    setLoading(true);
    setSearched(true);

    const result = await searchKBArticles(q, lang);

    if (result.success && result.data) {
      setArticles(result.data);
    } else {
      setArticles([]);
    }

    setLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${lang}/knowledge/search?q=${encodeURIComponent(searchQuery)}`);
      performSearch(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {knowledge.title}
          </h1>
          <p className="text-xl text-gray-600">
            {knowledge.search_placeholder}
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={knowledge.search_placeholder}
              className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow text-lg"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Search
            </button>
          </div>
        </form>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-pulse">
              <div className="h-64 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        )}

        {/* Results */}
        {!loading && searched && (
          <>
            <div className="mb-6">
              <p className="text-gray-600">
                {searchQuery && (
                  <span>
                    Search results for &quot;{searchQuery}&quot; •{' '}
                  </span>
                )}
                <span className="font-medium">
                  {articles.length} {articles.length === 1 ? 'article' : 'articles'} found
                </span>
              </p>
            </div>

            {articles.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {articles.map((article) => (
                  <KBArticleCard
                    key={article.id}
                    article={article}
                    difficultyLabels={{
                      beginner: knowledge.beginner,
                      intermediate: knowledge.intermediate,
                      advanced: knowledge.advanced,
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
                <p className="text-gray-600 mb-2">{knowledge.no_results}</p>
                <p className="text-sm text-gray-500">
                  Try different keywords or browse categories
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
