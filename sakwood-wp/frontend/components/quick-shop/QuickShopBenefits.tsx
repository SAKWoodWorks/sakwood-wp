import { Shield, Truck, DollarSign, Award } from 'lucide-react';
import type { Locale } from '@/i18n-config';

interface QuickShopBenefitsProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

export function QuickShopBenefits({ lang }: QuickShopBenefitsProps) {
  const benefits = [
    {
      icon: Shield,
      title: lang === 'th' ? 'รับประกันคุณภาพ' : 'Quality Guaranteed',
      description: lang === 'th'
        ? 'ไม้เกรดพรีเมียม ผ่านการคัดสรรมาอย่างดี'
        : 'Premium graded wood, carefully selected',
    },
    {
      icon: Truck,
      title: lang === 'th' ? 'จัดส่งรวดเร็ว' : 'Fast Delivery',
      description: lang === 'th'
        ? 'ส่งทั่วประเทศไทย 1-6 วันทำการ'
        : 'Nationwide delivery in 1-6 business days',
    },
    {
      icon: DollarSign,
      title: lang === 'th' ? 'ราคาส่ง' : 'Wholesale Prices',
      description: lang === 'th'
        ? 'ราคาโรงงาน ไม่มีนายหน้า'
        : 'Factory direct pricing, no middlemen',
    },
  ];

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
            {lang === 'th' ? 'ทำไมต้อง SAK WoodWorks?' : 'Why Choose SAK WoodWorks?'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="text-center p-8 rounded-2xl bg-slate-50 hover:bg-blue-50 transition-colors duration-300"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-2xl mb-6">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">
                {benefit.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
