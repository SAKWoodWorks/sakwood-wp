import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { i18n } from './i18n-config';

import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

function getLocale(request: NextRequest): string | undefined {
  // ดึงภาษาจาก Browser ของลูกค้า (เช่น th-TH, en-US)
  const negotiatorHeaders: Record<string, string> = {};
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value));

  // @ts-ignore locales are readonly
  const locales: string[] = i18n.locales;

  // ใช้ library ช่วยเลือกภาษาที่เหมาะสมที่สุด
  let languages = new Negotiator({ headers: negotiatorHeaders }).languages(
    locales
  );

  return matchLocale(languages, locales, i18n.defaultLocale);
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // ยกเว้นไฟล์ที่ไม่ต้องเปลี่ยนภาษา เช่น รูปภาพ, API, icon
  if (
    [
      '/manifest.json',
      '/favicon.ico',
      '/logo.png',
      '/hero-video.mp4',
      '/line-logo.png',
      '/telegram-logo.png',
      '/msg-logo.png',
      '/call-logo.png',
      // เพิ่มไฟล์อื่นๆ ที่ต้องการยกเว้นที่นี่
    ].includes(pathname) ||
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/api/') ||
    pathname.startsWith('/static/')
  )
    return;

  // เช็คว่าใน URL มีภาษาหรือยัง (เช่น /th/...)
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // ถ้ายังไม่มีภาษา ให้ Redirect ไปภาษาที่เหมาะสม
  // แต่ถ้า URL มีภาษาอยู่แล้ว ให้ใช้ภาษานั้นต่อไป ไม่ต้อง redirect
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // เช่น เข้ามาที่ /products -> เปลี่ยนเป็น /th/products
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // ถ้า URL มีภาษาอยู่แล้ว ให้ใช้ค่าเดิม ไม่ต้อง detect จาก browser
  // ทำให้ URL ที่ user คลิกมาไม่ถูกเปลี่ยนโดยอัตโนมัติ
  return NextResponse.next();
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};