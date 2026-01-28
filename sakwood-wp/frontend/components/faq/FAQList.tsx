import { FAQItem } from './FAQItem';
import type { FAQ } from '@/lib/types';

interface FAQListProps {
  faqs: FAQ[];
  className?: string;
}

export function FAQList({ faqs, className }: FAQListProps) {
  if (!faqs || faqs.length === 0) {
    return (
      <div className={className}>
        <p className="text-center text-gray-500 py-12">ไม่พบคำถามที่ค้นหา</p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} />
        ))}
      </div>
    </div>
  );
}
