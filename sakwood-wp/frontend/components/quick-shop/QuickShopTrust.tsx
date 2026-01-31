import type { Locale } from '@/i18n-config';

interface QuickShopTrustProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopTrust({ lang }: QuickShopTrustProps) {
  const trusts = [
    {
      icon: '✓',
      text: lang === 'th' ? '500+ โครงการสำเร็จ' : '500+ Projects Completed',
    },
    {
      icon: '✓',
      text: lang === 'th' ? 'จัดส่งทั่ว 77 จังหวัด' : '77 Provinces Delivered',
    },
    {
      icon: '✓',
      text: lang === 'th' ? 'ราคาส่งตั้งแต่ 1 แผ่น' : 'Wholesale Pricing',
    },
  ];

  return (
    <section className="bg-blue-600 text-white py-6 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap justify-center gap-8 sm:gap-16 text-center">
          {trusts.map((trust, index) => (
            <div key={index} className="flex items-center gap-2 text-lg font-semibold">
              <span className="text-green-300 text-xl">{trust.icon}</span>
              <span>{trust.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
