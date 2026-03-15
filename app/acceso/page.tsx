'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import './acceso.css';

// --- SVG Icons ---
function ShieldIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  );
}

function TimerIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="13" r="8" />
      <path d="M12 9v4l2.5 2.5" />
      <path d="M10 2h4" />
      <path d="M12 2v2" />
    </svg>
  );
}

function DiamondIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 3h12l4 6-10 13L2 9z" />
      <path d="M2 9h20" />
      <path d="M10 3l-2 6 4 13 4-13-2-6" />
    </svg>
  );
}

function LogInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  );
}

function LogOutIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

// --- Clock Hook ---
function useClock() {
  const [time, setTime] = useState('');

  useEffect(() => {
    function update() {
      const now = new Date();
      setTime(
        now.toLocaleDateString('es-ES', {
          weekday: 'short',
          day: 'numeric',
          month: 'short',
        }) +
          '  ' +
          now.toLocaleTimeString('es-ES', {
            hour: '2-digit',
            minute: '2-digit',
          })
      );
    }
    update();
    const id = setInterval(update, 30_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

// --- Main Component ---
export default function AccesoPage() {
  const router = useRouter();
  const clock = useClock();

  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  // Login form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // Auth check
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      setSession(s);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s);
    });

    return () => subscription.unsubscribe();
  }, []);

  const userName = session?.user?.email?.split('@')[0] ?? 'Invitado';
  const isAuth = !!session;

  // Login handler
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError('');
    setLoginLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setLoginError(error.message);
      setLoginLoading(false);
      return;
    }

    setShowLogin(false);
    setEmail('');
    setPassword('');
    setLoginLoading(false);
  }

  // Logout handler
  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
  }

  if (loading) {
    return (
      <div className="acceso-desktop">
        <div className="acceso-wallpaper" />
      </div>
    );
  }

  return (
    <div className="acceso-desktop">
      <div className="acceso-wallpaper" />

      {/* --- Menu Bar --- */}
      <div className="acceso-menubar">
        <div className="acceso-menubar-logo">T&T</div>
        <div className="acceso-menubar-center">{clock}</div>
        <div className="acceso-menubar-user">{userName}</div>
      </div>

      {/* --- Desktop Icons --- */}
      <div className="acceso-icons-area">
        <div className="acceso-icons-grid">
          {/* Admin — solo visible si autenticado */}
          {isAuth && (
            <button className="acceso-icon" onClick={() => router.push('/admin')}>
              <div className="acceso-icon__graphic">
                <ShieldIcon />
              </div>
              <span className="acceso-icon__label">Admin</span>
            </button>
          )}

          {/* 2laps */}
          <a
            className="acceso-icon"
            href="https://platform.trucoytrufa.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="acceso-icon__graphic">
              <TimerIcon />
            </div>
            <span className="acceso-icon__label">2laps</span>
          </a>

          {/* 1000er — próximamente */}
          <button
            className="acceso-icon acceso-icon--disabled"
            onClick={() => {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 2000);
            }}
            style={{ position: 'relative' }}
          >
            {showTooltip && <div className="acceso-tooltip">Próximamente</div>}
            <div className="acceso-icon__graphic">
              <DiamondIcon />
            </div>
            <span className="acceso-icon__label">1000er</span>
          </button>
        </div>
      </div>

      {/* --- Dock --- */}
      <div className="acceso-dock-wrapper">
        <div className="acceso-dock">
          {/* Admin in dock — only if auth */}
          {isAuth && (
            <button className="acceso-dock-item" onClick={() => router.push('/admin')}>
              <div className="acceso-dock-item__icon">
                <ShieldIcon />
              </div>
              <span className="acceso-dock-item__label">Admin</span>
            </button>
          )}

          {/* 2laps in dock */}
          <a
            className="acceso-dock-item"
            href="https://platform.trucoytrufa.es"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="acceso-dock-item__icon">
              <TimerIcon />
            </div>
            <span className="acceso-dock-item__label">2laps</span>
          </a>

          {/* 1000er in dock */}
          <button
            className="acceso-dock-item acceso-dock-item--disabled"
            onClick={() => {
              setShowTooltip(true);
              setTimeout(() => setShowTooltip(false), 2000);
            }}
          >
            <div className="acceso-dock-item__icon">
              <DiamondIcon />
            </div>
            <span className="acceso-dock-item__label">1000er</span>
          </button>

          <div className="acceso-dock-separator" />

          {/* Login / Logout */}
          {isAuth ? (
            <button className="acceso-dock-item" onClick={handleLogout}>
              <div className="acceso-dock-item__icon">
                <LogOutIcon />
              </div>
              <span className="acceso-dock-item__label">Salir</span>
            </button>
          ) : (
            <button className="acceso-dock-item" onClick={() => setShowLogin(true)}>
              <div className="acceso-dock-item__icon">
                <LogInIcon />
              </div>
              <span className="acceso-dock-item__label">Entrar</span>
            </button>
          )}
        </div>
      </div>

      {/* --- Login Modal --- */}
      {showLogin && (
        <div className="acceso-login-overlay" onClick={() => setShowLogin(false)}>
          <div
            className="acceso-login-modal"
            style={{ position: 'relative' }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className="acceso-login-close" onClick={() => setShowLogin(false)}>
              ×
            </button>
            <h2>Iniciar sesión</h2>
            <p>Accede con tu cuenta de T&T</p>

            {loginError && <div className="acceso-login-error">{loginError}</div>}

            <form onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="acceso-login-input"
                required
                autoFocus
              />
              <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="acceso-login-input"
                required
              />
              <button type="submit" disabled={loginLoading} className="acceso-login-btn">
                {loginLoading ? 'Entrando...' : 'Entrar'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
