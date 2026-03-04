// ============================================================================
// T&T — Schema.org JSON-LD Generators
// Organization, LocalBusiness, WebSite, Service, BreadcrumbList, FAQPage
// ============================================================================

import { SITE_URL, routes, getRoute, type Locale } from './routes';
import { faqData } from './faqs';

// ── 1. Organization (global) ────────────────────────────────────────────────

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'MarketingAgency'],
    '@id': `${SITE_URL}/#organization`,
    name: 'T&T',
    alternateName: ['Truco y Trufa', 'T&T Marketing'],
    url: SITE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_URL}/images/logo-tyt.svg`,
      width: 200,
      height: 60,
    },
    description: 'T&T is a marketing, communications and transformation company. Creativity, technology, strategy, talent and events for extraordinary brands.',
    foundingDate: '2015',
    slogan: 'We make brands extraordinary',
    email: 'hello@tyt.com',
    telephone: '+34-XXX-XXX-XXX',
    sameAs: [
      'https://www.linkedin.com/company/tyt',
      'https://www.instagram.com/tyt',
      'https://twitter.com/tyt',
    ],
    knowsAbout: [
      'Marketing',
      'Brand Strategy',
      'Web Development',
      'Artificial Intelligence',
      'CRM Implementation',
      'Public Relations',
      'Corporate Events',
      'Market Research',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Calle y número]',
      addressLocality: 'Madrid',
      addressRegion: 'Comunidad de Madrid',
      postalCode: '28XXX',
      addressCountry: 'ES',
    },
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Place', name: 'Latin America' },
      { '@type': 'Place', name: 'Europe' },
    ],
  };
}

// ── 2. LocalBusiness (Madrid HQ) ────────────────────────────────────────────

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#localbusiness`,
    name: 'T&T — Madrid',
    image: `${SITE_URL}/images/office-madrid.jpg`,
    url: SITE_URL,
    telephone: '+34-XXX-XXX-XXX',
    email: 'hello@tyt.com',
    priceRange: '€€€',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Calle y número]',
      addressLocality: 'Madrid',
      addressRegion: 'Comunidad de Madrid',
      postalCode: '28XXX',
      addressCountry: 'ES',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 40.4168,
      longitude: -3.7038,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
    ],
    parentOrganization: { '@id': `${SITE_URL}/#organization` },
  };
}

// ── 3. WebSite with SearchAction ────────────────────────────────────────────

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: 'T&T',
    url: SITE_URL,
    publisher: { '@id': `${SITE_URL}/#organization` },
    inLanguage: ['es-ES', 'en-US'],
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/insights/?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// ── 4. Service (one per vertical + subservice) ──────────────────────────────

interface ServiceSchemaInput {
  locale: Locale;
  routeKey: string;
  name: string;
  description: string;
  parentKey?: string;
}

export function serviceSchema({ locale, routeKey, name, description, parentKey }: ServiceSchemaInput) {
  const route = getRoute(routeKey);
  if (!route) throw new Error(`Route not found: ${routeKey}`);

  const url = `${SITE_URL}/${locale}${route.path[locale]}`;

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name,
    description,
    url,
    provider: { '@id': `${SITE_URL}/#organization` },
    areaServed: [
      { '@type': 'Country', name: 'Spain' },
      { '@type': 'Place', name: 'Europe' },
    ],
  };

  if (parentKey) {
    const parentRoute = getRoute(parentKey);
    if (parentRoute) {
      schema.isPartOf = {
        '@type': 'Service',
        '@id': `${SITE_URL}/${locale}${parentRoute.path[locale]}#service`,
      };
    }
  }

  return schema;
}

// Pre-built service schemas per vertical

const serviceDefinitions: Record<string, Record<Locale, { name: string; description: string }>> = {
  // ── t&think ──
  think: {
    es: { name: 't&think — Creatividad y Estrategia', description: 'Línea de negocio de pensamiento estratégico y creativo. Creatividad, PR, performance y trade marketing.' },
    en: { name: 't&think — Creativity & Strategy', description: 'Strategic and creative thinking business line. Creativity, PR, performance and trade marketing.' },
  },
  creatividad: {
    es: { name: 'Creatividad y Dirección de Arte', description: 'Dirección de arte, diseño gráfico, identidad visual y creatividad publicitaria.' },
    en: { name: 'Creativity & Art Direction', description: 'Art direction, graphic design, visual identity and advertising creativity.' },
  },
  'pr-comunicacion': {
    es: { name: 'PR y Comunicación', description: 'Relaciones públicas, comunicación corporativa, gestión de crisis y estrategia de reputación.' },
    en: { name: 'PR & Communications', description: 'Public relations, corporate communications, crisis management and reputation strategy.' },
  },
  performance: {
    es: { name: 'Performance y Medios', description: 'Campañas de performance, paid media, SEM, social ads y planificación de medios.' },
    en: { name: 'Performance & Media', description: 'Performance campaigns, paid media, SEM, social ads and media planning.' },
  },
  'trade-marketing': {
    es: { name: 'Trade Marketing', description: 'Activaciones en punto de venta, promociones, merchandising y estrategia de canal.' },
    en: { name: 'Trade Marketing', description: 'Point-of-sale activations, promotions, merchandising and channel strategy.' },
  },
  // ── t&tech ──
  tech: {
    es: { name: 't&tech — Tecnología y Desarrollo Digital', description: 'Línea de negocio tecnológica. Desarrollo web, IA, CRM y automatización.' },
    en: { name: 't&tech — Technology & Digital Development', description: 'Technology business line. Web development, AI, CRM and automation.' },
  },
  desarrollo: {
    es: { name: 'Desarrollo Web y App', description: 'Webs corporativas, e-commerce, apps nativas y PWA con código limpio y rendimiento real.' },
    en: { name: 'Web & App Development', description: 'Corporate websites, e-commerce, native apps and PWAs with clean code and real performance.' },
  },
  'inteligencia-artificial': {
    es: { name: 'Inteligencia Artificial', description: 'Chatbots, análisis predictivo, NLP, agentes IA y automatización inteligente.' },
    en: { name: 'Artificial Intelligence', description: 'Chatbots, predictive analytics, NLP, AI agents and intelligent automation.' },
  },
  crm: {
    es: { name: 'Sistemas CRM', description: 'Implementación, migración y optimización de HubSpot, Salesforce y Zoho.' },
    en: { name: 'CRM Systems', description: 'HubSpot, Salesforce and Zoho implementation, migration and optimisation.' },
  },
  automatizacion: {
    es: { name: 'Automatización', description: 'Marketing automation, workflows operativos, Zapier, Make, n8n y customer journey automation.' },
    en: { name: 'Automation', description: 'Marketing automation, operational workflows, Zapier, Make, n8n and customer journey automation.' },
  },
  // ── t&trends ──
  trends: {
    es: { name: 't&trends — Consultoría Estratégica y Data', description: 'Línea de negocio de inteligencia estratégica. Consultoría, data y analítica, investigación de mercados.' },
    en: { name: 't&trends — Strategic Consulting & Data', description: 'Strategic intelligence business line. Consulting, data and analytics, market research.' },
  },
  consultoria: {
    es: { name: 'Consultoría Estratégica', description: 'Consultoría de marca, estrategia de negocio, posicionamiento y go-to-market.' },
    en: { name: 'Strategic Consulting', description: 'Brand consulting, business strategy, positioning and go-to-market.' },
  },
  'data-analitica': {
    es: { name: 'Data y Analítica', description: 'Analítica web, business intelligence, dashboards y modelos de atribución.' },
    en: { name: 'Data & Analytics', description: 'Web analytics, business intelligence, dashboards and attribution models.' },
  },
  investigacion: {
    es: { name: 'Investigación de Mercados', description: 'Estudios de mercado, análisis de competencia, investigación de consumidor.' },
    en: { name: 'Market Research', description: 'Market studies, competitive analysis, consumer research.' },
  },
  // ── t&team ──
  team: {
    es: { name: 't&team — Talento y Formación', description: 'Línea de negocio de personas y cultura. Captación, formación y team building.' },
    en: { name: 't&team — Talent & Training', description: 'People and culture business line. Talent acquisition, training and team building.' },
  },
  captacion: {
    es: { name: 'Captación de Talento', description: 'Reclutamiento especializado, employer branding y headhunting de perfiles de marketing y digital.' },
    en: { name: 'Talent Acquisition', description: 'Specialised recruitment, employer branding and headhunting of marketing and digital profiles.' },
  },
  formacion: {
    es: { name: 'Formación Corporativa', description: 'Programas in-company de marketing digital, IA, liderazgo y comunicación.' },
    en: { name: 'Corporate Training', description: 'In-company programmes in digital marketing, AI, leadership and communications.' },
  },
  teambuilding: {
    es: { name: 'Team Building', description: 'Workshops creativos, dinámicas de equipo y actividades de integración corporativa.' },
    en: { name: 'Team Building', description: 'Creative workshops, team dynamics and corporate integration activities.' },
  },
  // ── t&events ──
  events: {
    es: { name: 't&events — Eventos y Experiencias', description: 'Línea de negocio de eventos de marca. Eventos corporativos, stands y marketing experiencial.' },
    en: { name: 't&events — Events & Experiences', description: 'Brand events business line. Corporate events, stands and experiential marketing.' },
  },
  corporativos: {
    es: { name: 'Eventos Corporativos', description: 'Convenciones, presentaciones de producto, galas y eventos de networking.' },
    en: { name: 'Corporate Events', description: 'Conventions, product launches, galas and networking events.' },
  },
  stands: {
    es: { name: 'Stands y Ferias', description: 'Diseño y producción de stands, presencia ferial y activaciones in situ.' },
    en: { name: 'Stands & Exhibitions', description: 'Stand design and production, trade show presence and on-site activations.' },
  },
  'marketing-experiencial': {
    es: { name: 'Marketing Experiencial', description: 'Experiencias de marca inmersivas, pop-ups, roadshows y activaciones de engagement.' },
    en: { name: 'Experiential Marketing', description: 'Immersive brand experiences, pop-ups, roadshows and engagement activations.' },
  },
};

/** Generate a Service schema for any route + locale */
export function getServiceSchema(routeKey: string, locale: Locale) {
  const def = serviceDefinitions[routeKey];
  if (!def) return null;

  const route = getRoute(routeKey);
  return serviceSchema({
    locale,
    routeKey,
    name: def[locale].name,
    description: def[locale].description,
    parentKey: route?.parent !== 'home' ? route?.parent : undefined,
  });
}

// ── 5. BreadcrumbList ───────────────────────────────────────────────────────

export function breadcrumbSchema(routeKey: string, locale: Locale) {
  const crumbs: { name: string; url: string }[] = [];
  let currentKey: string | undefined = routeKey;

  // Walk up the parent chain
  const chain: string[] = [];
  while (currentKey) {
    chain.unshift(currentKey);
    const route = getRoute(currentKey);
    currentKey = route?.parent;
  }

  for (const key of chain) {
    const route = getRoute(key);
    if (!route) continue;
    crumbs.push({
      name: route.label[locale],
      url: `${SITE_URL}/${locale}${route.path[locale]}`,
    });
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
}

// ── 6. FAQPage ──────────────────────────────────────────────────────────────

export function faqPageSchema(routeKey: string, locale: Locale) {
  const faqs = faqData[routeKey]?.[locale];
  if (!faqs || faqs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

// ── Combined schema for a page ──────────────────────────────────────────────

/**
 * Returns an array of all applicable JSON-LD schemas for a given page.
 * Usage:
 *   const schemas = getPageSchemas('desarrollo', 'es');
 *   schemas.forEach(s => <JsonLd data={s} />);
 */
export function getPageSchemas(routeKey: string, locale: Locale): Record<string, unknown>[] {
  const schemas: Record<string, unknown>[] = [];

  // Global schemas (only on homepage)
  if (routeKey === 'home') {
    schemas.push(organizationSchema());
    schemas.push(localBusinessSchema());
    schemas.push(webSiteSchema());
  }

  // Breadcrumbs (all pages except homepage)
  if (routeKey !== 'home') {
    schemas.push(breadcrumbSchema(routeKey, locale));
  }

  // Service schema (verticals + subpages)
  const svc = getServiceSchema(routeKey, locale);
  if (svc) schemas.push(svc);

  // FAQ schema (subpages only)
  const faq = faqPageSchema(routeKey, locale);
  if (faq) schemas.push(faq);

  return schemas;
}
