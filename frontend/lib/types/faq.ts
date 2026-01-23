export interface FAQCategory {
  id: number;
  name: string;
  slug: string;
  count?: number;
  parent?: number;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
  category?: FAQCategory;
  order: number;
  featured: boolean;
  displayOnHomepage: boolean;
  language: string;
}

export interface FAQListResponse {
  faqs: FAQ[];
  pagination?: {
    total: number;
    perPage: number;
    currentPage: number;
    totalPages: number;
  };
}
