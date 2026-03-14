// ============================================================================
// T&T — Meta Tags: 44 paginas (22 ES + 22 EN)
// Regla: "agencia" SOLO en meta description ES. Nunca en titulos ni en EN.
// ============================================================================

import type { Locale } from './routes';

export interface PageMeta {
  title: string;
  description: string;
  ogTitle: string;
}

type MetadataMap = Record<string, Record<Locale, PageMeta>>;

export const metadata: MetadataMap = {
  // ============================================================================
  // HOMEPAGE
  // ============================================================================
  home: {
    es: {
      title: 'T&T | Marketing, Comunicacion y Transformacion — Hacemos marcas extraordinarias',
      description: 'T&T es una empresa de marketing, comunicacion y transformacion. Creatividad, tecnologia, estrategia, talento y produccion para marcas que quieren ser extraordinarias. Agencia de marketing en Madrid.',
      ogTitle: 'T&T | Hacemos marcas extraordinarias',
    },
    en: {
      title: 'T&T | Marketing, Communications & Transformation — We make brands extraordinary',
      description: 'T&T is a marketing, communications and transformation company. Creativity, technology, strategy, talent and production for brands that want to be extraordinary.',
      ogTitle: 'T&T | We make brands extraordinary',
    },
  },

  // ============================================================================
  // t&think
  // ============================================================================
  think: {
    es: {
      title: 't&think | Pensamiento Estrategico y Creativo — T&T',
      description: 'Creatividad, estrategia, investigacion de mercados y data analitica. t&think es la linea de negocio de pensamiento estrategico y creativo de T&T. Agencia de estrategia y creatividad en Madrid.',
      ogTitle: 't&think | Pensamiento Estrategico y Creativo — T&T',
    },
    en: {
      title: 't&think | Strategic & Creative Thinking — T&T',
      description: 'Creativity, strategy, market research and data analytics. t&think is T&T\'s strategic and creative thinking business line.',
      ogTitle: 't&think | Strategic & Creative Thinking — T&T',
    },
  },
  creatividad: {
    es: {
      title: 'Creatividad y Direccion de Arte — t&think | T&T',
      description: 'Direccion de arte, diseno grafico, identidad visual y creatividad publicitaria. Campanas que conectan marca y audiencia. Agencia creativa en Madrid.',
      ogTitle: 'Creatividad y Direccion de Arte — T&T',
    },
    en: {
      title: 'Creativity & Art Direction — t&think | T&T',
      description: 'Art direction, graphic design, visual identity and advertising creativity. Campaigns that connect brands with their audience.',
      ogTitle: 'Creativity & Art Direction — T&T',
    },
  },
  estrategia: {
    es: {
      title: 'Estrategia — t&think | T&T',
      description: 'Consultoria de marca, estrategia de negocio, posicionamiento y go-to-market. Decisiones basadas en datos e inteligencia de mercado. Agencia de consultoria estrategica en Madrid.',
      ogTitle: 'Estrategia — T&T',
    },
    en: {
      title: 'Strategy — t&think | T&T',
      description: 'Brand consulting, business strategy, positioning and go-to-market. Decisions grounded in data and market intelligence.',
      ogTitle: 'Strategy — T&T',
    },
  },
  investigacion: {
    es: {
      title: 'Investigacion de Mercados — t&think | T&T',
      description: 'Estudios de mercado, analisis de competencia, investigacion de consumidor y benchmarking sectorial. Informacion que reduce riesgos. Agencia de investigacion de mercados en Madrid.',
      ogTitle: 'Investigacion de Mercados — T&T',
    },
    en: {
      title: 'Market Research — t&think | T&T',
      description: 'Market studies, competitive analysis, consumer research and sector benchmarking. Intelligence that reduces risk.',
      ogTitle: 'Market Research — T&T',
    },
  },
  'data-analitica': {
    es: {
      title: 'Data y Analitica — t&think | T&T',
      description: 'Analitica web, business intelligence, dashboards y modelos de atribucion. Datos que se convierten en decisiones de negocio. Agencia de data analytics en Madrid.',
      ogTitle: 'Data y Analitica — T&T',
    },
    en: {
      title: 'Data & Analytics — t&think | T&T',
      description: 'Web analytics, business intelligence, dashboards and attribution models. Data that drives business decisions.',
      ogTitle: 'Data & Analytics — T&T',
    },
  },

  // ============================================================================
  // t&tech
  // ============================================================================
  tech: {
    es: {
      title: 't&tech | Tecnologia Propia — T&T',
      description: 'Productos tecnologicos propios para marketing y transformacion. 2laps y 1000er: tecnologia desarrollada por T&T para resolver retos reales de negocio. Agencia de tecnologia en Madrid.',
      ogTitle: 't&tech | Tecnologia Propia — T&T',
    },
    en: {
      title: 't&tech | Proprietary Technology — T&T',
      description: 'Proprietary technology products for marketing and transformation. 2laps and 1000er: technology built by T&T to solve real business challenges.',
      ogTitle: 't&tech | Proprietary Technology — T&T',
    },
  },
  '2laps': {
    es: {
      title: '2laps — t&tech | T&T',
      description: '2laps es el producto tecnologico de T&T que acelera procesos de marketing y transformacion digital. Tecnologia propia con vision de negocio. Agencia de tecnologia en Madrid.',
      ogTitle: '2laps — T&T',
    },
    en: {
      title: '2laps — t&tech | T&T',
      description: '2laps is T&T\'s proprietary technology product that accelerates marketing and digital transformation processes. Purpose-built technology with a business vision.',
      ogTitle: '2laps — T&T',
    },
  },
  '1000er': {
    es: {
      title: '1000er — t&tech | T&T',
      description: '1000er es la plataforma tecnologica de T&T disenada para escalar resultados de negocio. Tecnologia propia al servicio de la transformacion. Agencia de tecnologia en Madrid.',
      ogTitle: '1000er — T&T',
    },
    en: {
      title: '1000er — t&tech | T&T',
      description: '1000er is T&T\'s proprietary technology platform designed to scale business results. Purpose-built technology at the service of transformation.',
      ogTitle: '1000er — T&T',
    },
  },

  // ============================================================================
  // t&tailor
  // ============================================================================
  tailor: {
    es: {
      title: 't&tailor | Produccion a Medida — T&T',
      description: 'Produccion a medida para marcas que necesitan soluciones unicas. t&tailor es la linea de negocio de produccion personalizada de T&T. Agencia de produccion en Madrid.',
      ogTitle: 't&tailor | Produccion a Medida — T&T',
    },
    en: {
      title: 't&tailor | Bespoke Production — T&T',
      description: 'Bespoke production for brands that need unique solutions. t&tailor is T&T\'s custom production business line.',
      ogTitle: 't&tailor | Bespoke Production — T&T',
    },
  },

  // ============================================================================
  // t&trade
  // ============================================================================
  trade: {
    es: {
      title: 't&trade | Trade Show y Trade Marketing — T&T',
      description: 'Ferias comerciales, stands, activaciones en punto de venta y trade marketing. t&trade es la linea de negocio de presencia comercial y ferial de T&T. Agencia de trade marketing en Madrid.',
      ogTitle: 't&trade | Trade Show y Trade Marketing — T&T',
    },
    en: {
      title: 't&trade | Trade Show & Trade Marketing — T&T',
      description: 'Trade shows, stands, point-of-sale activations and trade marketing. t&trade is T&T\'s commercial presence and trade business line.',
      ogTitle: 't&trade | Trade Show & Trade Marketing — T&T',
    },
  },
  'trade-show': {
    es: {
      title: 'Trade Show — t&trade | T&T',
      description: 'Diseno y produccion de stands, presencia en ferias comerciales, activaciones in situ y branding ferial. Produccion de stands con impacto real. Agencia de stands y ferias en Madrid.',
      ogTitle: 'Trade Show — T&T',
    },
    en: {
      title: 'Trade Show — t&trade | T&T',
      description: 'Stand design and production, trade show presence, on-site activations and exhibition branding. Stand production with real impact.',
      ogTitle: 'Trade Show — T&T',
    },
  },
  'trade-marketing': {
    es: {
      title: 'Trade Marketing — t&trade | T&T',
      description: 'Estrategias de trade marketing, activaciones en punto de venta, promociones y merchandising. Conectamos tu marca con el consumidor final. Agencia de trade marketing en Madrid.',
      ogTitle: 'Trade Marketing — T&T',
    },
    en: {
      title: 'Trade Marketing — t&trade | T&T',
      description: 'Trade marketing strategies, point-of-sale activations, promotions and merchandising. We connect your brand with the end consumer.',
      ogTitle: 'Trade Marketing — T&T',
    },
  },

  // ============================================================================
  // t&talk
  // ============================================================================
  talk: {
    es: {
      title: 't&talk | Comunicacion y Medios — T&T',
      description: 'Relaciones publicas, comunicacion corporativa, media relations y estrategia de reputacion. t&talk es la linea de negocio de comunicacion y medios de T&T. Agencia de comunicacion en Madrid.',
      ogTitle: 't&talk | Comunicacion y Medios — T&T',
    },
    en: {
      title: 't&talk | Communications & Media — T&T',
      description: 'Public relations, corporate communications, media relations and reputation strategy. t&talk is T&T\'s communications and media business line.',
      ogTitle: 't&talk | Communications & Media — T&T',
    },
  },

  // ============================================================================
  // t&team
  // ============================================================================
  team: {
    es: {
      title: 't&team | Talento, Formacion y Team Building — T&T',
      description: 'Captacion de talento, formacion corporativa y team building. t&team es la linea de negocio de personas y cultura de T&T. Consultoria de talento en Madrid.',
      ogTitle: 't&team | Talento y Formacion — T&T',
    },
    en: {
      title: 't&team | Talent, Training & Team Building — T&T',
      description: 'Talent acquisition, corporate training and team building. t&team is T&T\'s people and culture business line.',
      ogTitle: 't&team | Talent & Training — T&T',
    },
  },
  captacion: {
    es: {
      title: 'Captacion de Talento — t&team | T&T',
      description: 'Reclutamiento especializado, employer branding, headhunting y seleccion de perfiles de marketing, comunicacion y digital. Agencia de captacion de talento en Madrid.',
      ogTitle: 'Captacion de Talento — T&T',
    },
    en: {
      title: 'Talent Acquisition — t&team | T&T',
      description: 'Specialised recruitment, employer branding, headhunting and selection of marketing, communications and digital profiles.',
      ogTitle: 'Talent Acquisition — T&T',
    },
  },
  formacion: {
    es: {
      title: 'Formacion Corporativa — t&team | T&T',
      description: 'Programas de formacion in-company en marketing digital, IA, liderazgo y comunicacion. Formacion que se aplica al dia siguiente. Agencia de formacion corporativa en Madrid.',
      ogTitle: 'Formacion Corporativa — T&T',
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
      description: 'Experiencias de team building, workshops creativos, dinamicas de equipo y actividades de integracion corporativa. Equipos mas fuertes, empresas mas competitivas. Agencia de team building en Madrid.',
      ogTitle: 'Team Building — T&T',
    },
    en: {
      title: 'Team Building — t&team | T&T',
      description: 'Team building experiences, creative workshops, team dynamics and corporate integration activities. Stronger teams, more competitive companies.',
      ogTitle: 'Team Building — T&T',
    },
  },

  // ============================================================================
  // General pages
  // ============================================================================
  clientes: {
    es: {
      title: 'Clientes — T&T | Marcas que confian en nosotros',
      description: 'Barcelo, Campofrio, KPMG, PlayStation, Sabadell, Dom Perignon y mas. Descubre las marcas que confian en T&T para su marketing, comunicacion y transformacion.',
      ogTitle: 'Clientes — T&T',
    },
    en: {
      title: 'Clients — T&T | Brands that trust us',
      description: 'Barcelo, Campofrio, KPMG, PlayStation, Sabadell, Dom Perignon and more. Discover the brands that trust T&T for their marketing, communications and transformation.',
      ogTitle: 'Clients — T&T',
    },
  },
  empresa: {
    es: {
      title: 'Empresa — T&T | Marketing, Comunicacion y Transformacion',
      description: 'Conoce T&T, antes Truco y Trufa. Una empresa de marketing, comunicacion y transformacion con sede en Madrid. Estrategia, creatividad, tecnologia, talento y produccion.',
      ogTitle: 'Sobre T&T — Marketing y Transformacion',
    },
    en: {
      title: 'About — T&T | Marketing, Communications & Transformation',
      description: 'Meet T&T, formerly Truco y Trufa. A marketing, communications and transformation company headquartered in Madrid. Strategy, creativity, technology, talent and production.',
      ogTitle: 'About T&T — Marketing & Transformation',
    },
  },
  contacto: {
    es: {
      title: 'Contacto — T&T | Hablemos',
      description: 'Contacta con T&T. Hablemos de como hacer tu marca extraordinaria. Oficinas en Madrid. Marketing, comunicacion, tecnologia, talento y produccion.',
      ogTitle: 'Contacto — T&T',
    },
    en: {
      title: 'Contact — T&T | Let\'s talk',
      description: 'Get in touch with T&T. Let\'s talk about making your brand extraordinary. Offices in Madrid. Marketing, communications, technology, talent and production.',
      ogTitle: 'Contact — T&T',
    },
  },
  insights: {
    es: {
      title: 'Insights — T&T | Ideas, tendencias y analisis',
      description: 'Articulos, analisis y tendencias sobre marketing, comunicacion, tecnologia e innovacion. El espacio de pensamiento de T&T con vision estrategica.',
      ogTitle: 'Insights — T&T',
    },
    en: {
      title: 'Insights — T&T | Ideas, trends & analysis',
      description: 'Articles, analysis and trends on marketing, communications, technology and innovation. T&T\'s thought leadership with strategic vision.',
      ogTitle: 'Insights — T&T',
    },
  },
};

// -- Helper -------------------------------------------------------------------

export function getPageMetadata(routeKey: string, locale: Locale): PageMeta | undefined {
  return metadata[routeKey]?.[locale];
}
