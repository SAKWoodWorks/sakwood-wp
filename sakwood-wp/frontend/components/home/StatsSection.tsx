'use client';

import { useState, useEffect } from 'react';
import type { Locale } from '@/i18n-config';
import { Award, Shield, Truck, Trees } from 'lucide-react';

interface StatsSectionProps {
  lang: Locale;
  dictionary: {
    stats: {
      heading: string;
      experience: string;
      projects: string;
      quality: string;
      delivery: string;
    };
  };
}

interface TrustIndicator {
  icon: React.ReactNode;
  value: string;
  label: string;
  description: string;
  accent: string;
}

export function StatsSection({ lang, dictionary }: StatsSectionProps) {
  const { stats } = dictionary;
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Preventing hydration mismatch
    setMounted(true);
  }, []);

  const trustIndicators: TrustIndicator[] = [
    {
      icon: <Trees className="w-8 h-8" />,
      value: '25+',
      label: lang === 'th' ? 'ประสบการณ์' : 'Years Experience',
      description: lang === 'th' ? 'ผู้เชี่ยวชาญด้านไม้' : 'Wood Industry Experts',
      accent: 'from-green-400 to-emerald-600'
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: 'Grade A',
      label: lang === 'th' ? 'ไม้เกรดพรีเมียม' : 'Premium Grade',
      description: lang === 'th' ? 'สนและสักคุณภาพ' : 'Pine & Teak Quality',
      accent: 'from-amber-400 to-orange-600'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      value: '15',
      label: lang === 'th' ? 'ปีรับประกัน' : 'Year Warranty',
      description: lang === 'th' ? 'รับประกันไม้โครงสร้าง' : 'Structural Wood Guarantee',
      accent: 'from-blue-400 to-indigo-600'
    },
    {
      icon: <Truck className="w-8 h-8" />,
      value: lang === 'th' ? '1 วัน' : 'Same Day',
      label: lang === 'th' ? 'จัดส่งด่วน' : 'Express Delivery',
      description: lang === 'th' ? 'กรุงเทพฯ และปริมณฑล' : 'Bangkok & Perimeter',
      accent: 'from-red-400 to-rose-600'
    }
  ];

  return (
    <section
      className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 py-16 lg:py-20 relative z-20 text-white overflow-hidden"
      aria-labelledby="stats-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <h2 id="stats-heading" className="sr-only">{stats.heading}</h2>

        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {lang === 'th' ? 'เหตุผลที่ควรเลือกเรา' : 'Why Trusted by Contractors'}
          </h2>
          <p className="text-blue-200 text-lg max-w-2xl mx-auto">
            {lang === 'th'
              ? 'เราเป็นผู้นำด้านการจัดหาไม้สนและไม้สักคุณภาพสูงสุดในประเทศไทย'
              : 'Thailand\'s leading supplier of premium structural pine and teak wood'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" role="list" aria-label="Our trust indicators">
          {trustIndicators.map((indicator, index) => (
            <div
              key={index}
              role="listitem"
              className={`group relative bg-white/5 backdrop-blur-sm rounded-2xl p-6 lg:p-8 border border-white/10 hover:border-white/30 transition-all duration-500 hover:transform hover:-translate-y-2 ${
                mounted ? 'animate-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Icon with Gradient Background */}
              <div className={`inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 rounded-2xl bg-gradient-to-br ${indicator.accent} mb-4 lg:mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <div className="text-white">
                  {indicator.icon}
                </div>
              </div>

              {/* Value */}
              <h3 className="text-3xl lg:text-4xl font-extrabold text-white mb-2">
                {indicator.value}
              </h3>

              {/* Label */}
              <p className="text-blue-100 font-bold text-sm lg:text-base uppercase tracking-wide mb-2">
                {indicator.label}
              </p>

              {/* Description */}
              <p className="text-blue-200/80 text-sm leading-relaxed">
                {indicator.description}
              </p>

              {/* Hover Effect Badge */}
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Trust Signals */}
        <div className="mt-12 flex flex-wrap justify-center gap-4 lg:gap-6">
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-3 rounded-full border border-white/20">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zm0 18l-10-5 10 5-10-5 10 5z"/>
            </svg>
            <span className="text-sm lg:text-base font-semibold">
              {lang === 'th' ? 'ISO 9001:2015' : 'ISO 9001:2015 Certified'}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-3 rounded-full border border-white/20">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            <span className="text-sm lg:text-base font-semibold">
              {lang === 'th' ? 'ไม้ผ่านการรับรอง' : 'Quality Assured Wood'}
            </span>
          </div>
          <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 lg:px-6 py-3 rounded-full border border-white/20">
            <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M5 13l4 4L19 7"/>
            </svg>
            <span className="text-sm lg:text-base font-semibold">
              {lang === 'th' ? 'รับประกันความพอใจ' : 'Satisfaction Guaranteed'}
            </span>
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
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
