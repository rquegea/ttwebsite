import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';

const BASE = 'https://www.trucoytrufa.es';

const EXCLUDE = new Set(['coming-soon']);

const ES_TO_EN: Record<string, string> = {
  'clientes': 'clients',
  'contacto': 'contact',
  'empresa': 'company',
  'aviso-legal': 'legal-notice',
  'privacidad': 'privacy',
};

function esToEnParts(esParts: string[]): string[] {
  if (esParts.length === 0) return [];
  const head = ES_TO_EN[esParts[0]] ?? esParts[0];
  return [head, ...esParts.slice(1)];
}

type Freq = 'weekly' | 'monthly';

function getPriority(parts: string[]): number {
  if (parts.length === 0) return 1.0;
  const [head, ...tail] = parts;
  if (['brand-radar', 'preplay', 'ai-governance'].includes(head)) return 0.9;
  if (['think', 'tech', 'tailor', 'trade', 'talk', 'team'].includes(head))
    return tail.length === 0 ? 0.9 : 0.7;
  if (['clientes', 'empresa', 'contacto', 'work'].includes(head))
    return tail.length === 0 ? 0.8 : 0.7;
  if (head === 'insights') return tail.length === 0 ? 0.8 : 0.7;
  if (['aviso-legal', 'cookies', 'privacidad'].includes(head)) return 0.4;
  return 0.7;
}

function getChangeFreq(parts: string[]): Freq {
  if (parts.length === 0) return 'weekly';
  if (parts[0] === 'insights') return 'weekly';
  return 'monthly';
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const root = process.cwd();
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  function enHtmlExists(enParts: string[]): boolean {
    const p = enParts.length === 0
      ? path.join(root, 'en', 'index.html')
      : path.join(root, 'en', ...enParts, 'index.html');
    return fs.existsSync(p);
  }

  function add(esParts: string[], forceEn = false) {
    const esSlug = esParts.join('/');
    const esUrl = esSlug ? `${BASE}/es/${esSlug}/` : `${BASE}/es/`;
    if (seen.has(esUrl)) return;
    seen.add(esUrl);

    const enParts = esToEnParts(esParts);
    const enSlug = enParts.join('/');
    const enUrl = enSlug ? `${BASE}/en/${enSlug}/` : `${BASE}/en/`;
    const hasEn = forceEn || enHtmlExists(enParts);

    const prio = getPriority(esParts);
    const freq = getChangeFreq(esParts);

    const langs: Record<string, string> = { 'es-ES': esUrl, 'x-default': esUrl };
    if (hasEn) langs['en-US'] = enUrl;

    entries.push({ url: esUrl, changeFrequency: freq, priority: prio, alternates: { languages: langs } });
    if (hasEn) {
      entries.push({ url: enUrl, changeFrequency: freq, priority: prio, alternates: { languages: langs } });
    }
  }

  function walk(dir: string, esParts: string[]) {
    if (!fs.existsSync(dir)) return;
    if (esParts.some(p => EXCLUDE.has(p))) return;
    if (fs.existsSync(path.join(dir, 'index.html'))) add(esParts);
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      if (EXCLUDE.has(entry.name)) continue;
      walk(path.join(dir, entry.name), [...esParts, entry.name]);
    }
  }

  // Root homepages
  add([]);

  // Static ES directories (mirrors generateStaticParams esDirs)
  for (const d of [
    'think', 'tech', 'tailor', 'trade', 'talk', 'team',
    'clientes', 'contacto', 'empresa', 'insights', 'marketing', 'work',
    'brand-radar', 'ai-governance', 'aviso-legal', 'cookies', 'privacidad', 'preplay',
  ]) {
    walk(path.join(root, d), [d]);
  }

  // Dynamic work pages from Supabase (always bilingual)
  try {
    const { getPublishedProjects } = await import('@/lib/supabase/queries');
    const projects = await getPublishedProjects();
    for (const p of projects) add(['work', p.slug], true);
  } catch { /* Supabase unavailable — static walk covers pre-rendered work pages */ }

  // Dynamic insight articles from Supabase (always bilingual)
  try {
    const { getPublishedArticles } = await import('@/lib/supabase/queries');
    const articles = await getPublishedArticles();
    for (const a of articles) add(['insights', a.slug], true);
  } catch { /* Supabase unavailable */ }

  return entries;
}
