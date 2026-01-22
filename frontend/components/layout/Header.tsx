'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { APP_CONFIG } from '@/lib/config/constants';
import { MenuItem } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { CompareButton } from '@/components/products/CompareButton';
import { Search, X } from 'lucide-react';

interface HeaderProps {
  menuItems: MenuItem[];
  lang: Locale;
  dictionary?: Record<string, any>;
}

export function Header({ menuItems, lang, dictionary }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Check if we're on the homepage
  const isHomePage = mounted && (pathname === `/${lang}` || pathname === `/${lang}/`);
  // Check if header should be transparent (only on homepage when not scrolled)
  const isTransparentHeader = isHomePage && !isScrolled;

  const dict = dictionary?.search || {
    search_placeholder: lang === 'th' ? 'ค้นหาชื่อสินค้า...' : 'Search products...',
  };

  // Set mounted state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Update cart count when cart changes
  useEffect(() => {
    if (mounted) {
      const newCount = getCartCount();
      setCartCount(newCount);

      // Trigger animation if count increased
      if (newCount > prevCartCount) {
        setCartAnimating(true);
        setTimeout(() => setCartAnimating(false), 600);
      }
      setPrevCartCount(newCount);
    }
  }, [getCartCount, mounted, prevCartCount]);

  // Handle scroll to shrink header (only on homepage)
  useEffect(() => {
    if (!mounted || !isHomePage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Shrink header when scrolled down
      setIsScrolled(currentScrollY > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [mounted, isHomePage]);

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
      : `font-medium transition relative group ${
          !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
        }`;

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${lang}/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setIsMenuOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      {/* Primary Navigation Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {/* Mini Top Bar - hidden on mobile */}
        <div className={`hidden sm:block text-white py-1 transition-all duration-300 ${
          !isHomePage || isScrolled ? 'bg-gray-900' : 'bg-transparent'
        }`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6"> 
            <div className="flex justify-between items-center">
              {/* Phone Number */}
              <a
                href={`tel:${APP_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-1.5 text-xs hover:text-blue-400 transition-colors"
              >Hot line
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>{APP_CONFIG.phone}</span>
              </a>

              {/* Right Side: Language Switcher & Social Links */}
              <div className="flex items-center gap-2 sm:gap-3">
                {/* Language Switcher */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-1.5 sm:px-2 py-0.5 text-xs font-bold transition-colors rounded ${
                      lang === 'en'
                        ? 'text-blue-400 bg-white/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                    }`}
                  >
                    EN
                  </button>
                  <span className="text-gray-600">|</span>
                  <button
                    onClick={() => toggleLanguage('th')}
                    className={`px-1.5 sm:px-2 py-0.5 text-xs font-bold transition-colors rounded ${
                      lang === 'th'
                        ? 'text-blue-400 bg-white/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                    }`}
                  >
                    ไทย
                  </button>
                </div>

                {/* Social Links - hide on very small screens */}
                <div className="hidden xs:flex gap-2">
                  {[
                    {
                      name: 'Facebook',
                      icon: (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                      ),
                      href: 'https://www.facebook.com/sakwoodworks',
                      color: 'bg-blue-600 hover:bg-blue-700',
                    },
                    {
                      name: 'Line',
                      icon: (
                        <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-2-2 2-2-2-2 2-2 2 2 2-2-2-2 2-2 2 2 2-2-2-2 2-2z" />
                        </svg>
                      ),
                      href: 'https://line.me/ti/p/@sakwoodworks',
                      color: 'bg-green-500 hover:bg-green-600',
                    },
                  ].map((social) => (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${social.color} text-white p-1 rounded-full transition-colors`}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <header
          className={`transition-all duration-300 border-0 ${
            !isHomePage || isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-2' : 'bg-transparent py-2 sm:py-4'
          }`}
        >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 sm:gap-3 group">
            <div className={`bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg ${
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-10 sm:h-10'
            }`}>
              <span className={`text-white font-bold transition-all ${
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              }`}>S</span>
            </div>
            <span className={`font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent transition-all ${
              isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
            }`}>
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => renderMenuItem(item))}

            {/* Search Icon */}
            <div className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={`p-1.5 sm:p-2 transition-all ml-1 sm:ml-2 ${
                    !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  }`}
                  aria-label="Search"
                >
                  <Search className={`transition-all ${isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'}`} />
                </button>
              ) : (
                <form onSubmit={handleSearch} className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-white border-2 border-blue-500 rounded-lg overflow-hidden shadow-lg">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.search_placeholder}
                    className="w-48 sm:w-64 px-3 py-1.5 text-sm outline-none"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
                    aria-label="Close search"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <button
                    type="submit"
                    className="p-1.5 text-blue-600 hover:text-blue-700 transition-colors"
                    aria-label="Submit search"
                  >
                    <Search className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Cart Icon */}
            <Link
              href={`/${lang}/cart`}
              className={`relative p-1.5 sm:p-2 transition-all ml-1 sm:ml-2 ${
                cartAnimating ? 'animate-bounce' : ''
              } ${
                !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              }`}
              aria-label="Shopping cart"
            >
              <svg className={`transition-all ${isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'} ${
                cartAnimating ? 'animate-spin' : ''
              }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className={`absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-all ${
                  cartAnimating ? 'animate-ping' : ''
                }`}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Compare Button */}
            <CompareButton lang={lang} dictionary={dictionary} />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={`p-1.5 sm:p-2 transition-colors ml-1 sm:ml-2 ${
                  !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                }`}
                aria-label="User menu"
              >
                <svg className={`transition-all ${isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200">
                  {isAuthenticated ? (
                    <>
                      <Link
                        href={`/${lang}/account`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {dictionary?.auth?.my_account || 'My Account'}
                      </Link>
                      <Link
                        href={`/${lang}/orders`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {dictionary?.auth?.my_orders || 'My Orders'}
                      </Link>
                      <hr className="my-1" />
                      <button
                        onClick={() => {
                          logout();
                          setIsUserMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        {dictionary?.auth?.logout || 'Logout'}
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        href={`/${lang}/login`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {dictionary?.auth?.login || 'Login'}
                      </Link>
                      <Link
                        href={`/${lang}/register`}
                        className="block px-4 py-2 text-sm text-blue-600 hover:bg-gray-100 font-semibold"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        {dictionary?.auth?.register || 'Register'}
                      </Link>
                    </>
                  )}
                </div>
              )}
            </div>
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
            className={`md:hidden p-1.5 sm:p-2 transition ${
              !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
            }`}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle menu"
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
          <nav className="md:hidden mt-2 sm:mt-4 pb-4 border-t border-gray-100 pt-3 sm:pt-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex flex-col gap-2 sm:gap-3">
              {/* Search */}
              <form onSubmit={handleSearch} className="relative mb-2">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={dict.search_placeholder}
                  className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </form>

              {/* Language Switcher & Phone */}
              <div className="flex items-center justify-between pb-3 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggleLanguage('en')}
                    className={`px-2 py-1 text-xs font-bold transition-colors rounded ${
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
                    className={`px-2 py-1 text-xs font-bold transition-colors rounded ${
                      lang === 'th'
                        ? 'text-blue-600 bg-blue-50'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    }`}
                  >
                    ไทย
                  </button>
                </div>
                <a
                  href={`tel:${APP_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>{APP_CONFIG.phone}</span>
                </a>
              </div>

              {/* Navigation Links */}
              {menuItems.map((item) => renderMenuItem(item, true))}

              {/* Mobile Compare & Cart */}
              <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
                <CompareButton lang={lang} dictionary={dictionary} />
                <Link
                  href={`/${lang}/cart`}
                  className={`flex items-center gap-2 px-3 py-2 text-gray-700 hover:text-blue-600 transition-all flex-1 ${
                    cartAnimating ? 'animate-bounce' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className={`w-5 h-5 ${cartAnimating ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="text-sm">Cart</span>
                  {cartCount > 0 && (
                    <span className={`bg-red-600 text-white text-xs font-bold rounded-full px-2 py-0.5 transition-all ${
                      cartAnimating ? 'animate-ping' : ''
                    }`}>
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Mobile User Menu */}
              <div className="border-t border-gray-100 pt-3 mt-2">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Account
                </div>
                {isAuthenticated ? (
                  <>
                    <Link
                      href={`/${lang}/account`}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                      <span className="text-sm">{dictionary?.auth?.my_account || 'My Account'}</span>
                    </Link>
                    <Link
                      href={`/${lang}/orders`}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                      <span className="text-sm">{dictionary?.auth?.my_orders || 'My Orders'}</span>
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 p-2 text-red-600 hover:text-red-700 transition-colors w-full text-left"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm">{dictionary?.auth?.logout || 'Logout'}</span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      href={`/${lang}/login`}
                      className="flex items-center gap-2 p-2 text-gray-700 hover:text-blue-600 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span className="text-sm">{dictionary?.auth?.login || 'Login'}</span>
                    </Link>
                    <Link
                      href={`/${lang}/register`}
                      className="flex items-center gap-2 p-2 text-blue-600 hover:text-blue-700 transition-colors font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span className="text-sm">{dictionary?.auth?.register || 'Register'}</span>
                    </Link>
                  </>
                )}
              </div>

              <Link href={`/${lang}/quote`} className="block pt-2">
                <Button variant="primary" size="md" fullWidth>
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        )}
        </div>
      </header>
      </div>

      {/* Spacer to account for fixed header - only when header has solid background */}
      {!isTransparentHeader && (
        <div className="h-16 sm:h-20"></div>
      )}
    </>
  );
}
