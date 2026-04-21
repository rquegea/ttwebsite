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
//   https://www.trucoytrufa.es/es/
//   https://www.trucoytrufa.es/es/think/
//   https://www.trucoytrufa.es/es/think/creatividad/
//   https://www.trucoytrufa.es/es/think/estrategia/
//   https://www.trucoytrufa.es/es/think/investigacion/
//   https://www.trucoytrufa.es/es/think/data-analitica/
//   https://www.trucoytrufa.es/es/tech/
//   https://www.trucoytrufa.es/es/tech/2laps/
//   https://www.trucoytrufa.es/es/tech/1000er/
//   https://www.trucoytrufa.es/es/tailor/
//   https://www.trucoytrufa.es/es/trade/
//   https://www.trucoytrufa.es/es/trade/trade-show/
//   https://www.trucoytrufa.es/es/trade/trade-marketing/
//   https://www.trucoytrufa.es/es/talk/
//   https://www.trucoytrufa.es/es/team/
//   https://www.trucoytrufa.es/es/team/captacion/
//   https://www.trucoytrufa.es/es/team/formacion/
//   https://www.trucoytrufa.es/es/team/teambuilding/
//   https://www.trucoytrufa.es/es/clientes/
//   https://www.trucoytrufa.es/es/empresa/
//   https://www.trucoytrufa.es/es/contacto/
//   https://www.trucoytrufa.es/es/insights/
//
// EN (22):
//   https://www.trucoytrufa.es/en/
//   https://www.trucoytrufa.es/en/think/
//   https://www.trucoytrufa.es/en/think/creativity/
//   https://www.trucoytrufa.es/en/think/strategy/
//   https://www.trucoytrufa.es/en/think/research/
//   https://www.trucoytrufa.es/en/think/data-analytics/
//   https://www.trucoytrufa.es/en/tech/
//   https://www.trucoytrufa.es/en/tech/2laps/
//   https://www.trucoytrufa.es/en/tech/1000er/
//   https://www.trucoytrufa.es/en/tailor/
//   https://www.trucoytrufa.es/en/trade/
//   https://www.trucoytrufa.es/en/trade/trade-show/
//   https://www.trucoytrufa.es/en/trade/trade-marketing/
//   https://www.trucoytrufa.es/en/talk/
//   https://www.trucoytrufa.es/en/team/
//   https://www.trucoytrufa.es/en/team/talent-acquisition/
//   https://www.trucoytrufa.es/en/team/training/
//   https://www.trucoytrufa.es/en/team/teambuilding/
//   https://www.trucoytrufa.es/en/clients/
//   https://www.trucoytrufa.es/en/company/
//   https://www.trucoytrufa.es/en/contact/
//   https://www.trucoytrufa.es/en/insights/
// ============================================================================
