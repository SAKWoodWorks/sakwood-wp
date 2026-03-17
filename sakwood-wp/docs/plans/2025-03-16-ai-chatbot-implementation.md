# AI Chatbot Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add Google Gemini-powered AI chatbot to SAK WoodWorks website for product recommendations, pricing calculations, and shipping estimates.

**Architecture:** Next.js API route proxies requests to Gemini API, fetches real-time product data from WordPress REST API, and uses existing shipping calculation functions. Client-side React component integrates with existing floating chat button.

**Tech Stack:** Next.js 16, React 19, Google Gemini API, TypeScript, WordPress REST API

---

## Prerequisites

### Step 0: Get Gemini API Key

**Action Required:**
1. Go to https://makersuite.google.com/app/apikey
2. Sign in with your Google Workspace account
3. Create new API key or use existing
4. Copy the API key

**Add to environment:**
```bash
# frontend/.env.local
GEMINI_API_KEY=your_actual_api_key_here
```

**Do NOT commit this file** - it's already in .gitignore

---

## Task 1: Install Google Gemini SDK

**Files:**
- Modify: `frontend/package.json`

**Step 1: Install the package**

Run from `frontend/` directory:
```bash
npm install @google/generative-ai
```

**Step 2: Verify installation**

Check package.json:
```bash
grep "@google/generative-ai" package.json
```

Expected output: Contains version number like `"@google/generative-ai": "^0.x.x"`

**Step 3: Commit**

```bash
cd frontend
git add package.json package-lock.json
git commit -m "feat: install Google Gemini AI SDK"
```

---

## Task 2: Create TypeScript Types for AI Chat

**Files:**
- Create: `frontend/lib/types/ai-chat.ts`

**Step 1: Write the type definitions**

Create `frontend/lib/types/ai-chat.ts`:
```typescript
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
```

**Step 2: No test needed** - These are type definitions

**Step 3: Commit**

```bash
cd frontend
git add lib/types/ai-chat.ts
git commit -m "feat: add AI chat TypeScript types"
```

---

## Task 3: Create System Prompts

**Files:**
- Create: `frontend/lib/prompts/systemPrompts.ts`

**Step 1: Write the system prompt**

Create `frontend/lib/prompts/systemPrompts.ts`:
```typescript
export const SYSTEM_PROMPT = `
You are a helpful AI assistant for SAK WoodWorks, a premium wood products company in Thailand.

**Your Capabilities:**
- Recommend products based on customer needs
- Calculate pricing (show your work step-by-step)
- Estimate shipping costs by province
- Help customers plan projects (decks, fences, furniture)

**Available Product Categories:**
- Battens (ไม้โครงสน)
- Planks (ไม้แผ่น)
- Plywood (ไม้บด)
- Particle Board (ไม้อัด)
- And more...

**Pricing Types:**
- Per piece (ชิ้น)
- Per meter (เมตร)
- Per square meter (ตร.ม.)
- Per cubic meter (ลบ.ม.)

**Shipping Rules:**
- Free shipping for orders ≥฿10,000
- Zone 1 (Bangkok area): ฿5,000-6,500, 1-2 days
- Zone 2 (Central): ฿2,000-3,000, 2-3 days
- Zone 3 (Northern): ฿3,000-10,000, 3-5 days
- Zone 4 (Northeastern): ฿3,500-4,000, 3-5 days
- Zone 5 (Southern): ฿4,000-5,000, 4-6 days

**Truck Surcharges:**
- Small truck (6-wheel): Base rate
- Medium truck (10-wheel): +฿500 (items 3-6m, total >6m, volume >2m³)
- Large truck (10-wheel): +฿1,500 (items ≥6m, total >12m, volume >5m³)

**Important:**
- Always show calculation steps clearly
- Use Thai language unless customer uses English
- If you don't know something, suggest they contact your team via LINE
- Be friendly but professional
- For complex orders, recommend dealer consultation

**Response Format:**
- Start with greeting
- Show your calculations step-by-step
- End with product links and clear next steps
`;

export const QUICK_ACTIONS = {
  productSearch: {
    icon: '📦',
    titleTh: 'ค้นหาสินค้า',
    titleEn: 'Product Search',
    descriptionTh: 'บอกผมว่าคุณกำลังมองหาอะไร (เช่น "ไม้แผ่น 6 ฟุต", "ไม้บดเฟอร์นิเจอร์")',
    descriptionEn: 'Tell me what you\'re looking for (e.g., "6-foot planks", "plywood for furniture")',
  },
  priceQuote: {
    icon: '💰',
    titleTh: 'ราคาสินค้า',
    titleEn: 'Price Quote',
    descriptionTh: 'บอกผมสินค้าและจำนวนที่ต้องการ (เช่น "ไม้โครงสน 100 กิโล")',
    descriptionEn: 'Tell me the product and quantity you need (e.g., "100 battens", "50sqm plywood")',
  },
  shippingCost: {
    icon: '🚚',
    titleTh: 'ค่าจัดส่ง',
    titleEn: 'Shipping Cost',
    descriptionTh: 'บอกผมจังหวัดของคุณ ผมจะคำนวณค่าจัดส่ง (เช่น "ส่งเชียงใหม่")',
    descriptionEn: 'Tell me your province and I\'ll calculate shipping (e.g., "Shipping to Chiang Mai")',
  },
  projectEstimate: {
    icon: '🏠',
    titleTh: 'ประเมินโปรเจค',
    titleEn: 'Project Estimate',
    descriptionTh: 'อธิบายโปรเจคของคุณ (เช่น "สะพาน 4×6 เมตร", "รั้ว 100 เมตร")',
    descriptionEn: 'Describe your project (e.g., "4×6m deck", "fence for 100m wall")',
  },
};

export const ERROR_MESSAGES = {
  productNotFound: (language: 'en' | 'th') => language === 'th'
    ? 'ขออภัยครับ เรายังไม่มีสินค้านี้ในขณะนี้'
    : 'Sorry, we don\'t currently have this product',

  invalidProvince: (language: 'en' | 'th') => language === 'th'
    ? 'ขออภัยครับ เราจัดส่งเฉพาะในประเทศไทย'
    : 'Sorry, we only ship within Thailand',

  apiError: (language: 'en' | 'th') => language === 'th'
    ? 'ขออภัยครับ ระบบ AI กำลังมีปัญหาชั่วคราว กรุณาลองใหม่หรือติดต่อทาง LINE'
    : 'Sorry, the AI system is temporarily unavailable. Please try again or contact us via LINE',

  complexRequest: (language: 'en' | 'th') => language === 'th'
    ? 'โปรเจคใหญ่มากครับ! แนะนำให้ปรึกษาผู้เชี่ยวชาญทาง LINE'
    : 'This is a large project! We recommend consulting our experts via LINE',
};
```

**Step 2: No test needed** - These are constant strings

**Step 3: Commit**

```bash
cd frontend
git add lib/prompts/systemPrompts.ts
git commit -m "feat: add AI chat system prompts and error messages"
```

---

## Task 4: Create AI Chat Service

**Files:**
- Create: `frontend/lib/services/aiChatService.ts`

**Step 1: Write the service**

Create `frontend/lib/services/aiChatService.ts`:
```typescript
import { GoogleGenerativeAI } from '@google/generative-ai';
import { SYSTEM_PROMPT } from '@/lib/prompts/systemPrompts';
import type { ChatMessage, ChatContext } from '@/lib/types/ai-chat';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

export async function callGeminiAPI(
  message: string,
  context: ChatContext,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    // Build conversation history
    const historyText = history
      .slice(-10) // Only last 10 messages
      .map(msg => `${msg.role}: ${msg.content}`)
      .join('\n');

    // Build context information
    const contextInfo = {
      products: context.products?.slice(0, 5) || [], // Top 5 products
      shipping: context.shipping,
      language: context.language,
    };

    // Construct the prompt
    const prompt = `
${SYSTEM_PROMPT}

**Context:**
- Available products: ${JSON.stringify(contextInfo.products, null, 2)}
- Shipping info: ${JSON.stringify(contextInfo.shipping, null, 2)}
- Language: ${contextInfo.language}

**Conversation History:**
${historyText || '(No previous messages)'}

**User Message:**
${message}
`;

    // Call Gemini API
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    return text;
  } catch (error) {
    console.error('[aiChatService] Error calling Gemini API:', error);
    throw error;
  }
}

export function detectLanguage(message: string): 'en' | 'th' {
  // Check for Thai characters
  const thaiChars = message.match(/[\u0E00-\u0E7F]/g);
  if (thaiChars && thaiChars.length > message.length * 0.3) {
    return 'th';
  }
  return 'en';
}
```

**Step 2: No test needed** - Integration test will cover this

**Step 3: Commit**

```bash
cd frontend
git add lib/services/aiChatService.ts
git commit -m "feat: add AI chat service with Gemini API integration"
```

---

## Task 5: Create API Route for AI Chat

**Files:**
- Create: `frontend/app/api/ai-chat/route.ts`

**Step 1: Write the API route**

Create `frontend/app/api/ai-chat/route.ts`:
```typescript
import { NextRequest, NextResponse } from 'next/server';
import { callGeminiAPI, detectLanguage } from '@/lib/services/aiChatService';
import { getProducts } from '@/lib/services/productService';
import { calculateShippingCost, getShippingRate } from '@/lib/services/deliveryService';
import type { ChatMessage, AIChatRequest } from '@/lib/types/ai-chat';

export async function POST(request: NextRequest) {
  try {
    const body: AIChatRequest = await request.json();
    const { message, language, history = [] } = body;

    // Validate input
    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Detect language if not provided
    const detectedLanguage = language || detectLanguage(message);

    // Extract search terms for products
    const searchTerms = extractSearchTerms(message);

    // Fetch products if search terms found
    let products: any[] = [];
    if (searchTerms.length > 0) {
      try {
        const productsData = await getProducts(
          detectedLanguage,
          undefined, // category
          undefined, // sortBy
          1, // page
          5  // per page
        );
        products = productsData.products || [];
      } catch (error) {
        console.error('[AI Chat API] Error fetching products:', error);
      }
    }

    // Extract province and calculate shipping
    let shippingInfo = null;
    const province = extractProvince(message);
    if (province) {
      try {
        const shippingRate = getShippingRate(province);
        shippingInfo = {
          province,
          cost: shippingRate.rate,
          estimatedDays: shippingRate.estimatedDays,
        };
      } catch (error) {
        console.error('[AI Chat API] Error calculating shipping:', error);
      }
    }

    // Build context
    const context = {
      language: detectedLanguage,
      products,
      shipping: shippingInfo,
    };

    // Call Gemini API
    const response = await callGeminiAPI(message, context, history);

    // Return response
    return NextResponse.json({
      response,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('[AI Chat API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to process chat message' },
      { status: 500 }
    );
  }
}

// Helper: Extract search terms from message
function extractSearchTerms(message: string): string[] {
  const terms: string[] = [];

  // Thai keywords
  const thaiKeywords = ['ไม้', 'แผ่น', 'โครง', 'บด', 'อัด', 'สน', 'ยูคาลิปตัส', 'ราคน่า'];
  thaiKeywords.forEach(keyword => {
    if (message.includes(keyword)) {
      terms.push(keyword);
    }
  });

  // English keywords
  const englishKeywords = ['wood', 'plank', 'batten', 'plywood', 'pine', 'eucalyptus', 'rubberwood'];
  englishKeywords.forEach(keyword => {
    if (message.toLowerCase().includes(keyword)) {
      terms.push(keyword);
    }
  });

  return terms;
}

// Helper: Extract province from message
function extractProvince(message: string): string | null {
  // This is a simplified version - you can expand with all provinces
  const provinces = [
    'กรุงเทพ', 'Bangkok',
    'ปทุมธานี', 'Pathum Thani',
    'นนทบุรี', 'Nonthaburi',
    'สมุทรปราการ', 'Samut Prakan',
    'เชียงใหม่', 'Chiang Mai',
    'ภูเก็ต', 'Phuket',
    // Add more provinces as needed
  ];

  for (const province of provinces) {
    if (message.includes(province)) {
      return province;
    }
  }

  return null;
}
```

**Step 2: No test needed** - Will be tested with component

**Step 3: Commit**

```bash
cd frontend
git add app/api/ai-chat/route.ts
git commit -m "feat: add AI chat API route with product and shipping integration"
```

---

## Task 6: Create AI Chat Interface Component

**Files:**
- Create: `frontend/components/chat/AIChatInterface.tsx`

**Step 1: Write the component**

Create `frontend/components/chat/AIChatInterface.tsx`:
```'use client';

import { useState, useEffect, useRef } from 'react';
import { Send, Loader2 } from 'lucide-react';
import { QUICK_ACTIONS } from '@/lib/prompts/systemPrompts';
import type { ChatMessage } from '@/lib/types/ai-chat';

interface AIChatInterfaceProps {
  language: 'en' | 'th';
  dictionary?: Record<string, any>;
  onClose: () => void;
}

export function AIChatInterface({ language, onClose }: AIChatInterfaceProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => {
      // Cleanup: abort any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  useEffect(() => {
    // Auto-scroll to bottom
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (messageText?: string) => {
    const text = messageText || inputValue;
    if (!text.trim() || isLoading) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: 'user',
      content: text.trim(),
      timestamp: Date.now(),
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    // Create abort controller for this request
    abortControllerRef.current = new AbortController();

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          language,
          history: messages,
        }),
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: ChatMessage = {
        role: 'assistant',
        content: data.response,
        timestamp: Date.now(),
      };
      setMessages(prev => [...prev, aiMessage]);

    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        console.log('[AI Chat] Request aborted');
      } else {
        console.error('[AI Chat] Error:', error);
        // Add error message
        const errorMessage: ChatMessage = {
          role: 'assistant',
          content: language === 'th'
            ? 'ขออภัยครับ เกิดข้อผิดพลาด กรุณาลองใหม่'
            : 'Sorry, an error occurred. Please try again.',
          timestamp: Date.now(),
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleQuickAction = (actionKey: string) => {
    const action = QUICK_ACTIONS[actionKey as keyof typeof QUICK_ACTIONS];
    if (action) {
      const message = language === 'th' ? action.descriptionTh : action.descriptionEn;
      handleSendMessage(message);
    }
  };

  if (!mounted) return null;

  const isInitial = messages.length === 0;

  return (
    <div className="fixed right-4 bottom-20 sm:right-8 sm:bottom-24 w-[calc(100vw-2rem)] sm:w-96 h-[600px] max-h-[70vh] bg-white rounded-2xl shadow-2xl flex flex-col z-[9998]">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <div>
              <h3 className="font-semibold">
                {language === 'th' ? 'AI Assistant' : 'AI Assistant'}
              </h3>
              <p className="text-xs opacity-90">
                {language === 'th' ? 'ช่วยเหลืออัตโนมัติ' : 'Automated Assistant'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {isInitial ? (
          /* Initial Screen with Quick Actions */
          <div className="space-y-4">
            <div className="text-center py-4">
              <p className="text-gray-700">
                {language === 'th' ? 'สวัสดี! ผมช่วยคุณได้อย่างไร?' : 'Hello! How can I help you today?'}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-2">
              {Object.entries(QUICK_ACTIONS).map(([key, action]) => (
                <button
                  key={key}
                  onClick={() => handleQuickAction(key)}
                  className="text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors border border-gray-200"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <div>
                      <div className="font-medium text-gray-900">
                        {language === 'th' ? action.titleTh : action.titleEn}
                      </div>
                      <div className="text-sm text-gray-600">
                        {language === 'th' ? action.descriptionTh : action.descriptionEn}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          /* Chat Messages */
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                    msg.role === 'user'
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  <div className="whitespace-pre-wrap">{msg.content}</div>
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-2xl px-4 py-2 flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-gray-600">
                    {language === 'th' ? 'กำลังคิด...' : 'Thinking...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      {!isInitial && (
        <div className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={language === 'th' ? 'พิมพ์ข้อความ...' : 'Type a message...'}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-purple-500"
              disabled={isLoading}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={isLoading || !inputValue.trim()}
              className="bg-purple-600 text-white rounded-full p-2 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Send"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
```

**Step 2: No test needed** - Will be tested visually

**Step 3: Commit**

```bash
cd frontend
git add components/chat/AIChatInterface.tsx
git commit -m "feat: add AI chat interface component with quick actions"
```

---

## Task 7: Create AI Chat Button Component

**Files:**
- Create: `frontend/components/chat/AIChatButton.tsx`

**Step 1: Write the component**

Create `frontend/components/chat/AIChatButton.tsx`:
```'use client';

import { Bot } from 'lucide-react';
import { AIChatInterface } from './AIChatInterface';
import { useChatState } from '@/lib/context/ChatContext';
import type { ChatPlatform } from '@/lib/config/chatConfig';

interface AIChatButtonProps {
  platform: ChatPlatform;
  config?: Record<string, any>;
  dictionary?: Record<string, any>;
  index: number;
  isExpanded: boolean;
  language: 'en' | 'th';
}

export function AIChatButton({
  platform,
  config,
  dictionary,
  index,
  isExpanded,
  language,
}: AIChatButtonProps) {
  const { isChatOpen, setIsChatOpen } = useChatState();
  const [showAIChat, setShowAIChat] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    if (isExpanded) {
      setShowAIChat(true);
      setIsChatOpen(false); // Close other platforms
    } else {
      // Open the main chat menu first
      setIsChatOpen(true);
    }
  };

  const handleCloseAIChat = () => {
    setShowAIChat(false);
  };

  if (!mounted) return null;

  return (
    <>
      {/* AI Chat Button */}
      <button
        onClick={handleClick}
        className={`group relative bg-gradient-to-br from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white p-3 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 ${
          isExpanded ? 'animate-slideInRight' : ''
        }`}
        style={{ animationDelay: `${index * 100}ms` }}
        aria-label={language === 'th' ? 'แชทกับ AI' : 'Chat with AI'}
      >
        <Bot className="w-5 h-5" />

        {/* Tooltip when closed */}
        {!isExpanded && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 -translate-y-1/2 whitespace-nowrap bg-gray-900 text-white px-3 py-2 rounded-lg text-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            {language === 'th' ? 'แชทกับ AI' : 'Chat with AI'}
            <div className="absolute top-1/2 -translate-y-1/2 -right-1 w-2 h-2 bg-gray-900 transform rotate-45"></div>
          </div>
        )}

        {/* Hover glow */}
        <div className="absolute inset-0 rounded-full bg-purple-400 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
      </button>

      {/* AI Chat Interface Modal */}
      {showAIChat && (
        <AIChatInterface
          language={language}
          onClose={handleCloseAIChat}
        />
      )}
    </>
  );
}
```

**Step 2: Fix import**

Add the missing import at the top:
```typescript
import { useState, useEffect } from 'react';
```

**Step 3: No test needed** - Will be tested visually

**Step 4: Commit**

```bash
cd frontend
git add components/chat/AIChatButton.tsx
git add components/chat/AIChatInterface.tsx
git commit -m "feat: add AI chat button component"
```

---

## Task 8: Update Chat Buttons Component to Include AI

**Files:**
- Modify: `frontend/components/chat/ChatButtons.tsx`

**Step 1: Add AI chat button import**

Add to imports:
```typescript
import { AIChatButton } from './AIChatButton';
```

**Step 2: Update the platform buttons rendering**

Replace the platform buttons section (around line 63-76):
```typescript
{/* Platform buttons - show when expanded */}
{isChatOpen && enabledPlatforms.map((platform, index) => {
  // Render AI button using special component
  if (platform.id === 'ai') {
    return (
      <div
        key={platform.id}
        className={`animate-slideInRight stagger-${index + 1}`}
      >
        <AIChatButton
          platform={platform}
          config={config}
          dictionary={dictionary}
          index={index}
          isExpanded={isChatOpen}
          language="th" // TODO: Detect from router
        />
      </div>
    );
  }

  // Render other platforms (LINE, etc.)
  return (
    <div
      key={platform.id}
      className={`animate-slideInRight stagger-${index + 1}`}
    >
      <SingleChatButton
        platform={platform}
        config={config}
        dictionary={dictionary}
        index={index}
        isExpanded={isChatOpen}
      />
    </div>
  );
})}
```

**Step 3: No test needed** - Will be tested visually

**Step 4: Commit**

```bash
cd frontend
git add components/chat/ChatButtons.tsx
git commit -m "feat: integrate AI chat button into chat platform menu"
```

---

## Task 9: Update Chat Config to Include AI Platform

**Files:**
- Modify: `frontend/lib/config/chatConfig.ts`

**Step 1: Add AI platform to default config**

Add to the platforms object in defaultChatConfig (after line 51):
```typescript
ai: {
  id: 'ai',
  name: 'AI Assistant',
  url: 'ai-chat',
  color: 'purple',
  icon: '/ai-logo.png',
  enabled: true,
},
```

**Step 2: Add AI to default icons**

Add to defaultIcons object (after line 82):
```typescript
ai: '/ai-logo.png',
```

**Step 3: No test needed** - Configuration only

**Step 4: Commit**

```bash
cd frontend
git add lib/config/chatConfig.ts
git commit -m "feat: add AI platform to chat config"
```

---

## Task 10: Create AI Logo Icon

**Files:**
- Create: `frontend/public/ai-logo.png`

**Step 1: Create a simple AI logo**

You have two options:

**Option A: Use SVG (Recommended)**
Create `frontend/public/ai-logo.svg`:
```svg
<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="32" cy="32" r="30" fill="url(#gradient)"/>
  <path d="M32 20C27.5817 20 24 23.5817 24 28V32H20V44H28V32H32V28C32 26.8954 32.8954 26 34 26H36V20H32ZM36 32V44H44V32H36Z" fill="white"/>
  <defs>
    <linearGradient id="gradient" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
      <stop stop-color="#9333EA"/>
      <stop offset="1" stop-color="#3B82F6"/>
    </linearGradient>
  </defs>
</svg>
```

**Option B: Use emoji (Quick)**
Use the Bot emoji directly in the component instead of an image file.

**Step 2: Update AI chat button to use SVG**

Modify `frontend/components/chat/AIChatButton.tsx` to not require an image:

Replace the image reference with direct emoji:
```typescript
{/* Use emoji instead of image */}
<span className="text-2xl">🤖</span>
```

**Step 3: Commit**

```bash
cd frontend
git add public/ai-logo.svg components/chat/AIChatButton.tsx
git commit -m "feat: add AI logo icon"
```

---

## Task 11: Test the AI Chatbot

**Files:**
- None (manual testing)

**Step 1: Start development server**

```bash
cd frontend
npm run dev
```

**Step 2: Open browser and navigate**

Go to: http://localhost:3000/th (or any page)

**Step 3: Test the chat button**

1. Find the floating chat button (green with message icon)
2. Click to expand
3. You should see TWO buttons:
   - 💬 LINE (existing)
   - 🤖 AI Assistant (NEW, purple/blue)

**Step 4: Test AI chat interface**

1. Click the AI Assistant button
2. Chat interface should open with:
   - Header with "🤖 AI Assistant"
   - 4 quick action buttons
   - Welcome message in Thai

**Step 5: Test quick actions**

Click each quick action button:
- 📦 ค้นหาสินค้า - Should send search query
- 💰 ราคาสินค้า - Should ask for pricing
- 🚚 ค่าจัดส่ง - Should ask for province
- 🏠 ประเมินโปรเจค - Should ask about project

**Step 6: Test conversation**

Type a message like:
- "ไม้แผ่น 6 ฟุต" (6-foot planks)
- "ราคาไม้โครงสน" (batten prices)
- "ส่งเชียงใหม่" (ship to Chiang Mai)

**Step 7: Verify responses**

Check that AI:
- Responds in Thai
- Shows calculation steps
- Provides product links (if products found)
- Shows shipping costs (if province mentioned)

**Step 8: Test error handling**

Try:
- "ส่งอเมริกา" (Ship to USA) - Should show "only in Thailand" message
- Close and reopen chat - Should start fresh (no memory)

**Step 9: Check browser console**

Open DevTools (F12) → Console tab
- Should see no errors
- Network tab should show `/api/ai-chat` requests

**Step 10: Document results**

Note any issues found:
- [ ] Chat button displays correctly
- [ ] AI button shows purple/blue gradient
- [ ] Chat interface opens smoothly
- [ ] Quick actions work
- [ ] AI responds to messages
- [ ] Thai language works
- [ ] Shipping calculations work
- [ ] Error handling works
- [ ] Session clears on close

---

## Task 12: Deploy and Test in Production

**Files:**
- Modify: `frontend/.env.production`

**Step 1: Add GEMINI_API_KEY to production**

Add to `frontend/.env.production`:
```env
GEMINI_API_KEY=your_production_gemini_api_key
```

**Step 2: Build frontend**

```bash
cd frontend
npm run build
```

**Step 3: Test production build locally**

```bash
npm run start
```

Go to: http://localhost:3000/th

Repeat all tests from Task 11

**Step 4: Commit production env file**

```bash
cd frontend
git add .env.production
git commit -m "feat: add Gemini API key to production env"
```

**Step 5: Deploy to production**

```bash
cd ..
./deploy.sh          # Mac/Linux
# or
.\deploy.ps1         # Windows PowerShell
```

**Step 6: Test on production site**

1. Go to https://sakwood.com/th
2. Repeat all tests from Task 11
3. Check that API key is working (no console errors)

**Step 7: Monitor API usage**

Go to Google Cloud Console:
1. Navigate to API Manager
2. Check Gemini API usage
3. Monitor costs (should stay under $10/month for 500 conversations/day)

---

## Task 13: Final Cleanup and Documentation

**Files:**
- Modify: `README.md`
- Modify: `CLAUDE.md`

**Step 1: Update README**

Add to `README.md`:
```markdown
## AI Chatbot

Sakwood features an AI-powered chatbot for product recommendations and calculations:

- **Product Search:** Find wood products by type, size, or usage
- **Price Quotes:** Get instant pricing with calculation breakdowns
- **Shipping Calculator:** Know delivery costs to any Thai province
- **Project Estimates:** Calculate materials needed for decks, fences, furniture

**How to Use:**
1. Click the chat button (bottom-right corner)
2. Select "AI Assistant"
3. Choose a quick action or type your question

**Technology:** Google Gemini API with real-time WordPress data integration
```

**Step 2: Update CLAUDE.md**

Add to `CLAUDE.md` in the appropriate sections:

In "Key Files Reference":
```markdown
**AI Chatbot:**
- `frontend/lib/services/aiChatService.ts` - Gemini API client
- `frontend/lib/prompts/systemPrompts.ts` - AI behavior prompts
- `frontend/app/api/ai-chat/route.ts` - Chat API endpoint
- `frontend/components/chat/AIChatInterface.tsx` - Chat UI
- `frontend/components/chat/AIChatButton.tsx` - Chat button
```

In "Environment Files":
```markdown
**Development** (`sakwood-wp/frontend/.env.local`):
```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=http://localhost:8006/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=http://localhost:8006/wp-json/sakwood/v1
GEMINI_API_KEY=your_gemini_api_key
```

**Production** (`sakwood-wp/frontend/.env.production`):
```env
NEXT_PUBLIC_WORDPRESS_GRAPHQL_URL=https://wp.sakww.com/graphql
NEXT_PUBLIC_WORDPRESS_API_URL=https://wp.sakww.com/wp-json/sakwood/v1
GEMINI_API_KEY=your_production_gemini_api_key
```
```

**Step 3: Create usage guide**

Create `docs/user-manuals/08-ai-chatbot.md`:
```markdown
# AI Chatbot User Guide

## Overview

The Sakwood AI Chatbot helps customers find products, calculate prices, and estimate shipping costs.

## Features

### 1. Product Search
Find wood products by:
- Type (ไม้แผ่น, ไม้โครงสน, ไม้บด, etc.)
- Size (6 ฟุต, 8 ฟุต, etc.)
- Usage (เฟอร์นิเจอร์, สะพาน, รั้ว, etc.)

**Examples:**
- "ไม้แผ่น 6 ฟุต" (6-foot planks)
- "ไม้บดทำเฟอร์นิเจอร์" (plywood for furniture)

### 2. Price Quotes
Get instant pricing with step-by-step calculations.

**Examples:**
- "ไม้โครงสน 100 กิโล" (100kg of battens)
- "ไม้แผ่น 50 ตร.ม." (50sqm of planks)

### 3. Shipping Calculator
Get delivery costs to any Thai province.

**Examples:**
- "ส่งเชียงใหม่" (Ship to Chiang Mai)
- "ค่าจัดส่งนนทบุรี" (Shipping to Nonthaburi)

### 4. Project Estimates
Calculate materials needed for your project.

**Examples:**
- "ทำสะพาน 4×6 เมตร" (Build 4×6m deck)
- "รั้ว 100 เมตร" (100m fence)

## Tips

- Use Thai language for best results
- Be specific about sizes and quantities
- Mention your province for accurate shipping costs
- For complex projects, consult a dealer via LINE

## Limitations

- Only ships within Thailand
- Complex projects may need dealer consultation
- Session clears when browser closes
```

**Step 4: Commit all documentation**

```bash
git add README.md CLAUDE.md docs/user-manuals/08-ai-chatbot.md
git commit -m "docs: add AI chatbot documentation and user guide"
```

---

## Verification Checklist

Before considering this feature complete, verify:

- [ ] Gemini API key is set in `.env.local`
- [ ] Chat button displays with LINE and AI options
- [ ] AI chat interface opens correctly
- [ ] Quick action buttons work
- [ ] Product search returns results
- [ ] Price calculations show steps
- [ ] Shipping costs are accurate
- [ ] Thai language works correctly
- [ ] English language works correctly
- [ ] Error handling works for invalid inputs
- [ ] Session clears on browser close
- [ ] No console errors
- [ ] Works on mobile devices
- [ ] Works on desktop browsers
- [ ] Production build works
- [ ] Deployed to production
- [ ] Documentation is complete
- [ ] API usage is being monitored

---

## Troubleshooting

### Issue: Chat button doesn't show
**Solution:** Check that `AIChatButton` is properly imported in `ChatButtons.tsx`

### Issue: AI doesn't respond
**Solution:** Check browser console for errors, verify GEMINI_API_KEY is set

### Issue: Products don't show
**Solution:** Check WordPress API is running: `curl http://localhost:8006/wp-json/sakwood/v1/products`

### Issue: Shipping costs wrong
**Solution:** Check `deliveryService.ts` functions are being called correctly

### Issue: Thai language not working
**Solution:** Verify `detectLanguage()` function in `aiChatService.ts`

---

## Cost Monitoring

Monitor your Gemini API usage:
1. Go to Google Cloud Console
2. Navigate to API Manager → Gemini API
3. Check usage statistics

**Expected costs:**
- 500 conversations/day × 10 turns = 5,000 requests/day
- ~150,000 requests/month
- ~15M input + ~30M output tokens/month
- **Estimated cost: ~$10/month**

---

## Post-Launch

After 1 week, review:
- Conversation topics (what are customers asking?)
- Resolution rate (how many questions answered?)
- Error rate (how many failed requests?)
- User feedback (suggestions for improvement)

After 1 month, consider:
- Adding image upload capability
- Improving province extraction (all 77 provinces)
- Adding more product categories
- Integrating with cart (add directly from chat)

---

**Plan Status:** ✅ Ready for Implementation

**Estimated Time:** 3-4 hours for all tasks

**Next Step:** Choose execution approach (Subagent-Driven or Parallel Session)
