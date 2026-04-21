'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client';
import type { Session } from '@supabase/supabase-js';
import './acceso.css';

/* ========== SVG ICON COMPONENTS (Aqua glossy 3D gel) ========== */

function AquaAdminIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="admin-rg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4A90D9" />
          <stop offset="70%" stopColor="#2463B0" />
          <stop offset="100%" stopColor="#1a5276" />
        </radialGradient>
        <linearGradient id="admin-inner-shadow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0d2f50" stopOpacity="0.5" />
          <stop offset="40%" stopColor="#0d2f50" stopOpacity="0" />
        </linearGradient>
        <filter id="admin-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
        {/* gear tooth path */}
        <path id="admin-gear" d="M32 8 l2.8 0 l1 5.2 a16 16 0 0 1 5.2 2.1 l4.8-2.2 l2 2 l-2.2 4.8 a16 16 0 0 1 2.1 5.2 l5.2 1 l0 2.8 l-5.2 1 a16 16 0 0 1-2.1 5.2 l2.2 4.8 l-2 2 l-4.8-2.2 a16 16 0 0 1-5.2 2.1 l-1 5.2 l-2.8 0 l-1-5.2 a16 16 0 0 1-5.2-2.1 l-4.8 2.2 l-2-2 l2.2-4.8 a16 16 0 0 1-2.1-5.2 l-5.2-1 l0-2.8 l5.2-1 a16 16 0 0 1 2.1-5.2 l-2.2-4.8 l2-2 l4.8 2.2 a16 16 0 0 1 5.2-2.1 z" />
      </defs>
      <g filter="url(#admin-drop)">
        {/* Shield base */}
        <path d="M32 4 L56 14 L56 32 C56 46 44 56 32 60 C20 56 8 46 8 32 L8 14 Z" fill="url(#admin-rg)" stroke="rgba(20,60,120,0.5)" strokeWidth="1" />
        {/* Inner shadow */}
        <path d="M32 4 L56 14 L56 32 C56 46 44 56 32 60 C20 56 8 46 8 32 L8 14 Z" fill="url(#admin-inner-shadow)" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="16" rx="20" ry="12" fill="white" opacity="0.45" />
        {/* Gear icon inside */}
        <g transform="translate(32,34)" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.95">
          <circle cx="0" cy="0" r="5" />
          <path d="M0-10 l1.5 0 .5 2.8a7.5 7.5 0 012.5 1l2.4-1.2 1 1-1.2 2.4a7.5 7.5 0 011 2.5l2.8.5 0 1.5-2.8.5a7.5 7.5 0 01-1 2.5l1.2 2.4-1 1-2.4-1.2a7.5 7.5 0 01-2.5 1l-.5 2.8-1.5 0-.5-2.8a7.5 7.5 0 01-2.5-1l-2.4 1.2-1-1 1.2-2.4a7.5 7.5 0 01-1-2.5l-2.8-.5 0-1.5 2.8-.5a7.5 7.5 0 011-2.5l-1.2-2.4 1-1 2.4 1.2a7.5 7.5 0 012.5-1z" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" />
        </g>
        {/* Secondary specular highlight */}
        <ellipse cx="32" cy="18" rx="14" ry="6" fill="white" opacity="0.15" />
      </g>
    </svg>
  );
}

function Aqua2lapsIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="laps-rg" cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor="#e8e8e8" />
          <stop offset="60%" stopColor="#c0c0c0" />
          <stop offset="100%" stopColor="#808080" />
        </radialGradient>
        <radialGradient id="laps-face" cx="50%" cy="45%" r="50%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="100%" stopColor="#f0f0f0" />
        </radialGradient>
        <linearGradient id="laps-bezel" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#d8d8d8" />
          <stop offset="50%" stopColor="#a8a8a8" />
          <stop offset="100%" stopColor="#909090" />
        </linearGradient>
        <filter id="laps-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#000" floodOpacity="0.35" />
        </filter>
      </defs>
      <g filter="url(#laps-drop)">
        {/* Crown / button top */}
        <rect x="29" y="4" width="6" height="6" rx="1.5" fill="url(#laps-bezel)" stroke="#777" strokeWidth="0.8" />
        <rect x="26" y="3" width="12" height="3" rx="1.5" fill="url(#laps-bezel)" stroke="#777" strokeWidth="0.8" />
        {/* Side button */}
        <rect x="50" y="22" width="5" height="4" rx="1" fill="url(#laps-bezel)" stroke="#777" strokeWidth="0.6" />
        {/* Outer bezel ring */}
        <circle cx="32" cy="36" r="24" fill="url(#laps-bezel)" stroke="rgba(100,100,100,0.5)" strokeWidth="1" />
        {/* Inner bezel */}
        <circle cx="32" cy="36" r="22" fill="url(#laps-rg)" stroke="#999" strokeWidth="0.5" />
        {/* Watch face */}
        <circle cx="32" cy="36" r="19" fill="url(#laps-face)" stroke="#bbb" strokeWidth="0.5" />
        {/* Hour markers */}
        {[0,30,60,90,120,150,180,210,240,270,300,330].map((deg) => (
          <line key={deg} x1="32" y1="19" x2="32" y2={deg % 90 === 0 ? "22" : "20.5"} stroke="#555" strokeWidth={deg % 90 === 0 ? "1.5" : "0.8"} strokeLinecap="round" transform={`rotate(${deg} 32 36)`} />
        ))}
        {/* Minute hand */}
        <line x1="32" y1="36" x2="32" y2="21" stroke="#333" strokeWidth="1.5" strokeLinecap="round" />
        {/* Second hand */}
        <line x1="32" y1="36" x2="42" y2="30" stroke="#d04040" strokeWidth="1" strokeLinecap="round" />
        {/* Center pin */}
        <circle cx="32" cy="36" r="2" fill="#555" />
        <circle cx="32" cy="36" r="1" fill="#888" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="24" rx="16" ry="10" fill="white" opacity="0.5" />
        {/* Secondary specular */}
        <ellipse cx="32" cy="26" rx="10" ry="5" fill="white" opacity="0.2" />
      </g>
    </svg>
  );
}

function Aqua1000erIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="k-facet-l" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#c4a0ff" />
          <stop offset="100%" stopColor="#8B5CF6" />
        </linearGradient>
        <linearGradient id="k-facet-r" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#a78bfa" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>
        <linearGradient id="k-facet-top" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#ddd6fe" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
        <linearGradient id="k-facet-bot" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7c3aed" />
          <stop offset="100%" stopColor="#4c1d95" />
        </linearGradient>
        <filter id="k-drop">
          <feDropShadow dx="0" dy="2.5" stdDeviation="3" floodColor="#4c1d95" floodOpacity="0.45" />
        </filter>
      </defs>
      <g filter="url(#k-drop)">
        {/* Diamond shape — top crown */}
        <polygon points="32,4 52,22 32,58 12,22" fill="url(#k-facet-bot)" stroke="rgba(80,40,160,0.4)" strokeWidth="0.8" />
        {/* Crown facets */}
        <polygon points="12,22 32,4 32,22" fill="url(#k-facet-l)" />
        <polygon points="52,22 32,4 32,22" fill="url(#k-facet-r)" />
        {/* Girdle line */}
        <line x1="12" y1="22" x2="52" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.8" />
        {/* Top facet */}
        <polygon points="22,22 32,4 42,22" fill="url(#k-facet-top)" opacity="0.6" />
        {/* Lower facets */}
        <polygon points="12,22 32,22 32,58" fill="url(#k-facet-l)" opacity="0.5" />
        <polygon points="52,22 32,22 32,58" fill="url(#k-facet-r)" opacity="0.5" />
        {/* Internal facet lines */}
        <line x1="22" y1="22" x2="32" y2="58" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="42" y1="22" x2="32" y2="58" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5" />
        <line x1="22" y1="22" x2="32" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        <line x1="42" y1="22" x2="32" y2="4" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
        {/* Sparkle reflections */}
        <polygon points="26,14 28,12 30,14 28,16" fill="white" opacity="0.6" />
        <polygon points="38,18 39,16.5 40,18 39,19.5" fill="white" opacity="0.4" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="13" rx="14" ry="7" fill="white" opacity="0.4" />
        {/* Secondary highlight on crown */}
        <ellipse cx="30" cy="16" rx="6" ry="3" fill="white" opacity="0.2" />
      </g>
    </svg>
  );
}

function FinderIcon() {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src="/wallpaper/finder.png" alt="Finder" width={64} height={64} draggable={false} style={{ display: 'block' }} />
  );
}

function MacintoshHDIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="hd-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8eaee" />
          <stop offset="30%" stopColor="#d0d2d6" />
          <stop offset="70%" stopColor="#b8bac0" />
          <stop offset="100%" stopColor="#a0a4a8" />
        </linearGradient>
        <radialGradient id="hd-screen" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#6db3f2" />
          <stop offset="100%" stopColor="#2a6dd6" />
        </radialGradient>
        <linearGradient id="hd-inner-shadow" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#707478" stopOpacity="0.6" />
          <stop offset="40%" stopColor="#707478" stopOpacity="0" />
        </linearGradient>
        <filter id="hd-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#hd-drop)">
        {/* Monitor body */}
        <rect x="8" y="4" width="48" height="38" rx="4" fill="url(#hd-body)" stroke="rgba(120,120,130,0.5)" strokeWidth="0.8" />
        {/* Inner shadow on body */}
        <rect x="8" y="4" width="48" height="38" rx="4" fill="url(#hd-inner-shadow)" />
        {/* Screen bezel */}
        <rect x="12" y="8" width="40" height="28" rx="2" fill="#222" />
        {/* Screen */}
        <rect x="14" y="10" width="36" height="24" rx="1" fill="url(#hd-screen)" />
        {/* Screen scanline */}
        <rect x="14" y="10" width="36" height="24" rx="1" fill="url(#hd-screen)" opacity="0.8" />
        {/* Screen reflection */}
        <ellipse cx="32" cy="16" rx="16" ry="7" fill="white" opacity="0.25" />
        {/* Power LED */}
        <circle cx="32" cy="39" r="1.2" fill="#28c840" opacity="0.8" />
        {/* Stand neck */}
        <path d="M26 42 L24 50 L40 50 L38 42" fill="url(#hd-body)" stroke="rgba(120,120,130,0.4)" strokeWidth="0.6" />
        {/* Stand base */}
        <ellipse cx="32" cy="51" rx="14" ry="3.5" fill="url(#hd-body)" stroke="rgba(120,120,130,0.4)" strokeWidth="0.6" />
        {/* Gel highlight on body */}
        <ellipse cx="32" cy="10" rx="20" ry="6" fill="white" opacity="0.4" />
        {/* Base highlight */}
        <ellipse cx="32" cy="50" rx="10" ry="2" fill="white" opacity="0.2" />
      </g>
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="#333">
      <path d="M8 12.5a1 1 0 110 2 1 1 0 010-2zM8 8.5c2.2 0 4 1.2 4.8 3l-1.4.8C10.8 11.1 9.5 10.5 8 10.5s-2.8.6-3.4 1.8L3.2 11.5c.8-1.8 2.6-3 4.8-3zm0-4c3.3 0 6.2 1.8 7.7 4.5l-1.4.8C13.1 7.6 10.7 6.5 8 6.5S2.9 7.6 1.7 9.8L.3 9c1.5-2.7 4.4-4.5 7.7-4.5z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg viewBox="0 0 20 16" fill="none" stroke="#333" strokeWidth="1.2">
      <rect x="1" y="4" width="15" height="8" rx="1.5" />
      <rect x="3" y="6" width="10" height="4" rx="0.5" fill="#333" stroke="none" />
      <path d="M16 6.5h2v3h-2" />
    </svg>
  );
}

function InfoCircleIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="info-rg" cx="50%" cy="35%" r="60%">
          <stop offset="0%" stopColor="#5a9cf5" />
          <stop offset="70%" stopColor="#2463B0" />
          <stop offset="100%" stopColor="#1a4fa0" />
        </radialGradient>
        <filter id="info-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>
      <g filter="url(#info-drop)">
        <circle cx="32" cy="32" r="26" fill="url(#info-rg)" stroke="rgba(20,60,130,0.4)" strokeWidth="0.8" />
        {/* Inner shadow */}
        <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(0,0,0,0.15)" strokeWidth="3" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="18" rx="20" ry="12" fill="white" opacity="0.45" />
        {/* "i" serif */}
        <circle cx="32" cy="22" r="3" fill="white" opacity="0.95" />
        <rect x="29" y="28" width="6" height="16" rx="2" fill="white" opacity="0.95" />
        {/* Secondary specular */}
        <ellipse cx="30" cy="20" rx="10" ry="5" fill="white" opacity="0.15" />
      </g>
    </svg>
  );
}

function LoginIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="login-rg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#4ade80" />
          <stop offset="60%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </radialGradient>
        <linearGradient id="login-inner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#0a4020" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#0a4020" stopOpacity="0" />
        </linearGradient>
        <filter id="login-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#0a4020" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#login-drop)">
        <rect x="4" y="4" width="56" height="56" rx="13" fill="url(#login-rg)" stroke="rgba(10,80,40,0.4)" strokeWidth="0.8" />
        <rect x="4" y="4" width="56" height="56" rx="13" fill="url(#login-inner)" />
        {/* Door frame */}
        <rect x="30" y="14" width="18" height="34" rx="2" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
        {/* Door panel detail */}
        <rect x="33" y="18" width="12" height="12" rx="1" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="33" y="33" width="12" height="12" rx="1" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Door handle */}
        <circle cx="35" cy="32" r="1.5" fill="white" opacity="0.7" />
        {/* Arrow entering */}
        <path d="M12 32 L26 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M22 26 L28 32 L22 38" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="14" rx="22" ry="11" fill="white" opacity="0.45" />
        <ellipse cx="28" cy="16" rx="12" ry="5" fill="white" opacity="0.15" />
      </g>
    </svg>
  );
}

function LogoutIcon() {
  return (
    <svg viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="logout-rg" cx="50%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#f87171" />
          <stop offset="60%" stopColor="#ef4444" />
          <stop offset="100%" stopColor="#dc2626" />
        </radialGradient>
        <linearGradient id="logout-inner" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="#500" stopOpacity="0.45" />
          <stop offset="40%" stopColor="#500" stopOpacity="0" />
        </linearGradient>
        <filter id="logout-drop">
          <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodColor="#500" floodOpacity="0.4" />
        </filter>
      </defs>
      <g filter="url(#logout-drop)">
        <rect x="4" y="4" width="56" height="56" rx="13" fill="url(#logout-rg)" stroke="rgba(100,10,10,0.4)" strokeWidth="0.8" />
        <rect x="4" y="4" width="56" height="56" rx="13" fill="url(#logout-inner)" />
        {/* Door frame */}
        <rect x="16" y="14" width="18" height="34" rx="2" fill="rgba(255,255,255,0.2)" stroke="white" strokeWidth="1.5" strokeOpacity="0.7" />
        {/* Door panel detail */}
        <rect x="19" y="18" width="12" height="12" rx="1" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        <rect x="19" y="33" width="12" height="12" rx="1" fill="none" stroke="white" strokeWidth="0.8" strokeOpacity="0.4" />
        {/* Door handle */}
        <circle cx="31" cy="32" r="1.5" fill="white" opacity="0.7" />
        {/* Arrow exiting */}
        <path d="M38 32 L52 32" stroke="white" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
        <path d="M48 26 L54 32 L48 38" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
        {/* Gel highlight */}
        <ellipse cx="32" cy="14" rx="22" ry="11" fill="white" opacity="0.45" />
        <ellipse cx="28" cy="16" rx="12" ry="5" fill="white" opacity="0.15" />
      </g>
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <defs>
        <linearGradient id="folder-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7db8f5" />
          <stop offset="100%" stopColor="#3a7ad5" />
        </linearGradient>
      </defs>
      <path d="M1.5 4.5 h4.5 l1.5 1.2 H14.5 v8.5 h-13 z" fill="url(#folder-g)" stroke="#2a5fa5" strokeWidth="0.5" />
      <ellipse cx="8" cy="6" rx="5" ry="2" fill="white" opacity="0.3" />
    </svg>
  );
}

function DocIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <defs>
        <linearGradient id="doc-g" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" />
          <stop offset="100%" stopColor="#e0e0e0" />
        </linearGradient>
      </defs>
      <path d="M4 1 h6 l3 3 v11 h-9 z" fill="url(#doc-g)" stroke="#aaa" strokeWidth="0.5" />
      <path d="M10 1 v3 h3" fill="none" stroke="#aaa" strokeWidth="0.5" />
      <line x1="5.5" y1="6" x2="10.5" y2="6" stroke="#ccc" strokeWidth="0.7" />
      <line x1="5.5" y1="8" x2="10.5" y2="8" stroke="#ccc" strokeWidth="0.7" />
      <line x1="5.5" y1="10" x2="8.5" y2="10" stroke="#ccc" strokeWidth="0.7" />
    </svg>
  );
}

function GearSmallIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none">
      <defs>
        <radialGradient id="gs-rg" cx="50%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#b0b0b0" />
          <stop offset="100%" stopColor="#707070" />
        </radialGradient>
      </defs>
      <path d="M7 1.5 h2 l.4 1.8a5.2 5.2 0 011.6.7l1.6-.8 1.4 1.4-.8 1.6a5.2 5.2 0 01.7 1.6l1.8.4v2l-1.8.4a5.2 5.2 0 01-.7 1.6l.8 1.6-1.4 1.4-1.6-.8a5.2 5.2 0 01-1.6.7l-.4 1.8h-2l-.4-1.8a5.2 5.2 0 01-1.6-.7l-1.6.8-1.4-1.4.8-1.6a5.2 5.2 0 01-.7-1.6l-1.8-.4v-2l1.8-.4a5.2 5.2 0 01.7-1.6l-.8-1.6 1.4-1.4 1.6.8a5.2 5.2 0 011.6-.7z" fill="url(#gs-rg)" stroke="#666" strokeWidth="0.4" />
      <circle cx="8" cy="8" r="2.5" fill="none" stroke="#555" strokeWidth="0.8" />
    </svg>
  );
}

/* ========== HOOKS ========== */

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
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return time;
}

function useSound() {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const playSound = useCallback((type: 'click' | 'open' | 'close' | 'alert') => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContext();
      }
      const ctx = audioCtxRef.current;

      if (type === 'click' || type === 'alert') {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = type === 'click' ? 600 : 400;
        gain.gain.value = type === 'click' ? 0.1 : 0.08;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + (type === 'click' ? 0.05 : 0.1));
        osc.connect(gain).connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + (type === 'click' ? 0.05 : 0.1));
      } else {
        // white noise for open/close
        const duration = type === 'open' ? 0.2 : 0.1;
        const bufferSize = ctx.sampleRate * duration;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * 0.3;
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 2000;
        const gain = ctx.createGain();
        gain.gain.value = 0.05;
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
        source.connect(filter).connect(gain).connect(ctx.destination);
        source.start();
      }
    } catch {
      // Audio not available
    }
  }, []);

  return playSound;
}

/* ========== MAIN COMPONENT ========== */

export default function AccesoPage() {
  const router = useRouter();
  const clock = useClock();
  const playSound = useSound();

  // Auth state
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);

  // UI state
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showAdminWindow, setShowAdminWindow] = useState(false);
  const [adminWindowAnimating, setAdminWindowAnimating] = useState<'opening' | 'closing' | null>(null);
  const [adminSidebarActive, setAdminSidebarActive] = useState<'projects' | 'articles' | 'config'>('projects');
  const [showAlert, setShowAlert] = useState(false);
  const [selectedDesktopIcon, setSelectedDesktopIcon] = useState<string | null>(null);
  const [bouncingApp, setBouncingApp] = useState<string | null>(null);

  // Refs
  const dragRef = useRef({ isDragging: false, offsetX: 0, offsetY: 0 });
  const windowPosRef = useRef({ x: 0, y: 0 });
  const adminWindowRef = useRef<HTMLDivElement>(null);
  const dockRef = useRef<HTMLDivElement>(null);
  const dockItemsRef = useRef<(HTMLElement | null)[]>([]);

  // Auth check (preserved from original)
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

  // Login handler (preserved)
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
    playSound('open');
  }

  // Logout handler (preserved)
  async function handleLogout() {
    await supabase.auth.signOut();
    setSession(null);
    playSound('close');
  }

  // Close apple menu on outside click
  useEffect(() => {
    if (!showAppleMenu) return;
    function handleClick() { setShowAppleMenu(false); }
    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [showAppleMenu]);

  // Window drag
  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      if (!dragRef.current.isDragging || !adminWindowRef.current) return;
      const x = e.clientX - dragRef.current.offsetX;
      const y = e.clientY - dragRef.current.offsetY;
      windowPosRef.current = { x, y };
      adminWindowRef.current.style.left = `${x}px`;
      adminWindowRef.current.style.top = `${y}px`;
    }

    function handleMouseUp() {
      dragRef.current.isDragging = false;
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  function handleTitleBarMouseDown(e: React.MouseEvent) {
    if (!adminWindowRef.current) return;
    const rect = adminWindowRef.current.getBoundingClientRect();
    dragRef.current = {
      isDragging: true,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
    };
  }

  // Center window on open
  useEffect(() => {
    if (showAdminWindow && adminWindowRef.current) {
      const w = 560;
      const h = 380;
      const x = (window.innerWidth - w) / 2;
      const y = (window.innerHeight - h) / 3;
      windowPosRef.current = { x, y };
      adminWindowRef.current.style.left = `${x}px`;
      adminWindowRef.current.style.top = `${y}px`;
      adminWindowRef.current.style.width = `${w}px`;
      adminWindowRef.current.style.height = `${h}px`;
    }
  }, [showAdminWindow]);

  // Dock magnification
  function handleDockMouseMove(e: React.MouseEvent) {
    const items = dockItemsRef.current;
    items.forEach((el) => {
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);

      let scale = 1;
      if (dist < 30) scale = 1.8;
      else if (dist < 60) scale = 1.4;
      else if (dist < 100) scale = 1.15;

      const iconWrap = el.querySelector('.acceso-dock-item__icon-wrap') as HTMLElement;
      if (iconWrap) {
        iconWrap.style.transform = `scale(${scale})`;
        iconWrap.style.transition = 'transform 0.1s ease-out';
      }
    });
  }

  function handleDockMouseLeave() {
    dockItemsRef.current.forEach((el) => {
      if (!el) return;
      const iconWrap = el.querySelector('.acceso-dock-item__icon-wrap') as HTMLElement;
      if (iconWrap) {
        iconWrap.style.transform = 'scale(1)';
        iconWrap.style.transition = 'transform 0.2s ease-out';
      }
    });
  }

  // App actions
  function bounceAndDo(appName: string, action: () => void) {
    setBouncingApp(appName);
    setTimeout(() => setBouncingApp(null), 800);
    action();
  }

  function openAdmin() {
    bounceAndDo('admin', () => {
      playSound('open');
      setShowAdminWindow(true);
      setAdminWindowAnimating('opening');
      setTimeout(() => setAdminWindowAnimating(null), 300);
    });
  }

  function closeAdminWindow(e?: React.MouseEvent) {
    if (e) e.stopPropagation();
    playSound('close');
    setAdminWindowAnimating('closing');
    setTimeout(() => {
      setShowAdminWindow(false);
      setAdminWindowAnimating(null);
    }, 200);
  }

  function open2laps() {
    bounceAndDo('2laps', () => {
      playSound('click');
      window.open('https://platform.trucoytrufa.es', '_blank');
    });
  }

  function open1000er() {
    bounceAndDo('1000er', () => {
      playSound('alert');
      setShowAlert(true);
    });
  }

  function handleSidebarNav(section: 'projects' | 'articles' | 'config') {
    setAdminSidebarActive(section);
    playSound('click');
    if (section === 'projects') router.push('/admin/projects');
    else if (section === 'articles') router.push('/admin/articles');
  }

  // Click desktop to deselect
  function handleDesktopClick() {
    setSelectedDesktopIcon(null);
    setShowAppleMenu(false);
  }

  // Build dock items list
  const dockItems: Array<{
    key: string;
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
    show: boolean;
    isActive?: boolean;
  }> = [
    { key: 'finder', label: 'Finder', icon: <FinderIcon />, onClick: () => playSound('click'), show: true },
    { key: 'admin', label: 'Admin', icon: <AquaAdminIcon />, onClick: openAdmin, show: isAuth, isActive: showAdminWindow },
    { key: '2laps', label: '2laps', icon: <Aqua2lapsIcon />, onClick: open2laps, show: true },
    { key: '1000er', label: '1000er', icon: <Aqua1000erIcon />, onClick: open1000er, show: true },
  ];

  const authDockItem = isAuth
    ? { key: 'logout', label: 'Salir', icon: <LogoutIcon />, onClick: handleLogout }
    : { key: 'login', label: 'Entrar', icon: <LoginIcon />, onClick: () => { playSound('click'); setShowLogin(true); } };

  if (loading) {
    return (
      <div className="acceso-desktop">
        <div className="acceso-wallpaper" />
      </div>
    );
  }

  let dockIndex = 0;

  return (
    <div className="acceso-desktop" onClick={handleDesktopClick}>
      {/* 1. Wallpaper */}
      <div className="acceso-wallpaper" />

      {/* 2. Menu Bar */}
      <div className="acceso-menubar">
        <div className="acceso-menubar-left">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logos/tyt80s.png" alt="" className="acceso-menubar-retro-logo" draggable={false} />
          <div
            className={`acceso-menubar-logo ${showAppleMenu ? 'active' : ''}`}
            onClick={(e) => { e.stopPropagation(); setShowAppleMenu(!showAppleMenu); }}
          >
            T&T
            {showAppleMenu && (
              <div className="acceso-apple-dropdown">
                <button className="acceso-apple-dropdown-item">Acerca de T&T</button>
                <div className="acceso-apple-dropdown-sep" />
                <button className="acceso-apple-dropdown-item">Preferencias del sistema...</button>
                <div className="acceso-apple-dropdown-sep" />
                {isAuth ? (
                  <button className="acceso-apple-dropdown-item" onClick={handleLogout}>Cerrar sesión</button>
                ) : (
                  <button className="acceso-apple-dropdown-item" onClick={() => setShowLogin(true)}>Iniciar sesión...</button>
                )}
              </div>
            )}
          </div>
          <span className="acceso-menubar-item">Archivo</span>
          <span className="acceso-menubar-item">Edición</span>
          <span className="acceso-menubar-item">Visualización</span>
        </div>
        <div className="acceso-menubar-right">
          <WifiIcon />
          <BatteryIcon />
          <span className="acceso-menubar-clock">{clock}</span>
          <span className="acceso-menubar-user">{userName}</span>
        </div>
      </div>

      {/* 3. Desktop Icon (top-right) */}
      <div className="acceso-desktop-icons">
        <button
          className={`acceso-desktop-icon ${selectedDesktopIcon === 'hd' ? 'selected' : ''}`}
          onClick={(e) => { e.stopPropagation(); playSound('click'); router.push('/'); }}
        >
          <div className="acceso-desktop-icon__img"><MacintoshHDIcon /></div>
          <span className="acceso-desktop-icon__label">Volver a T&T</span>
        </button>
      </div>

      {/* 4. App Grid (center) */}
      <div className={`acceso-app-grid ${!isAuth ? 'two-items' : ''}`}>
        {isAuth && (
          <button className="acceso-app-icon" onDoubleClick={openAdmin} onClick={() => playSound('click')}>
            <div className="acceso-app-icon__img"><AquaAdminIcon /></div>
            <span className="acceso-app-icon__label">Admin</span>
          </button>
        )}
        <button className="acceso-app-icon" onDoubleClick={open2laps} onClick={() => playSound('click')}>
          <div className="acceso-app-icon__img"><Aqua2lapsIcon /></div>
          <span className="acceso-app-icon__label">2laps</span>
        </button>
        <button className="acceso-app-icon" onDoubleClick={open1000er} onClick={() => playSound('click')}>
          <div className="acceso-app-icon__img"><Aqua1000erIcon /></div>
          <span className="acceso-app-icon__label">1000er</span>
        </button>
      </div>

      {/* 5. Admin Window */}
      {showAdminWindow && (
        <div className="acceso-window-overlay">
          <div
            ref={adminWindowRef}
            className={`acceso-window ${adminWindowAnimating === 'opening' ? 'animating-open' : ''} ${adminWindowAnimating === 'closing' ? 'animating-close' : ''}`}
          >
            <div className="acceso-window-titlebar" onMouseDown={handleTitleBarMouseDown}>
              <div className="acceso-window-traffic-lights" onClick={(e) => e.stopPropagation()}>
                <button className="acceso-window-tl acceso-window-tl--red" onClick={closeAdminWindow} onMouseDown={(e) => e.stopPropagation()}>×</button>
                <button className="acceso-window-tl acceso-window-tl--yellow" onMouseDown={(e) => e.stopPropagation()}>−</button>
                <button className="acceso-window-tl acceso-window-tl--green" onMouseDown={(e) => e.stopPropagation()}>+</button>
              </div>
              <span className="acceso-window-title">Admin — T&T</span>
            </div>
            <div className="acceso-window-body">
              <div className="acceso-window-sidebar">
                <div className="acceso-sidebar-section-title">Contenido</div>
                <button
                  className={`acceso-sidebar-item ${adminSidebarActive === 'projects' ? 'active' : ''}`}
                  onClick={() => handleSidebarNav('projects')}
                >
                  <FolderIcon /> Proyectos
                </button>
                <button
                  className={`acceso-sidebar-item ${adminSidebarActive === 'articles' ? 'active' : ''}`}
                  onClick={() => handleSidebarNav('articles')}
                >
                  <DocIcon /> Artículos
                </button>
                <div className="acceso-sidebar-section-title">Sistema</div>
                <button
                  className={`acceso-sidebar-item ${adminSidebarActive === 'config' ? 'active' : ''}`}
                  onClick={() => { setAdminSidebarActive('config'); playSound('click'); }}
                >
                  <GearSmallIcon /> Configuración
                </button>
              </div>
              <div className="acceso-window-content">
                <AquaAdminIcon />
                <p style={{ margin: 0, fontWeight: 600, color: '#333' }}>Panel de Administración</p>
                <p style={{ margin: 0, fontSize: 12 }}>
                  Haz doble clic en una sección del sidebar para navegar
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Alert Modal */}
      {showAlert && (
        <div className="acceso-alert-overlay" onClick={() => setShowAlert(false)}>
          <div className="acceso-alert" onClick={(e) => e.stopPropagation()}>
            <div className="acceso-alert-titlebar">
              <div className="acceso-window-traffic-lights">
                <div className="acceso-window-tl acceso-window-tl--red" />
                <div className="acceso-window-tl acceso-window-tl--yellow" />
                <div className="acceso-window-tl acceso-window-tl--green" />
              </div>
            </div>
            <div className="acceso-alert-body">
              <div className="acceso-alert-icon"><InfoCircleIcon /></div>
              <p className="acceso-alert-title">1000er</p>
              <p className="acceso-alert-message">Esta aplicación estará disponible próximamente.</p>
              <button className="acceso-alert-btn" onClick={() => { setShowAlert(false); playSound('click'); }}>
                OK
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Login Modal */}
      {showLogin && (
        <div className="acceso-login-overlay" onClick={() => setShowLogin(false)}>
          <div className="acceso-login-window" onClick={(e) => e.stopPropagation()}>
            <div className="acceso-login-titlebar">
              <div className="acceso-window-traffic-lights">
                <button className="acceso-window-tl acceso-window-tl--red" onClick={() => setShowLogin(false)}>×</button>
                <div className="acceso-window-tl acceso-window-tl--yellow" />
                <div className="acceso-window-tl acceso-window-tl--green" />
              </div>
              <span className="acceso-login-title">Iniciar sesión</span>
            </div>
            <div className="acceso-login-body">
              <div className="acceso-login-header">
                <h2>T&T Acceso</h2>
                <p>Introduce tus credenciales para continuar</p>
              </div>

              {loginError && <div className="acceso-login-error">{loginError}</div>}

              <form onSubmit={handleLogin}>
                <div className="acceso-login-field">
                  <label>Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="acceso-login-input"
                    required
                    autoFocus
                  />
                </div>
                <div className="acceso-login-field">
                  <label>Contraseña</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="acceso-login-input"
                    required
                  />
                </div>
                <div className="acceso-login-actions">
                  <button type="button" className="acceso-login-btn-cancel" onClick={() => setShowLogin(false)}>
                    Cancelar
                  </button>
                  <button type="submit" disabled={loginLoading} className="acceso-login-btn-submit">
                    {loginLoading ? 'Entrando...' : 'Entrar'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}


      {/* 9. Dock */}
      <div className="acceso-dock-wrapper">
        <div className="acceso-dock-container">
          <div
            ref={dockRef}
            className="acceso-dock"
            onMouseMove={handleDockMouseMove}
            onMouseLeave={handleDockMouseLeave}
          >
            {dockItems.filter(item => item.show).map((item) => {
              const idx = dockIndex++;
              return (
                <button
                  key={item.key}
                  ref={(el) => { dockItemsRef.current[idx] = el; }}
                  className={`acceso-dock-item ${bouncingApp === item.key ? 'bouncing' : ''}`}
                  onClick={item.onClick}
                >
                  <span className="acceso-dock-tooltip">{item.label}</span>
                  <div className="acceso-dock-item__icon-wrap">{item.icon}</div>
                  {item.isActive && <div className="acceso-dock-dot" />}
                </button>
              );
            })}

            <div className="acceso-dock-separator" />

            <button
              ref={(el) => { dockItemsRef.current[dockIndex] = el; }}
              className="acceso-dock-item"
              onClick={authDockItem.onClick}
            >
              <span className="acceso-dock-tooltip">{authDockItem.label}</span>
              <div className="acceso-dock-item__icon-wrap">{authDockItem.icon}</div>
            </button>
          </div>

          {/* Dock reflection */}
          <div className="acceso-dock-reflection">
            {dockItems.filter(item => item.show).map((item) => (
              <div key={item.key} className="acceso-dock-reflection-icon">{item.icon}</div>
            ))}
            <div className="acceso-dock-reflection-sep" />
            <div className="acceso-dock-reflection-icon">{authDockItem.icon}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
