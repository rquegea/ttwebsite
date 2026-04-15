'use client';

import { useEffect } from 'react';

export default function RootRedirect() {
  useEffect(() => {
    try {
      const lang = (navigator.language || 'es').toLowerCase().split('-')[0];
      const cookieMatch = document.cookie.match(/(?:^|;\s*)NEXT_LOCALE=(en|es)/);
      const target = cookieMatch
        ? `/${cookieMatch[1]}/`
        : lang === 'en'
          ? '/en/'
          : '/es/';
      window.location.replace(target);
    } catch {
      window.location.replace('/es/');
    }
  }, []);

  return (
    <div style={{ padding: '2rem', fontFamily: 'Inter, system-ui, sans-serif' }}>
      <p>
        <a href="/es/">Continuar en español</a> · <a href="/en/">Continue in English</a>
      </p>
      <noscript>
        <meta httpEquiv="refresh" content="0;url=/es/" />
      </noscript>
    </div>
  );
}
