#!/usr/bin/env node
/**
 * inject-nav.js — Replaces header and footer in all T&T HTML files
 * Run: node scripts/inject-nav.js
 */

const fs = require('fs');
const path = require('path');
const { globSync } = require('fs').promises ? require('glob') : { globSync: null };

// Manual glob fallback
function findHtmlFiles(dir, results = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (['node_modules', '.next', 'dist', 'public', '.git', '.claude', 'scripts', 'styles'].includes(entry.name)) continue;
      findHtmlFiles(fullPath, results);
    } else if (entry.name === 'index.html') {
      results.push(fullPath);
    }
  }
  return results;
}

const ROOT = path.resolve(__dirname, '..');

// Files to SKIP (will be deleted in Phase 4)
const SKIP_PATHS = [
  'think/pr-comunicacion',
  'think/performance',
  'think/trade-marketing',
  'tech/desarrollo',
  'tech/inteligencia-artificial',
  'tech/crm',
  'tech/automatizacion',
  'trends',
  'events',
  'en/think/pr-communications',
  'en/think/performance',
  'en/think/trade-marketing',
  'en/tech/development',
  'en/tech/artificial-intelligence',
  'en/tech/crm',
  'en/tech/automation',
  'en/trends',
  'en/events',
];

// SVG icons
const CHEVRON_DOWN = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const CHEVRON_RIGHT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const HAMBURGER_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>';
const CLOSE_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6L18 18" stroke-linecap="round" stroke-linejoin="round" /></svg>';

// --- ES NAV ---
function getEsNav(isHomepage) {
  const logoHref = '/';
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <ul>
          <div class="nav-glider"></div>
          <!-- t&think -->
          <li class="has-dropdown">
            <a href="/think/">t&amp;think ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/think/creatividad/" class="feature-item active">
                    <h3>Creatividad y Dirección de Arte</h3>
                    <p>Conceptualización y diseño visual de campañas que conectan.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/think/estrategia/" class="feature-item">
                    <h3>Estrategia de Marca</h3>
                    <p>Planificación, posicionamiento y arquitectura de marca.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/think/investigacion/" class="feature-item">
                    <h3>Investigación de Mercado</h3>
                    <p>Análisis del consumidor, benchmarking y estudios cuali/cuanti.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/think/data-analitica/" class="feature-item">
                    <h3>Data y Analítica</h3>
                    <p>Dashboards, modelos de atribución y analítica web.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Pensamiento Estratégico</h4>
                    <p>Estrategia, creatividad e inteligencia de datos para marcas que piensan antes de actuar.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&tech -->
          <li class="has-dropdown">
            <a href="/tech/">t&amp;tech ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/tech/2laps/" class="feature-item active">
                    <h3>2laps</h3>
                    <p>Tecnología propia para acelerar procesos de marketing y comunicación.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/tech/1000er/" class="feature-item">
                    <h3>1000er</h3>
                    <p>Plataforma de análisis y activación de datos para campañas de alto impacto.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Tecnología Propia</h4>
                    <p>Herramientas propias que convierten datos en decisiones y procesos en resultados.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&tailor -->
          <li class="has-dropdown">
            <a href="/tailor/">t&amp;tailor ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-multimedia mega-menu-multimedia" style="flex:1;">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Producción a Medida</h4>
                    <p>Todo lo que tu marca necesita fabricar. Del diseño al objeto.</p>
                    <a href="/tailor/" class="scroll-cta" style="margin-top:0.5rem;display:inline-block;">Descubrir →</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&trade -->
          <li class="has-dropdown">
            <a href="/trade/">t&amp;trade ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/trade/trade-show/" class="feature-item active">
                    <h3>Trade Show y Ferias</h3>
                    <p>Diseño y montaje de stands, logística ferial y activaciones en recinto.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/trade/trade-marketing/" class="feature-item">
                    <h3>Trade Marketing</h3>
                    <p>Estrategia shopper, activaciones en punto de venta y material POP.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Activaciones Comerciales</h4>
                    <p>Del stand al lineal. Activaciones que convierten espacios en experiencias de marca.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&talk -->
          <li class="has-dropdown">
            <a href="/talk/">t&amp;talk ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-multimedia mega-menu-multimedia" style="flex:1;">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Comunicación y Medios</h4>
                    <p>Que hablen de tu marca. En el medio correcto, con el mensaje exacto.</p>
                    <a href="/talk/" class="scroll-cta" style="margin-top:0.5rem;display:inline-block;">Descubrir →</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&team -->
          <li class="has-dropdown">
            <a href="/team/">t&amp;team ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/team/captacion/" class="feature-item active">
                    <h3>Captación y Talento</h3>
                    <p>Recruiting especializado y Employer Branding.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/team/formacion/" class="feature-item">
                    <h3>Formación Continua</h3>
                    <p>Capacitación y desarrollo de habilidades para equipos.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/team/teambuilding/" class="feature-item">
                    <h3>Teambuilding</h3>
                    <p>Dinámicas de cohesión y mejora de cultura corporativa.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Potencia tus Equipos</h4>
                    <p>Las marcas extraordinarias se construyen con equipos extraordinarios.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        <div class="login"><a href="#">Acceso</a></div>
        <button class="mobile-menu-btn" aria-label="Toggle menu">
          ${isHomepage ? '<span class="menu-icon">■</span> MENU' : HAMBURGER_SVG}
        </button>
      </div>
    </div>
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
      <div class="mobile-menu-header${isHomepage ? '' : ' container'}">
        <div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>
        <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
          ${isHomepage ? '<span class="menu-icon">■</span> CLOSE' : CLOSE_SVG}
        </button>
      </div>
      <nav class="mobile-menu-nav${isHomepage ? '' : ' container'}">
        <ul>
          <li><a href="/think/">t&amp;think${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/tech/">t&amp;tech${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/tailor/">t&amp;tailor${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/trade/">t&amp;trade${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/talk/">t&amp;talk${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/team/">t&amp;team${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/contacto/">Contacto${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
        </ul>
      </nav>
      <div class="mobile-menu-footer${isHomepage ? '' : ' container'}">
        ${isHomepage
          ? `<div class="mobile-social-links">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="Facebook">f</a>
        </div>`
          : `<button class="cta-primary">Solicita una propuesta</button>
        <button class="cta-outline">Acceso</button>`}
      </div>
    </div>
  </header>`;
}

// --- EN NAV ---
function getEnNav(isHomepage) {
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/en/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <ul>
          <div class="nav-glider"></div>
          <!-- t&think -->
          <li class="has-dropdown">
            <a href="/en/think/">t&amp;think ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/en/think/creativity/" class="feature-item active">
                    <h3>Creativity &amp; Art Direction</h3>
                    <p>Campaign concept and visual design that truly connects.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/think/strategy/" class="feature-item">
                    <h3>Brand Strategy</h3>
                    <p>Brand planning, positioning and architecture.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/think/research/" class="feature-item">
                    <h3>Market Research</h3>
                    <p>Consumer analysis, competitive benchmarking and qualitative/quantitative studies.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/think/data-analytics/" class="feature-item">
                    <h3>Data &amp; Analytics</h3>
                    <p>Dashboards, attribution models and web analytics.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Strategic Thinking</h4>
                    <p>Strategy, creativity and data intelligence for brands that think before they act.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&tech -->
          <li class="has-dropdown">
            <a href="/en/tech/">t&amp;tech ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/en/tech/2laps/" class="feature-item active">
                    <h3>2laps</h3>
                    <p>Proprietary technology to accelerate marketing and communication processes.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/tech/1000er/" class="feature-item">
                    <h3>1000er</h3>
                    <p>Data analysis and activation platform for high-impact campaigns.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Proprietary Technology</h4>
                    <p>In-house tools that turn data into decisions and processes into results.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&tailor -->
          <li class="has-dropdown">
            <a href="/en/tailor/">t&amp;tailor ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-multimedia mega-menu-multimedia" style="flex:1;">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Bespoke Production</h4>
                    <p>Everything your brand needs to manufacture. From design to object.</p>
                    <a href="/en/tailor/" class="scroll-cta" style="margin-top:0.5rem;display:inline-block;">Discover →</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&trade -->
          <li class="has-dropdown">
            <a href="/en/trade/">t&amp;trade ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/en/trade/trade-show/" class="feature-item active">
                    <h3>Trade Show &amp; Exhibitions</h3>
                    <p>Stand design and build, event logistics and on-site activations.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/trade/trade-marketing/" class="feature-item">
                    <h3>Trade Marketing</h3>
                    <p>Shopper strategy, point-of-sale activations and POP materials.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Commercial Activations</h4>
                    <p>From stand to shelf. Activations that turn spaces into brand experiences.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&talk -->
          <li class="has-dropdown">
            <a href="/en/talk/">t&amp;talk ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-multimedia mega-menu-multimedia" style="flex:1;">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Communications &amp; Media</h4>
                    <p>Get your brand talked about. In the right medium, with the right message.</p>
                    <a href="/en/talk/" class="scroll-cta" style="margin-top:0.5rem;display:inline-block;">Discover →</a>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <!-- t&team -->
          <li class="has-dropdown">
            <a href="/en/team/">t&amp;team ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <div class="mega-menu-container container">
                <div class="features-list">
                  <a href="/en/team/talent-acquisition/" class="feature-item active">
                    <h3>Talent Acquisition</h3>
                    <p>Specialised recruiting and Employer Branding.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/team/training/" class="feature-item">
                    <h3>Ongoing Training</h3>
                    <p>Upskilling programmes and professional development for teams.</p>
                    <span class="arrow">→</span>
                  </a>
                  <a href="/en/team/teambuilding/" class="feature-item">
                    <h3>Teambuilding</h3>
                    <p>Team dynamics and corporate culture enhancement.</p>
                    <span class="arrow">→</span>
                  </a>
                </div>
                <div class="features-multimedia mega-menu-multimedia">
                  <div class="video-placeholder"></div>
                  <div class="video-caption">
                    <h4>Empower Your Teams</h4>
                    <p>Extraordinary brands are built by extraordinary teams.</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        <div class="login"><a href="#">Login</a></div>
        <button class="mobile-menu-btn" aria-label="Toggle menu">
          ${isHomepage ? '<span class="menu-icon">■</span> MENU' : HAMBURGER_SVG}
        </button>
      </div>
    </div>
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
      <div class="mobile-menu-header${isHomepage ? '' : ' container'}">
        <div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>
        <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
          ${isHomepage ? '<span class="menu-icon">■</span> CLOSE' : CLOSE_SVG}
        </button>
      </div>
      <nav class="mobile-menu-nav${isHomepage ? '' : ' container'}">
        <ul>
          <li><a href="/en/think/">t&amp;think${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/tech/">t&amp;tech${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/tailor/">t&amp;tailor${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/trade/">t&amp;trade${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/talk/">t&amp;talk${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/team/">t&amp;team${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li><a href="/en/contact/">Contact${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
        </ul>
      </nav>
      <div class="mobile-menu-footer${isHomepage ? '' : ' container'}">
        ${isHomepage
          ? `<div class="mobile-social-links">
          <a href="#" aria-label="LinkedIn">in</a>
          <a href="#" aria-label="Instagram">ig</a>
          <a href="#" aria-label="Facebook">f</a>
        </div>`
          : `<button class="cta-primary">Request a proposal</button>
        <button class="cta-outline">Login</button>`}
      </div>
    </div>
  </header>`;
}

// --- ES FOOTER ---
const ES_FOOTER = `<footer class="footer">
    <div class="footer-container container">
      <div class="footer-top">
        <div class="footer-logo">T&T</div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Servicios</h4>
            <ul>
              <li><a href="/think/">t&amp;think</a></li>
              <li><a href="/tech/">t&amp;tech</a></li>
              <li><a href="/tailor/">t&amp;tailor</a></li>
              <li><a href="/trade/">t&amp;trade</a></li>
              <li><a href="/talk/">t&amp;talk</a></li>
              <li><a href="/team/">t&amp;team</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Soluciones</h4>
            <ul>
              <li><a href="/think/creatividad/">Creatividad</a></li>
              <li><a href="/tech/2laps/">2laps</a></li>
              <li><a href="/tailor/">Producción</a></li>
              <li><a href="/trade/trade-show/">Trade Show</a></li>
              <li><a href="/talk/">Comunicación</a></li>
              <li><a href="/team/captacion/">Talento</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Empresa</h4>
            <ul>
              <li><a href="/empresa/">Sobre nosotros</a></li>
              <li><a href="/clientes/">Clientes</a></li>
              <li><a href="/insights/">Insights</a></li>
              <li><a href="/contacto/">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacidad/">Política de privacidad</a></li>
              <li><a href="/aviso-legal/">Aviso legal</a></li>
              <li><a href="/cookies/">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 T&T. Madrid, España.</p>
      </div>
    </div>
  </footer>`;

// --- EN FOOTER ---
const EN_FOOTER = `<footer class="footer">
    <div class="footer-container container">
      <div class="footer-top">
        <div class="footer-logo">T&T</div>
        <div class="footer-links">
          <div class="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="/en/think/">t&amp;think</a></li>
              <li><a href="/en/tech/">t&amp;tech</a></li>
              <li><a href="/en/tailor/">t&amp;tailor</a></li>
              <li><a href="/en/trade/">t&amp;trade</a></li>
              <li><a href="/en/talk/">t&amp;talk</a></li>
              <li><a href="/en/team/">t&amp;team</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Solutions</h4>
            <ul>
              <li><a href="/en/think/creativity/">Creativity</a></li>
              <li><a href="/en/tech/2laps/">2laps</a></li>
              <li><a href="/en/tailor/">Production</a></li>
              <li><a href="/en/trade/trade-show/">Trade Show</a></li>
              <li><a href="/en/talk/">Communications</a></li>
              <li><a href="/en/team/talent-acquisition/">Talent</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="/en/company/">About us</a></li>
              <li><a href="/en/clients/">Clients</a></li>
              <li><a href="/en/insights/">Insights</a></li>
              <li><a href="/en/contact/">Contact</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Legal</h4>
            <ul>
              <li><a href="/privacidad/">Privacy policy</a></li>
              <li><a href="/aviso-legal/">Legal notice</a></li>
              <li><a href="/cookies/">Cookies</a></li>
            </ul>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025 T&T. Madrid, Spain.</p>
      </div>
    </div>
  </footer>`;

// --- MAIN ---
function main() {
  const allFiles = findHtmlFiles(ROOT);
  let updated = 0;
  let skipped = 0;

  for (const filePath of allFiles) {
    const rel = path.relative(ROOT, filePath).replace(/\/index\.html$/, '');

    // Skip files marked for deletion
    if (SKIP_PATHS.some(skip => rel === skip || rel.startsWith(skip + '/'))) {
      console.log(`  SKIP (to-delete): ${rel}/index.html`);
      skipped++;
      continue;
    }

    let content = fs.readFileSync(filePath, 'utf8');

    const isEN = rel.startsWith('en/') || rel === 'en';
    const isHomepage = rel === '.' || rel === '' || rel === 'en' || rel === 'index.html';
    // Check if it's the root index.html or en/index.html
    const isRootHomepage = filePath === path.join(ROOT, 'index.html') || filePath === path.join(ROOT, 'en', 'index.html');

    // Replace header
    const headerStart = content.indexOf('<header class="header">');
    const headerEnd = content.indexOf('</header>');
    if (headerStart !== -1 && headerEnd !== -1) {
      const newNav = isEN ? getEnNav(isRootHomepage) : getEsNav(isRootHomepage);
      content = content.substring(0, headerStart) + newNav + content.substring(headerEnd + '</header>'.length);
    } else {
      console.log(`  WARN: No header found in ${rel}/index.html`);
    }

    // Replace footer
    const footerStart = content.indexOf('<footer class="footer">');
    const footerEnd = content.indexOf('</footer>');
    if (footerStart !== -1 && footerEnd !== -1) {
      const newFooter = isEN ? EN_FOOTER : ES_FOOTER;
      content = content.substring(0, footerStart) + newFooter + content.substring(footerEnd + '</footer>'.length);
    } else {
      console.log(`  WARN: No footer found in ${rel}/index.html`);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`  OK: ${rel}/index.html`);
    updated++;
  }

  console.log(`\nDone. Updated: ${updated}, Skipped: ${skipped}`);
}

main();
