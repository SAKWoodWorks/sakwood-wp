export interface KBCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
  count?: number;
  parent?: number;
  children?: KBCategory[];
}

export interface KBAuthor {
  node: {
    name: string;
  };
}

export interface KBImage {
  node: {
    sourceUrl: string;
    altText?: string;
  };
}

export interface KBArticle {
  id: number;
  databaseId: number;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  date: string;
  lastUpdated?: string;
  featuredImage?: KBImage;
  author?: KBAuthor;
  category?: KBCategory;
  order: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  viewsCount: number;
  views?: number;
  isFeatured: boolean;
  relatedArticles: RelatedArticle[];
  language: string;
}

export interface RelatedArticle {
  id: number;
  title: string;
  slug: string;
}

export interface KBArticleListResponse {
  articles: KBArticle[];
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}
