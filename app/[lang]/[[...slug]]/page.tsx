import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getPublishedProjects, getProjectBySlug } from '@/lib/supabase/queries';
import type { Project } from '@/lib/supabase/types';
import { getHeaderHtml, getFooterHtml } from '@/lib/nav';

export const dynamicParams = false;

interface Props {
  params: { lang: string; slug?: string[] };
}

export async function generateStaticParams() {
  const root = process.cwd();
  const results: { lang: string; slug: string[] }[] = [];

  function walk(dir: string, lang: string, prefix: string[]) {
    if (!fs.existsSync(dir)) return;
    if (fs.existsSync(path.join(dir, 'index.html'))) {
      results.push({ lang, slug: prefix });
    }
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      walk(path.join(dir, entry.name), lang, [...prefix, entry.name]);
    }
  }

  const esDirs = [
    'think', 'tech', 'tailor', 'trade', 'talk', 'team',
    'clientes', 'contacto', 'empresa', 'insights', 'marketing', 'work',
    'brand-radar', 'ai-governance', 'aviso-legal', 'cookies', 'privacidad', 'preplay',
  ];
  if (fs.existsSync(path.join(root, 'index.html'))) {
    results.push({ lang: 'es', slug: [] });
  }
  for (const d of esDirs) walk(path.join(root, d), 'es', [d]);

  const enRoot = path.join(root, 'en');
  if (fs.existsSync(path.join(enRoot, 'index.html'))) {
    results.push({ lang: 'en', slug: [] });
  }
  if (fs.existsSync(enRoot)) {
    for (const entry of fs.readdirSync(enRoot, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('.') || entry.name.startsWith('_')) continue;
      walk(path.join(enRoot, entry.name), 'en', [entry.name]);
    }
  }

  try {
    const projects = await getPublishedProjects();
    for (const p of projects) {
      results.push({ lang: 'es', slug: ['work', p.slug] });
      results.push({ lang: 'en', slug: ['work', p.slug] });
    }
  } catch (e) {
    console.warn('generateStaticParams: Supabase unavailable, skipping dynamic project routes', e);
  }

  const seen = new Set<string>();
  return results.filter((r) => {
    const key = `${r.lang}/${r.slug.join('/')}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function getHtmlPath(lang: string, slug: string[]): string {
  const root = process.cwd();
  if (slug.length === 0) {
    return lang === 'en'
      ? path.join(root, 'en', 'index.html')
      : path.join(root, 'index.html');
  }
  return lang === 'en'
    ? path.join(root, 'en', ...slug, 'index.html')
    : path.join(root, ...slug, 'index.html');
}

function extractBody(html: string): string {
  const match = html.match(/<body[^>]*>([\s\S]*)<\/body>/i);
  return match ? match[1] : html;
}

function stripHeader(body: string): string {
  return body.replace(/<header class="header">[\s\S]*?<\/header>/i, '');
}

function stripFooter(body: string): string {
  return body.replace(/<footer class="footer">[\s\S]*?<\/footer>/i, '');
}

function replaceNav(body: string, lang: string, isHomepage: boolean, slug: string[]): string {
  const stripped = stripFooter(stripHeader(body));
  return getHeaderHtml(lang, isHomepage, slug) + stripped + getFooterHtml(lang);
}

function extractBodyClass(html: string): string {
  const match = html.match(/<body[^>]*class="([^"]*)"/i);
  return match ? match[1] : '';
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function buildProjectsGrid(projects: Project[]): string {
  const cards = projects.map((p) => {
    const hasVideo = p.video_url && p.video_url.trim() !== '';
    const imgStyle = hasVideo
      ? ''
      : p.image_url
        ? `background:url('${escapeHtml(p.image_url)}') center/cover no-repeat;`
        : 'background:#e0e0e0;';
    const mediaHtml = hasVideo
      ? `<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;"><source src="${escapeHtml(p.video_url!)}" type="video/mp4"></video>`
      : '';
    const logoHtml = p.client_logo_url
      ? `<div class="badge-icon"><img src="${escapeHtml(p.client_logo_url)}" alt="${escapeHtml(p.client_name)}"></div>`
      : '';

    return `      <a href="/work/${escapeHtml(p.slug)}/" class="project-card-home">
        <div class="project-image"${imgStyle ? ` style="${imgStyle}"` : ''}>
          ${mediaHtml}
          <div class="project-client-badge">
            ${logoHtml}
            <div class="badge-text">
              <span class="badge-name">${escapeHtml(p.client_name)}</span>
              <span class="badge-sector">${escapeHtml(p.category)}</span>
            </div>
          </div>
        </div>
        <div class="project-meta">
          <h3>${escapeHtml(p.title)}</h3>
        </div>
      </a>`;
  });

  return `<section class="subpage-projects">
    <div class="container">
      <div class="projects-grid-home">
${cards.join('\n')}
      </div>
    </div>
  </section>`;
}

function buildProjectsTable(projects: Project[], lang = 'es'): string {
  const rows = projects.map((p) => {
    // Solutions: mostrar disciplinas o vacío
    let solutionsHtml = '';
    if (Array.isArray(p.disciplines) && p.disciplines.length > 0) {
      try {
        const firstDiscipline = escapeHtml(p.disciplines[0].title || '');
        if (p.disciplines.length === 1) {
          solutionsHtml = firstDiscipline;
        } else {
          solutionsHtml = `${firstDiscipline} <span style="color:rgba(10,10,10,0.5);">+${p.disciplines.length - 1}</span>`;
        }
      } catch (e) {
        console.warn(`Error processing disciplines for project ${p.slug}:`, e);
      }
    }

    return `        <div class="work-projects-list-item" data-image="${escapeHtml(p.image_url || '')}" data-video="${escapeHtml(p.video_url || '')}">
          <a href="/work/${escapeHtml(p.slug)}/">
            <div class="work-projects-list-cell">${escapeHtml(p.client_name)}</div>
            <div class="work-projects-list-cell">${escapeHtml(p.title)}</div>
            <div class="work-projects-list-cell">${solutionsHtml}</div>
          </a>
        </div>`;
  }).join('\n');

  return `      <div class="work-projects-list" style="padding: 0 3rem;">
        <div class="work-projects-list-header">
          <p>${lang === 'en' ? 'Client' : 'Cliente'}</p>
          <p>${lang === 'en' ? 'Project' : 'Proyecto'}</p>
          <p>${lang === 'en' ? 'Solutions' : 'Soluciones'}</p>
        </div>
${rows}
      </div>`;
}

function replaceProjectsSection(html: string, projects: Project[], lang = 'es'): string {
  // Only replace table for work page - grid is different structure on homepage vs work page
  const isWorkPage = html.includes('work-projects-list');

  if (isWorkPage) {
    // For work page: replace the table with dynamic data
    const tableRegex = /<div class="work-projects-list"[^>]*>[\s\S]*?(?=<\/div>\s*<\/section>)/i;
    const tableHtml = buildProjectsTable(projects, lang);
    return html.replace(tableRegex, tableHtml);
  } else {
    // For homepage: replace the grid cards with dynamic data
    const gridRegex = /<div class="projects-grid-home">[\s\S]*?<\/div>/i;
    const gridCards = projects.map((p) => {
      const hasVideo = p.video_url && p.video_url.trim() !== '';
      const imgStyle = hasVideo
        ? ''
        : p.image_url
          ? `background:url('${escapeHtml(p.image_url)}') center/cover no-repeat;`
          : 'background:#e0e0e0;';
      const mediaHtml = hasVideo
        ? `<video autoplay muted loop playsinline style="width:100%;height:100%;object-fit:cover;"><source src="${escapeHtml(p.video_url!)}" type="video/mp4"></video>`
        : '';
      const logoHtml = p.client_logo_url
        ? `<div class="badge-icon"><img src="${escapeHtml(p.client_logo_url)}" alt="${escapeHtml(p.client_name)}"></div>`
        : '';

      return `        <a href="/work/${escapeHtml(p.slug)}/" class="project-card-home">
        <div class="project-image"${imgStyle ? ` style="${imgStyle}"` : ''}>
          ${mediaHtml}
          <div class="project-client-badge">
            ${logoHtml}
            <div class="badge-text">
              <span class="badge-name">${escapeHtml(p.client_name)}</span>
              <span class="badge-sector">${escapeHtml(p.category)}</span>
            </div>
          </div>
        </div>
        <div class="project-meta">
          <h3>${escapeHtml(p.title)}</h3>
        </div>
      </a>`;
    }).join('\n');

    const newGridHtml = `<div class="projects-grid-home">

${gridCards}

        </div>`;
    return html.replace(gridRegex, newGridHtml);
  }
}

// --- Dynamic project detail page ---

function getWorkTemplateHtml(lang: string): { header: string; footer: string } | null {
  const root = process.cwd();
  const templatePath = lang === 'en'
    ? path.join(root, 'en', 'work', 'index.html')
    : path.join(root, 'work', 'index.html');

  // Fallback: use any existing work detail page as template source
  const fallbackPath = path.join(root, 'work', 'barcelo-brand-campaign', 'index.html');
  const filePath = fs.existsSync(templatePath) ? templatePath : fallbackPath;
  if (!fs.existsSync(filePath)) return null;

  const html = fs.readFileSync(filePath, 'utf-8');
  const body = extractBody(html);

  // Extract header (everything up to </header> closing + whitespace)
  const headerMatch = body.match(/^([\s\S]*?<\/header>)/i);
  // Extract footer (from <footer to end)
  const footerMatch = body.match(/(<footer[\s\S]*$)/i);

  if (!headerMatch || !footerMatch) return null;
  return { header: headerMatch[1], footer: footerMatch[1] };
}

function buildProjectPage(project: Project, lang: string): string {
  const isEn = lang === 'en';

  const breadcrumbWork = isEn ? 'Work' : 'Trabajo';
  const challengeLabel = isEn ? 'The challenge' : 'El desafío';
  const solutionLabel = isEn ? 'The solution' : 'La solución';
  const resultLabel = isEn ? 'The result' : 'El resultado';
  const disciplinesLabel = isEn ? 'Disciplines applied in this project' : 'Disciplinas aplicadas en este proyecto';
  const ctaHeading = isEn ? 'Your brand,<br>the next success story?' : '¿Tu marca,<br>el próximo caso de éxito?';
  const ctaButton = isEn ? "Let's talk" : 'Hablemos';
  const contactHref = isEn ? '/en/contact/' : '/contacto/';

  const showcaseStyle = project.showcase_image_url
    ? ` style="background:url('${escapeHtml(project.showcase_image_url)}') center/cover no-repeat; min-height:500px; border-radius:8px;"`
    : '';

  const splitStyle = project.split_image_url
    ? ` style="background:url('${escapeHtml(project.split_image_url)}') center/cover no-repeat; min-height:400px; border-radius:8px;"`
    : '';

  // Disciplines section
  let disciplinesHtml = '';
  if (project.disciplines && project.disciplines.length > 0) {
    const cards = project.disciplines.map(d =>
      `        <div class="capability-card">
          <h3>${escapeHtml(d.title)}</h3>
          <p>${escapeHtml(d.description)}</p>
        </div>`
    ).join('\n');

    disciplinesHtml = `
  <section class="subpage-capabilities reveal">
    <div class="container">
      <h2>${disciplinesLabel}</h2>
      <div class="capabilities-grid">
${cards}
      </div>
    </div>
  </section>`;
  }

  // Gallery section (2-column grid)
  let galleryHtml = '';
  if (project.gallery_urls && project.gallery_urls.length > 0) {
    const images = project.gallery_urls.map(url =>
      `        <div class="gallery-item"><img src="${escapeHtml(url)}" alt="" loading="lazy" style="width:100%;height:100%;object-fit:cover;border-radius:8px;"></div>`
    ).join('\n');

    galleryHtml = `
  <section class="subpage-gallery reveal">
    <div class="container">
      <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:1.5rem;">
${images}
      </div>
    </div>
  </section>`;
  }

  return `
  <section class="subpage-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="/"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:20px;vertical-align:middle;"></a> <span>/</span> <a href="/work/">${breadcrumbWork}</a> <span>/</span> <span class="current">${escapeHtml(project.client_name)}</span>
      </nav>
      <h1 style="font-family:'Switzer',sans-serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:600;">${escapeHtml(project.title)}</h1>
    </div>
  </section>

  <section class="subpage-showcase reveal">
    <div class="container">
      <div class="showcase-image"${showcaseStyle}></div>
    </div>
  </section>

  <section class="subpage-split reveal">
    <div class="container">
      <div class="split-grid">
        <div class="feature-stack">
          <div class="feature-stack-item">
            <h3>${challengeLabel}</h3>
            <p>${escapeHtml(project.challenge || '')}</p>
          </div>
          <div class="feature-stack-item">
            <h3>${solutionLabel}</h3>
            <p>${escapeHtml(project.solution || '')}</p>
          </div>
          <div class="feature-stack-item">
            <h3>${resultLabel}</h3>
            <p>${escapeHtml(project.result || '')}</p>
          </div>
        </div>
        <div class="split-media"${splitStyle}></div>
      </div>
    </div>
  </section>
${disciplinesHtml}
${galleryHtml}

  <section class="subpage-split" style="padding: 4rem 0;">
    <div class="container" style="display:flex; justify-content:center; align-items:center;">
      <a href="/work/" style="font-family:'Inter',sans-serif; font-size:0.9rem; color:#888; text-decoration:none;">← ${isEn ? 'All projects' : 'Todos los proyectos'}</a>
    </div>
  </section>

  <section style="background:#F0EDE8; padding: 6rem clamp(2rem,5vw,5rem); text-align:center;">
    <p style="font-family:'Inter',sans-serif; font-size:0.8rem; font-weight:500; color:#0A0A0A; letter-spacing:0.05em; text-transform:uppercase; margin-bottom:2rem;">${isEn ? 'Connect' : 'Contacto'}</p>
    <h2 style="font-family:'Inter',sans-serif; font-size:clamp(2.5rem,7vw,6rem); font-weight:700; color:#0A0A0A; line-height:1.05; margin-bottom:3rem;">${isEn ? 'Like what you see?<br>Contact us.' : '¿Te gusta lo<br>que ves? Contáctanos.'}</h2>
    <div style="display:flex; gap:0.75rem; align-items:center; justify-content:center;">
      <a href="${contactHref}" style="font-family:'Inter',sans-serif; font-size:0.9rem; font-weight:500; color:#FFFFFF; background:#0A0A0A; padding:0.75rem 1.5rem; border-radius:9999px; text-decoration:none;">${ctaButton}</a>
      <a href="${contactHref}" style="display:flex; align-items:center; justify-content:center; width:2.75rem; height:2.75rem; background:#0A0A0A; border-radius:9999px; text-decoration:none; color:#FFFFFF; font-size:1.1rem;">→</a>
    </div>
  </section>`;
}

function isWorkDetailRoute(slug: string[]): boolean {
  return slug.length === 2 && slug[0] === 'work';
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = params;

  // Dynamic project detail page
  if (isWorkDetailRoute(slug)) {
    const project = await getProjectBySlug(slug[1]);
    if (project) {
      return {
        title: `${project.client_name} — ${project.title} | T&T`,
        description: project.description || `${project.title} — ${project.client_name}`,
      };
    }
  }

  const htmlPath = getHtmlPath(lang, slug);
  if (!fs.existsSync(htmlPath)) return {};

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const description = html.match(
    /<meta[^>]*name="description"[^>]*content="([^"]+)"/i
  )?.[1];

  return { title, description };
}

export default async function Page({ params }: Props) {
  const { lang, slug = [] } = params;

  // Dynamic project detail page from Supabase
  if (isWorkDetailRoute(slug)) {
    const project = await getProjectBySlug(slug[1]);
    if (project) {
      const projectContent = buildProjectPage(project, lang);
      const bodyContent = getHeaderHtml(lang, false, slug) + '\n' + projectContent + '\n' + getFooterHtml(lang);
      return <div className="work-page" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
    }
    // Project not found in Supabase — fall through to static HTML
  }

  const htmlPath = getHtmlPath(lang, slug);

  if (!fs.existsSync(htmlPath)) notFound();

  const html = fs.readFileSync(htmlPath, 'utf-8');
  let bodyContent = extractBody(html);
  const bodyClass = extractBodyClass(html);

  // Replace static projects grid with Supabase data (homepage + work page)
  const isHomepage = slug.length === 0;
  const isWorkPage = slug.length === 1 && slug[0] === 'work';
  if (isHomepage || isWorkPage) {
    const projects = await getPublishedProjects();
    if (projects.length > 0) {
      bodyContent = replaceProjectsSection(bodyContent, projects, lang);
    }
  }

  // Strip hardcoded header/footer from static HTML → use shared nav
  bodyContent = replaceNav(bodyContent, lang, isHomepage, slug);

  return <div className={bodyClass} dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
