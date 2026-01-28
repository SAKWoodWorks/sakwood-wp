'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { FAQ } from '@/lib/types';

interface FAQItemProps {
  faq: FAQ;
  defaultOpen?: boolean;
}

export function FAQItem({ faq, defaultOpen = false }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-start justify-between py-6 text-left hover:bg-gray-50 transition-colors px-4 rounded-lg group"
        aria-expanded={isOpen}
      >
        <span className="text-lg font-medium text-gray-900 pr-4 flex-1">
          {faq.question}
        </span>
        <ChevronDown
          className={cn(
            'w-5 h-5 text-gray-500 mt-1 flex-shrink-0 transition-transform duration-200',
            isOpen && 'transform rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200 ease-in-out px-4',
          isOpen ? 'max-h-96 pb-6' : 'max-h-0'
        )}
      >
        <div
          className="prose prose-sm max-w-none text-gray-600"
          dangerouslySetInnerHTML={{ __html: faq.answer }}
        />
      </div>
    </div>
  );
}
