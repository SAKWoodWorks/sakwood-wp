'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/i18n-config';
import { CheckCircle, XCircle, TrendingDown, Users, Award, Clock, Shield } from 'lucide-react';

interface WhyChooseSectionProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

interface ComparisonItem {
  feature: string;
  featureTh: string;
  sakwood: string | boolean;
  others: string | boolean;
  icon?: React.ReactNode;
}

export function WhyChooseSection({ lang, dictionary }: WhyChooseSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Preventing hydration mismatch
    setMounted(true);
  }, []);

  const comparisons: ComparisonItem[] = [
    {
      feature: 'Wood Quality',
      featureTh: 'คุณภาพไม้',
      sakwood: 'Grade A Premium',
      others: 'Standard/Grade B',
      icon: <Award className="w-5 h-5" />
    },
    {
      feature: 'Pricing',
      featureTh: 'ราคา',
      sakwood: 'Factory Direct',
      others: 'Middleman Markup',
      icon: <TrendingDown className="w-5 h-5" />
    },
    {
      feature: 'Expert Support',
      featureTh: 'การสนับสนุน',
      sakwood: true,
      others: false,
      icon: <Users className="w-5 h-5" />
    },
    {
      feature: 'Delivery Time',
      featureTh: 'เวลาจัดส่ง',
      sakwood: 'Same Day Available',
      others: '2-5 Days',
      icon: <Clock className="w-5 h-5" />
    },
    {
      feature: 'Warranty',
      featureTh: 'การรับประกัน',
      sakwood: '15 Years',
      others: '1-3 Years',
      icon: <Shield className="w-5 h-5" />
    },
    {
      feature: 'Quality Guarantee',
      featureTh: 'การรับประกันคุณภาพ',
      sakwood: true,
      others: false,
      icon: <CheckCircle className="w-5 h-5" />
    }
  ];

  const benefits = [
    {
      icon: <Award className="w-8 h-8" />,
      title: lang === 'th' ? 'ไม้เกรด A เท่านั้น' : 'Grade A Only',
      description: lang === 'th'
        ? 'เราใช้เฉพาะไม้เกรด A ที่ผ่านการคัดสรรอย่างละเอียด'
        : 'We use only Grade A wood, carefully selected for quality'
    },
    {
      icon: <TrendingDown className="w-8 h-8" />,
      title: lang === 'th' ? 'ราคาโรงงานตรง' : 'Factory Direct Pricing',
      description: lang === 'th'
        ? 'ไม่ผ่านนายหน้า ราคาถูกที่สุดจากโรงงาน'
        : 'No middlemen, best prices directly from the factory'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: lang === 'th' ? 'ทีมงานผู้เชี่ยวชาญ' : 'Expert Team',
      description: lang === 'th'
        ? 'ที่ปรึกษาด้านไม้คุณวุฒิ 25+ ปีประสบการณ์'
        : 'Expert wood consultants with 25+ years experience'
    }
  ];

  return (
    <section
      className="relative py-20 lg:py-28 bg-white overflow-hidden"
      aria-labelledby="why-choose-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4">
            <CheckCircle className="w-4 h-4" />
            {lang === 'th' ? 'ความแตกต่าง' : 'The Difference'}
          </div>
          <h2 id="why-choose-heading" className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {lang === 'th' ? 'ทำไมต้องเลือก Sakwood?' : 'Why Choose Sakwood?'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'th'
              ? 'เรามอบมากกว่าคุณภาพสินค้า เรามอบความคุ้มค่าและบริการที่คุณไว้วางใจได้'
              : 'We deliver more than quality products—we provide value and service you can trust'}
          </p>
        </div>

        {/* Benefits Overview */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={`bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                mounted ? 'animate-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl mb-4 text-white">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-200">
          {/* Table Header */}
          <div className="grid grid-cols-3 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
            <div className="p-6 border-r border-gray-700">
              <div className="font-bold text-lg">{lang === 'th' ? 'คุณสมบัติ' : 'Feature'}</div>
            </div>
            <div className="p-6 border-r border-gray-700 bg-gradient-to-r from-blue-600 to-indigo-600">
              <div className="font-bold text-xl text-center">
                {lang === 'th' ? '✨ Sakwood' : '✨ Sakwood'}
              </div>
              <div className="text-blue-100 text-sm text-center mt-1">
                {lang === 'th' ? 'ผู้นำด้านไม้' : 'Wood Industry Leader'}
              </div>
            </div>
            <div className="p-6">
              <div className="font-bold text-lg text-center text-gray-300">
                {lang === 'th' ? 'ผู้ขายอื่น' : 'Others'}
              </div>
            </div>
          </div>

          {/* Table Rows */}
          {comparisons.map((item, index) => (
            <div
              key={index}
              className={`grid grid-cols-3 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                mounted ? 'animate-fade' : 'opacity-0'
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
            >
              {/* Feature */}
              <div className="p-6 border-r border-gray-100 flex items-center gap-3">
                {item.icon && (
                  <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center text-blue-600">
                    {item.icon}
                  </div>
                )}
                <span className="font-semibold text-gray-900">
                  {lang === 'th' ? item.featureTh : item.feature}
                </span>
              </div>

              {/* Sakwood */}
              <div className="p-6 border-r border-gray-100 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 flex items-center justify-center">
                {typeof item.sakwood === 'boolean' ? (
                  item.sakwood ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>{lang === 'th' ? 'มี' : 'Yes'}</span>
                    </div>
                  ) : (
                    <XCircle className="w-5 h-5 text-gray-400" />
                  )
                ) : (
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-bold text-gray-900">{item.sakwood}</span>
                  </div>
                )}
              </div>

              {/* Others */}
              <div className="p-6 flex items-center justify-center">
                {typeof item.others === 'boolean' ? (
                  item.others ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold">
                      <CheckCircle className="w-5 h-5" />
                      <span>{lang === 'th' ? 'มี' : 'Yes'}</span>
                    </div>
                  ) : (
                    <XCircle className="w-5 h-5 text-red-400" />
                  )
                ) : (
                  <div className="flex items-center gap-2 text-gray-500">
                    <XCircle className="w-5 h-5" />
                    <span>{item.others}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-10 lg:p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">
              {lang === 'th' ? 'พร้อมที่จะเริ่มต้นหรือยัง?' : 'Ready to Get Started?'}
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
              {lang === 'th'
                ? 'ติดต่อเราวันนี้เพื่อรับคำปรึกษาฟรีและราคาสำหรับโครงการของคุณ'
                : 'Contact us today for a free consultation and quote for your project'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={`/${lang}/quote`}
                className="inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                {lang === 'th' ? 'ขอราคาตอนนี้' : 'Get Free Quote'}
                <CheckCircle className="w-5 h-5" />
              </a>
              <a
                href={`/${lang}/contact`}
                className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all duration-300 border border-white/30"
              >
                {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        .animate-fade {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
