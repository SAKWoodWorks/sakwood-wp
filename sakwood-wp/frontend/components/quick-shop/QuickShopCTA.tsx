import Link from 'next/link';
import type { Locale } from '@/i18n-config';

interface QuickShopCTAProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopCTA({ lang }: QuickShopCTAProps) {
  return (
    <section className="py-20 sm:py-24 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6">
          {lang === 'th' ? 'พร้อมเริ่มโครงการของคุณ?' : 'Ready to Start Your Project?'}
        </h2>
        <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
          {lang === 'th'
            ? 'สั่งซื้อไม้คุณภาพสูงออนไลน์ จัดส่งทั่วประเทศไทย'
            : 'Order premium wood online with fast delivery across Thailand'}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href={`/${lang}/shop`}
            className="w-full sm:w-auto px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-bold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 shadow-xl text-center"
          >
            {lang === 'th' ? 'ดูสินค้าทั้งหมด' : 'Browse All Products'}
          </Link>
          <Link
            href={`/${lang}/contact`}
            className="w-full sm:w-auto px-8 py-4 bg-transparent border-2 border-white hover:bg-white hover:text-blue-600 text-white font-bold text-lg rounded-lg transition-all duration-300 text-center"
          >
            {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
          </Link>
        </div>
      </div>
    </section>
  );
}
