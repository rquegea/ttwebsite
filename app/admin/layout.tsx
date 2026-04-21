'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { User } from '@supabase/supabase-js';
import './globals.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Skip auth check on login page
    if (pathname === '/admin/login') {
      setLoading(false);
      return;
    }

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        router.replace('/admin/login');
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session && pathname !== '/admin/login') {
        router.replace('/admin/login');
      } else if (session) {
        setUser(session.user);
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  // Login page renders without shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div className="admin-layout">
        <div className="admin-loading">Cargando...</div>
      </div>
    );
  }

  if (!user) return null;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/admin/login');
  };

  const links = [
    { href: '/admin/projects', label: 'Proyectos' },
    { href: '/admin/articles', label: 'Artículos' },
  ];

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-logo">T&T Admin</div>
        <nav className="admin-sidebar-nav">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`admin-sidebar-link${pathname.startsWith(link.href) ? ' active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>
        <div className="admin-sidebar-back">
          <a href="/">← Volver a la web</a>
        </div>
      </aside>
      <div className="admin-main">
        <header className="admin-header">
          <span className="admin-header-email">{user.email}</span>
          <button onClick={handleLogout} className="admin-btn admin-btn-logout">
            Cerrar sesión
          </button>
        </header>
        <main className="admin-content">
          {children}
        </main>
      </div>
    </div>
  );
}
