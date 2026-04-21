import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getPublishedProjects, getProjectBySlug, getPublishedArticles, getArticleBySlug, getLatestArticles, getRelatedArticles } from '@/lib/supabase/queries';
import type { Project, Article } from '@/lib/supabase/types';
import { getHeaderHtml, getFooterHtml, getAltLangUrl } from '@/lib/nav';

const SITE_BASE = 'https://www.trucoytrufa.es';

function computeAlternates(lang: string, slug: string[], alwaysBilingual = false) {
  const root = process.cwd();
  const slugPath = slug.join('/');
  const selfUrl = slugPath ? `${SITE_BASE}/${lang}/${slugPath}/` : `${SITE_BASE}/${lang}/`;
  const altRelUrl = getAltLangUrl(lang, slug);
  const altUrl = `${SITE_BASE}${altRelUrl}`;
  const esUrl = lang === 'es' ? selfUrl : altUrl;
  const enUrl = lang === 'en' ? selfUrl : altUrl;

  let bilingual: boolean;
  if (alwaysBilingual) {
    bilingual = true;
  } else if (lang === 'es') {
    const enParts = altRelUrl.replace(/^\/en\/?/, '').replace(/\/$/, '').split('/').filter(Boolean);
    const enHtml = enParts.length === 0
      ? path.join(root, 'en', 'index.html')
      : path.join(root, 'en', ...enParts, 'index.html');
    bilingual = fs.existsSync(enHtml);
  } else {
    const esParts = altRelUrl.replace(/^\/es\/?/, '').replace(/\/$/, '').split('/').filter(Boolean);
    const esHtml = esParts.length === 0
      ? path.join(root, 'index.html')
      : path.join(root, ...esParts, 'index.html');
    bilingual = fs.existsSync(esHtml);
  }

  const languages: Record<string, string> = bilingual
    ? { 'es-ES': esUrl, 'en-US': enUrl, 'x-default': esUrl }
    : lang === 'es'
      ? { 'es-ES': selfUrl, 'x-default': selfUrl }
      : { 'en-US': selfUrl, 'x-default': selfUrl };

  return { canonical: selfUrl, languages };
}

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

  // Always generate /es/ and /en/ root pages
  results.push({ lang: 'es', slug: [] });
  results.push({ lang: 'en', slug: [] });

  const esDirs = [
    'think', 'tech', 'tailor', 'trade', 'talk', 'team',
    'clientes', 'contacto', 'empresa', 'insights', 'marketing', 'work',
    'brand-radar', 'ai-governance', 'aviso-legal', 'cookies', 'privacidad', 'preplay',
  ];
  for (const d of esDirs) walk(path.join(root, d), 'es', [d]);

  const enRoot = path.join(root, 'en');
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

  try {
    const articles = await getPublishedArticles();
    for (const a of articles) {
      results.push({ lang: 'es', slug: ['insights', a.slug] });
      results.push({ lang: 'en', slug: ['insights', a.slug] });
    }
  } catch (e) {
    console.warn('generateStaticParams: Supabase unavailable, skipping article routes', e);
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

function buildProjectsGrid(projects: Project[], lang = 'es'): string {
  const workBase = lang === 'en' ? '/en/work/' : '/work/';
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

    const cardTitle = lang === 'en' ? (p.title_en || p.title) : p.title;
    return `      <a href="${workBase}${escapeHtml(p.slug)}/" class="project-card-home">
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
          <h3>${escapeHtml(cardTitle)}</h3>
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
  const workBase = lang === 'en' ? '/en/work/' : '/work/';
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

    const rowTitle = lang === 'en' ? (p.title_en || p.title) : p.title;
    return `        <div class="work-projects-list-item" data-image="${escapeHtml(p.image_url || '')}" data-video="${escapeHtml(p.video_url || '')}">
          <a href="${workBase}${escapeHtml(p.slug)}/">
            <div class="work-projects-list-cell">${escapeHtml(p.client_name)}</div>
            <div class="work-projects-list-cell">${escapeHtml(rowTitle)}</div>
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
    const workBase = lang === 'en' ? '/en/work/' : '/work/';
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

      const homeCardTitle = lang === 'en' ? (p.title_en || p.title) : p.title;
      return `        <a href="${workBase}${escapeHtml(p.slug)}/" class="project-card-home">
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
          <h3>${escapeHtml(homeCardTitle)}</h3>
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
  const homeHref = isEn ? '/en/' : '/';
  const workHref = isEn ? '/en/work/' : '/work/';

  const showcaseStyle = project.showcase_image_url
    ? ` style="background:url('${escapeHtml(project.showcase_image_url)}') center/cover no-repeat; min-height:500px; border-radius:8px;"`
    : '';

  const splitStyle = project.split_image_url
    ? ` style="background:url('${escapeHtml(project.split_image_url)}') center/cover no-repeat; min-height:400px; border-radius:8px;"`
    : '';

  const title = isEn ? (project.title_en || project.title) : project.title;
  const challenge = isEn ? (project.challenge_en || project.challenge) : project.challenge;
  const solution = isEn ? (project.solution_en || project.solution) : project.solution;
  const result = isEn ? (project.result_en || project.result) : project.result;
  const activeDisciplines = isEn ? (project.disciplines_en || project.disciplines) : project.disciplines;

  // Disciplines section
  let disciplinesHtml = '';
  if (activeDisciplines && activeDisciplines.length > 0) {
    const cards = activeDisciplines.map(d =>
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

    const gridCols = project.gallery_urls!.length === 1 ? '1fr' : 'repeat(2,1fr)';
    galleryHtml = `
  <section class="subpage-gallery reveal">
    <div class="container">
      <div style="display:grid;grid-template-columns:${gridCols};gap:1.5rem;">
${images}
      </div>
    </div>
  </section>`;
  }

  return `
  <section class="subpage-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${homeHref}"><img src="/logos/tytnuevologo.png" alt="T&T" style="height:20px;vertical-align:middle;"></a> <span>/</span> <a href="${workHref}">${breadcrumbWork}</a> <span>/</span> <span class="current">${escapeHtml(project.client_name)}</span>
      </nav>
      <h1 style="font-family:'Switzer',sans-serif;font-size:clamp(2.8rem,6vw,4.5rem);font-weight:600;">${escapeHtml(title)}</h1>
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
            <p>${escapeHtml(challenge || '')}</p>
          </div>
          <div class="feature-stack-item">
            <h3>${solutionLabel}</h3>
            <p>${escapeHtml(solution || '')}</p>
          </div>
          <div class="feature-stack-item">
            <h3>${resultLabel}</h3>
            <p>${escapeHtml(result || '')}</p>
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
      <a href="${workHref}" style="font-family:'Inter',sans-serif; font-size:0.9rem; color:#888; text-decoration:none;">← ${isEn ? 'All projects' : 'Todos los proyectos'}</a>
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

function isInsightsDetailRoute(slug: string[]): boolean {
  return slug.length === 2 && slug[0] === 'insights';
}

function isInsightsListRoute(slug: string[]): boolean {
  return slug.length === 1 && slug[0] === 'insights';
}

function formatArticleDate(iso: string | null, lang: string): string {
  if (!iso) return '';
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(lang === 'en' ? 'en-US' : 'es-ES', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  } catch {
    return '';
  }
}

function articleHref(article: Article, lang: string): string {
  return lang === 'en' ? `/en/insights/${article.slug}/` : `/insights/${article.slug}/`;
}

function buildJournalCards(articles: Article[], lang: string): string {
  const readLabel = lang === 'en' ? 'Read now' : 'Leer ahora';
  const byLabel = lang === 'en' ? 'By' : 'Por';
  return articles.map((a) => {
    const imgHtml = a.image_url
      ? `<img src="${escapeHtml(a.image_url)}" alt="${escapeHtml(a.title)}" loading="lazy">`
      : `<div class="journal-card-image-placeholder"></div>`;
    const excerpt = a.excerpt ? `<p class="journal-card-excerpt">${escapeHtml(a.excerpt)}</p>` : '';
    const date = formatArticleDate(a.published_at, lang);
    return `        <a href="${articleHref(a, lang)}" class="journal-card">
          <div class="journal-card-image">${imgHtml}</div>
          <div class="journal-card-body">
            <h3 class="journal-card-title">${escapeHtml(a.title)}</h3>
            ${excerpt}
            <div class="journal-card-meta">${byLabel} ${escapeHtml(a.author)}${date ? ` · ${date}` : ''}</div>
            <span class="journal-card-cta">${readLabel} →</span>
          </div>
        </a>`;
  }).join('\n');
}

function replaceJournalGrid(html: string, articles: Article[], lang: string): string {
  const gridRegex = /(<div class="journal-grid-inner">)([\s\S]*?)(<\/div>)/i;
  if (!gridRegex.test(html)) return html;
  const cards = articles.length
    ? buildJournalCards(articles, lang)
    : `        <p class="journal-empty">${lang === 'en' ? 'More articles coming soon.' : 'Próximamente nuevos artículos.'}</p>`;
  return html.replace(gridRegex, `$1\n${cards}\n      $3`);
}

function buildHomepageArticleCards(articles: Article[], lang: string): string {
  const defaultLabel = lang === 'en' ? 'Article' : 'Artículo';
  const byLabel = lang === 'en' ? 'By' : 'Por';
  return articles.slice(0, 3).map((a) => {
    const imgHtml = a.image_url
      ? `<div class="article-image-wrapper" style="background: #E0E0E0;"><img src="${escapeHtml(a.image_url)}" alt="${escapeHtml(a.title)}" loading="lazy" style="width:100%;height:100%;object-fit:cover;"></div>`
      : `<div class="article-image-wrapper" style="background: #E0E0E0;"></div>`;
    const date = formatArticleDate(a.published_at, lang);
    return `        <a href="${articleHref(a, lang)}" class="article-card">
          ${imgHtml}
          <span class="article-label">${defaultLabel}</span>
          <h3 class="article-title">${escapeHtml(a.title)}</h3>
          <p class="article-meta">${byLabel} ${escapeHtml(a.author)}${date ? ` · ${date}` : ''}</p>
        </a>`;
  }).join('\n');
}

function replaceHomepageArticles(html: string, articles: Article[], lang: string): string {
  if (!articles.length) return html;
  const gridRegex = /(<div class="articles-grid">)[\s\S]*?(<\/div>\s*<\/div>\s*<\/section>)/i;
  if (!gridRegex.test(html)) return html;
  const cards = buildHomepageArticleCards(articles, lang);
  return html.replace(gridRegex, `$1\n${cards}\n      $2`);
}

function buildArticleDetailPage(article: Article, related: Article[], lang: string): string {
  const isEn = lang === 'en';
  const breadcrumbInsights = isEn ? 'Insights' : 'Insights';
  const breadcrumbHome = isEn ? 'Home' : 'Inicio';
  const shareLabel = isEn ? 'Share' : 'Compartir';
  const relatedLabel = isEn ? 'You may also like' : 'También te puede interesar';
  const byLabel = isEn ? 'By' : 'Por';
  const homeHref = isEn ? '/en/' : '/';
  const insightsHref = isEn ? '/en/insights/' : '/insights/';
  const date = formatArticleDate(article.published_at, lang);

  const shareUrl = `https://www.trucoytrufa.es${articleHref(article, lang)}`;
  const linkedinShare = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
  const xShare = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`;

  const heroImg = article.image_url
    ? `<div class="article-hero-image" style="background:url('${escapeHtml(article.image_url)}') center/cover no-repeat;"></div>`
    : '';

  const relatedHtml = related.length
    ? `\n  <section class="article-related">
    <div class="container">
      <h2>${relatedLabel}</h2>
      <div class="journal-grid-inner">
${buildJournalCards(related, lang)}
      </div>
    </div>
  </section>`
    : '';

  const contentHtml = article.content || (article.excerpt ? `<p>${escapeHtml(article.excerpt)}</p>` : '');

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt || '',
    image: article.image_url || undefined,
    author: { '@type': 'Person', name: article.author },
    datePublished: article.published_at || undefined,
    publisher: {
      '@type': 'Organization',
      name: 'T&T',
      logo: { '@type': 'ImageObject', url: 'https://www.trucoytrufa.es/logos/tytnuevologo.png' },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': shareUrl },
  };

  return `
  <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  <section class="article-hero">
    <div class="container">
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a href="${homeHref}">${breadcrumbHome}</a> <span>/</span>
        <a href="${insightsHref}">${breadcrumbInsights}</a> <span>/</span>
        <span class="current">${escapeHtml(article.title)}</span>
      </nav>
      <h1 class="article-hero-title">${escapeHtml(article.title)}</h1>
      <div class="article-hero-meta">
        <span>${byLabel} ${escapeHtml(article.author)}</span>${date ? `<span class="article-meta-sep">·</span><span>${date}</span>` : ''}
      </div>
    </div>
  </section>
  ${heroImg}
  <section class="article-body">
    <div class="container article-body-container">
      <div class="article-content">
        ${contentHtml}
      </div>
      <aside class="article-share">
        <span class="article-share-label">${shareLabel}</span>
        <a href="${linkedinShare}" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
        <a href="${xShare}" target="_blank" rel="noopener" aria-label="X">X</a>
        <button type="button" class="article-share-copy" data-copy-url="${escapeHtml(shareUrl)}" aria-label="${isEn ? 'Copy link' : 'Copiar enlace'}">🔗</button>
      </aside>
    </div>
  </section>${relatedHtml}`;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = params;
  const alternates = computeAlternates(lang, slug);

  // Dynamic project detail page
  if (isWorkDetailRoute(slug)) {
    const project = await getProjectBySlug(slug[1]);
    if (project) {
      const isEn = lang === 'en';
      const projectTitle = isEn ? (project.title_en || project.title) : project.title;
      const projectDesc = isEn ? (project.description_en || project.description) : project.description;
      return {
        title: `${project.client_name} — ${projectTitle} | T&T`,
        description: projectDesc || `${projectTitle} — ${project.client_name}`,
        alternates: computeAlternates(lang, slug, true),
      };
    }
  }

  // Dynamic article detail page
  if (isInsightsDetailRoute(slug)) {
    const article = await getArticleBySlug(slug[1]);
    if (article) {
      const description = article.excerpt || `${article.title} — T&T`;
      return {
        title: `${article.title} | T&T`,
        description,
        openGraph: {
          title: article.title,
          description,
          type: 'article',
          images: article.image_url ? [article.image_url] : undefined,
        },
        alternates: computeAlternates(lang, slug, true),
      };
    }
  }

  const htmlPath = getHtmlPath(lang, slug);
  if (!fs.existsSync(htmlPath)) return { alternates };

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const title = html.match(/<title>([^<]*)<\/title>/i)?.[1];
  const description = html.match(
    /<meta[^>]*name="description"[^>]*content="([^"]+)"/i
  )?.[1];

  return { title, description, alternates };
}

export default async function Page({ params }: Props) {
  const { lang, slug = [] } = params;

  // Dynamic project detail page from Supabase
  if (isWorkDetailRoute(slug)) {
    // For EN routes: prefer static HTML if it exists (already translated)
    // Only use Supabase dynamic rendering if no static file is present
    if (lang === 'en') {
      const staticPath = getHtmlPath(lang, slug);
      if (!fs.existsSync(staticPath)) {
        const project = await getProjectBySlug(slug[1]);
        if (project) {
          const projectContent = buildProjectPage(project, lang);
          const bodyContent = getHeaderHtml(lang, false, slug) + '\n' + projectContent + '\n' + getFooterHtml(lang);
          return <div className="work-page" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
        }
      }
      // Static file exists — fall through to static HTML handling below
    } else {
      const project = await getProjectBySlug(slug[1]);
      if (project) {
        const projectContent = buildProjectPage(project, lang);
        const bodyContent = getHeaderHtml(lang, false, slug) + '\n' + projectContent + '\n' + getFooterHtml(lang);
        return <div className="work-page" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
      }
      // Project not found in Supabase — fall through to static HTML
    }
  }

  // Dynamic article detail page from Supabase
  if (isInsightsDetailRoute(slug)) {
    const article = await getArticleBySlug(slug[1]);
    if (!article) notFound();
    const related = await getRelatedArticles(article.slug, 3);
    const articleContent = buildArticleDetailPage(article, related, lang);
    const bodyContent = getHeaderHtml(lang, false, slug) + '\n' + articleContent + '\n' + getFooterHtml(lang);
    return <div className="light-theme article-page" dangerouslySetInnerHTML={{ __html: bodyContent }} />;
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

  // Homepage: inject latest articles into .articles-grid
  if (isHomepage) {
    const latest = await getLatestArticles(3);
    if (latest.length > 0) {
      bodyContent = replaceHomepageArticles(bodyContent, latest, lang);
    }
  }

  // /insights/ listing: inject articles into .journal-grid-inner
  if (isInsightsListRoute(slug)) {
    const articles = await getPublishedArticles();
    bodyContent = replaceJournalGrid(bodyContent, articles, lang);
  }

  // Strip hardcoded header/footer from static HTML → use shared nav
  bodyContent = replaceNav(bodyContent, lang, isHomepage, slug);

  const finalClass = isWorkDetailRoute(slug) ? 'work-page' : bodyClass;
  return <div className={finalClass} dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
