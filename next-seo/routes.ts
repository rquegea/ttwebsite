// ============================================================================
// T&T — Route Definitions (22 pages x 2 locales = 44 URLs)
// Next.js 14+ App Router with i18n: /es/... and /en/...
// ============================================================================

export const SITE_URL = 'https://www.tyt.com'; // TODO: Replace with actual domain

export type Locale = 'es' | 'en';
export const locales: Locale[] = ['es', 'en'];
export const defaultLocale: Locale = 'es';

export interface RouteDefinition {
  /** Unique route key */
  key: string;
  /** Path segments per locale (without locale prefix) */
  path: Record<Locale, string>;
  /** Key of parent route (for breadcrumbs) */
  parent?: string;
  /** Vertical it belongs to */
  vertical?: 'tthink' | 'ttech' | 'ttailor' | 'ttrade' | 'ttalk' | 'tteam';
  /** Whether this is a service subpage (has FAQs) */
  isSubpage?: boolean;
  /** Breadcrumb label per locale */
  label: Record<Locale, string>;
}

export const routes: RouteDefinition[] = [
  // -- Homepage ---------------------------------------------------------------
  {
    key: 'home',
    path: { es: '/', en: '/' },
    label: { es: 'Inicio', en: 'Home' },
  },

  // -- t&think ----------------------------------------------------------------
  {
    key: 'think',
    path: { es: '/think/', en: '/think/' },
    parent: 'home',
    vertical: 'tthink',
    label: { es: 't&think', en: 't&think' },
  },
  {
    key: 'creatividad',
    path: { es: '/think/creatividad/', en: '/think/creativity/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Creatividad y Direccion de Arte', en: 'Creativity & Art Direction' },
  },
  {
    key: 'estrategia',
    path: { es: '/think/estrategia/', en: '/think/strategy/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Estrategia', en: 'Strategy' },
  },
  {
    key: 'investigacion',
    path: { es: '/think/investigacion/', en: '/think/research/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Investigacion de Mercados', en: 'Market Research' },
  },
  {
    key: 'data-analitica',
    path: { es: '/think/data-analitica/', en: '/think/data-analytics/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Data y Analitica', en: 'Data & Analytics' },
  },

  // -- t&tech -----------------------------------------------------------------
  {
    key: 'tech',
    path: { es: '/tech/', en: '/tech/' },
    parent: 'home',
    vertical: 'ttech',
    label: { es: 't&tech', en: 't&tech' },
  },
  {
    key: '2laps',
    path: { es: '/tech/2laps/', en: '/tech/2laps/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: '2laps', en: '2laps' },
  },
  {
    key: '1000er',
    path: { es: '/tech/1000er/', en: '/tech/1000er/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: '1000er', en: '1000er' },
  },

  // -- t&tailor ---------------------------------------------------------------
  {
    key: 'tailor',
    path: { es: '/tailor/', en: '/tailor/' },
    parent: 'home',
    vertical: 'ttailor',
    label: { es: 't&tailor', en: 't&tailor' },
  },

  // -- t&trade ----------------------------------------------------------------
  {
    key: 'trade',
    path: { es: '/trade/', en: '/trade/' },
    parent: 'home',
    vertical: 'ttrade',
    label: { es: 't&trade', en: 't&trade' },
  },
  {
    key: 'trade-show',
    path: { es: '/trade/trade-show/', en: '/trade/trade-show/' },
    parent: 'trade',
    vertical: 'ttrade',
    isSubpage: true,
    label: { es: 'Trade Show', en: 'Trade Show' },
  },
  {
    key: 'trade-marketing',
    path: { es: '/trade/trade-marketing/', en: '/trade/trade-marketing/' },
    parent: 'trade',
    vertical: 'ttrade',
    isSubpage: true,
    label: { es: 'Trade Marketing', en: 'Trade Marketing' },
  },

  // -- t&talk -----------------------------------------------------------------
  {
    key: 'talk',
    path: { es: '/talk/', en: '/talk/' },
    parent: 'home',
    vertical: 'ttalk',
    label: { es: 't&talk', en: 't&talk' },
  },

  // -- t&team -----------------------------------------------------------------
  {
    key: 'team',
    path: { es: '/team/', en: '/team/' },
    parent: 'home',
    vertical: 'tteam',
    label: { es: 't&team', en: 't&team' },
  },
  {
    key: 'captacion',
    path: { es: '/team/captacion/', en: '/team/talent-acquisition/' },
    parent: 'team',
    vertical: 'tteam',
    isSubpage: true,
    label: { es: 'Captacion de Talento', en: 'Talent Acquisition' },
  },
  {
    key: 'formacion',
    path: { es: '/team/formacion/', en: '/team/training/' },
    parent: 'team',
    vertical: 'tteam',
    isSubpage: true,
    label: { es: 'Formacion Corporativa', en: 'Corporate Training' },
  },
  {
    key: 'teambuilding',
    path: { es: '/team/teambuilding/', en: '/team/teambuilding/' },
    parent: 'team',
    vertical: 'tteam',
    isSubpage: true,
    label: { es: 'Team Building', en: 'Team Building' },
  },

  // -- General pages ----------------------------------------------------------
  {
    key: 'clientes',
    path: { es: '/clientes/', en: '/clients/' },
    parent: 'home',
    label: { es: 'Clientes', en: 'Clients' },
  },
  {
    key: 'empresa',
    path: { es: '/empresa/', en: '/company/' },
    parent: 'home',
    label: { es: 'Empresa', en: 'About' },
  },
  {
    key: 'contacto',
    path: { es: '/contacto/', en: '/contact/' },
    parent: 'home',
    label: { es: 'Contacto', en: 'Contact' },
  },
  {
    key: 'insights',
    path: { es: '/insights/', en: '/insights/' },
    parent: 'home',
    label: { es: 'Insights', en: 'Insights' },
  },
];

// -- Helpers ------------------------------------------------------------------

export function getRoute(key: string): RouteDefinition | undefined {
  return routes.find((r) => r.key === key);
}

export function getFullUrl(key: string, locale: Locale): string {
  const route = getRoute(key);
  if (!route) throw new Error(`Route not found: ${key}`);
  return `${SITE_URL}/${locale}${route.path[locale]}`;
}

export function getAlternateUrl(key: string, locale: Locale): string {
  return getFullUrl(key, locale);
}

/** Get all routes that are service subpages (have FAQs) */
export function getSubpageRoutes(): RouteDefinition[] {
  return routes.filter((r) => r.isSubpage);
}

/** Get all routes for a specific vertical */
export function getVerticalRoutes(vertical: string): RouteDefinition[] {
  return routes.filter((r) => r.vertical === vertical);
}
