import type { Product } from './product';
import type { Locale } from '@/i18n-config';

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatContext {
  language: Locale;
  products?: Product[];
  shipping?: {
    province: string;
    cost: number;
    estimatedDays: string;
  } | null;
}

export interface AIChatRequest {
  message: string;
  language: Locale;
  history: ChatMessage[];
}

export interface AIChatResponse {
  response: string;
  timestamp: number;
}
