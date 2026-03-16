export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
}

export interface ChatContext {
  language: 'en' | 'th';
  products?: any[];
  shipping?: {
    province: string;
    cost: number;
    estimatedDays: string;
  } | null;
}

export interface AIChatRequest {
  message: string;
  language: 'en' | 'th';
  history: ChatMessage[];
}

export interface AIChatResponse {
  response: string;
  timestamp: number;
}
