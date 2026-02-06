'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui';
import { APP_CONFIG } from '@/lib/config/constants';
import { MenuItem } from '@/lib/types';
import type { Locale } from '@/i18n-config';
import { useCart } from '@/lib/context/CartContext';
import { useAuth } from '@/lib/context/AuthContext';
import { CompareButton } from '@/components/products/CompareButton';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  menuItems: MenuItem[];
  lang: Locale;
  dictionary?: Record<string, any>;
}

export function Header({ menuItems, lang, dictionary }: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { getCartCount } = useCart();
  const { isAuthenticated, user, logout, isWholesale, isDealer } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [cartAnimating, setCartAnimating] = useState(false);
  const [prevCartCount, setPrevCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Check if we're on the homepage
  const isHomePage = mounted && (pathname === `/${lang}` || pathname === `/${lang}/`);
  // Check if header should be transparent (only on homepage when not scrolled)
  const isTransparentHeader = isHomePage && !isScrolled;

  const dict = dictionary?.search || {
    search_placeholder: lang === 'th' ? 'ค้นหาชื่อสินค้า...' : 'Search products...',
  };

  // Set mounted state
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Required for SSR-safe component mounting
    setMounted(true);
  }, []);

  // Update cart count when cart changes
  useEffect(() => {
    if (mounted) {
      const newCount = getCartCount();
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Updating cart count on change
      setCartCount(newCount);

      // Trigger animation if count increased
      if (newCount > prevCartCount) {
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Animation state update
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
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && mobileMenuRef.current) {
        const target = event.target as Node;
        // Check if click is outside the mobile menu
        if (!mobileMenuRef.current.contains(target)) {
          setIsMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const renderMenuItem = (item: MenuItem, isMobile: boolean = false) => {
    const baseClasses = cn(
      'text-sm font-medium transition relative group',
      isMobile
        ? 'text-gray-700 hover:text-blue-600'
        : (!isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200')
    );

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
        <div className={cn(
          'hidden sm:block text-white py-1 transition-all duration-300',
          !isHomePage || isScrolled ? 'bg-gray-900' : 'bg-transparent'
        )}>
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
                    className={cn(
                      'px-1.5 sm:px-2 py-0.5 text-xs font-bold transition-colors rounded',
                      lang === 'en'
                        ? 'text-blue-400 bg-white/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                    )}
                  >
                    EN
                  </button>
                  <span className="text-gray-600">|</span>
                  <button
                    onClick={() => toggleLanguage('th')}
                    className={cn(
                      'px-1.5 sm:px-2 py-0.5 text-xs font-bold transition-colors rounded',
                      lang === 'th'
                        ? 'text-blue-400 bg-white/10'
                        : 'text-gray-300 hover:text-blue-400 hover:bg-white/10'
                    )}
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
          className={cn(
            'transition-all duration-300 border-0',
            !isHomePage || isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-2' : 'bg-transparent py-2 sm:py-4'
          )}
        >
        <div className="max-w-7xl mx-auto px-3 sm:px-6">
          <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center gap-2 sm:gap-3 group">
            <div className={cn(
              'bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg',
              isScrolled ? 'w-7 h-7 sm:w-8 sm:h-8' : 'w-8 h-8 sm:w-10 sm:h-10'
            )}>
              <span className={cn('text-white font-bold transition-all',
                isScrolled ? 'text-base sm:text-lg' : 'text-lg sm:text-xl'
              )}>S</span>
            </div>
            <span className={cn('font-bold bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent transition-all',
              isScrolled ? 'text-lg sm:text-xl' : 'text-xl sm:text-2xl'
            )}>
              {APP_CONFIG.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            {menuItems.map((item) => renderMenuItem(item))}

            {/* Quick Shop Link */}
            <Link
              href={`/${lang}/quick-shop`}
              className="text-sm text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            >
              {lang === 'th' ? 'ช้อปปิ้ง' : 'Quick Shop'}
            </Link>

            {/* Search Icon */}
            <div className="relative">
              {!isSearchOpen ? (
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className={cn(
                    'p-1.5 sm:p-2 transition-all ml-1 sm:ml-2',
                    !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                  )}
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
              className={cn(
                'relative p-1.5 sm:p-2 transition-all ml-1 sm:ml-2',
                cartAnimating ? 'animate-bounce' : '',
                !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
              )}
              aria-label="Shopping cart"
            >
              <svg className={cn(
                'transition-all',
                isScrolled ? 'w-4 h-4 sm:w-5 sm:h-5' : 'w-5 h-5 sm:w-6 sm:h-6',
                cartAnimating ? 'animate-spin' : ''
              )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className={cn(
                  'absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transition-all',
                  cartAnimating ? 'animate-ping' : ''
                )}>
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Compare Button */}
            <CompareButton
              lang={lang}
              dictionary={dictionary}
              textColor={!isTransparentHeader ? 'text-gray-700' : 'text-white'}
              hoverColor={!isTransparentHeader ? 'hover:text-blue-600' : 'hover:text-blue-200'}
            />

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className={cn(
                  'p-1.5 sm:p-2 transition-colors ml-1 sm:ml-2',
                  !isTransparentHeader ? 'text-gray-700 hover:text-blue-600' : 'text-white hover:text-blue-200'
                )}
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
            className={cn(
              'md:hidden p-1.5 sm:p-2 transition rounded-lg',
              !isTransparentHeader ? 'text-gray-700 hover:text-blue-600 bg-white shadow-md' : 'text-gray-700 hover:text-blue-600 bg-white shadow-md'
            )}
            onClick={(e) => {
              e.stopPropagation();
              setIsMenuOpen(!isMenuOpen);
            }}
            aria-label="Toggle mobile menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
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
          <nav
            ref={mobileMenuRef}
            id="mobile-menu"
            className="md:hidden mt-2 bg-white shadow-2xl rounded-b-2xl max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
            role="navigation"
            aria-label="Mobile navigation"
          >
            <div className="p-4 sm:p-6 space-y-4">
              {/* Search */}
              <div className="relative">
                <form onSubmit={handleSearch}>
                  <label htmlFor="mobile-search-input" className="sr-only">
                    {dict.search_placeholder}
                  </label>
                  <input
                    id="mobile-search-input"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={dict.search_placeholder}
                    aria-label={dict.search_placeholder}
                    className="w-full pl-11 pr-10 py-3 text-sm border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all bg-gray-50"
                  />
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery('')}
                      aria-label="Clear search"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 rounded-full p-1"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </form>
              </div>

              {/* Language & Quick Actions */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                <div className="flex items-center gap-1.5 bg-white rounded-lg p-1 shadow-sm">
                  <button
                    onClick={() => toggleLanguage('en')}
                    aria-label="Switch to English"
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all rounded-md',
                      lang === 'en'
                        ? 'text-white bg-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    )}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => toggleLanguage('th')}
                    aria-label="Switch to Thai"
                    className={cn(
                      'px-3 py-1.5 text-xs font-bold transition-all rounded-md',
                      lang === 'th'
                        ? 'text-white bg-blue-600 shadow-md'
                        : 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
                    )}
                  >
                    ไทย
                  </button>
                </div>
                <a
                  href={`tel:${APP_CONFIG.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xs font-semibold">{APP_CONFIG.phone}</span>
                </a>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1">
                {menuItems.map((item) => {
                  const basePath = item.path || item.url || '#';
                  const href = basePath.startsWith('/') && !basePath.startsWith(`/${lang}`)
                    ? `/${lang}${basePath}`
                    : basePath;

                  return (
                    <Link
                      key={item.id}
                      href={href}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all font-medium group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.icon && (
                        <span className="text-gray-400 group-hover:text-blue-500 transition-colors">
                          {item.icon}
                        </span>
                      )}
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  );
                })}

                {/* Quick Shop Link */}
                <Link
                  href={`/${lang}/quick-shop`}
                  className="flex items-center gap-3 px-4 py-3 text-blue-600 font-semibold hover:text-blue-700 hover:bg-blue-50 rounded-xl transition-all group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className="w-5 h-5 text-blue-500 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span className="text-sm">{lang === 'th' ? 'ช้อปปิ้ง' : 'Quick Shop'}</span>
                </Link>
              </div>

              {/* Quick Actions Bar */}
              <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
                <CompareButton lang={lang} dictionary={dictionary} />
                <div className="flex-1" />
                <Link
                  href={`/${lang}/cart`}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold text-sm shadow-md hover:shadow-lg',
                    cartAnimating ? 'animate-bounce' : ''
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <svg className={cn('w-5 h-5', cartAnimating ? 'animate-spin' : '')} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span>Cart</span>
                  {cartCount > 0 && (
                    <span className="bg-white text-blue-600 text-xs font-bold rounded-full px-2 py-0.5 shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {/* Account Section */}
              <div className="pt-3 border-t border-gray-200">
                <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 px-1">
                  {dictionary?.auth?.account || 'Account'}
                </div>
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <Link
                      href={`/${lang}/account`}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-200 flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{dictionary?.auth?.my_account || 'My Account'}</div>
                      </div>
                    </Link>
                    <Link
                      href={`/${lang}/orders`}
                      className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all group"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="w-8 h-8 rounded-lg bg-green-100 group-hover:bg-green-200 flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium">{dictionary?.auth?.my_orders || 'My Orders'}</div>
                      </div>
                    </Link>

                    {/* Dealer Section - Only show for wholesale customers */}
                    {isWholesale && !isDealer && (
                      <Link
                        href={`/${lang}/dealer/apply`}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{dictionary?.dealer?.become_dealer || 'Become a Dealer'}</div>
                        </div>
                      </Link>
                    )}

                    {/* Dealer Status - Only show for active dealers */}
                    {isDealer && (
                      <Link
                        href={`/${lang}/dealer/status`}
                        className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:text-purple-600 hover:bg-purple-50 rounded-xl transition-all group"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-200 flex items-center justify-center transition-colors">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium">{dictionary?.dealer?.dashboard_title || 'Dealer Dashboard'}</div>
                        </div>
                      </Link>
                    )}

                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 px-4 py-3 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all group w-full"
                    >
                      <div className="w-8 h-8 rounded-lg bg-red-100 group-hover:bg-red-200 flex items-center justify-center transition-colors">
                        <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                      </div>
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium">{dictionary?.auth?.logout || 'Logout'}</div>
                      </div>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link
                      href={`/${lang}/login`}
                      className="flex items-center justify-center gap-2 px-4 py-3 text-gray-700 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all font-semibold"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                      </svg>
                      <span>{dictionary?.auth?.login || 'Login'}</span>
                    </Link>
                    <Link
                      href={`/${lang}/register`}
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all font-semibold shadow-md"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                      <span>{dictionary?.auth?.register || 'Register'}</span>
                    </Link>
                  </div>
                )}
              </div>
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
