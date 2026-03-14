// ============================================================================
// T&T — FAQPage Content (subpages x 3 FAQs x 2 locales)
// ============================================================================

import type { Locale } from './routes';

export interface FaqItem {
  question: string;
  answer: string;
}

type FaqMap = Record<string, Record<Locale, FaqItem[]>>;

export const faqData: FaqMap = {

  // ============================================================================
  // t&think
  // ============================================================================

  creatividad: {
    es: [
      {
        question: '¿Que incluye el servicio de creatividad y direccion de arte?',
        answer: 'Desde conceptualizacion de campanas y diseno grafico hasta identidad visual completa, packaging y produccion audiovisual. Cada proyecto se aborda desde la estrategia de marca.',
      },
      {
        question: '¿Trabajais con marcas de cualquier sector?',
        answer: 'Si. Hemos desarrollado creatividad para gran consumo, banca, educacion, lujo y tecnologia. El proceso se adapta al sector y la audiencia.',
      },
      {
        question: '¿Cuanto tarda un proyecto de identidad visual?',
        answer: 'Depende del alcance. Una identidad visual completa suele desarrollarse en 6-10 semanas, incluyendo investigacion, propuestas y aplicaciones.',
      },
    ],
    en: [
      {
        question: 'What does the creativity and art direction service include?',
        answer: 'From campaign conceptualisation and graphic design to complete visual identity, packaging and audiovisual production. Every project is approached from a brand strategy perspective.',
      },
      {
        question: 'Do you work with brands from any sector?',
        answer: 'Yes. We\'ve developed creative work for FMCG, banking, education, luxury and technology. The process adapts to the sector and audience.',
      },
      {
        question: 'How long does a visual identity project take?',
        answer: 'It depends on scope. A complete visual identity typically takes 6-10 weeks, including research, proposals and applications.',
      },
    ],
  },

  estrategia: {
    es: [
      {
        question: '¿En que consiste un proyecto de estrategia con T&T?',
        answer: 'Analizamos tu posicionamiento, mercado y competencia para definir una hoja de ruta con objetivos, prioridades y acciones concretas.',
      },
      {
        question: '¿Cuanto dura un proceso de consultoria estrategica?',
        answer: 'Un diagnostico estrategico se completa en 4-6 semanas. Proyectos de acompanamiento continuo se estructuran en ciclos trimestrales.',
      },
      {
        question: '¿Trabajais con startups o solo con grandes empresas?',
        answer: 'Ambos. Adaptamos la metodologia al tamano y madurez del negocio. Lo importante es la ambicion del proyecto, no el tamano de la empresa.',
      },
    ],
    en: [
      {
        question: 'What does a strategy project with T&T involve?',
        answer: 'We analyse your positioning, market and competition to define a roadmap with objectives, priorities and concrete actions.',
      },
      {
        question: 'How long does a strategic consulting process last?',
        answer: 'A strategic diagnosis is completed in 4-6 weeks. Ongoing advisory projects are structured in quarterly cycles.',
      },
      {
        question: 'Do you work with startups or only large companies?',
        answer: 'Both. We adapt our methodology to the size and maturity of the business. What matters is the ambition of the project, not the size of the company.',
      },
    ],
  },

  investigacion: {
    es: [
      {
        question: '¿Que metodologias de investigacion utilizais?',
        answer: 'Cuantitativas (encuestas, paneles), cualitativas (focus groups, entrevistas en profundidad) y analisis de datos secundarios. Combinamos segun el objetivo.',
      },
      {
        question: '¿En que sectores teneis experiencia en investigacion?',
        answer: 'Gran consumo, banca, educacion, lujo, tecnologia y servicios profesionales. Nuestro equipo tiene experiencia en investigacion multisectorial.',
      },
      {
        question: '¿Cuanto tarda un estudio de mercado?',
        answer: 'Un estudio estandar se completa en 6-8 semanas. Investigaciones con fieldwork internacional pueden requerir 10-14 semanas.',
      },
    ],
    en: [
      {
        question: 'What research methodologies do you use?',
        answer: 'Quantitative (surveys, panels), qualitative (focus groups, in-depth interviews) and secondary data analysis. We combine methods based on objectives.',
      },
      {
        question: 'Which sectors do you have research experience in?',
        answer: 'FMCG, banking, education, luxury, technology and professional services. Our team has cross-sector research experience.',
      },
      {
        question: 'How long does a market study take?',
        answer: 'A standard study is completed in 6-8 weeks. Research with international fieldwork may require 10-14 weeks.',
      },
    ],
  },

  'data-analitica': {
    es: [
      {
        question: '¿Que herramientas de analitica utilizais?',
        answer: 'Google Analytics 4, Looker Studio, Power BI, BigQuery y herramientas de atribucion avanzada. Seleccionamos segun el ecosistema del cliente.',
      },
      {
        question: '¿Podeis unificar datos de multiples plataformas?',
        answer: 'Si. Creamos data lakes y dashboards que integran datos de web, CRM, paid media, redes sociales y ventas en una sola vista.',
      },
      {
        question: '¿Como transformais datos en decisiones de negocio?',
        answer: 'Traducimos metricas en insights accionables. Cada dashboard incluye recomendaciones claras vinculadas a KPIs de negocio.',
      },
    ],
    en: [
      {
        question: 'What analytics tools do you use?',
        answer: 'Google Analytics 4, Looker Studio, Power BI, BigQuery and advanced attribution tools. We select based on the client\'s ecosystem.',
      },
      {
        question: 'Can you unify data from multiple platforms?',
        answer: 'Yes. We create data lakes and dashboards that integrate web, CRM, paid media, social and sales data into a single view.',
      },
      {
        question: 'How do you turn data into business decisions?',
        answer: 'We translate metrics into actionable insights. Each dashboard includes clear recommendations linked to business KPIs.',
      },
    ],
  },

  // ============================================================================
  // t&tech
  // ============================================================================

  '2laps': {
    es: [
      {
        question: '¿Que es 2laps?',
        answer: '2laps es un producto tecnologico propio de T&T disenado para acelerar procesos de marketing y transformacion digital, combinando automatizacion y datos en tiempo real.',
      },
      {
        question: '¿Para que tipo de empresas esta pensado 2laps?',
        answer: 'Para marcas que necesitan velocidad en la toma de decisiones y optimizacion continua de sus campanas y operaciones de marketing.',
      },
      {
        question: '¿Como se integra 2laps con mi stack actual?',
        answer: '2laps se conecta con las principales plataformas de marketing, CRM y analitica a traves de APIs, adaptandose a la infraestructura existente del cliente.',
      },
    ],
    en: [
      {
        question: 'What is 2laps?',
        answer: '2laps is T&T\'s proprietary technology product designed to accelerate marketing and digital transformation processes, combining automation and real-time data.',
      },
      {
        question: 'What type of companies is 2laps designed for?',
        answer: 'For brands that need speed in decision-making and continuous optimisation of their marketing campaigns and operations.',
      },
      {
        question: 'How does 2laps integrate with my current stack?',
        answer: '2laps connects with major marketing, CRM and analytics platforms via APIs, adapting to the client\'s existing infrastructure.',
      },
    ],
  },

  '1000er': {
    es: [
      {
        question: '¿Que es 1000er?',
        answer: '1000er es la plataforma tecnologica de T&T disenada para escalar resultados de negocio, con foco en rendimiento, datos y automatizacion inteligente.',
      },
      {
        question: '¿Que diferencia a 1000er de otras herramientas del mercado?',
        answer: '1000er esta construido desde la vision de negocio, no desde la tecnologia. Cada funcionalidad responde a un reto real de marketing y transformacion.',
      },
      {
        question: '¿Cuanto tiempo lleva implementar 1000er?',
        answer: 'La implementacion base se completa en 4-6 semanas. Configuraciones avanzadas con integraciones a medida pueden extenderse a 8-12 semanas.',
      },
    ],
    en: [
      {
        question: 'What is 1000er?',
        answer: '1000er is T&T\'s proprietary technology platform designed to scale business results, focused on performance, data and intelligent automation.',
      },
      {
        question: 'What makes 1000er different from other tools on the market?',
        answer: '1000er is built from a business perspective, not a technology one. Every feature responds to a real marketing and transformation challenge.',
      },
      {
        question: 'How long does it take to implement 1000er?',
        answer: 'The base implementation is completed in 4-6 weeks. Advanced configurations with custom integrations may extend to 8-12 weeks.',
      },
    ],
  },

  // ============================================================================
  // t&tailor
  // ============================================================================

  tailor: {
    es: [
      {
        question: '¿Que tipo de producciones realiza t&tailor?',
        answer: 'Producciones a medida para marcas que necesitan soluciones unicas: desde contenido audiovisual y grafico hasta piezas fisicas y experiencias de marca personalizadas.',
      },
      {
        question: '¿Cual es el proceso de trabajo de t&tailor?',
        answer: 'Partimos de un brief detallado, desarrollamos propuestas creativas y ejecutamos la produccion con control de calidad en cada fase. Cada proyecto es unico.',
      },
      {
        question: '¿Para que sectores trabaja t&tailor?',
        answer: 'Lujo, gran consumo, banca, educacion y tecnologia. La produccion a medida se adapta al posicionamiento y las necesidades especificas de cada marca.',
      },
    ],
    en: [
      {
        question: 'What type of productions does t&tailor handle?',
        answer: 'Bespoke productions for brands that need unique solutions: from audiovisual and graphic content to physical pieces and personalised brand experiences.',
      },
      {
        question: 'What is t&tailor\'s working process?',
        answer: 'We start from a detailed brief, develop creative proposals and execute the production with quality control at every stage. Every project is unique.',
      },
      {
        question: 'Which sectors does t&tailor work with?',
        answer: 'Luxury, FMCG, banking, education and technology. Bespoke production adapts to the positioning and specific needs of each brand.',
      },
    ],
  },

  // ============================================================================
  // t&trade
  // ============================================================================

  'trade-show': {
    es: [
      {
        question: '¿Disenais y construis el stand completo?',
        answer: 'Si. Desde el diseno conceptual y los renders 3D hasta la construccion, montaje, desmontaje y almacenaje del stand.',
      },
      {
        question: '¿En que ferias teneis experiencia?',
        answer: 'FITUR, MWC, Alimentaria, Fruit Attraction y ferias sectoriales europeas. Nos adaptamos a cualquier recinto y normativa.',
      },
      {
        question: '¿Cuanto tiempo de antelacion necesitais para un stand?',
        answer: 'Recomendamos 8-12 semanas para stands de diseno custom. Stands modulares pueden prepararse en 4-6 semanas.',
      },
    ],
    en: [
      {
        question: 'Do you design and build the complete stand?',
        answer: 'Yes. From conceptual design and 3D renders to construction, assembly, dismantling and storage.',
      },
      {
        question: 'Which trade shows do you have experience with?',
        answer: 'FITUR, MWC, Alimentaria, Fruit Attraction and European sector fairs. We adapt to any venue and regulations.',
      },
      {
        question: 'How much lead time do you need for a stand?',
        answer: 'We recommend 8-12 weeks for custom design stands. Modular stands can be prepared in 4-6 weeks.',
      },
    ],
  },

  'trade-marketing': {
    es: [
      {
        question: '¿Que tipo de activaciones en punto de venta realizais?',
        answer: 'Desde displays y PLV hasta promotoras, degustaciones, pop-ups y experiencias inmersivas en retail.',
      },
      {
        question: '¿Trabajais con la distribucion organizada?',
        answer: 'Si. Tenemos experiencia en gran distribucion, retail especializado y canal horeca. Adaptamos cada accion al canal.',
      },
      {
        question: '¿Como medis el ROI de las acciones de trade marketing?',
        answer: 'Medimos sell-out, rotacion, cobertura de implantacion y lift de ventas durante y despues de cada campana.',
      },
    ],
    en: [
      {
        question: 'What type of point-of-sale activations do you carry out?',
        answer: 'From displays and POS materials to promoters, tastings, pop-ups and immersive retail experiences.',
      },
      {
        question: 'Do you work with organised distribution?',
        answer: 'Yes. We have experience in large-scale distribution, specialist retail and horeca channels. We adapt each action to the channel.',
      },
      {
        question: 'How do you measure trade marketing ROI?',
        answer: 'We measure sell-out, rotation, implementation coverage and sales lift during and after each campaign.',
      },
    ],
  },

  // ============================================================================
  // t&talk
  // ============================================================================

  talk: {
    es: [
      {
        question: '¿Que servicios de comunicacion ofrece t&talk?',
        answer: 'Relaciones publicas, comunicacion corporativa, gestion de crisis, media relations y estrategia de reputacion. Cubrimos todo el espectro de comunicacion de marca.',
      },
      {
        question: '¿Gestionais relaciones con medios internacionales?',
        answer: 'Si. Trabajamos con medios nacionales e internacionales, prensa generalista y especializada, medios digitales y podcasts.',
      },
      {
        question: '¿Como medis el impacto de las acciones de comunicacion?',
        answer: 'Con metricas de alcance, share of voice, analisis de sentimiento, cobertura en medios clave y su impacto en objetivos de negocio.',
      },
    ],
    en: [
      {
        question: 'What communications services does t&talk offer?',
        answer: 'Public relations, corporate communications, crisis management, media relations and reputation strategy. We cover the full spectrum of brand communications.',
      },
      {
        question: 'Do you manage relationships with international media?',
        answer: 'Yes. We work with national and international media, generalist and specialist press, digital media and podcasts.',
      },
      {
        question: 'How do you measure the impact of communications activities?',
        answer: 'Through reach metrics, share of voice, sentiment analysis, coverage in key media and its impact on business objectives.',
      },
    ],
  },

  // ============================================================================
  // t&team
  // ============================================================================

  captacion: {
    es: [
      {
        question: '¿En que perfiles estais especializados?',
        answer: 'Marketing digital, comunicacion, creatividad, data, tecnologia y perfiles directivos del sector. Reclutamos desde analistas hasta C-level.',
      },
      {
        question: '¿Cuanto tarda un proceso de seleccion?',
        answer: 'Un proceso estandar se completa en 3-5 semanas. Posiciones directivas o muy especializadas pueden requerir 6-10 semanas.',
      },
      {
        question: '¿Ofreceis garantia de reemplazo?',
        answer: 'Si. Incluimos un periodo de garantia en todos nuestros procesos de seleccion. Si el candidato no funciona, reactivamos la busqueda sin coste adicional.',
      },
    ],
    en: [
      {
        question: 'What profiles do you specialise in?',
        answer: 'Digital marketing, communications, creativity, data, technology and senior sector profiles. We recruit from analysts to C-level.',
      },
      {
        question: 'How long does a recruitment process take?',
        answer: 'A standard process is completed in 3-5 weeks. Senior or highly specialised positions may require 6-10 weeks.',
      },
      {
        question: 'Do you offer a replacement guarantee?',
        answer: 'Yes. We include a guarantee period in all our recruitment processes. If the candidate doesn\'t work out, we restart the search at no additional cost.',
      },
    ],
  },

  formacion: {
    es: [
      {
        question: '¿Que formatos de formacion ofreceis?',
        answer: 'Workshops presenciales, formacion online en directo, programas hibridos y cursos bajo demanda. Adaptamos el formato a la disponibilidad del equipo.',
      },
      {
        question: '¿Personalizais los contenidos para cada empresa?',
        answer: 'Si. Cada programa se disena a partir de un diagnostico previo de necesidades, nivel del equipo y objetivos de negocio.',
      },
      {
        question: '¿Que areas de formacion cubris?',
        answer: 'Marketing digital, inteligencia artificial aplicada, liderazgo, comunicacion corporativa, analitica de datos y herramientas digitales.',
      },
    ],
    en: [
      {
        question: 'What training formats do you offer?',
        answer: 'In-person workshops, live online training, hybrid programmes and on-demand courses. We adapt the format to the team\'s availability.',
      },
      {
        question: 'Do you customise content for each company?',
        answer: 'Yes. Each programme is designed from a prior assessment of needs, team level and business objectives.',
      },
      {
        question: 'What training areas do you cover?',
        answer: 'Digital marketing, applied artificial intelligence, leadership, corporate communications, data analytics and digital tools.',
      },
    ],
  },

  teambuilding: {
    es: [
      {
        question: '¿Que tipo de actividades de team building ofreceis?',
        answer: 'Workshops creativos, dinamicas de resolucion de problemas, actividades outdoor, experiencias gastronomicas y gamificacion corporativa.',
      },
      {
        question: '¿Para cuantas personas podeis organizar actividades?',
        answer: 'Desde equipos de 5 personas hasta eventos corporativos de mas de 500. Adaptamos la dinamica al tamano del grupo.',
      },
      {
        question: '¿Las actividades se pueden integrar en un evento corporativo?',
        answer: 'Si. Disenamos dinamicas de team building que se integran en convenciones, jornadas de empresa o retiros corporativos.',
      },
    ],
    en: [
      {
        question: 'What types of team building activities do you offer?',
        answer: 'Creative workshops, problem-solving dynamics, outdoor activities, gastronomic experiences and corporate gamification.',
      },
      {
        question: 'How many people can you organise activities for?',
        answer: 'From teams of 5 to corporate events of over 500. We adapt the dynamics to the group size.',
      },
      {
        question: 'Can activities be integrated into a corporate event?',
        answer: 'Yes. We design team building dynamics that integrate into conventions, company days or corporate retreats.',
      },
    ],
  },
};
