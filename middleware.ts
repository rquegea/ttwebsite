import { NextRequest, NextResponse } from 'next/server';
import { i18n } from '@/lib/i18n/config';

function getLocale(request: NextRequest): string {
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && (i18n.locales as readonly string[]).includes(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get('accept-language') || '';
  const preferredLang = acceptLanguage.split(',')[0]?.split('-')[0]?.toLowerCase();
  if (preferredLang && (i18n.locales as readonly string[]).includes(preferredLang)) {
    return preferredLang;
  }

  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/logos') ||
    pathname.includes('.')
  ) {
    return;
  }

  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ['/((?!_next|api|logos|favicon\\.ico|.*\\.).*)'],
};
