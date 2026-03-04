// ============================================================================
// T&T — FAQPage Content (17 subpages × 3 FAQs × 2 locales = 102 FAQ items)
// ============================================================================

import type { Locale } from './routes';

export interface FaqItem {
  question: string;
  answer: string;
}

type FaqMap = Record<string, Record<Locale, FaqItem[]>>;

export const faqData: FaqMap = {

  // ════════════════════════════════════════════════════════════════════════
  // t&think
  // ════════════════════════════════════════════════════════════════════════

  creatividad: {
    es: [
      {
        question: '¿Qué incluye el servicio de creatividad y dirección de arte?',
        answer: 'Desde conceptualización de campañas y diseño gráfico hasta identidad visual completa, packaging y producción audiovisual. Cada proyecto se aborda desde la estrategia de marca.',
      },
      {
        question: '¿Trabajáis con marcas de cualquier sector?',
        answer: 'Sí. Hemos desarrollado creatividad para gran consumo, banca, educación, lujo y tecnología. El proceso se adapta al sector y la audiencia.',
      },
      {
        question: '¿Cuánto tarda un proyecto de identidad visual?',
        answer: 'Depende del alcance. Una identidad visual completa suele desarrollarse en 6-10 semanas, incluyendo investigación, propuestas y aplicaciones.',
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

  'pr-comunicacion': {
    es: [
      {
        question: '¿Qué tipo de medios gestionáis?',
        answer: 'Medios nacionales e internacionales, prensa generalista y especializada, medios digitales y podcasts. Adaptamos la estrategia de medios al objetivo de cada cliente.',
      },
      {
        question: '¿Ofrecéis gestión de crisis?',
        answer: 'Sí. Diseñamos protocolos de crisis, formamos portavoces y gestionamos la comunicación en tiempo real cuando surgen situaciones críticas.',
      },
      {
        question: '¿Cómo medís el impacto de las acciones de PR?',
        answer: 'Con métricas de alcance, share of voice, análisis de sentimiento, cobertura en medios clave y su impacto en objetivos de negocio.',
      },
    ],
    en: [
      {
        question: 'What type of media do you manage?',
        answer: 'National and international media, generalist and specialist press, digital media and podcasts. We adapt the media strategy to each client\'s objectives.',
      },
      {
        question: 'Do you offer crisis management?',
        answer: 'Yes. We design crisis protocols, train spokespeople and manage real-time communications when critical situations arise.',
      },
      {
        question: 'How do you measure PR impact?',
        answer: 'Through reach metrics, share of voice, sentiment analysis, coverage in key media and its impact on business objectives.',
      },
    ],
  },

  performance: {
    es: [
      {
        question: '¿Qué plataformas de paid media gestionáis?',
        answer: 'Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, programática y medios offline. Seleccionamos los canales según el objetivo y la audiencia.',
      },
      {
        question: '¿Cuánto presupuesto mínimo recomendáis para performance?',
        answer: 'Depende del canal y mercado. Definimos el presupuesto óptimo tras analizar competencia, audiencia y objetivos de conversión.',
      },
      {
        question: '¿Reportáis resultados en tiempo real?',
        answer: 'Sí. Configuramos dashboards con datos en tiempo real y enviamos informes periódicos con análisis de rendimiento y recomendaciones de optimización.',
      },
    ],
    en: [
      {
        question: 'Which paid media platforms do you manage?',
        answer: 'Google Ads, Meta Ads, LinkedIn Ads, TikTok Ads, programmatic and offline media. We select channels based on the objective and audience.',
      },
      {
        question: 'What minimum budget do you recommend for performance?',
        answer: 'It depends on the channel and market. We define the optimal budget after analysing competition, audience and conversion goals.',
      },
      {
        question: 'Do you report results in real time?',
        answer: 'Yes. We set up dashboards with real-time data and send periodic reports with performance analysis and optimisation recommendations.',
      },
    ],
  },

  'trade-marketing': {
    es: [
      {
        question: '¿Qué tipo de activaciones en punto de venta realizáis?',
        answer: 'Desde displays y PLV hasta promotoras, degustaciones, pop-ups y experiencias inmersivas en retail.',
      },
      {
        question: '¿Trabajáis con la distribución organizada?',
        answer: 'Sí. Tenemos experiencia en gran distribución, retail especializado y canal horeca. Adaptamos cada acción al canal.',
      },
      {
        question: '¿Cómo medís el ROI de las acciones de trade marketing?',
        answer: 'Medimos sell-out, rotación, cobertura de implantación y lift de ventas durante y después de cada campaña.',
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

  // ════════════════════════════════════════════════════════════════════════
  // t&tech
  // ════════════════════════════════════════════════════════════════════════

  desarrollo: {
    es: [
      {
        question: '¿Qué tecnologías utilizáis para el desarrollo?',
        answer: 'React, Next.js, Vue, Node.js, Python y plataformas como Shopify y WordPress. Elegimos el stack según las necesidades del proyecto.',
      },
      {
        question: '¿Cuánto tarda un proyecto de desarrollo web?',
        answer: 'Un sitio corporativo suele estar listo en 8-12 semanas. E-commerce y aplicaciones complejas pueden requerir 12-20 semanas según el alcance.',
      },
      {
        question: '¿Ofrecéis mantenimiento tras el lanzamiento?',
        answer: 'Sí. Ofrecemos planes de mantenimiento con actualizaciones, monitorización, soporte técnico y mejoras evolutivas.',
      },
    ],
    en: [
      {
        question: 'What technologies do you use for development?',
        answer: 'React, Next.js, Vue, Node.js, Python and platforms like Shopify and WordPress. We choose the stack based on project needs.',
      },
      {
        question: 'How long does a web development project take?',
        answer: 'A corporate site is typically ready in 8-12 weeks. E-commerce and complex applications may require 12-20 weeks depending on scope.',
      },
      {
        question: 'Do you offer post-launch maintenance?',
        answer: 'Yes. We offer maintenance plans including updates, monitoring, technical support and iterative improvements.',
      },
    ],
  },

  'inteligencia-artificial': {
    es: [
      {
        question: '¿Necesito un equipo técnico interno para implementar IA?',
        answer: 'No. Nos integramos con tu equipo existente y gestionamos todo el proceso, desde la definición del caso de uso hasta el despliegue.',
      },
      {
        question: '¿Qué resultados puedo esperar de un proyecto de IA?',
        answer: 'Depende del caso de uso. Nuestros proyectos han logrado reducir tiempos de respuesta un 60%, automatizar el 40% de consultas y mejorar la precisión de predicciones comerciales.',
      },
      {
        question: '¿Podéis integrar IA con nuestro CRM actual?',
        answer: 'Sí. Trabajamos con APIs de HubSpot, Salesforce y Zoho para crear flujos inteligentes que conectan IA con tu operación comercial.',
      },
    ],
    en: [
      {
        question: 'Do I need an internal technical team to implement AI?',
        answer: 'No. We integrate with your existing team and manage the entire process, from use case definition to deployment.',
      },
      {
        question: 'What results can I expect from an AI project?',
        answer: 'It depends on the use case. Our projects have achieved 60% response time reduction, 40% query automation and improved accuracy in commercial predictions.',
      },
      {
        question: 'Can you integrate AI with our current CRM?',
        answer: 'Yes. We work with HubSpot, Salesforce and Zoho APIs to create intelligent flows that connect AI with your commercial operations.',
      },
    ],
  },

  crm: {
    es: [
      {
        question: '¿Qué CRM es mejor para mi empresa?',
        answer: 'Depende de tu tamaño, sector y operación comercial. Analizamos tus necesidades y recomendamos entre HubSpot, Salesforce, Zoho o desarrollo a medida.',
      },
      {
        question: '¿Cuánto tiempo lleva implementar un CRM?',
        answer: 'Una implementación estándar toma 4-8 semanas. Proyectos con migración de datos y personalizaciones complejas pueden extenderse a 12-16 semanas.',
      },
      {
        question: '¿Podéis migrar datos de nuestro CRM actual?',
        answer: 'Sí. Gestionamos migraciones completas con mapeo de campos, limpieza de datos y validación para asegurar cero pérdida de información.',
      },
    ],
    en: [
      {
        question: 'Which CRM is best for my company?',
        answer: 'It depends on your size, sector and commercial operation. We analyse your needs and recommend between HubSpot, Salesforce, Zoho or custom development.',
      },
      {
        question: 'How long does CRM implementation take?',
        answer: 'A standard implementation takes 4-8 weeks. Projects with data migration and complex customisations may extend to 12-16 weeks.',
      },
      {
        question: 'Can you migrate data from our current CRM?',
        answer: 'Yes. We manage complete migrations with field mapping, data cleansing and validation to ensure zero information loss.',
      },
    ],
  },

  automatizacion: {
    es: [
      {
        question: '¿Qué herramientas de automatización utilizáis?',
        answer: 'HubSpot, Zapier, Make (Integromat), n8n, ActiveCampaign y desarrollos custom. Elegimos la herramienta según complejidad y presupuesto.',
      },
      {
        question: '¿La automatización puede sustituir a mi equipo?',
        answer: 'No. La automatización elimina tareas repetitivas para que tu equipo se enfoque en trabajo estratégico. Es un multiplicador de productividad, no un sustituto.',
      },
      {
        question: '¿Cuánto tarda en verse resultados?',
        answer: 'Los primeros flujos automatizados pueden estar operativos en 2-4 semanas. El impacto en eficiencia suele ser visible desde el primer mes.',
      },
    ],
    en: [
      {
        question: 'What automation tools do you use?',
        answer: 'HubSpot, Zapier, Make (Integromat), n8n, ActiveCampaign and custom builds. We choose the tool based on complexity and budget.',
      },
      {
        question: 'Can automation replace my team?',
        answer: 'No. Automation eliminates repetitive tasks so your team can focus on strategic work. It\'s a productivity multiplier, not a replacement.',
      },
      {
        question: 'How long before seeing results?',
        answer: 'The first automated flows can be operational in 2-4 weeks. The efficiency impact is typically visible from the first month.',
      },
    ],
  },

  // ════════════════════════════════════════════════════════════════════════
  // t&trends
  // ════════════════════════════════════════════════════════════════════════

  consultoria: {
    es: [
      {
        question: '¿En qué consiste un proyecto de consultoría estratégica?',
        answer: 'Analizamos tu posicionamiento, mercado y competencia para definir una hoja de ruta con objetivos, prioridades y acciones concretas.',
      },
      {
        question: '¿Cuánto dura un proceso de consultoría?',
        answer: 'Un diagnóstico estratégico se completa en 4-6 semanas. Proyectos de acompañamiento continuo se estructuran en ciclos trimestrales.',
      },
      {
        question: '¿Trabajáis con startups o solo con grandes empresas?',
        answer: 'Ambos. Adaptamos la metodología al tamaño y madurez del negocio. Lo importante es la ambición del proyecto, no el tamaño de la empresa.',
      },
    ],
    en: [
      {
        question: 'What does a strategic consulting project involve?',
        answer: 'We analyse your positioning, market and competition to define a roadmap with objectives, priorities and concrete actions.',
      },
      {
        question: 'How long does a consulting process last?',
        answer: 'A strategic diagnosis is completed in 4-6 weeks. Ongoing advisory projects are structured in quarterly cycles.',
      },
      {
        question: 'Do you work with startups or only large companies?',
        answer: 'Both. We adapt our methodology to the size and maturity of the business. What matters is the ambition of the project, not the size of the company.',
      },
    ],
  },

  'data-analitica': {
    es: [
      {
        question: '¿Qué herramientas de analítica utilizáis?',
        answer: 'Google Analytics 4, Looker Studio, Power BI, BigQuery y herramientas de atribución avanzada. Seleccionamos según el ecosistema del cliente.',
      },
      {
        question: '¿Podéis unificar datos de múltiples plataformas?',
        answer: 'Sí. Creamos data lakes y dashboards que integran datos de web, CRM, paid media, redes sociales y ventas en una sola vista.',
      },
      {
        question: '¿Cómo transformáis datos en decisiones de negocio?',
        answer: 'Traducimos métricas en insights accionables. Cada dashboard incluye recomendaciones claras vinculadas a KPIs de negocio.',
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

  investigacion: {
    es: [
      {
        question: '¿Qué metodologías de investigación utilizáis?',
        answer: 'Cuantitativas (encuestas, paneles), cualitativas (focus groups, entrevistas en profundidad) y análisis de datos secundarios. Combinamos según el objetivo.',
      },
      {
        question: '¿En qué sectores tenéis experiencia en investigación?',
        answer: 'Gran consumo, banca, educación, lujo, tecnología y servicios profesionales. Nuestro equipo tiene experiencia en investigación multisectorial.',
      },
      {
        question: '¿Cuánto tarda un estudio de mercado?',
        answer: 'Un estudio estándar se completa en 6-8 semanas. Investigaciones con fieldwork internacional pueden requerir 10-14 semanas.',
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

  // ════════════════════════════════════════════════════════════════════════
  // t&team
  // ════════════════════════════════════════════════════════════════════════

  captacion: {
    es: [
      {
        question: '¿En qué perfiles estáis especializados?',
        answer: 'Marketing digital, comunicación, creatividad, data, tecnología y perfiles directivos del sector. Reclutamos desde analistas hasta C-level.',
      },
      {
        question: '¿Cuánto tarda un proceso de selección?',
        answer: 'Un proceso estándar se completa en 3-5 semanas. Posiciones directivas o muy especializadas pueden requerir 6-10 semanas.',
      },
      {
        question: '¿Ofrecéis garantía de reemplazo?',
        answer: 'Sí. Incluimos un periodo de garantía en todos nuestros procesos de selección. Si el candidato no funciona, reactivamos la búsqueda sin coste adicional.',
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
        question: '¿Qué formatos de formación ofrecéis?',
        answer: 'Workshops presenciales, formación online en directo, programas híbridos y cursos bajo demanda. Adaptamos el formato a la disponibilidad del equipo.',
      },
      {
        question: '¿Personalizáis los contenidos para cada empresa?',
        answer: 'Sí. Cada programa se diseña a partir de un diagnóstico previo de necesidades, nivel del equipo y objetivos de negocio.',
      },
      {
        question: '¿Qué áreas de formación cubrís?',
        answer: 'Marketing digital, inteligencia artificial aplicada, liderazgo, comunicación corporativa, analítica de datos y herramientas digitales.',
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
        question: '¿Qué tipo de actividades de team building ofrecéis?',
        answer: 'Workshops creativos, dinámicas de resolución de problemas, actividades outdoor, experiencias gastronómicas y gamificación corporativa.',
      },
      {
        question: '¿Para cuántas personas podéis organizar actividades?',
        answer: 'Desde equipos de 5 personas hasta eventos corporativos de más de 500. Adaptamos la dinámica al tamaño del grupo.',
      },
      {
        question: '¿Las actividades se pueden integrar en un evento corporativo?',
        answer: 'Sí. Diseñamos dinámicas de team building que se integran en convenciones, jornadas de empresa o retiros corporativos.',
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

  // ════════════════════════════════════════════════════════════════════════
  // t&events
  // ════════════════════════════════════════════════════════════════════════

  corporativos: {
    es: [
      {
        question: '¿Qué tipo de eventos corporativos organizáis?',
        answer: 'Convenciones, presentaciones de producto, galas, jornadas de empresa, inauguraciones y eventos de networking.',
      },
      {
        question: '¿Gestionáis toda la producción del evento?',
        answer: 'Sí. Desde el concepto creativo y la logística hasta la producción técnica, catering, audiovisual y gestión de invitados.',
      },
      {
        question: '¿Organizáis eventos fuera de España?',
        answer: 'Sí. Hemos producido eventos en Europa y Latinoamérica. Trabajamos con partners locales para garantizar la ejecución en cualquier mercado.',
      },
    ],
    en: [
      {
        question: 'What types of corporate events do you organise?',
        answer: 'Conventions, product launches, galas, company days, inaugurations and networking events.',
      },
      {
        question: 'Do you manage the entire event production?',
        answer: 'Yes. From creative concept and logistics to technical production, catering, audiovisual and guest management.',
      },
      {
        question: 'Do you organise events outside Spain?',
        answer: 'Yes. We\'ve produced events across Europe and Latin America. We work with local partners to ensure execution in any market.',
      },
    ],
  },

  stands: {
    es: [
      {
        question: '¿Diseñáis y construís el stand completo?',
        answer: 'Sí. Desde el diseño conceptual y los renders 3D hasta la construcción, montaje, desmontaje y almacenaje del stand.',
      },
      {
        question: '¿En qué ferias tenéis experiencia?',
        answer: 'FITUR, MWC, Alimentaria, Fruit Attraction y ferias sectoriales europeas. Nos adaptamos a cualquier recinto y normativa.',
      },
      {
        question: '¿Cuánto tiempo de antelación necesitáis para un stand?',
        answer: 'Recomendamos 8-12 semanas para stands de diseño custom. Stands modulares pueden prepararse en 4-6 semanas.',
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

  'marketing-experiencial': {
    es: [
      {
        question: '¿Qué es exactamente el marketing experiencial?',
        answer: 'Acciones que crean experiencias memorables entre marca y consumidor. Pop-ups, roadshows, activaciones inmersivas y eventos de engagement que generan conexión emocional.',
      },
      {
        question: '¿Cómo medís el impacto de una activación experiencial?',
        answer: 'Con métricas de asistencia, engagement, cobertura mediática, UGC generado, leads captados y su impacto posterior en ventas y notoriedad.',
      },
      {
        question: '¿Podéis ejecutar activaciones en múltiples ciudades?',
        answer: 'Sí. Diseñamos activaciones escalables y gestionamos roadshows multiciudad con producción local coordinada desde nuestro equipo central.',
      },
    ],
    en: [
      {
        question: 'What exactly is experiential marketing?',
        answer: 'Actions that create memorable experiences between brand and consumer. Pop-ups, roadshows, immersive activations and engagement events that generate emotional connection.',
      },
      {
        question: 'How do you measure the impact of an experiential activation?',
        answer: 'Through attendance metrics, engagement, media coverage, UGC generated, leads captured and subsequent impact on sales and awareness.',
      },
      {
        question: 'Can you execute activations in multiple cities?',
        answer: 'Yes. We design scalable activations and manage multi-city roadshows with local production coordinated from our central team.',
      },
    ],
  },
};
