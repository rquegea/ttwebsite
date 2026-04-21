/**
 * Shared header and footer HTML — single source of truth.
 * Replaces the old inject-nav.js approach of duplicating HTML in 73 files.
 */

// SVG icons
const CHEVRON_DOWN = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const CHEVRON_RIGHT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const HAMBURGER_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>';
const CLOSE_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6L18 18" stroke-linecap="round" stroke-linejoin="round" /></svg>';

// ES path (no leading/trailing slash) → EN path. Paths not listed are assumed identical in both languages.
export const SLUG_MAP: Record<string, string> = {
  '': '',
  'contacto': 'contact',
  'empresa': 'company',
  'clientes': 'clients',
  'insights': 'insights',
  'work': 'work',
  'privacidad': 'privacy',
  'aviso-legal': 'legal-notice',
  'cookies': 'cookies',
  'brand-radar': 'brand-radar',
  'preplay': 'preplay',
  'ai-governance': 'ai-governance',
  'think': 'think',
  'think/creatividad': 'think/creativity',
  'think/estrategia': 'think/strategy',
  'think/investigacion': 'think/research',
  'think/data-analitica': 'think/data-analytics',
  'tech': 'tech',
  'tech/2laps': 'tech/2laps',
  'tech/1000er': 'tech/1000er',
  'tech/murphy': 'tech/murphy',
  'tailor': 'tailor',
  'tailor/plv': 'tailor/pos-displays',
  'tailor/merchandising': 'tailor/merchandising',
  'tailor/packaging': 'tailor/packaging',
  'trade': 'trade',
  'trade/trade-show': 'trade/trade-show',
  'trade/trade-marketing': 'trade/trade-marketing',
  'talk': 'talk',
  'talk/pr-comunicacion': 'talk/pr-communications',
  'talk/content-medios': 'talk/content-media',
  'talk/seo-paid-media': 'talk/seo-paid-media',
  'team': 'team',
  'team/captacion': 'team/talent-acquisition',
  'team/formacion': 'team/training',
  'team/teambuilding': 'team/teambuilding',
  'marketing/brand': 'marketing/brand',
  'marketing/strategy': 'marketing/strategy',
  'marketing/media': 'marketing/media',
  'marketing/social': 'marketing/social',
  'marketing/trade-marketing': 'marketing/trade-marketing',
  'marketing/events': 'marketing/events',
  'marketing/production': 'marketing/production',
  'marketing/talent': 'marketing/talent',
};

export const SLUG_MAP_REVERSE: Record<string, string> = Object.fromEntries(
  Object.entries(SLUG_MAP).map(([es, en]) => [en, es])
);

/**
 * Resolve the equivalent URL in the other language for a given slug path.
 * currentLang = language of the page we're on. Returns the URL that points to the other language.
 * Unknown paths (e.g. /work/<dynamic-slug>/) pass through unchanged.
 */
export function getAltLangUrl(currentLang: string, slug: string[]): string {
  const key = slug.join('/');
  if (currentLang === 'es') {
    const target = SLUG_MAP[key] ?? key;
    return target === '' ? '/en/' : `/en/${target}/`;
  }
  const target = SLUG_MAP_REVERSE[key] ?? key;
  return target === '' ? '/es/' : `/es/${target}/`;
}

export function getHeaderHtml(lang: string, isHomepage: boolean, slug: string[] = []): string {
  return lang === 'en' ? getEnHeader(isHomepage, slug) : getEsHeader(isHomepage, slug);
}

export function getFooterHtml(lang: string): string {
  return lang === 'en' ? EN_FOOTER : ES_FOOTER;
}

function langSwitcherHtml(currentLang: string, slug: string[]): string {
  const altUrl = getAltLangUrl(currentLang, slug);
  const altLabel = currentLang === 'es' ? 'EN' : 'ES';
  const altAria = currentLang === 'es' ? 'Switch to English' : 'Cambiar a español';
  return `<a href="${altUrl}" class="lang-switcher" aria-label="${altAria}">${altLabel}</a>`;
}

// --- ES HEADER ---
function getEsHeader(isHomepage: boolean, slug: string[]): string {
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/es/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  const switcher = langSwitcherHtml('es', slug);

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <div class="nav-glider"></div>
        <ul>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Soluciones ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/es/brand-radar/">Brand Radar</a>
              <a href="/es/preplay/">Preplay</a>
              <a href="/es/ai-governance/">AI Governance</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Servicios de Marketing ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/es/marketing/brand/">Marca</a>
              <a href="/es/marketing/strategy/">Estrategia</a>
              <a href="/es/marketing/media/">Medios</a>
              <a href="/es/marketing/social/">Social</a>
              <a href="/es/marketing/trade-marketing/">Trade Marketing</a>
              <a href="/es/marketing/events/">Eventos</a>
              <a href="/es/marketing/production/">Producción</a>
              <a href="/es/marketing/talent/">Talento</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Servicios de Tecnología ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <span class="nav-coming-soon">2laps<span class="nav-coming-soon-label">Web próximamente</span></span>
              <span class="nav-coming-soon">Murphy<span class="nav-coming-soon-label">Web próximamente</span></span>
              <span class="nav-coming-soon">1000er.ai<span class="nav-coming-soon-label">Web próximamente</span></span>
            </div>
          </li>
          <li>
            <a href="/es/work/" class="nav-vertical-label">Trabajo</a>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Nosotros ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/es/empresa/">Empresa</a>
              <a href="/es/insights/">Insights</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        ${switcher}
        <a href="/es/contacto/" class="header-connect-btn">Contacto <span class="connect-arrow">\u2192</span></a>
        <button class="mobile-menu-btn" aria-label="Toggle menu">
          ${isHomepage ? '<span class="menu-icon">\u25A0</span> MENU' : HAMBURGER_SVG}
        </button>
      </div>
    </div>
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
      <div class="mobile-menu-header${isHomepage ? '' : ' container'}">
        <div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>
        <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
          ${isHomepage ? '<span class="menu-icon">\u25A0</span> CLOSE' : CLOSE_SVG}
        </button>
      </div>
      <nav class="mobile-menu-nav${isHomepage ? '' : ' container'}">
        <ul>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-es-soluciones">
              <span>Soluciones</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-es-soluciones" hidden>
              <li><a href="/es/brand-radar/">Brand Radar</a></li>
              <li><a href="/es/preplay/">Preplay</a></li>
              <li><a href="/es/ai-governance/">AI Governance</a></li>
            </ul>
          </li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-es-marketing">
              <span>Servicios de Marketing</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-es-marketing" hidden>
              <li><a href="/es/marketing/brand/">Marca</a></li>
              <li><a href="/es/marketing/strategy/">Estrategia</a></li>
              <li><a href="/es/marketing/media/">Medios</a></li>
              <li><a href="/es/marketing/social/">Social</a></li>
              <li><a href="/es/marketing/trade-marketing/">Trade Marketing</a></li>
              <li><a href="/es/marketing/events/">Eventos</a></li>
              <li><a href="/es/marketing/production/">Producción</a></li>
              <li><a href="/es/marketing/talent/">Talento</a></li>
            </ul>
          </li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-es-tech">
              <span>Servicios de Tecnología</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-es-tech" hidden>
              <li><span class="nav-coming-soon">2laps<span class="nav-coming-soon-label">Web próximamente</span></span></li>
              <li><span class="nav-coming-soon">Murphy<span class="nav-coming-soon-label">Web próximamente</span></span></li>
              <li><span class="nav-coming-soon">1000er.ai<span class="nav-coming-soon-label">Web próximamente</span></span></li>
            </ul>
          </li>
          <li><a href="/es/work/" class="nav-vertical-label">Trabajo</a></li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-es-nosotros">
              <span>Nosotros</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-es-nosotros" hidden>
              <li><a href="/es/empresa/">Empresa</a></li>
              <li><a href="/es/insights/">Insights</a></li>
            </ul>
          </li>
          <li><a href="/es/contacto/">Contacto${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li>${switcher}</li>
        </ul>
      </nav>
      <div class="mobile-menu-footer${isHomepage ? '' : ' container'}">
        ${isHomepage
          ? `<div class="mobile-social-links">
          <a href="https://www.linkedin.com/company/truco-y-trufa/" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>
          <a href="https://www.instagram.com/trucoytrufa/" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
          <a href="#" aria-label="Facebook">f</a>
        </div>`
          : `<button class="cta-primary">Solicita una propuesta</button>
        <a href="/acceso" class="cta-outline">Acceso</a>`}
      </div>
    </div>
  </header>`;
}

// --- EN HEADER ---
function getEnHeader(isHomepage: boolean, slug: string[]): string {
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/en/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  const switcher = langSwitcherHtml('en', slug);

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <div class="nav-glider"></div>
        <ul>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Solutions ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/en/brand-radar/">Brand Radar</a>
              <a href="/en/preplay/">Preplay</a>
              <a href="/en/ai-governance/">AI Governance</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Marketing Services ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/en/marketing/brand/">Brand</a>
              <a href="/en/marketing/strategy/">Strategy</a>
              <a href="/en/marketing/media/">Media</a>
              <a href="/en/marketing/social/">Social</a>
              <a href="/en/marketing/trade-marketing/">Trade Marketing</a>
              <a href="/en/marketing/events/">Events</a>
              <a href="/en/marketing/production/">Production</a>
              <a href="/en/marketing/talent/">Talent</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Technology Services ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <span class="nav-coming-soon">2laps<span class="nav-coming-soon-label">Site coming soon</span></span>
              <span class="nav-coming-soon">Murphy<span class="nav-coming-soon-label">Site coming soon</span></span>
              <span class="nav-coming-soon">1000er.ai<span class="nav-coming-soon-label">Site coming soon</span></span>
            </div>
          </li>
          <li>
            <a href="/en/work/" class="nav-vertical-label">Work</a>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>About Us ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/en/company/">About</a>
              <a href="/en/insights/">Insights</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        ${switcher}
        <a href="/en/contact/" class="header-connect-btn">Connect <span class="connect-arrow">\u2192</span></a>
        <button class="mobile-menu-btn" aria-label="Toggle menu">
          ${isHomepage ? '<span class="menu-icon">\u25A0</span> MENU' : HAMBURGER_SVG}
        </button>
      </div>
    </div>
    <!-- Mobile Menu Overlay -->
    <div class="mobile-menu-overlay" id="mobileMenu">
      <div class="mobile-menu-header${isHomepage ? '' : ' container'}">
        <div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>
        <button class="mobile-menu-close" id="mobileMenuClose" aria-label="Close menu">
          ${isHomepage ? '<span class="menu-icon">\u25A0</span> CLOSE' : CLOSE_SVG}
        </button>
      </div>
      <nav class="mobile-menu-nav${isHomepage ? '' : ' container'}">
        <ul>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-en-solutions">
              <span>Solutions</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-en-solutions" hidden>
              <li><a href="/en/brand-radar/">Brand Radar</a></li>
              <li><a href="/en/preplay/">Preplay</a></li>
              <li><a href="/en/ai-governance/">AI Governance</a></li>
            </ul>
          </li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-en-marketing">
              <span>Marketing Services</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-en-marketing" hidden>
              <li><a href="/en/marketing/brand/">Brand</a></li>
              <li><a href="/en/marketing/strategy/">Strategy</a></li>
              <li><a href="/en/marketing/media/">Media</a></li>
              <li><a href="/en/marketing/social/">Social</a></li>
              <li><a href="/en/marketing/trade-marketing/">Trade Marketing</a></li>
              <li><a href="/en/marketing/events/">Events</a></li>
              <li><a href="/en/marketing/production/">Production</a></li>
              <li><a href="/en/marketing/talent/">Talent</a></li>
            </ul>
          </li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-en-tech">
              <span>Technology Services</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-en-tech" hidden>
              <li><span class="nav-coming-soon">2laps<span class="nav-coming-soon-label">Site coming soon</span></span></li>
              <li><span class="nav-coming-soon">Murphy<span class="nav-coming-soon-label">Site coming soon</span></span></li>
              <li><span class="nav-coming-soon">1000er.ai<span class="nav-coming-soon-label">Site coming soon</span></span></li>
            </ul>
          </li>
          <li><a href="/en/work/" class="nav-vertical-label">Work</a></li>
          <li class="mobile-menu-item has-submenu">
            <button type="button" class="nav-vertical-label mobile-submenu-toggle" aria-expanded="false" aria-controls="mm-en-about">
              <span>About Us</span>${CHEVRON_DOWN}
            </button>
            <ul class="mobile-submenu" id="mm-en-about" hidden>
              <li><a href="/en/company/">About</a></li>
              <li><a href="/en/insights/">Insights</a></li>
            </ul>
          </li>
          <li><a href="/en/contact/">Contact${isHomepage ? '' : ' ' + CHEVRON_RIGHT}</a></li>
          <li>${switcher}</li>
        </ul>
      </nav>
      <div class="mobile-menu-footer${isHomepage ? '' : ' container'}">
        ${isHomepage
          ? `<div class="mobile-social-links">
          <a href="https://www.linkedin.com/company/truco-y-trufa/" aria-label="LinkedIn" target="_blank" rel="noopener">in</a>
          <a href="https://www.instagram.com/trucoytrufa/" aria-label="Instagram" target="_blank" rel="noopener">ig</a>
          <a href="#" aria-label="Facebook">f</a>
        </div>`
          : `<button class="cta-primary">Request a proposal</button>
        <a href="/en/login" class="cta-outline">Login</a>`}
      </div>
    </div>
  </header>`;
}

// --- ES FOOTER ---
const ES_FOOTER = `<footer class="footer">
    <div class="footer-inner container">
      <div class="footer-main">
        <div class="footer-logo">
          <a href="/es/"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:28px;"></a>
        </div>
        <nav class="footer-nav">
          <a href="/es/brand-radar/">Soluciones</a>
          <a href="/es/marketing/brand/">Marketing</a>
          <a href="/es/">Tecnología</a>
          <a href="/es/work/">Trabajo</a>
          <a href="/es/empresa/">Nosotros</a>
        </nav>
        <a href="/es/contacto/" class="footer-cta">Contacto <span class="footer-cta-arrow">→</span></a>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 T&T. Madrid, España.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/truco-y-trufa/" class="footer-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.instagram.com/trucoytrufa/" class="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
        <div class="footer-legal">
          <a href="/es/privacidad/">Privacidad</a>
          <a href="/es/aviso-legal/">Aviso legal</a>
          <a href="/es/cookies/">Cookies</a>
        </div>
      </div>
    </div>
  </footer>`;

// --- EN FOOTER ---
const EN_FOOTER = `<footer class="footer">
    <div class="footer-inner container">
      <div class="footer-main">
        <div class="footer-logo">
          <a href="/en/"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:28px;"></a>
        </div>
        <nav class="footer-nav">
          <a href="/en/brand-radar/">Solutions</a>
          <a href="/en/marketing/brand/">Marketing</a>
          <a href="/en/">Technology</a>
          <a href="/en/work/">Work</a>
          <a href="/en/company/">About</a>
        </nav>
        <a href="/en/contact/" class="footer-cta">Connect <span class="footer-cta-arrow">→</span></a>
      </div>
      <div class="footer-bottom">
        <p class="footer-copyright">&copy; 2026 T&T. Madrid, Spain.</p>
        <div class="footer-social">
          <a href="https://www.linkedin.com/company/truco-y-trufa/" class="footer-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
          </a>
          <a href="https://www.instagram.com/trucoytrufa/" class="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
          </a>
        </div>
        <div class="footer-legal">
          <a href="/en/privacy/">Privacy</a>
          <a href="/en/legal-notice/">Legal</a>
          <a href="/en/cookies/">Cookies</a>
        </div>
      </div>
    </div>
  </footer>`;
