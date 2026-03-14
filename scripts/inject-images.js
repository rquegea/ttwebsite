#!/usr/bin/env node
/**
 * Script to inject Unsplash images into empty placeholder divs
 * across all T&T service/vertical pages.
 */

const fs = require('fs');
const path = require('path');

// Image catalogue organized by page path pattern → component type → images
const catalogue = {
  // ===== SPANISH (root-level) =====

  // t&think / Creatividad
  'think/creatividad': {
    showcase: ['https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1613909207039-6b173b755cc1?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1542744094-3a31f272c490?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Diseño gráfico y dirección de arte en pantalla',
      claimCards: ['Paleta de colores y muestras de diseño', 'Dirección de arte y composición visual', 'Tipografía y branding'],
      split: ['Equipo creativo trabajando', 'Moodboard y referencias visuales'],
    },
    altEn: {
      showcase: 'Graphic design and art direction on screen',
      claimCards: ['Color palette and design samples', 'Art direction and visual composition', 'Typography and branding'],
      split: ['Creative team working', 'Moodboard and visual references'],
    },
  },

  // t&think / Estrategia
  'think/estrategia': {
    showcase: ['https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Workshop de estrategia con post-its',
      claimCards: ['Planificación de negocio con laptop', 'Pizarra de estrategia', 'Análisis competitivo'],
      split: ['Equipo en brainstorming', 'Wireframes en pizarra'],
    },
    altEn: {
      showcase: 'Strategy workshop with post-its',
      claimCards: ['Business planning with laptop', 'Strategy whiteboard', 'Competitive analysis'],
      split: ['Team brainstorming', 'Wireframes on whiteboard'],
    },
  },

  // t&think / Investigación
  'think/investigacion': {
    showcase: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Dashboard de datos en pantalla',
      claimCards: ['Gráficos de datos y analytics', 'Pantalla con visualización de datos', 'Focus group e investigación cualitativa'],
      split: ['Datos y analítica', 'Personas tomando notas en investigación'],
    },
    altEn: {
      showcase: 'Data dashboard on screen',
      claimCards: ['Data charts and analytics', 'Screen with data visualization', 'Focus group and qualitative research'],
      split: ['Data and analytics', 'People taking notes during research'],
    },
  },

  // t&think / Data & Analytics
  'think/data-analitica': {
    showcase: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Dashboard analítico',
      claimCards: ['Estadísticas en laptop', 'Pantallas con dashboards', 'Reportes y gráficos'],
      split: ['Visualización de datos moderna', 'Dashboard de analytics'],
    },
    altEn: {
      showcase: 'Analytics dashboard',
      claimCards: ['Statistics on laptop', 'Screens with dashboards', 'Reports and charts'],
      split: ['Modern data visualization', 'Analytics dashboard'],
    },
  },

  // t&tech / 2laps
  'tech/2laps': {
    showcase: ['https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Código en pantalla',
      claimCards: ['Circuito y tecnología macro', 'Interfaz de código', 'Dashboard de datos'],
      split: ['Servidores y data center', 'Equipo tech trabajando'],
    },
    altEn: {
      showcase: 'Code on screen',
      claimCards: ['Circuit and macro technology', 'Code interface', 'Data dashboard'],
      split: ['Servers and data center', 'Tech team working'],
    },
  },

  // t&tech / 1000er
  'tech/1000er': {
    showcase: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Plataforma de datos',
      claimCards: ['Visualización de datos', 'Analytics en laptop', 'Múltiples pantallas con datos'],
      split: ['Código', 'Infraestructura tech'],
    },
    altEn: {
      showcase: 'Data platform',
      claimCards: ['Data visualization', 'Analytics on laptop', 'Multiple screens with data'],
      split: ['Code', 'Tech infrastructure'],
    },
  },

  // t&tailor
  'tailor': {
    showcase: ['https://images.unsplash.com/photo-1586717791821-3f44a563fa4c?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Branding y materiales impresos',
      claimCards: ['Packaging premium', 'PLV y retail display', 'Impresión y producción'],
      split: ['Packaging y cajas', 'Tienda con displays'],
    },
    altEn: {
      showcase: 'Branding and printed materials',
      claimCards: ['Premium packaging', 'POS and retail display', 'Printing and production'],
      split: ['Packaging and boxes', 'Store with displays'],
    },
  },

  // t&trade (vertical landing)
  'trade': {
    showcase: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1591115765373-5f9cf1da45eb?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&fit=crop&auto=format',
    ],
    split: [],
    altEs: {
      showcase: 'Evento corporativo y conferencia',
      claimCards: ['Speaker en evento', 'Networking en evento', 'Presentación en conferencia'],
      split: [],
    },
    altEn: {
      showcase: 'Corporate event and conference',
      claimCards: ['Speaker at event', 'Event networking', 'Conference presentation'],
      split: [],
    },
  },

  // t&trade / Trade Show
  'trade/trade-show': {
    showcase: ['https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1591115765373-5f9cf1da45eb?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Gran evento y conferencia',
      claimCards: ['Speaker en evento', 'Networking en evento', 'Presentación en conferencia'],
      split: ['Centro de convenciones', 'Ponencia'],
    },
    altEn: {
      showcase: 'Large event and conference',
      claimCards: ['Speaker at event', 'Event networking', 'Conference presentation'],
      split: ['Convention center', 'Keynote speech'],
    },
  },

  // t&trade / Trade Marketing
  'trade/trade-marketing': {
    showcase: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1556740758-90de940f527d?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Tienda con activación de marca',
      claimCards: ['Punto de venta', 'Escaparate de tienda', 'Supermercado y retail'],
      split: ['Retail con displays', 'Escaparate comercial'],
    },
    altEn: {
      showcase: 'Store with brand activation',
      claimCards: ['Point of sale', 'Store window', 'Supermarket and retail'],
      split: ['Retail with displays', 'Commercial storefront'],
    },
  },

  // t&talk
  'talk': {
    showcase: ['https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522204523234-8729aa6e3d5f?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Presentación corporativa y relaciones públicas',
      claimCards: ['Social media y creación de contenido', 'Presentación de marca', 'Publicación y prensa'],
      split: ['Redes sociales', 'Comunicación corporativa'],
    },
    altEn: {
      showcase: 'Corporate presentation and public relations',
      claimCards: ['Social media and content creation', 'Brand presentation', 'Publication and press'],
      split: ['Social media', 'Corporate communication'],
    },
  },

  // t&team / Captación de Talento
  'team/captacion': {
    showcase: ['https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1573497620053-ea5300f94f21?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Entrevista de trabajo',
      claimCards: ['Entrevista profesional', 'Equipo en reunión', 'Persona profesional'],
      split: ['Handshake y contratación', 'Equipo trabajando'],
    },
    altEn: {
      showcase: 'Job interview',
      claimCards: ['Professional interview', 'Team meeting', 'Professional person'],
      split: ['Handshake and hiring', 'Team working'],
    },
  },

  // t&team / Formación
  'team/formacion': {
    showcase: ['https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Formación y clase corporativa',
      claimCards: ['Workshop con post-its', 'Formación tech', 'Presentación en grupo'],
      split: ['Aula corporativa', 'Sesión de formación'],
    },
    altEn: {
      showcase: 'Corporate training and class',
      claimCards: ['Workshop with post-its', 'Tech training', 'Group presentation'],
      split: ['Corporate classroom', 'Training session'],
    },
  },

  // t&team / Team Building
  'team/teambuilding': {
    showcase: ['https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop&auto=format'],
    claimCards: [
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800&q=80&fit=crop&auto=format',
    ],
    split: [
      'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80&fit=crop&auto=format',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=1200&q=80&fit=crop&auto=format',
    ],
    altEs: {
      showcase: 'Grupo de personas en actividad outdoor',
      claimCards: ['Grupo celebrando actividad de equipo', 'Colaboración en equipo', 'Reunión de equipo'],
      split: ['Actividad grupal', 'Celebración de equipo'],
    },
    altEn: {
      showcase: 'Group of people in outdoor activity',
      claimCards: ['Group celebrating team activity', 'Team collaboration', 'Team meeting'],
      split: ['Group activity', 'Team celebration'],
    },
  },
};

// Map EN paths to the same catalogue entries
const enPathMap = {
  'en/think/creativity': 'think/creatividad',
  'en/think/strategy': 'think/estrategia',
  'en/think/research': 'think/investigacion',
  'en/think/data-analytics': 'think/data-analitica',
  'en/tech/2laps': 'tech/2laps',
  'en/tech/1000er': 'tech/1000er',
  'en/tailor': 'tailor',
  'en/trade': 'trade',
  'en/trade/trade-show': 'trade/trade-show',
  'en/trade/trade-marketing': 'trade/trade-marketing',
  'en/talk': 'talk',
  'en/team/talent-acquisition': 'team/captacion',
  'en/team/training': 'team/formacion',
  'en/team/teambuilding': 'team/teambuilding',
};

const ROOT = path.resolve(__dirname, '..');

function getPageKey(filePath) {
  const rel = path.relative(ROOT, filePath).replace(/\/index\.html$/, '');
  // Try direct match first
  if (catalogue[rel]) return { key: rel, lang: rel.startsWith('en/') ? 'en' : 'es' };
  // Try EN mapping
  if (enPathMap[rel]) return { key: enPathMap[rel], lang: 'en', enPath: rel };
  return null;
}

function processFile(filePath) {
  const info = getPageKey(filePath);
  if (!info) return { file: filePath, changed: false, reason: 'no catalogue entry' };

  const data = catalogue[info.key];
  const lang = info.lang;
  const alts = lang === 'en' ? data.altEn : data.altEs;

  let html = fs.readFileSync(filePath, 'utf8');
  let imgCount = 0;

  // 1. Replace empty showcase-image divs
  let showcaseIdx = 0;
  html = html.replace(/<div class="showcase-image"><\/div>/g, (match) => {
    const url = data.showcase[showcaseIdx] || data.showcase[0];
    const alt = typeof alts.showcase === 'string' ? alts.showcase : (alts.showcase[showcaseIdx] || alts.showcase[0]);
    showcaseIdx++;
    imgCount++;
    return `<div class="showcase-image"><img src="${url}" alt="${alt}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div>`;
  });

  // 2. Replace empty claim-card-media divs
  let claimIdx = 0;
  html = html.replace(/<div class="claim-card-media"><\/div>/g, (match) => {
    const url = data.claimCards[claimIdx] || data.claimCards[data.claimCards.length - 1];
    const alt = alts.claimCards[claimIdx] || alts.claimCards[alts.claimCards.length - 1];
    claimIdx++;
    imgCount++;
    return `<div class="claim-card-media"><img src="${url}" alt="${alt}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div>`;
  });

  // 3. Replace empty split-media divs (only truly empty ones, not ones with style attrs)
  let splitIdx = 0;
  html = html.replace(/<div class="split-media"><\/div>/g, (match) => {
    if (!data.split || data.split.length === 0) return match;
    const url = data.split[splitIdx] || data.split[data.split.length - 1];
    const alt = alts.split[splitIdx] || alts.split[alts.split.length - 1];
    splitIdx++;
    imgCount++;
    return `<div class="split-media"><img src="${url}" alt="${alt}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div>`;
  });

  if (imgCount > 0) {
    fs.writeFileSync(filePath, html, 'utf8');
  }

  return { file: path.relative(ROOT, filePath), changed: imgCount > 0, imgCount };
}

// Collect all HTML files to process
function collectFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.name === 'node_modules' || entry.name === '.git' || entry.name === '.next') continue;
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath));
    } else if (entry.name.endsWith('.html')) {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = collectFiles(ROOT);
let totalFiles = 0;
let totalImages = 0;

console.log('Injecting images into placeholder divs...\n');

for (const file of allFiles) {
  const result = processFile(file);
  if (result.changed) {
    totalFiles++;
    totalImages += result.imgCount;
    console.log(`  ✓ ${result.file} — ${result.imgCount} images`);
  }
}

console.log(`\nDone! Modified ${totalFiles} files, inserted ${totalImages} images total.`);
