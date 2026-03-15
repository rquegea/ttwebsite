import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'T&T | Acceso',
  description: 'Portal de acceso a herramientas internas de T&T',
  robots: 'noindex, nofollow',
};

export default function AccesoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div id="acceso-root">
      {children}
    </div>
  );
}
