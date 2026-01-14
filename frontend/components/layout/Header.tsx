'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui';
import { APP_CONFIG } from '@/lib/config/constants';
import { MenuItem } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import { useCart } from '@/lib/context/CartContext';

interface HeaderProps {
  menuItems: MenuItem[];
  lang: Locale;
  dictionary?: {
    common: {
      home: string;
      products: string;
      about: string;
      contact: string;
    };
  };
}

export function Header({ menuItems, lang, dictionary }: HeaderProps) {
  const { getCartCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartCount, setCartCount] = useState(0);

  // Update cart count when cart changes
  useEffect(() => {
    setCartCount(getCartCount());
  }, [getCartCount]);

  // Handle scroll to shrink header and hide/show on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Shrink header when scrolled down
      setIsScrolled(currentScrollY > 50);
      
      // Hide header when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  const renderMenuItem = (item: MenuItem, isMobile: boolean = false) => {
    const baseClasses = isMobile
      ? 'text-gray-700 hover:text-blue-600 font-medium transition'
      : 'text-gray-700 hover:text-blue-600 font-medium transition relative group';

    const content = (
      <>
        {item.label}
        {!isMobile && (
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
        )}
      </>
    );

    // Use path if available, otherwise use url, and prefix with current locale
    const basePath = item.path || item.url || '#';
    const href = basePath.startsWith('/') && !basePath.startsWith(`/${lang}`)
      ? `/${lang}${basePath}`
      : basePath;

    return (
      <Link
        key={item.id}
        href={href}
        className={baseClasses}
        onClick={() => isMobile && setIsMenuOpen(false)}
      >
        {content}
      </Link>
    );
  };

  const toggleLanguage = (newLang: Locale) => {
    const currentPath = window.location.pathname;
    // Remove current language from path and add new language
    const pathWithoutLang = currentPath.replace(/^\/(en|th)/, '') || '/';
    window.location.href = `/${newLang}${pathWithoutLang}`;
  };

  return (
    <header 
      className={`bg-white/95 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100 transition-all duration-300 ${
        isScrolled ? 'py-2 shadow-lg' : 'py-4 shadow-sm'
      } ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-3 group">
            <div className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${
              isScrolled ? 'w-8 h-8' : 'w-10 h-10'
            }`}>
              <span className={`text-white font-bold transition-all ${
                isScrolled ? 'text-lg' : 'text-xl'
              }`}>S</span>
            </div>
            <span className={`font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent transition-all ${
              isScrolled ? 'text-xl' : 'text-2xl'
            }`}>
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => renderMenuItem(item))}
            
            {/* Language Switcher */}
            <div className="flex items-center gap-2 ml-4 pl-4 border-l border-gray-200">
              <button
                onClick={() => toggleLanguage('en')}
                className={`px-3 py-1 text-sm font-bold transition-colors rounded ${
                  lang === 'en' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                EN
              </button>
              <span className="text-gray-300">|</span>
              <button
                onClick={() => toggleLanguage('th')}
                className={`px-3 py-1 text-sm font-bold transition-colors rounded ${
                  lang === 'th' 
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                ไทย
              </button>
            </div>

            {/* Cart Icon */}
            <Link
              href={`/${lang}/cart`}
              className="relative p-2 text-gray-700 hover:text-blue-600 transition-colors ml-2"
              aria-label="Shopping cart"
            >
              <svg className={`transition-all ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href={`/${lang}/quote`}>
              <Button variant="primary" size={isScrolled ? 'sm' : 'md'}>
                Get Started
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition"
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
          >
            <svg className={`transition-all ${isScrolled ? 'w-5 h-5' : 'w-6 h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-100 pt-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-4">
              {menuItems.map((item) => renderMenuItem(item, true))}
              
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                <button
                  onClick={() => toggleLanguage('en')}
                  className={`flex-1 py-2 text-sm font-bold transition-colors rounded ${
                    lang === 'en' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => toggleLanguage('th')}
                  className={`flex-1 py-2 text-sm font-bold transition-colors rounded ${
                    lang === 'th' 
                      ? 'text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  ไทย
                </button>
              </div>

              {/* Mobile Cart Icon */}
              <Link
                href={`/${lang}/cart`}
                className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span>Cart</span>
                {cartCount > 0 && (
                  <span className="bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5">
                    {cartCount}
                  </span>
                )}
              </Link>

              <Link href={`/${lang}/quote`} className="block">
                <Button variant="primary" size="md" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
