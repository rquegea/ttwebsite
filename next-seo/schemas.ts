// ============================================================================
// T&T — Schema.org JSON-LD Generators
// Organization, LocalBusiness, WebSite, Service, BreadcrumbList, FAQPage
// ============================================================================

import { SITE_URL, routes, getRoute, type Locale } from './routes';
import { faqData } from './faqs';

// -- 1. Organization (global) -------------------------------------------------

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
    description: 'T&T is a marketing, communications and transformation company. Creativity, technology, strategy, talent and production for extraordinary brands.',
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
      'Market Research',
      'Data Analytics',
      'Artificial Intelligence',
      'Bespoke Production',
      'Trade Show',
      'Trade Marketing',
      'Communications & Media',
      'Talent Acquisition',
      'Corporate Training',
    ],
    numberOfEmployees: {
      '@type': 'QuantitativeValue',
      minValue: 50,
      maxValue: 100,
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Calle y numero]',
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

// -- 2. LocalBusiness (Madrid HQ) ---------------------------------------------

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
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '[Calle y numero]',
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

// -- 3. WebSite with SearchAction ---------------------------------------------

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

// -- 4. Service (one per vertical + subservice) -------------------------------

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
  // -- t&think --
  think: {
    es: { name: 't&think — Pensamiento Estrategico y Creativo', description: 'Linea de negocio de pensamiento estrategico y creativo. Creatividad, estrategia, investigacion de mercados y data analitica.' },
    en: { name: 't&think — Strategic & Creative Thinking', description: 'Strategic and creative thinking business line. Creativity, strategy, market research and data analytics.' },
  },
  creatividad: {
    es: { name: 'Creatividad y Direccion de Arte', description: 'Direccion de arte, diseno grafico, identidad visual y creatividad publicitaria.' },
    en: { name: 'Creativity & Art Direction', description: 'Art direction, graphic design, visual identity and advertising creativity.' },
  },
  estrategia: {
    es: { name: 'Estrategia', description: 'Consultoria de marca, estrategia de negocio, posicionamiento y go-to-market.' },
    en: { name: 'Strategy', description: 'Brand consulting, business strategy, positioning and go-to-market.' },
  },
  investigacion: {
    es: { name: 'Investigacion de Mercados', description: 'Estudios de mercado, analisis de competencia, investigacion de consumidor.' },
    en: { name: 'Market Research', description: 'Market studies, competitive analysis, consumer research.' },
  },
  'data-analitica': {
    es: { name: 'Data y Analitica', description: 'Analitica web, business intelligence, dashboards y modelos de atribucion.' },
    en: { name: 'Data & Analytics', description: 'Web analytics, business intelligence, dashboards and attribution models.' },
  },
  // -- t&tech --
  tech: {
    es: { name: 't&tech — Tecnologia Propia', description: 'Linea de negocio de tecnologia propia. Productos tecnologicos 2laps y 1000er para marketing y transformacion.' },
    en: { name: 't&tech — Proprietary Technology', description: 'Proprietary technology business line. 2laps and 1000er technology products for marketing and transformation.' },
  },
  '2laps': {
    es: { name: '2laps', description: 'Producto tecnologico propio de T&T que acelera procesos de marketing y transformacion digital.' },
    en: { name: '2laps', description: 'T&T\'s proprietary technology product that accelerates marketing and digital transformation processes.' },
  },
  '1000er': {
    es: { name: '1000er', description: 'Plataforma tecnologica de T&T disenada para escalar resultados de negocio.' },
    en: { name: '1000er', description: 'T&T\'s proprietary technology platform designed to scale business results.' },
  },
  // -- t&tailor --
  tailor: {
    es: { name: 't&tailor — Produccion a Medida', description: 'Linea de negocio de produccion personalizada. Soluciones unicas para marcas que exigen calidad y diferenciacion.' },
    en: { name: 't&tailor — Bespoke Production', description: 'Custom production business line. Unique solutions for brands that demand quality and differentiation.' },
  },
  // -- t&trade --
  trade: {
    es: { name: 't&trade — Trade Show y Trade Marketing', description: 'Linea de negocio de presencia comercial y ferial. Stands, ferias y activaciones en punto de venta.' },
    en: { name: 't&trade — Trade Show & Trade Marketing', description: 'Commercial presence and trade business line. Stands, trade shows and point-of-sale activations.' },
  },
  'trade-show': {
    es: { name: 'Trade Show', description: 'Diseno y produccion de stands, presencia en ferias comerciales y activaciones in situ.' },
    en: { name: 'Trade Show', description: 'Stand design and production, trade show presence and on-site activations.' },
  },
  'trade-marketing': {
    es: { name: 'Trade Marketing', description: 'Activaciones en punto de venta, promociones, merchandising y estrategia de canal.' },
    en: { name: 'Trade Marketing', description: 'Point-of-sale activations, promotions, merchandising and channel strategy.' },
  },
  // -- t&talk --
  talk: {
    es: { name: 't&talk — Comunicacion y Medios', description: 'Linea de negocio de comunicacion y medios. Relaciones publicas, comunicacion corporativa y estrategia de reputacion.' },
    en: { name: 't&talk — Communications & Media', description: 'Communications and media business line. Public relations, corporate communications and reputation strategy.' },
  },
  // -- t&team --
  team: {
    es: { name: 't&team — Talento y Formacion', description: 'Linea de negocio de personas y cultura. Captacion, formacion y team building.' },
    en: { name: 't&team — Talent & Training', description: 'People and culture business line. Talent acquisition, training and team building.' },
  },
  captacion: {
    es: { name: 'Captacion de Talento', description: 'Reclutamiento especializado, employer branding y headhunting de perfiles de marketing y digital.' },
    en: { name: 'Talent Acquisition', description: 'Specialised recruitment, employer branding and headhunting of marketing and digital profiles.' },
  },
  formacion: {
    es: { name: 'Formacion Corporativa', description: 'Programas in-company de marketing digital, IA, liderazgo y comunicacion.' },
    en: { name: 'Corporate Training', description: 'In-company programmes in digital marketing, AI, leadership and communications.' },
  },
  teambuilding: {
    es: { name: 'Team Building', description: 'Workshops creativos, dinamicas de equipo y actividades de integracion corporativa.' },
    en: { name: 'Team Building', description: 'Creative workshops, team dynamics and corporate integration activities.' },
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

// -- 5. BreadcrumbList --------------------------------------------------------

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

// -- 6. FAQPage ---------------------------------------------------------------

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

// -- Combined schema for a page -----------------------------------------------

/**
 * Returns an array of all applicable JSON-LD schemas for a given page.
 * Usage:
 *   const schemas = getPageSchemas('2laps', 'es');
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
