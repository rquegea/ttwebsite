// ============================================================================
// T&T — Dynamic Sitemap (Next.js App Router: app/sitemap.ts)
// 54 URLs (27 ES + 27 EN) with hreflang alternates
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
      // x-default → ES
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

// ── Priority by page type ───────────────────────────────────────────────────

function getPriority(key: string): number {
  if (key === 'home') return 1.0;
  // Verticals
  if (['think', 'tech', 'trends', 'team', 'events'].includes(key)) return 0.9;
  // Key pages
  if (['empresa', 'contacto', 'clientes'].includes(key)) return 0.8;
  // Service subpages
  if (routes.find((r) => r.key === key)?.isSubpage) return 0.7;
  // Insights, etc.
  return 0.6;
}

function getChangeFrequency(key: string): 'daily' | 'weekly' | 'monthly' {
  if (key === 'home' || key === 'insights') return 'weekly';
  if (['think', 'tech', 'trends', 'team', 'events'].includes(key)) return 'weekly';
  return 'monthly';
}

// ============================================================================
// Generated sitemap output (54 URLs):
//
// ES (27):
//   https://www.tyt.com/es/
//   https://www.tyt.com/es/think/
//   https://www.tyt.com/es/think/creatividad/
//   https://www.tyt.com/es/think/pr-comunicacion/
//   https://www.tyt.com/es/think/performance/
//   https://www.tyt.com/es/think/trade-marketing/
//   https://www.tyt.com/es/tech/
//   https://www.tyt.com/es/tech/desarrollo/
//   https://www.tyt.com/es/tech/inteligencia-artificial/
//   https://www.tyt.com/es/tech/crm/
//   https://www.tyt.com/es/tech/automatizacion/
//   https://www.tyt.com/es/trends/
//   https://www.tyt.com/es/trends/consultoria/
//   https://www.tyt.com/es/trends/data-analitica/
//   https://www.tyt.com/es/trends/investigacion/
//   https://www.tyt.com/es/team/
//   https://www.tyt.com/es/team/captacion/
//   https://www.tyt.com/es/team/formacion/
//   https://www.tyt.com/es/team/teambuilding/
//   https://www.tyt.com/es/events/
//   https://www.tyt.com/es/events/corporativos/
//   https://www.tyt.com/es/events/stands/
//   https://www.tyt.com/es/events/marketing-experiencial/
//   https://www.tyt.com/es/clientes/
//   https://www.tyt.com/es/empresa/
//   https://www.tyt.com/es/contacto/
//   https://www.tyt.com/es/insights/
//
// EN (27):
//   https://www.tyt.com/en/
//   https://www.tyt.com/en/think/
//   https://www.tyt.com/en/think/creativity/
//   https://www.tyt.com/en/think/pr-communications/
//   https://www.tyt.com/en/think/performance/
//   https://www.tyt.com/en/think/trade-marketing/
//   https://www.tyt.com/en/tech/
//   https://www.tyt.com/en/tech/development/
//   https://www.tyt.com/en/tech/artificial-intelligence/
//   https://www.tyt.com/en/tech/crm/
//   https://www.tyt.com/en/tech/automation/
//   https://www.tyt.com/en/trends/
//   https://www.tyt.com/en/trends/consulting/
//   https://www.tyt.com/en/trends/data-analytics/
//   https://www.tyt.com/en/trends/research/
//   https://www.tyt.com/en/team/
//   https://www.tyt.com/en/team/talent-acquisition/
//   https://www.tyt.com/en/team/training/
//   https://www.tyt.com/en/team/teambuilding/
//   https://www.tyt.com/en/events/
//   https://www.tyt.com/en/events/corporate/
//   https://www.tyt.com/en/events/stands-exhibitions/
//   https://www.tyt.com/en/events/experiential-marketing/
//   https://www.tyt.com/en/clients/
//   https://www.tyt.com/en/company/
//   https://www.tyt.com/en/contact/
//   https://www.tyt.com/en/insights/
// ============================================================================
