'use client';

import { Printer } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface PrintButtonProps {
  lang: Locale;
}

export default function PrintButton({ lang }: PrintButtonProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      onClick={handlePrint}
      className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg"
    >
      <Printer className="w-5 h-5" />
      {lang === 'th' ? 'พิมพ์ / บันทึก PDF' : 'Print / Save PDF'}
    </button>
  );
}
