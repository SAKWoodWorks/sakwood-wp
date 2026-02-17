'use client';

import Link from 'next/link';
import { APP_CONFIG } from '@/lib/config/constants';
import { SocialLinks } from './SocialLinks';
import { FooterPartners } from './FooterPartners';
import { CookieSettings } from './CookieSettings';
import type { Locale } from '@/i18n-config';

interface FooterProps {
  lang: Locale;
}

export function Footer({ lang }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl sm:text-2xl">S</span>
              </div>
              <span className="text-xl sm:text-2xl font-bold">{APP_CONFIG.name}</span>
            </div>
            <p className="text-blue-200 leading-relaxed max-w-md mb-4 sm:mb-6 text-sm sm:text-base">
              {APP_CONFIG.description}. Your trusted partner for premium construction materials.
            </p>
            <SocialLinks />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">
              {lang === 'th' ? 'ลิงก์ด่วน' : 'Quick Links'}
            </h3>
            <ul className="space-y-2 sm:space-y-3">
              <li>
                <Link href={`/${lang}`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'หน้าแรก' : 'Home'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/shop`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'สินค้า' : 'Products'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/price-list`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'ราคาสินค้า' : 'Price List'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/calculator`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'เครื่องคำนวณ' : 'Calculator'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/room-calculator`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'เครื่องคำนวณห้อง' : 'Room Calculator'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/quote`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  Request Quote
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/about`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'เกี่ยวกับเรา' : 'About'}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-blue-200 hover:text-white transition-colors text-sm sm:text-base">
                  {lang === 'th' ? 'ติดต่อเรา' : 'Contact'}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">
              {lang === 'th' ? 'ติดต่อเรา' : 'Contact Us'}
            </h3>
            <ul className="space-y-3 text-blue-200">
              <li className="flex items-start gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mt-0.5 sm:mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm sm:text-base">123 Construction Street, Bangkok, Thailand</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm sm:text-base">info@sakwood.com</span>
              </li>
              <li className="flex items-center gap-2 sm:gap-3">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm sm:text-base">+66 2 123 4567</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Partners Section */}
        <FooterPartners lang={lang} />

        {/* Bottom Bar */}
        <div className="border-t border-blue-700/50 mt-6 sm:mt-8 lg:mt-12 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-blue-300 text-xs sm:text-sm text-center sm:text-left">
            © 2026 {APP_CONFIG.name}. {lang === 'th' ? 'สงวนลิขสิทธิ์' : 'All rights reserved.'}
          </p>
          <div className="flex gap-4 sm:gap-6 items-center">
            <Link href={`/${lang}/privacy-policy`} className="text-blue-300 hover:text-white transition-colors text-xs sm:text-sm">
              {lang === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
            </Link>
            <Link href={`/${lang}/terms-of-service`} className="text-blue-300 hover:text-white transition-colors text-xs sm:text-sm">
              {lang === 'th' ? 'เงื่อนไขการให้บริการ' : 'Terms of Service'}
            </Link>
            <CookieSettings lang={lang as 'th' | 'en'} />
          </div>
        </div>
      </div>
    </footer>
  );
}
