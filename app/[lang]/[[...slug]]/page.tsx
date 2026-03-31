import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getPublishedProjects, getProjectBySlug } from '@/lib/supabase/queries';
import type { Project } from '@/lib/supabase/types';
import { getHeaderHtml, getFooterHtml } from '@/lib/nav';

export const revalidate = 60;

interface Props {
  params: { lang: string; slug?: string[] };
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

function replaceNav(body: string, lang: string, isHomepage: boolean): string {
  const stripped = stripFooter(stripHeader(body));
  return getHeaderHtml(lang, isHomepage) + stripped + getFooterHtml(lang);
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

function replaceProjectsSection(html: string, projects: Project[]): string {
  const regex = /<section\s+class="subpage-projects"[\s\S]*?<\/section>/i;
  const newSection = buildProjectsGrid(projects);
  return html.replace(regex, newSection);
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

  <section class="subpage-split" style="background:#FAFAFA; padding: 4rem 0;">
    <div class="container" style="display:flex; justify-content:center; align-items:center;">
      <a href="/work/" style="font-family:'Inter',sans-serif; font-size:0.9rem; color:#888; text-decoration:none;">← ${isEn ? 'All projects' : 'Todos los proyectos'}</a>
    </div>
  </section>

  <section class="cta-banner cta-banner--light">
    <div class="cta-banner-container container">
      <h2>${ctaHeading}</h2>
      <a href="${contactHref}" class="cta-primary cta-primary--dark" style="display:inline-block; text-decoration:none;">${ctaButton}</a>
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
      const template = getWorkTemplateHtml(lang);
      const projectContent = buildProjectPage(project, lang);

      if (template) {
        const bodyContent = template.header + '\n' + projectContent + '\n' + template.footer;
        return <div className="light-theme" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
      }

      // No template available — render content sections only
      return <div className="light-theme" dangerouslySetInnerHTML={{ __html: projectContent }} />;
    }
    // Project not found in Supabase — fall through to static HTML
  }

  const htmlPath = getHtmlPath(lang, slug);

  if (!fs.existsSync(htmlPath)) notFound();

  const html = fs.readFileSync(htmlPath, 'utf-8');
  let bodyContent = extractBody(html);
  const bodyClass = extractBodyClass(html);

  // Homepage: replace static projects grid with Supabase data
  const isHomepage = slug.length === 0;
  if (isHomepage) {
    const projects = await getPublishedProjects();
    if (projects.length > 0) {
      bodyContent = replaceProjectsSection(bodyContent, projects);
    }
  }

  // Strip hardcoded header/footer from static HTML → use shared nav
  bodyContent = replaceNav(bodyContent, lang, isHomepage);

  return <div className={bodyClass} dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
