// ============================================================================
// T&T — SEO Utilities (hreflang, canonical, OG, JSON-LD component)
// Next.js 14+ App Router
// ============================================================================

import type { Metadata } from 'next';
import { SITE_URL, locales, routes, getRoute, type Locale } from './routes';
import { getPageMetadata } from './metadata';

// ── Canonical URL ───────────────────────────────────────────────────────────

export function getCanonicalUrl(routeKey: string, locale: Locale): string {
  const route = getRoute(routeKey);
  if (!route) throw new Error(`Route not found: ${routeKey}`);
  return `${SITE_URL}/${locale}${route.path[locale]}`;
}

// ── Hreflang Alternates ─────────────────────────────────────────────────────

export function getHreflangAlternates(routeKey: string): Record<string, string> {
  const route = getRoute(routeKey);
  if (!route) throw new Error(`Route not found: ${routeKey}`);

  const alternates: Record<string, string> = {};
  for (const locale of locales) {
    const hreflangCode = locale === 'es' ? 'es-ES' : 'en-US';
    alternates[hreflangCode] = `${SITE_URL}/${locale}${route.path[locale]}`;
  }
  // x-default points to ES version
  alternates['x-default'] = `${SITE_URL}/es${route.path.es}`;
  return alternates;
}

// ── Open Graph Locale ───────────────────────────────────────────────────────

export function getOgLocale(locale: Locale): string {
  return locale === 'es' ? 'es_ES' : 'en_US';
}

export function getOgAlternateLocales(locale: Locale): string[] {
  return locale === 'es' ? ['en_US'] : ['es_ES'];
}

// ── Generate Complete Metadata ──────────────────────────────────────────────

/**
 * Generates complete Next.js Metadata object for any page.
 * Usage in layout.ts or page.ts:
 *
 * export function generateMetadata({ params }: Props): Metadata {
 *   return buildMetadata('home', params.locale);
 * }
 */
export function buildMetadata(routeKey: string, locale: Locale): Metadata {
  const pageMeta = getPageMetadata(routeKey, locale);
  if (!pageMeta) throw new Error(`Metadata not found: ${routeKey} [${locale}]`);

  const canonical = getCanonicalUrl(routeKey, locale);
  const alternates = getHreflangAlternates(routeKey);

  return {
    title: pageMeta.title,
    description: pageMeta.description,

    alternates: {
      canonical,
      languages: alternates,
    },

    openGraph: {
      title: pageMeta.ogTitle,
      description: pageMeta.description,
      url: canonical,
      siteName: 'T&T',
      locale: getOgLocale(locale),
      alternateLocale: getOgAlternateLocales(locale),
      type: 'website',
      images: [
        {
          url: `${SITE_URL}/og/${routeKey}-${locale}.jpg`,
          width: 1200,
          height: 630,
          alt: pageMeta.ogTitle,
        },
      ],
    },

    twitter: {
      card: 'summary_large_image',
      title: pageMeta.ogTitle,
      description: pageMeta.description,
      images: [`${SITE_URL}/og/${routeKey}-${locale}.jpg`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

// ── JSON-LD Component ───────────────────────────────────────────────────────

/**
 * Usage in page.tsx:
 *
 * import { JsonLd } from '@/seo/seo-utils';
 * import { organizationSchema } from '@/seo/schemas';
 *
 * export default function Page() {
 *   return (
 *     <>
 *       <JsonLd data={organizationSchema()} />
 *       <main>...</main>
 *     </>
 *   );
 * }
 */
export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
