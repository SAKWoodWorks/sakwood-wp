'use client';

import { useState, useEffect, useRef } from 'react';
import type { Locale } from '@/i18n-config';
import { ArrowRight, CheckCircle, Droplets, Shield, Star } from 'lucide-react';

interface QualityShowcaseProps {
  lang: Locale;
  dictionary: Record<string, any>;
}

interface WoodType {
  name: string;
  nameTh: string;
  type: 'pine' | 'teak';
  description: string;
  descriptionTh: string;
  image: string;
  grade: string;
  moisture: string;
  uses: string[];
  usesTh: string[];
  color: string;
}

export function QualityShowcase({ lang, dictionary }: QualityShowcaseProps) {
  const [mounted, setMounted] = useState(false);
  const [activeTab, setActiveTab] = useState<'pine' | 'teak'>('pine');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const woodTypes: WoodType[] = [
    {
      name: 'Premium Structural Pine',
      nameTh: 'ไม้สนโครงสร้างเกรดพรีเมียม',
      type: 'pine',
      description: 'Grade-A structural pine sourced from sustainable plantations. Perfect for construction, framing, and structural applications.',
      descriptionTh: 'ไม้สนเกรด A จากสวนป่าที่ยั่งยืน เหมาะสำหรับงานก่อสร้าง กรอบโครงสร้าง และงานโครงสร้าง',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      grade: 'Grade A / Structural',
      moisture: '12-15% (KD)',
      uses: ['Construction', 'Roofing', 'Framing', 'Flooring'],
      usesTh: ['ก่อสร้าง', 'หลังคา', 'โครงสร้าง', 'พื้นไม้'],
      color: 'from-amber-600 to-orange-700'
    },
    {
      name: 'Premium Burmese Teak',
      nameTh: 'ไม้สักพม่าเกรดพรีเมียม',
      type: 'teak',
      description: 'Premium Grade-A Burmese teak with natural oil content. Ideal for furniture, marine applications, and outdoor use.',
      descriptionTh: 'ไม้สักเกรด A พม่า มีน้ำมันธรรมชาติ เหมาะสำหรับเฟอร์นิเจอร์ งานทางเรือ และกลางแจ้ง',
      image: 'https://images.unsplash.com/photo-1566633806327-68e152aaf26d?w=1200&q=80',
      grade: 'Grade A / FEQ',
      moisture: '10-12% (KD)',
      uses: ['Furniture', 'Boat Building', 'Decking', 'Cabinetry'],
      usesTh: ['เฟอร์นิเจอร์', 'ต่อเรือ', 'ระเบียง', 'ตู้เฟอร์นิเจอร์'],
      color: 'from-yellow-700 to-amber-800'
    }
  ];

  const activeWood = woodTypes.find(w => w.type === activeTab) || woodTypes[0];

  const qualityFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: lang === 'th' ? 'รับประกันคุณภาพ' : 'Quality Guaranteed',
      description: lang === 'th' ? '15 ปีรับประกันไม้โครงสร้าง' : '15-year warranty on structural wood'
    },
    {
      icon: <Droplets className="w-5 h-5" />,
      title: lang === 'th' ? 'ความชื้นมาตรฐาน' : 'Proper Moisture',
      description: lang === 'th' ? 'ผ่านการอบแห้ง KD 12-15%' : 'Kiln-dried to 12-15% moisture'
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: lang === 'th' ? 'ผ่านการรับรอง' : 'Certified Grade',
      description: lang === 'th' ? 'เกรด A ผ่านมาตรฐานสากล' : 'Grade A, ISO certified'
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: lang === 'th' ? 'ไม้เกรดพรีเมียม' : 'Premium Selection',
      description: lang === 'th' ? 'คัดสรรเฉพาะไม้คุณภาพสูงสุด' : 'Hand-selected premium wood'
    }
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-20 lg:py-28 bg-gradient-to-b from-slate-50 to-blue-50 overflow-hidden"
      aria-labelledby="quality-showcase-heading"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%239C92AC' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeWood.color} text-white px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide mb-4`}>
            <Star className="w-4 h-4" />
            {lang === 'th' ? 'คุณภาพเกรดพรีเมียม' : 'Premium Grade Quality'}
          </div>
          <h2 id="quality-showcase-heading" className="text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4">
            {lang === 'th' ? 'เห็นคุณภาพ ไว้ใจได้' : 'See Quality, Trust the Difference'}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {lang === 'th'
              ? 'เราคัดสรรเฉพาะไม้เกรดพรีเมียมที่ผ่านการตรวจสอบคุณภาพอย่างเข้มงวด'
              : 'We hand-select only premium grade wood that passes rigorous quality inspection'}
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-2xl p-1.5 shadow-lg">
            <button
              onClick={() => setActiveTab('pine')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'pine'
                  ? 'bg-gradient-to-r from-amber-600 to-orange-700 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {lang === 'th' ? 'ไม้สน' : 'Pine Wood'}
            </button>
            <button
              onClick={() => setActiveTab('teak')}
              className={`px-8 py-3 rounded-xl font-semibold transition-all duration-300 ${
                activeTab === 'teak'
                  ? 'bg-gradient-to-r from-yellow-700 to-amber-800 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              {lang === 'th' ? 'ไม้สัก' : 'Teak Wood'}
            </button>
          </div>
        </div>

        {/* Main Showcase */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Image Side */}
          <div className="relative group">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={activeWood.image}
                alt={lang === 'th' ? activeWood.nameTh : activeWood.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>

            {/* Floating Badge */}
            <div className={`absolute -bottom-6 -right-6 bg-gradient-to-br ${activeWood.color} text-white p-6 rounded-2xl shadow-xl transform group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-3xl font-extrabold mb-1">{activeWood.grade}</div>
              <div className="text-sm opacity-90">{lang === 'th' ? 'มาตรฐานสากล' : 'International Standard'}</div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                {lang === 'th' ? activeWood.nameTh : activeWood.name}
              </h3>
              <p className="text-lg text-gray-600 leading-relaxed">
                {lang === 'th' ? activeWood.descriptionTh : activeWood.description}
              </p>
            </div>

            {/* Specifications */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{lang === 'th' ? 'เกรด' : 'Grade'}</div>
                <div className="text-xl font-bold text-gray-900">{activeWood.grade}</div>
              </div>
              <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
                <div className="text-sm text-gray-500 mb-1">{lang === 'th' ? 'ความชื้น' : 'Moisture'}</div>
                <div className="text-xl font-bold text-gray-900">{activeWood.moisture}</div>
              </div>
            </div>

            {/* Uses */}
            <div>
              <div className="text-sm font-semibold text-gray-700 mb-2">
                {lang === 'th' ? 'การใช้งานที่เหมาะสม:' : 'Best Uses:'}
              </div>
              <div className="flex flex-wrap gap-2">
                {(lang === 'th' ? activeWood.usesTh : activeWood.uses).map((use, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center px-3 py-1.5 bg-white rounded-full text-sm font-medium text-gray-700 border border-gray-200"
                  >
                    <CheckCircle className="w-3.5 h-3.5 mr-1.5 text-green-500" />
                    {use}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA Button */}
            <a
              href={`/${lang}/products`}
              className={`inline-flex items-center gap-2 bg-gradient-to-r ${activeWood.color} text-white px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}
            >
              {lang === 'th' ? 'ดูผลิตภัณฑ์ทั้งหมด' : 'View All Products'}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quality Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {qualityFeatures.map((feature, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                mounted ? 'animate-in' : 'opacity-0'
              }`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br ${activeWood.color} rounded-xl mb-4 text-white`}>
                {feature.icon}
              </div>
              <h4 className="font-bold text-gray-900 mb-2">{feature.title}</h4>
              <p className="text-sm text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Trust Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col items-center gap-3 bg-white rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
            <div className="flex items-center gap-3">
              <svg className="w-10 h-10 text-green-500" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zm0 18l-10-5 10 5-10-5 10 5z"/>
              </svg>
              <div className="text-left">
                <div className="text-2xl font-bold text-gray-900">
                  {lang === 'th' ? 'รับประกันคุณภาพ' : 'Quality Assured'}
                </div>
                <div className="text-sm text-gray-500">
                  {lang === 'th' ? 'มาตรฐานสากล ISO 9001:2015' : 'ISO 9001:2015 Certified'}
                </div>
              </div>
            </div>
            <div className="text-xs text-gray-400 max-w-xs">
              {lang === 'th'
                ? 'ทุกชิ้นผ่านการตรวจสอบคุณภาพก่อนส่งมอบ'
                : 'Every piece inspected before delivery'}
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
        .animate-in {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
