// ============================================================================
// T&T — Route Definitions (27 pages × 2 locales = 54 URLs)
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
  vertical?: 'tthink' | 'ttech' | 'ttrends' | 'tteam' | 'tevents';
  /** Whether this is a service subpage (has FAQs) */
  isSubpage?: boolean;
  /** Breadcrumb label per locale */
  label: Record<Locale, string>;
}

export const routes: RouteDefinition[] = [
  // ── Homepage ──────────────────────────────────────────────────────────
  {
    key: 'home',
    path: { es: '/', en: '/' },
    label: { es: 'Inicio', en: 'Home' },
  },

  // ── t&think ───────────────────────────────────────────────────────────
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
    label: { es: 'Creatividad y Dirección de Arte', en: 'Creativity & Art Direction' },
  },
  {
    key: 'pr-comunicacion',
    path: { es: '/think/pr-comunicacion/', en: '/think/pr-communications/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'PR y Comunicación', en: 'PR & Communications' },
  },
  {
    key: 'performance',
    path: { es: '/think/performance/', en: '/think/performance/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Performance y Medios', en: 'Performance & Media' },
  },
  {
    key: 'trade-marketing',
    path: { es: '/think/trade-marketing/', en: '/think/trade-marketing/' },
    parent: 'think',
    vertical: 'tthink',
    isSubpage: true,
    label: { es: 'Trade Marketing', en: 'Trade Marketing' },
  },

  // ── t&tech ────────────────────────────────────────────────────────────
  {
    key: 'tech',
    path: { es: '/tech/', en: '/tech/' },
    parent: 'home',
    vertical: 'ttech',
    label: { es: 't&tech', en: 't&tech' },
  },
  {
    key: 'desarrollo',
    path: { es: '/tech/desarrollo/', en: '/tech/development/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: 'Desarrollo Web y App', en: 'Web & App Development' },
  },
  {
    key: 'inteligencia-artificial',
    path: { es: '/tech/inteligencia-artificial/', en: '/tech/artificial-intelligence/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: 'Inteligencia Artificial', en: 'Artificial Intelligence' },
  },
  {
    key: 'crm',
    path: { es: '/tech/crm/', en: '/tech/crm/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: 'Sistemas CRM', en: 'CRM Systems' },
  },
  {
    key: 'automatizacion',
    path: { es: '/tech/automatizacion/', en: '/tech/automation/' },
    parent: 'tech',
    vertical: 'ttech',
    isSubpage: true,
    label: { es: 'Automatización', en: 'Automation' },
  },

  // ── t&trends ──────────────────────────────────────────────────────────
  {
    key: 'trends',
    path: { es: '/trends/', en: '/trends/' },
    parent: 'home',
    vertical: 'ttrends',
    label: { es: 't&trends', en: 't&trends' },
  },
  {
    key: 'consultoria',
    path: { es: '/trends/consultoria/', en: '/trends/consulting/' },
    parent: 'trends',
    vertical: 'ttrends',
    isSubpage: true,
    label: { es: 'Consultoría Estratégica', en: 'Strategic Consulting' },
  },
  {
    key: 'data-analitica',
    path: { es: '/trends/data-analitica/', en: '/trends/data-analytics/' },
    parent: 'trends',
    vertical: 'ttrends',
    isSubpage: true,
    label: { es: 'Data y Analítica', en: 'Data & Analytics' },
  },
  {
    key: 'investigacion',
    path: { es: '/trends/investigacion/', en: '/trends/research/' },
    parent: 'trends',
    vertical: 'ttrends',
    isSubpage: true,
    label: { es: 'Investigación de Mercados', en: 'Market Research' },
  },

  // ── t&team ────────────────────────────────────────────────────────────
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
    label: { es: 'Captación de Talento', en: 'Talent Acquisition' },
  },
  {
    key: 'formacion',
    path: { es: '/team/formacion/', en: '/team/training/' },
    parent: 'team',
    vertical: 'tteam',
    isSubpage: true,
    label: { es: 'Formación Corporativa', en: 'Corporate Training' },
  },
  {
    key: 'teambuilding',
    path: { es: '/team/teambuilding/', en: '/team/teambuilding/' },
    parent: 'team',
    vertical: 'tteam',
    isSubpage: true,
    label: { es: 'Team Building', en: 'Team Building' },
  },

  // ── t&events ──────────────────────────────────────────────────────────
  {
    key: 'events',
    path: { es: '/events/', en: '/events/' },
    parent: 'home',
    vertical: 'tevents',
    label: { es: 't&events', en: 't&events' },
  },
  {
    key: 'corporativos',
    path: { es: '/events/corporativos/', en: '/events/corporate/' },
    parent: 'events',
    vertical: 'tevents',
    isSubpage: true,
    label: { es: 'Eventos Corporativos', en: 'Corporate Events' },
  },
  {
    key: 'stands',
    path: { es: '/events/stands/', en: '/events/stands-exhibitions/' },
    parent: 'events',
    vertical: 'tevents',
    isSubpage: true,
    label: { es: 'Stands y Ferias', en: 'Stands & Exhibitions' },
  },
  {
    key: 'marketing-experiencial',
    path: { es: '/events/marketing-experiencial/', en: '/events/experiential-marketing/' },
    parent: 'events',
    vertical: 'tevents',
    isSubpage: true,
    label: { es: 'Marketing Experiencial', en: 'Experiential Marketing' },
  },

  // ── General pages ─────────────────────────────────────────────────────
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

// ── Helpers ───────────────────────────────────────────────────────────────

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
