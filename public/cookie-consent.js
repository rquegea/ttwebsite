/**
 * T&T Cookie Consent Banner
 * Self-contained: injects HTML + CSS into the DOM
 * Bilingual: ES/EN based on <html lang="">
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'cookie-consent';
  var GA_ID = 'G-W3DZK7THN0';

  // Load Google Analytics (only if consent given)
  function loadGA() {
    if (document.getElementById('ga-script')) return;
    var s = document.createElement('script');
    s.id = 'ga-script';
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID);
  }

  // Check if consent already given
  var stored = null;
  try { stored = JSON.parse(localStorage.getItem(STORAGE_KEY)); } catch (e) {}
  if (stored && stored.timestamp) {
    if (stored.analytics) loadGA();
    window.cookieConsent = stored;
    return;
  }

  // Detect language
  var lang = (document.documentElement.lang || 'es').substring(0, 2);
  var isEN = lang === 'en';

  var t = {
    message: isEN
      ? 'We use cookies to improve your experience.'
      : 'Utilizamos cookies para mejorar tu experiencia.',
    policyLink: isEN ? 'cookie policy' : 'política de cookies',
    acceptAll: isEN ? 'Accept all' : 'Aceptar todo',
    rejectAll: isEN ? 'Reject all' : 'Rechazar todo',
    settings: isEN ? 'Settings' : 'Configurar',
    save: isEN ? 'Save preferences' : 'Guardar preferencias',
    necessary: isEN ? 'Essential cookies' : 'Cookies necesarias',
    necessaryDesc: isEN ? 'Always active' : 'Siempre activas',
    analytics: isEN ? 'Analytics cookies' : 'Cookies analíticas',
    analyticsDesc: isEN
      ? 'Help us understand how visitors use the site.'
      : 'Nos ayudan a entender cómo se usa el sitio.',
    marketing: isEN ? 'Marketing cookies' : 'Cookies de marketing',
    marketingDesc: isEN
      ? 'Used to deliver relevant advertising.'
      : 'Se usan para mostrar publicidad relevante.'
  };

  // Inject styles
  var css = document.createElement('style');
  css.textContent = [
    '#cc-banner{position:fixed;bottom:0;left:0;right:0;z-index:9999;background:rgba(10,10,10,.95);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);color:#fff;font-family:Inter,system-ui,sans-serif;font-size:14px;line-height:1.5;padding:20px 24px;border-top:1px solid rgba(255,255,255,.1);transform:translateY(100%);animation:cc-slide-up .4s ease forwards}',
    '@keyframes cc-slide-up{to{transform:translateY(0)}}',
    '#cc-banner *{box-sizing:border-box;margin:0;padding:0}',
    '#cc-banner a{color:#CC2936;text-decoration:underline;text-underline-offset:2px}',
    '#cc-banner a:hover{opacity:.85}',
    '.cc-inner{max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:20px;flex-wrap:wrap}',
    '.cc-text{flex:1;min-width:240px}',
    '.cc-buttons{display:flex;gap:10px;flex-shrink:0;flex-wrap:wrap}',
    '.cc-btn{border:none;border-radius:6px;padding:10px 20px;font-size:14px;font-weight:500;cursor:pointer;font-family:inherit;transition:opacity .2s,transform .15s;white-space:nowrap}',
    '.cc-btn:hover{opacity:.9}.cc-btn:active{transform:scale(.97)}',
    '.cc-btn--accept{background:#CC2936;color:#fff}',
    '.cc-btn--reject{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)}',
    '.cc-btn--settings{background:transparent;color:#fff;border:1px solid rgba(255,255,255,.3)}',
    '.cc-btn--save{background:#CC2936;color:#fff;margin-top:8px}',
    '.cc-settings{display:none;width:100%;padding-top:16px;border-top:1px solid rgba(255,255,255,.1);margin-top:4px}',
    '.cc-settings.cc-open{display:block}',
    '.cc-row{display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.06)}',
    '.cc-row:last-child{border-bottom:none}',
    '.cc-row-label{font-weight:500}',
    '.cc-row-desc{font-size:12px;color:rgba(255,255,255,.5)}',
    '.cc-badge{font-size:11px;color:rgba(255,255,255,.4);font-style:italic}',
    '.cc-toggle{position:relative;width:44px;height:24px;flex-shrink:0;margin-left:12px}',
    '.cc-toggle input{opacity:0;width:0;height:0;position:absolute}',
    '.cc-toggle span{position:absolute;cursor:pointer;top:0;left:0;right:0;bottom:0;background:rgba(255,255,255,.15);border-radius:12px;transition:background .25s}',
    '.cc-toggle span::after{content:"";position:absolute;width:18px;height:18px;left:3px;bottom:3px;background:#fff;border-radius:50%;transition:transform .25s}',
    '.cc-toggle input:checked+span{background:#CC2936}',
    '.cc-toggle input:checked+span::after{transform:translateX(20px)}',
    '@media(max-width:640px){.cc-inner{flex-direction:column;align-items:stretch;gap:14px}.cc-buttons{flex-direction:column}.cc-btn{width:100%;text-align:center}}'
  ].join('\n');
  document.head.appendChild(css);

  // Build banner HTML
  var banner = document.createElement('div');
  banner.id = 'cc-banner';
  banner.setAttribute('role', 'dialog');
  banner.setAttribute('aria-label', isEN ? 'Cookie consent' : 'Consentimiento de cookies');

  banner.innerHTML =
    '<div class="cc-inner">' +
      '<div class="cc-text">' + t.message + ' <a href="/cookies/">' + t.policyLink + '</a>.</div>' +
      '<div class="cc-buttons">' +
        '<button class="cc-btn cc-btn--reject" id="cc-reject">' + t.rejectAll + '</button>' +
        '<button class="cc-btn cc-btn--settings" id="cc-toggle-settings">' + t.settings + '</button>' +
        '<button class="cc-btn cc-btn--accept" id="cc-accept">' + t.acceptAll + '</button>' +
      '</div>' +
    '</div>' +
    '<div class="cc-settings" id="cc-settings">' +
      '<div style="max-width:1200px;margin:0 auto">' +
        '<div class="cc-row">' +
          '<div><div class="cc-row-label">' + t.necessary + '</div><div class="cc-badge">' + t.necessaryDesc + '</div></div>' +
        '</div>' +
        '<div class="cc-row">' +
          '<div><div class="cc-row-label">' + t.analytics + '</div><div class="cc-row-desc">' + t.analyticsDesc + '</div></div>' +
          '<label class="cc-toggle"><input type="checkbox" id="cc-analytics"><span></span></label>' +
        '</div>' +
        '<div class="cc-row">' +
          '<div><div class="cc-row-label">' + t.marketing + '</div><div class="cc-row-desc">' + t.marketingDesc + '</div></div>' +
          '<label class="cc-toggle"><input type="checkbox" id="cc-marketing"><span></span></label>' +
        '</div>' +
        '<div style="text-align:right">' +
          '<button class="cc-btn cc-btn--save" id="cc-save">' + t.save + '</button>' +
        '</div>' +
      '</div>' +
    '</div>';

  // Save consent helper
  function saveConsent(analytics, marketing) {
    var data = {
      necessary: true,
      analytics: !!analytics,
      marketing: !!marketing,
      timestamp: new Date().toISOString()
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    if (data.analytics) loadGA();
    window.cookieConsent = data;
    banner.style.animation = 'none';
    banner.style.transform = 'translateY(100%)';
    banner.style.transition = 'transform .3s ease';
    setTimeout(function () { banner.remove(); }, 350);
  }

  // Wire up buttons after DOM ready
  function init() {
    document.body.appendChild(banner);

    document.getElementById('cc-accept').addEventListener('click', function () {
      saveConsent(true, true);
    });

    document.getElementById('cc-reject').addEventListener('click', function () {
      saveConsent(false, false);
    });

    document.getElementById('cc-toggle-settings').addEventListener('click', function () {
      var panel = document.getElementById('cc-settings');
      panel.classList.toggle('cc-open');
      this.textContent = panel.classList.contains('cc-open')
        ? (isEN ? 'Hide settings' : 'Ocultar')
        : t.settings;
    });

    document.getElementById('cc-save').addEventListener('click', function () {
      saveConsent(
        document.getElementById('cc-analytics').checked,
        document.getElementById('cc-marketing').checked
      );
    });
  }

  // Expose API
  window.cookieConsent = { necessary: true, analytics: false, marketing: false, timestamp: null };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
