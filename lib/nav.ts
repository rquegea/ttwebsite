/**
 * Shared header and footer HTML — single source of truth.
 * Replaces the old inject-nav.js approach of duplicating HTML in 73 files.
 */

// SVG icons
const CHEVRON_DOWN = '<svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const CHEVRON_RIGHT = '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M9 18l6-6-6-6" stroke-linecap="round" stroke-linejoin="round" /></svg>';
const HAMBURGER_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M3 12H21M3 18H21" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>';
const CLOSE_SVG = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6L18 18" stroke-linecap="round" stroke-linejoin="round" /></svg>';

export function getHeaderHtml(lang: string, isHomepage: boolean): string {
  return lang === 'en' ? getEnHeader(isHomepage) : getEsHeader(isHomepage);
}

export function getFooterHtml(lang: string): string {
  return lang === 'en' ? EN_FOOTER : ES_FOOTER;
}

// --- ES HEADER ---
function getEsHeader(isHomepage: boolean): string {
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <ul>
          <div class="nav-glider"></div>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Solutions ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/brand-radar/">Brand Radar</a>
              <a href="/preplay/">Preplay</a>
              <a href="/ai-governance/">AI Governance</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Marketing Services ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/think/estrategia/">Brand</a>
              <a href="/think/estrategia/">Strategy</a>
              <a href="/talk/paid-media/">Media</a>
              <a href="/talk/social/">Social</a>
              <a href="/trade/trade-marketing/">Trade Marketing</a>
              <a href="/trade/trade-show/">Events</a>
              <a href="/tailor/">Production</a>
              <a href="/team/">Talent</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Technology Services ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/tech/2laps/">2laps</a>
              <a href="/tech/murphy/">Murphy</a>
              <a href="/tech/1000er/">1000er.ai</a>
            </div>
          </li>
          <li>
            <a href="/work/" class="nav-vertical-label">Work</a>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>About Us ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/empresa/">Empresa</a>
              <a href="/clientes/">Clientes</a>
              <a href="/insights/">Insights</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
        <a href="/contacto/" class="header-connect-btn">Contacto <span class="connect-arrow">\u2192</span></a>
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
          <li><a class="nav-vertical-label">Solutions</a></li>
          <li><a class="nav-vertical-label">Marketing Services</a></li>
          <li><a href="#" class="nav-vertical-label">Technology Services</a></li>
          <li><a href="/work/" class="nav-vertical-label">Work</a></li>
          <li><a class="nav-vertical-label">About Us</a></li>
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
        <a href="/acceso" class="cta-outline">Acceso</a>`}
      </div>
    </div>
  </header>`;
}

// --- EN HEADER ---
function getEnHeader(isHomepage: boolean): string {
  const logoWrap = isHomepage
    ? '<div class="logo"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></div>'
    : '<div class="logo"><a href="/en/"><img src="/logos/tytnuevologo.png" alt="T&T" class="logo-img"></a></div>';

  return `<header class="header">
    <div class="header-container container">
      ${logoWrap}
      <nav class="nav">
        <ul>
          <div class="nav-glider"></div>
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
              <a href="/en/think/estrategia/">Brand Strategy</a>
              <a href="/en/talk/paid-media/">Media</a>
              <a href="/en/talk/social/">Social</a>
              <a href="/en/trade/trade-marketing/">Trade Marketing</a>
              <a href="/en/trade/trade-show/">Events</a>
              <a href="/en/tailor/">Production</a>
              <a href="/en/team/">Talent</a>
            </div>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>Technology Services ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/en/tech/2laps/">2laps</a>
              <a href="/en/tech/murphy/">Murphy</a>
              <a href="/en/tech/1000er/">1000er.ai</a>
            </div>
          </li>
          <li>
            <a href="/en/work/" class="nav-vertical-label">Work</a>
          </li>
          <li class="has-dropdown">
            <a class="nav-vertical-label"><span class="nav-dot">•</span>About Us ${CHEVRON_DOWN}</a>
            <div class="mega-menu">
              <a href="/en/empresa/">About</a>
              <a href="/en/clientes/">Clients</a>
              <a href="/en/insights/">Insights</a>
            </div>
          </li>
        </ul>
      </nav>
      <div class="header-right">
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
          <li><a class="nav-vertical-label">Solutions</a></li>
          <li><a class="nav-vertical-label">Marketing Services</a></li>
          <li><a href="#" class="nav-vertical-label">Technology Services</a></li>
          <li><a href="/en/work/" class="nav-vertical-label">Work</a></li>
          <li><a class="nav-vertical-label">About Us</a></li>
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
        <a href="/acceso" class="cta-outline">Login</a>`}
      </div>
    </div>
  </header>`;
}

// --- ES FOOTER ---
const ES_FOOTER = `<footer class="footer">
    <div class="footer-container container">
      <div class="footer-top">
        <div class="footer-logo"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:32px;"></div>
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
            <h4>Productos</h4>
            <ul>
              <li><a href="/tech/2laps/">2laps</a></li>
              <li><a href="/tech/1000er/">1000er</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Journal</h4>
            <ul>
              <li><a href="/insights/">Insights</a></li>
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
        <div class="footer-bottom-left">
          <div class="footer-social">
            <a href="https://linkedin.com/company/tyt" class="footer-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://instagram.com/tyt" class="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://x.com/tyt" class="footer-social-icon" aria-label="X" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <span class="footer-follow-label">Follow Us</span>
          </div>
          <a href="/newsletter/" class="footer-newsletter-btn">Newsletter <span>→</span></a>
        </div>
        <p class="footer-copyright">&copy; 2026 T&T. Madrid, España.</p>
      </div>
    </div>
  </footer>`;

// --- EN FOOTER ---
const EN_FOOTER = `<footer class="footer">
    <div class="footer-container container">
      <div class="footer-top">
        <div class="footer-logo"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:32px;"></div>
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
            <h4>Products</h4>
            <ul>
              <li><a href="/en/tech/2laps/">2laps</a></li>
              <li><a href="/en/tech/1000er/">1000er</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Journal</h4>
            <ul>
              <li><a href="/en/insights/">Insights</a></li>
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
        <div class="footer-bottom-left">
          <div class="footer-social">
            <a href="https://linkedin.com/company/tyt" class="footer-social-icon" aria-label="LinkedIn" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
            <a href="https://instagram.com/tyt" class="footer-social-icon" aria-label="Instagram" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://x.com/tyt" class="footer-social-icon" aria-label="X" target="_blank" rel="noopener">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.259 5.631L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/></svg>
            </a>
            <span class="footer-follow-label">Follow Us</span>
          </div>
          <a href="/en/newsletter/" class="footer-newsletter-btn">Newsletter <span>→</span></a>
        </div>
        <p class="footer-copyright">&copy; 2026 T&T. Madrid, Spain.</p>
      </div>
    </div>
  </footer>`;
