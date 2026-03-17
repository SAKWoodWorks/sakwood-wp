# AI Chatbot Design Document

**Project:** SAK WoodWorks AI Assistant
**Date:** 2025-03-16
**Status:** Design Complete, Ready for Implementation

---

## Overview

An AI-powered chatbot integrated into the existing SAK WoodWorks website to provide product recommendations, pricing calculations, shipping estimates, and project consultations. The chatbot uses Google Gemini API with real-time data from WordPress REST API and existing business logic.

---

## 1. Architecture

### Tech Stack
- **Frontend:** Next.js 16 (React 19) Client Component
- **Backend:** Next.js API Route (`/api/ai-chat`)
- **AI Service:** Google Gemini API
- **Data Source:** WordPress REST API (`/wp-json/sakwood/v1/*`)
- **Session Management:** React state (ephemeral, clears on browser close)

### Integration Point
The AI chatbot will be added as a second platform option in the existing floating chat button, alongside LINE.

**User Flow:**
```
Customer clicks chat button
  ↓
Shows two options:
  - 🤖 AI Assistant (NEW)
  - 💬 LINE (existing)
  ↓
Customer selects AI Assistant
  ↓
Chat interface opens with quick action buttons
```

---

## 2. User Interface Design

### Initial Screen
```
┌─────────────────────────────────┐
│ 🤖 AI Assistant                 │
├─────────────────────────────────┤
│                                 │
│ สวัสดี! ผมช่วยคุณได้อย่างไร?        │
│ Hello! How can I help you?      │
│                                 │
│ ┌─────────────────────────────┐ │
│ │ 📦 ค้นหาสินค้า              │ │
│ │    Product Search           │ │
│ ├─────────────────────────────┤ │
│ │ 💰 ราคาสินค้า              │ │
│ │    Price Quote              │ │
│ ├─────────────────────────────┤ │
│ │ 🚚 ค่าจัดส่ง               │ │
│ │    Shipping Cost            │ │
│ ├─────────────────────────────┤ │
│ │ 🏠 ประเมินโปรเจค          │ │
│ │    Project Estimate         │ │
│ └─────────────────────────────┘ │
│                                 │
│ พิมพ์คำถาม หรือกดปุ่มด้านบน      │
└─────────────────────────────────┘
```

### UI Components
- **Chat Button:** Purple/blue gradient (distinguish from LINE's green)
- **Message Bubbles:** User (right, blue), AI (left, gray)
- **Quick Actions:** 4 buttons on initial load
- **Typing Indicator:** Shows while AI processes
- **Language Toggle:** Thai/English switch

---

## 3. Conversation Flows

### 3.1 Product Search
**Input:** "ไม้แผ่น 6 ฟุต" (6-foot planks)

**Response:**
```
สวัสดีครับ! นี่คือไม้แผ่น 6 ฟุตที่เรามี:

📦 ไม้แผ่นสน 6 ฟุต
- ราคา: ฿XXX/เมตร
- ขนาด: 6 ฟุต × 4 นิ้ว × 1 นิ้ว
- เหมาะสำหรับ: เฟอร์นิเจอร์, ผนัง

👉 ดูรายละเอียด: [product page link]

ต้องการคำนวณราคาหรือค่าจัดส่งไหมครับ?
```

### 3.2 Price Quote
**Input:** "ราคาไม้โครงสน 100 กิโล"

**Response:**
```
💰 การคำนวณราคา:
- ไม้โครงสน: ฿XXX/กิโล
- จำนวน: 100 กิโล
- ราคารวม: ฿XXX × 100 = ฿XX,XXX

👉 ดูสินค้า: [product page link]
🚚 ต้องการคำนวณค่าจัดส่งไหมครับ?
```

### 3.3 Shipping Cost
**Input:** "ส่งนนทบุรี" (Ship to Nonthaburi)

**Response:**
```
🚚 ค่าจัดส่งนนทบุรี:
- โซน: 1 (กรุงเทพฯ และปริมณฑล)
- ค่าจัดส่ง: ฿5,000
- เวลา: 1-2 วันทำการ

🎁 ฟรีค่าจัดส่งเมื่อสั่งซื้อครบ ฿10,000

ต้องการคำนวณราคาสินค้ารวมค่าจัดส่งไหมครับ?
```

### 3.4 Project Estimate
**Input:** "ทำสะพาน 4×6 เมตร" (Build 4×6m deck)

**Response:**
```
📏 การคำนวณโปรเจค:
1. พื้นที่: 4m × 6m = 24 ตร.ม.
2. เพิ่ม 10% สำหรับของเสีย: 24 × 1.1 = 26.4 ตร.ม.
3. ไม้โครงสนที่ต้องการ: 26.4 ตร.ม.

💰 ราคาประเมิน:
- ไม้โครงสน: 26.4 ตร.ม. × ฿XXX/ตร.ม. = ฿X,XXX
- ค่าจัดส่งกรุงเทพฯ: ฿5,000
- รวมทั้งหมด: ฿XX,XXX

👉 ดูสินค้า: [product page link]
💬 ติดต่อทีมงานสำหรับใบเสนอราคาละเอียด: [LINE button]

คุณอยู่จังหวัดอะไรครับ? จะได้คำนวณค่าจัดส่งแม่นยำ
```

---

## 4. Data Integration

### 4.1 Product Data
**Endpoint:** `GET /wp-json/sakwood/v1/products`

**Usage:**
- Real-time product lookup
- Pricing information
- Product specifications
- Stock status

### 4.2 Category Data
**Endpoint:** `GET /wp-json/sakwood/v1/categories`

**Usage:**
- Category-based recommendations
- Browsing by product type

### 4.3 Shipping Calculation
**Existing Functions to Reuse:**
- `getShippingRate(province)` - Returns rate by province
- `calculateShippingCost(province, cartTotal, items)` - Full calculation
- `determineTruckType(items)` - Small/Medium/Large truck logic
- `getTruckTypeSurcharge(truckType)` - ฿0 / ฿500 / ฿1,500
- Province translations (TH ↔ EN)

**Business Rules:**
- **Free Shipping:** Orders ≥ ฿10,000
- **Zone 1 (Bangkok):** ฿5,000-6,500, 1-2 days
- **Zone 2 (Central):** ฿2,000-3,000, 2-3 days
- **Zone 3 (Northern):** ฿3,000-10,000, 3-5 days
- **Zone 4 (Northeastern):** ฿3,500-4,000, 3-5 days
- **Zone 5 (Southern):** ฿4,000-5,000, 4-6 days

**Truck Surcharges:**
- Small truck (6-wheel): Base rate
- Medium truck (10-wheel): +฿500 (items 3-6m, total >6m, volume >2m³)
- Large truck (10-wheel): +฿1,500 (items ≥6m, total >12m, volume >5m³)

### 4.4 Dealer Locations
**Endpoint:** `GET /wp-json/sakwood/v1/public-locations`

**Usage:**
- Find nearest dealer
- Location-based shipping zone determination
- "Near you" recommendations

---

## 5. System Prompts

### System Prompt
```typescript
const SYSTEM_PROMPT = `
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
```

---

## 6. Error Handling

### 6.1 Product Not Found
```
User: "ไม้แดงโอ๊ค" (Red Oak)

AI: "ขออภัยครับ เรายังไม่มีไม้แดงโอ๊คในขณะนี้

สินค้าไม้ของเรามีดังนี้:
- ไม้สน (Pine)
- ไม้ยูคาลิปตัส (Eucalyptus)
- ไม้ราคน่า (Rubberwood)
- และอื่นๆ

👉 ดูสินค้าทั้งหมด: [products page link]
💬 ติดต่อสอบถามทาง LINE: [LINE button]"
```

### 6.2 Invalid Province
```
User: "ส่งฮ่องกง" (Ship to Hong Kong)

AI: "ขออภัยครับ เราจัดส่งเฉพาะในประเทศไทย

จังหวัดที่เราบริการ:
- ทุกจังหวัดในไทย

👉 ดูพื้นที่บริการ: [dealer locator page link]
💬 ติดต่อสอบถาม: [LINE button]"
```

### 6.3 API Failures
```
System error → Show fallback:

"ขออภัยครับ ระบบ AI กำลังมีปัญหาชั่วคราว

กรุณา:
1. ลองใหม่อีกครั้ง
2. ติดต่อทีมงานทาง LINE: [LINE button]
3. ค้นหาสินค้า: [products page link]"
```

### 6.4 Complex Requests
```
User: "ต้องการสร้างบ้าน" (Build a house)

AI: "โปรเจคใหญ่มากครับ! แนะนำให้ปรึกษาผู้เชี่ยวชาญ

สำหรับโปรเจคขนาดใหญ่:
💬 ติดต่อทีมวิศวกร: [LINE button]
📞 โทร: [phone number]

หรือถ้าต้องการราคาสินค้าเบื้องต้น:
บอกผมได้ว่าต้องการไม้ประเภทไหน เช่น 'ไม้โครงสน 100 ชิ้น'"
```

---

## 7. Implementation Details

### File Structure
```
frontend/
├── app/
│   └── api/
│       └── ai-chat/
│           └── route.ts              # Next.js API endpoint
├── components/
│   └── chat/
│       ├── AIChatButton.tsx          # AI chat button
│       ├── ChatButtons.tsx           # Updated (add AI platform)
│       └── AIChatInterface.tsx       # Chat UI component
├── lib/
│   ├── services/
│   │   └── aiChatService.ts          # Gemini API client
│   ├── prompts/
│   │   └── systemPrompts.ts          # AI behavior prompts
│   └── types/
│       └── ai-chat.ts                # TypeScript interfaces
└── .env.local                        # Add GEMINI_API_KEY
```

### Environment Variables
```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Key Components

#### 1. AIChatButton.tsx
- Purple/blue gradient button
- Integrates with existing ChatContext
- Opens AIChatInterface on click

#### 2. ChatButtons.tsx (Modified)
- Add AI platform to config
- Shows both LINE and AI options when expanded
- Uses existing animation patterns

#### 3. AIChatInterface.tsx
- Message bubbles (user/AI)
- Quick action buttons (4 options)
- Typing indicator
- Language toggle
- Auto-scroll to latest message

#### 4. /api/ai-chat/route.ts
```typescript
export async function POST(request: Request) {
  const { message, language, history } = await request.json();

  // 1. Fetch relevant data from WordPress
  const products = await getProducts({ search: extractSearchTerm(message) });

  // 2. Calculate shipping if province mentioned
  const province = extractProvince(message);
  const shipping = province ? calculateShippingCost(province) : null;

  // 3. Build context for Gemini
  const context = {
    products,
    shipping,
    history: history.slice(-10), // Last 10 messages
    language,
  };

  // 4. Call Gemini API
  const response = await callGeminiAPI(message, context);

  // 5. Return formatted response
  return NextResponse.json({ response });
}
```

#### 5. aiChatService.ts
```typescript
export async function callGeminiAPI(
  message: string,
  context: ChatContext
): Promise<string> {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  const prompt = `
    ${SYSTEM_PROMPT}

    Context:
    - Available products: ${JSON.stringify(context.products)}
    - Shipping info: ${JSON.stringify(context.shipping)}
    - Language: ${context.language}

    Conversation history:
    ${context.history.map(msg => `${msg.role}: ${msg.content}`).join('\n')}

    User message: ${message}
  `;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
```

### Integration with ChatConfig

**Update to `chatConfig.ts`:**
```typescript
export const defaultChatConfig: ChatConfig = {
  platforms: {
    line: {
      id: 'line',
      name: 'LINE',
      url: '@sakww',
      color: 'green',
      icon: '/line-logo.png',
      enabled: true,
    },
    ai: {  // NEW
      id: 'ai',
      name: 'AI Assistant',
      url: 'ai-chat',  // Internal route
      color: 'purple',
      icon: '/ai-logo.png',
      enabled: true,
    },
    // ... other platforms
  },
  // ...
};
```

---

## 8. Session Management

### Memory Strategy
- **Storage:** React state (component-level)
- **Lifetime:** Until browser closes or 30 minutes inactive
- **Limit:** Maximum 50 messages per session
- **Clear:** Automatically on browser close

### Language Detection
```typescript
// Auto-detect from first message
function detectLanguage(message: string): Locale {
  const thaiChars = message.match(/[\u0E00-\u0E7F]/g);
  return thaiChars && thaiChars.length > message.length * 0.3 ? 'th' : 'en';
}
```

---

## 9. Security Considerations

### API Key Protection
- **Never expose GEMINI_API_KEY to client**
- Store only in `.env.local` and server-side environment
- Use Next.js API route as proxy

### Rate Limiting
- Implement per-session rate limit (10 requests/minute)
- Add exponential backoff for failed requests
- Session-based tracking (no user authentication required)

### Input Sanitization
- Sanitize all user inputs before sending to Gemini
- Limit message length (500 characters max)
- Strip HTML/JavaScript code

---

## 10. Performance Optimization

### Caching Strategy
- **Product Data:** Cache for 5 minutes (real-time enough, faster responses)
- **Shipping Calculations:** No cache (must use existing functions)
- **Gemini Responses:** No cache (each conversation is unique)

### Response Time Targets
- **Quick Actions:** < 1 second (pre-defined responses)
- **Product Search:** < 2 seconds (API call + generation)
- **Complex Calculations:** < 3 seconds (multiple API calls)

---

## 11. Testing Plan

### Unit Tests
- `aiChatService.ts` - Gemini API calls
- `extractSearchTerm()` - Search term parsing
- `extractProvince()` - Province name extraction
- `detectLanguage()` - Language detection

### Integration Tests
- `/api/ai-chat` endpoint with mock WordPress data
- Shipping calculation integration
- Product search integration

### E2E Tests
- Complete conversation flows
- Error scenarios
- Language switching
- Session persistence

---

## 12. Future Enhancements

### Phase 2 Features (Post-Launch)
- Image upload (show photo of project/wood)
- Voice input/output
- Quote PDF generation
- Order integration (add to cart directly)
- Dealer appointment scheduling

### Analytics
- Track conversation topics
- Measure resolution rate
- Collect customer feedback
- Popular product queries

---

## 13. Launch Checklist

### Pre-Launch
- [ ] Get Gemini API key from Google Cloud Console
- [ ] Add GEMINI_API_KEY to `.env.local`
- [ ] Create AI logo icon (`/ai-logo.png`)
- [ ] Test all conversation flows
- [ ] Test error handling scenarios
- [ ] Test Thai/English language switching
- [ ] Verify shipping calculations match existing logic

### Post-Launch
- [ ] Monitor API usage and costs
- [ ] Collect user feedback
- [ ] Track resolution rate
- [ ] Refine prompts based on real conversations
- [ ] Add more product data as needed

---

## 14. Cost Estimates

### Gemini API Pricing (as of March 2025)
- **Input:** Free up to 1M tokens/month, then $0.07/1M tokens
- **Output:** Free up to 1M tokens/month, then $0.30/1M tokens

### Estimated Monthly Cost
- **Assumptions:** 500 conversations/day, 10 turns/conversation
- **Tokens:** ~100 input + ~200 output per turn
- **Monthly:** ~15M input + ~30M output tokens
- **Cost:** ~$1.05 input + ~$9 output = **~$10/month**

**Note:** Costs will scale with usage. Monitor and adjust.

---

## 15. Success Metrics

### Primary KPIs
- **Resolution Rate:** % of conversations that answer user's question
- **Response Time:** Average time to first response
- **User Satisfaction:** Feedback ratings
- **Cost per Resolution:** Total API cost / successful conversations

### Secondary KPIs
- **Conversation Topics:** Most common queries
- **Product Click-through:** % of users clicking product links
- **LINE Escalation:** % of conversations escalated to LINE
- **Session Duration:** Average conversation length

---

## Appendix A: Quick Reference

### Conversation Examples

#### Example 1: Product Search
```
User: "ไม้แผ่น 6 ฟุต"
AI: [Shows 6-foot planks with prices]
```

#### Example 2: Price Quote
```
User: "ไม้โครงสน 100 กิโล"
AI: [Shows calculation: price × quantity]
```

#### Example 3: Shipping
```
User: "ส่งเชียงใหม่"
AI: [Shows Zone 3 rate: ฿7,500, 4-5 days]
```

#### Example 4: Project Estimate
```
User: "ทำสะพาน 4×6 เมตร"
AI: [Shows: area → waste factor → materials → total]
```

### Available Endpoints
- `GET /wp-json/sakwood/v1/products` - Product search
- `GET /wp-json/sakwood/v1/categories` - Product categories
- `GET /wp-json/sakwood/v1/public-locations` - Dealer locations
- `POST /api/ai-chat` - AI chat endpoint (NEW)

### Shipping Zones Reference
- **Zone 1:** Bangkok, Pathum Thani, Nonthaburi, Samut Prakan, Nakhon Pathom, Samut Sakhon
- **Zone 2:** Central region provinces
- **Zone 3:** Northern region provinces
- **Zone 4:** Northeastern region provinces
- **Zone 5:** Southern region provinces

---

**Document Status:** ✅ Design Complete - Ready for Implementation

**Next Steps:**
1. Get Gemini API key
2. Set up development environment
3. Create implementation plan
4. Start development
