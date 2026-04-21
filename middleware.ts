import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const KNOWN_ES_ROOTS = [
  'think', 'tech', 'tailor', 'trade', 'talk', 'team',
  'clientes', 'contacto', 'empresa', 'insights', 'marketing', 'work',
  'brand-radar', 'ai-governance', 'aviso-legal', 'cookies', 'privacidad', 'preplay',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Already prefixed — let through
  if (pathname.startsWith('/es/') || pathname.startsWith('/en/')) {
    return NextResponse.next();
  }

  // Static assets and Next internals — let through
  if (
    pathname.startsWith('/_next/') ||
    pathname.startsWith('/logos/') ||
    pathname.startsWith('/images/') ||
    pathname.startsWith('/fonts/') ||
    pathname.startsWith('/api/') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Root "/" → detect language from Accept-Language header
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language') || 'es';
    const lang = acceptLanguage.toLowerCase().startsWith('en') ? 'en' : 'es';
    return NextResponse.redirect(new URL(`/${lang}/`, request.url), 308);
  }

  // Legacy ES paths without prefix → redirect to /es/...
  const firstSegment = pathname.split('/').filter(Boolean)[0];
  if (firstSegment && KNOWN_ES_ROOTS.includes(firstSegment)) {
    return NextResponse.redirect(new URL(`/es${pathname}`, request.url), 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
