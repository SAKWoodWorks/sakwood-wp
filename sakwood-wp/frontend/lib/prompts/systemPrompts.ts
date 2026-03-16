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
