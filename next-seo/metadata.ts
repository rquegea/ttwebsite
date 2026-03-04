// ============================================================================
// T&T — Meta Tags: 54 páginas (27 ES + 27 EN)
// Regla: "agencia" SOLO en meta description ES. Nunca en títulos ni en EN.
// ============================================================================

import type { Locale } from './routes';

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
}

type MetadataMap = Record<string, Record<Locale, PageMeta>>;

export const metadata: MetadataMap = {
  // ════════════════════════════════════════════════════════════════════════
  // HOMEPAGE
  // ════════════════════════════════════════════════════════════════════════
  home: {
    es: {
      title: 'T&T | Marketing, Comunicación y Transformación — Hacemos marcas extraordinarias',
      description: 'T&T es una empresa de marketing, comunicación y transformación. Creatividad, tecnología, estrategia, talento y eventos para marcas que quieren ser extraordinarias. Agencia de marketing en Madrid.',
      ogTitle: 'T&T | Hacemos marcas extraordinarias',
    },
    en: {
      title: 'T&T | Marketing, Communications & Transformation — We make brands extraordinary',
      description: 'T&T is a marketing, communications and transformation company. Creativity, technology, strategy, talent and events for brands that want to be extraordinary.',
      ogTitle: 'T&T | We make brands extraordinary',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&think
  // ════════════════════════════════════════════════════════════════════════
  think: {
    es: {
      title: 't&think | Creatividad, PR y Estrategia de Medios — T&T',
      description: 'Creatividad, dirección de arte, PR, comunicación, performance y trade marketing. t&think es la línea de negocio de pensamiento estratégico y creativo de T&T. Agencia creativa en Madrid.',
      ogTitle: 't&think | Creatividad y Estrategia — T&T',
    },
    en: {
      title: 't&think | Creativity, PR & Media Strategy — T&T',
      description: 'Creativity, art direction, PR, communications, performance and trade marketing. t&think is T&T\'s strategic and creative thinking business line.',
      ogTitle: 't&think | Creativity & Strategy — T&T',
    },
  },
  creatividad: {
    es: {
      title: 'Creatividad y Dirección de Arte — t&think | T&T',
      description: 'Dirección de arte, diseño gráfico, identidad visual y creatividad publicitaria. Campañas que conectan marca y audiencia. Agencia creativa en Madrid.',
      ogTitle: 'Creatividad y Dirección de Arte — T&T',
    },
    en: {
      title: 'Creativity & Art Direction — t&think | T&T',
      description: 'Art direction, graphic design, visual identity and advertising creativity. Campaigns that connect brands with their audience.',
      ogTitle: 'Creativity & Art Direction — T&T',
    },
  },
  'pr-comunicacion': {
    es: {
      title: 'PR y Comunicación — t&think | T&T',
      description: 'Relaciones públicas, comunicación corporativa, gestión de crisis, media relations y estrategia de reputación. Agencia de comunicación en Madrid.',
      ogTitle: 'PR y Comunicación — T&T',
    },
    en: {
      title: 'PR & Communications — t&think | T&T',
      description: 'Public relations, corporate communications, crisis management, media relations and reputation strategy.',
      ogTitle: 'PR & Communications — T&T',
    },
  },
  performance: {
    es: {
      title: 'Performance y Medios — t&think | T&T',
      description: 'Campañas de performance, paid media, SEM, social ads y planificación de medios. Resultados medibles para tu inversión publicitaria. Agencia de performance en Madrid.',
      ogTitle: 'Performance y Medios — T&T',
    },
    en: {
      title: 'Performance & Media — t&think | T&T',
      description: 'Performance campaigns, paid media, SEM, social ads and media planning. Measurable results for your advertising investment.',
      ogTitle: 'Performance & Media — T&T',
    },
  },
  'trade-marketing': {
    es: {
      title: 'Trade Marketing — t&think | T&T',
      description: 'Estrategias de trade marketing, activaciones en punto de venta, promociones y merchandising. Conectamos tu marca con el consumidor final. Agencia de trade marketing en Madrid.',
      ogTitle: 'Trade Marketing — T&T',
    },
    en: {
      title: 'Trade Marketing — t&think | T&T',
      description: 'Trade marketing strategies, point-of-sale activations, promotions and merchandising. We connect your brand with the end consumer.',
      ogTitle: 'Trade Marketing — T&T',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&tech
  // ════════════════════════════════════════════════════════════════════════
  tech: {
    es: {
      title: 't&tech | Tecnología y Desarrollo Digital — T&T',
      description: 'Desarrollo web, consultoría IA, implementación CRM y automatización. t&tech es la capa tecnológica de T&T para marcas que necesitan infraestructura digital con visión de negocio. Agencia de desarrollo web en Madrid.',
      ogTitle: 't&tech | Tecnología y Desarrollo Digital — T&T',
    },
    en: {
      title: 't&tech | Technology & Digital Development — T&T',
      description: 'Web development, AI consulting, CRM implementation and automation. t&tech is T&T\'s technology layer for brands that need digital infrastructure with business vision.',
      ogTitle: 't&tech | Technology & Digital Development — T&T',
    },
  },
  desarrollo: {
    es: {
      title: 'Desarrollo Web y App — t&tech | T&T',
      description: 'Desarrollo de webs corporativas, e-commerce, apps nativas y PWA. Plataformas digitales con código limpio y rendimiento real. Agencia de desarrollo web en Madrid.',
      ogTitle: 'Desarrollo Web y App — T&T',
    },
    en: {
      title: 'Web & App Development — t&tech | T&T',
      description: 'Corporate websites, e-commerce, native apps and PWA development. Digital platforms with clean code and real performance.',
      ogTitle: 'Web & App Development — T&T',
    },
  },
  'inteligencia-artificial': {
    es: {
      title: 'Inteligencia Artificial — t&tech | T&T',
      description: 'Integración de IA, chatbots, análisis predictivo, NLP y agentes inteligentes. IA aplicada a negocio, no tecnología por tecnología. Consultoría IA en Madrid.',
      ogTitle: 'Inteligencia Artificial — T&T',
    },
    en: {
      title: 'Artificial Intelligence — t&tech | T&T',
      description: 'AI integration, chatbots, predictive analytics, NLP and intelligent agents. Business-applied AI, not technology for technology\'s sake.',
      ogTitle: 'Artificial Intelligence — T&T',
    },
  },
  crm: {
    es: {
      title: 'Sistemas CRM — t&tech | T&T',
      description: 'Implementación, migración y optimización de HubSpot, Salesforce y Zoho. CRM adaptado a tu operación comercial. Consultoría CRM en Madrid.',
      ogTitle: 'Sistemas CRM — T&T',
    },
    en: {
      title: 'CRM Systems — t&tech | T&T',
      description: 'HubSpot, Salesforce and Zoho implementation, migration and optimisation. CRM adapted to your commercial operations.',
      ogTitle: 'CRM Systems — T&T',
    },
  },
  automatizacion: {
    es: {
      title: 'Automatización — t&tech | T&T',
      description: 'Marketing automation, workflows operativos, Zapier, Make, n8n y automatización de customer journeys. Eliminamos fricción operativa. Agencia de automatización en Madrid.',
      ogTitle: 'Automatización — T&T',
    },
    en: {
      title: 'Automation — t&tech | T&T',
      description: 'Marketing automation, operational workflows, Zapier, Make, n8n and customer journey automation. We eliminate operational friction.',
      ogTitle: 'Automation — T&T',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&trends
  // ════════════════════════════════════════════════════════════════════════
  trends: {
    es: {
      title: 't&trends | Consultoría Estratégica y Data — T&T',
      description: 'Consultoría estratégica, data y analítica, investigación de mercados. t&trends es la línea de negocio de inteligencia estratégica de T&T. Consultoría de marketing en Madrid.',
      ogTitle: 't&trends | Consultoría Estratégica y Data — T&T',
    },
    en: {
      title: 't&trends | Strategic Consulting & Data — T&T',
      description: 'Strategic consulting, data and analytics, market research. t&trends is T&T\'s strategic intelligence business line.',
      ogTitle: 't&trends | Strategic Consulting & Data — T&T',
    },
  },
  consultoria: {
    es: {
      title: 'Consultoría Estratégica — t&trends | T&T',
      description: 'Consultoría de marca, estrategia de negocio, posicionamiento y go-to-market. Decisiones basadas en datos e inteligencia de mercado. Consultoría estratégica en Madrid.',
      ogTitle: 'Consultoría Estratégica — T&T',
    },
    en: {
      title: 'Strategic Consulting — t&trends | T&T',
      description: 'Brand consulting, business strategy, positioning and go-to-market. Decisions grounded in data and market intelligence.',
      ogTitle: 'Strategic Consulting — T&T',
    },
  },
  'data-analitica': {
    es: {
      title: 'Data y Analítica — t&trends | T&T',
      description: 'Analítica web, business intelligence, dashboards y modelos de atribución. Datos que se convierten en decisiones de negocio. Agencia de data analytics en Madrid.',
      ogTitle: 'Data y Analítica — T&T',
    },
    en: {
      title: 'Data & Analytics — t&trends | T&T',
      description: 'Web analytics, business intelligence, dashboards and attribution models. Data that drives business decisions.',
      ogTitle: 'Data & Analytics — T&T',
    },
  },
  investigacion: {
    es: {
      title: 'Investigación de Mercados — t&trends | T&T',
      description: 'Estudios de mercado, análisis de competencia, investigación de consumidor y benchmarking sectorial. Información que reduce riesgos. Agencia de investigación de mercados en Madrid.',
      ogTitle: 'Investigación de Mercados — T&T',
    },
    en: {
      title: 'Market Research — t&trends | T&T',
      description: 'Market studies, competitive analysis, consumer research and sector benchmarking. Intelligence that reduces risk.',
      ogTitle: 'Market Research — T&T',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&team
  // ════════════════════════════════════════════════════════════════════════
  team: {
    es: {
      title: 't&team | Talento, Formación y Team Building — T&T',
      description: 'Captación de talento, formación corporativa y team building. t&team es la línea de negocio de personas y cultura de T&T. Consultoría de talento en Madrid.',
      ogTitle: 't&team | Talento y Formación — T&T',
    },
    en: {
      title: 't&team | Talent, Training & Team Building — T&T',
      description: 'Talent acquisition, corporate training and team building. t&team is T&T\'s people and culture business line.',
      ogTitle: 't&team | Talent & Training — T&T',
    },
  },
  captacion: {
    es: {
      title: 'Captación de Talento — t&team | T&T',
      description: 'Reclutamiento especializado, employer branding, headhunting y selección de perfiles de marketing, comunicación y digital. Agencia de captación de talento en Madrid.',
      ogTitle: 'Captación de Talento — T&T',
    },
    en: {
      title: 'Talent Acquisition — t&team | T&T',
      description: 'Specialised recruitment, employer branding, headhunting and selection of marketing, communications and digital profiles.',
      ogTitle: 'Talent Acquisition — T&T',
    },
  },
  formacion: {
    es: {
      title: 'Formación Corporativa — t&team | T&T',
      description: 'Programas de formación in-company en marketing digital, IA, liderazgo y comunicación. Formación que se aplica al día siguiente. Agencia de formación corporativa en Madrid.',
      ogTitle: 'Formación Corporativa — T&T',
    },
    en: {
      title: 'Corporate Training — t&team | T&T',
      description: 'In-company training programmes in digital marketing, AI, leadership and communications. Training you can apply the next day.',
      ogTitle: 'Corporate Training — T&T',
    },
  },
  teambuilding: {
    es: {
      title: 'Team Building — t&team | T&T',
      description: 'Experiencias de team building, workshops creativos, dinámicas de equipo y actividades de integración corporativa. Equipos más fuertes, empresas más competitivas. Agencia de team building en Madrid.',
      ogTitle: 'Team Building — T&T',
    },
    en: {
      title: 'Team Building — t&team | T&T',
      description: 'Team building experiences, creative workshops, team dynamics and corporate integration activities. Stronger teams, more competitive companies.',
      ogTitle: 'Team Building — T&T',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&events
  // ════════════════════════════════════════════════════════════════════════
  events: {
    es: {
      title: 't&events | Eventos Corporativos y Marketing Experiencial — T&T',
      description: 'Eventos corporativos, stands y ferias, marketing experiencial. t&events es la línea de negocio de eventos y experiencias de marca de T&T. Agencia de eventos en Madrid.',
      ogTitle: 't&events | Eventos y Experiencias — T&T',
    },
    en: {
      title: 't&events | Corporate Events & Experiential Marketing — T&T',
      description: 'Corporate events, stands and exhibitions, experiential marketing. t&events is T&T\'s brand events and experiences business line.',
      ogTitle: 't&events | Events & Experiences — T&T',
    },
  },
  corporativos: {
    es: {
      title: 'Eventos Corporativos — t&events | T&T',
      description: 'Organización de eventos corporativos, convenciones, presentaciones de producto y galas. Producción de eventos de marca con impacto real. Agencia de eventos corporativos en Madrid.',
      ogTitle: 'Eventos Corporativos — T&T',
    },
    en: {
      title: 'Corporate Events — t&events | T&T',
      description: 'Corporate event production, conventions, product launches and galas. Brand events with real impact.',
      ogTitle: 'Corporate Events — T&T',
    },
  },
  stands: {
    es: {
      title: 'Stands y Ferias — t&events | T&T',
      description: 'Diseño y producción de stands, presencia en ferias comerciales, activaciones in situ y branding experiencial. Agencia de stands y ferias en Madrid.',
      ogTitle: 'Stands y Ferias — T&T',
    },
    en: {
      title: 'Stands & Exhibitions — t&events | T&T',
      description: 'Stand design and production, trade show presence, on-site activations and experiential branding.',
      ogTitle: 'Stands & Exhibitions — T&T',
    },
  },
  'marketing-experiencial': {
    es: {
      title: 'Marketing Experiencial — t&events | T&T',
      description: 'Experiencias de marca inmersivas, activaciones, pop-ups, roadshows y eventos de engagement. Marketing que se vive, no solo se ve. Agencia de marketing experiencial en Madrid.',
      ogTitle: 'Marketing Experiencial — T&T',
    },
    en: {
      title: 'Experiential Marketing — t&events | T&T',
      description: 'Immersive brand experiences, activations, pop-ups, roadshows and engagement events. Marketing you experience, not just see.',
      ogTitle: 'Experiential Marketing — T&T',
    },
  },

  // ════════════════════════════════════════════════════════════════════════
  // General pages
  // ════════════════════════════════════════════════════════════════════════
  clientes: {
    es: {
      title: 'Clientes — T&T | Marcas que confían en nosotros',
      description: 'Barceló, Campofrío, KPMG, PlayStation, Sabadell, Dom Pérignon y más. Descubre las marcas que confían en T&T para su marketing, comunicación y transformación.',
      ogTitle: 'Clientes — T&T',
    },
    en: {
      title: 'Clients — T&T | Brands that trust us',
      description: 'Barceló, Campofrío, KPMG, PlayStation, Sabadell, Dom Pérignon and more. Discover the brands that trust T&T for their marketing, communications and transformation.',
      ogTitle: 'Clients — T&T',
    },
  },
  empresa: {
    es: {
      title: 'Empresa — T&T | Marketing, Comunicación y Transformación',
      description: 'Conoce T&T, antes Truco y Trufa. Una empresa de marketing, comunicación y transformación con sede en Madrid. Estrategia, creatividad, tecnología, talento y eventos.',
      ogTitle: 'Sobre T&T — Marketing y Transformación',
    },
    en: {
      title: 'About — T&T | Marketing, Communications & Transformation',
      description: 'Meet T&T, formerly Truco y Trufa. A marketing, communications and transformation company headquartered in Madrid. Strategy, creativity, technology, talent and events.',
      ogTitle: 'About T&T — Marketing & Transformation',
    },
  },
  contacto: {
    es: {
      title: 'Contacto — T&T | Hablemos',
      description: 'Contacta con T&T. Hablemos de cómo hacer tu marca extraordinaria. Oficinas en Madrid. Marketing, comunicación, tecnología, talento y eventos.',
      ogTitle: 'Contacto — T&T',
    },
    en: {
      title: 'Contact — T&T | Let\'s talk',
      description: 'Get in touch with T&T. Let\'s talk about making your brand extraordinary. Offices in Madrid. Marketing, communications, technology, talent and events.',
      ogTitle: 'Contact — T&T',
    },
  },
  insights: {
    es: {
      title: 'Insights — T&T | Ideas, tendencias y análisis',
      description: 'Artículos, análisis y tendencias sobre marketing, comunicación, tecnología e innovación. El espacio de pensamiento de T&T con visión estratégica.',
      ogTitle: 'Insights — T&T',
    },
    en: {
      title: 'Insights — T&T | Ideas, trends & analysis',
      description: 'Articles, analysis and trends on marketing, communications, technology and innovation. T&T\'s thought leadership with strategic vision.',
      ogTitle: 'Insights — T&T',
    },
  },
};

// ── Helper ────────────────────────────────────────────────────────────────

export function getPageMetadata(routeKey: string, locale: Locale): PageMeta | undefined {
  return metadata[routeKey]?.[locale];
}
