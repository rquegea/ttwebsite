'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function RootRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Get browser language
    const browserLang = navigator.language || 'es';

    // Redirect based on language
    const targetPath = browserLang.toLowerCase().startsWith('en') ? '/en/' : '/es/';
    router.replace(targetPath);
  }, [router]);

  return (
    <div style={{
      margin: 0,
      padding: 0,
      background: '#0A0A0A',
      color: '#fff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh'
    }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          width: '40px',
          height: '40px',
          border: '3px solid rgba(255, 255, 255, 0.3)',
          borderTopColor: '#fff',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
          margin: '0 auto 20px'
        }} />
        <p style={{ fontSize: '16px', margin: 0 }}>Redirigiendo...</p>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
