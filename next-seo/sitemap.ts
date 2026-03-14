// ============================================================================
// T&T — Dynamic Sitemap (Next.js App Router: app/sitemap.ts)
// 44 URLs (22 ES + 22 EN) with hreflang alternates
// ============================================================================

import type { MetadataRoute } from 'next';
import { SITE_URL, routes, locales, type Locale } from './routes';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      const url = `${SITE_URL}/${locale}${route.path[locale]}`;

      // Build hreflang alternates for this page
      const languages: Record<string, string> = {};
      for (const altLocale of locales) {
        const hreflangCode = altLocale === 'es' ? 'es-ES' : 'en-US';
        languages[hreflangCode] = `${SITE_URL}/${altLocale}${route.path[altLocale]}`;
      }
      // x-default -> ES
      languages['x-default'] = `${SITE_URL}/es${route.path.es}`;

      entries.push({
        url,
        lastModified: new Date(),
        changeFrequency: getChangeFrequency(route.key),
        priority: getPriority(route.key),
        alternates: { languages },
      });
    }
  }

  return entries;
}

// -- Priority by page type ----------------------------------------------------

function getPriority(key: string): number {
  if (key === 'home') return 1.0;
  // Verticals
  if (['think', 'tech', 'tailor', 'trade', 'talk', 'team'].includes(key)) return 0.9;
  // Key pages
  if (['empresa', 'contacto', 'clientes'].includes(key)) return 0.8;
  // Service subpages
  if (routes.find((r) => r.key === key)?.isSubpage) return 0.7;
  // Insights, etc.
  return 0.6;
}

function getChangeFrequency(key: string): 'daily' | 'weekly' | 'monthly' {
  if (key === 'home' || key === 'insights') return 'weekly';
  if (['think', 'tech', 'tailor', 'trade', 'talk', 'team'].includes(key)) return 'weekly';
  return 'monthly';
}

// ============================================================================
// Generated sitemap output (44 URLs):
//
// ES (22):
//   https://www.tyt.com/es/
//   https://www.tyt.com/es/think/
//   https://www.tyt.com/es/think/creatividad/
//   https://www.tyt.com/es/think/estrategia/
//   https://www.tyt.com/es/think/investigacion/
//   https://www.tyt.com/es/think/data-analitica/
//   https://www.tyt.com/es/tech/
//   https://www.tyt.com/es/tech/2laps/
//   https://www.tyt.com/es/tech/1000er/
//   https://www.tyt.com/es/tailor/
//   https://www.tyt.com/es/trade/
//   https://www.tyt.com/es/trade/trade-show/
//   https://www.tyt.com/es/trade/trade-marketing/
//   https://www.tyt.com/es/talk/
//   https://www.tyt.com/es/team/
//   https://www.tyt.com/es/team/captacion/
//   https://www.tyt.com/es/team/formacion/
//   https://www.tyt.com/es/team/teambuilding/
//   https://www.tyt.com/es/clientes/
//   https://www.tyt.com/es/empresa/
//   https://www.tyt.com/es/contacto/
//   https://www.tyt.com/es/insights/
//
// EN (22):
//   https://www.tyt.com/en/
//   https://www.tyt.com/en/think/
//   https://www.tyt.com/en/think/creativity/
//   https://www.tyt.com/en/think/strategy/
//   https://www.tyt.com/en/think/research/
//   https://www.tyt.com/en/think/data-analytics/
//   https://www.tyt.com/en/tech/
//   https://www.tyt.com/en/tech/2laps/
//   https://www.tyt.com/en/tech/1000er/
//   https://www.tyt.com/en/tailor/
//   https://www.tyt.com/en/trade/
//   https://www.tyt.com/en/trade/trade-show/
//   https://www.tyt.com/en/trade/trade-marketing/
//   https://www.tyt.com/en/talk/
//   https://www.tyt.com/en/team/
//   https://www.tyt.com/en/team/talent-acquisition/
//   https://www.tyt.com/en/team/training/
//   https://www.tyt.com/en/team/teambuilding/
//   https://www.tyt.com/en/clients/
//   https://www.tyt.com/en/company/
//   https://www.tyt.com/en/contact/
//   https://www.tyt.com/en/insights/
// ============================================================================
