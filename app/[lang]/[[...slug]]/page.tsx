import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';
import { getPublishedProjects } from '@/lib/supabase/queries';
import type { Project } from '@/lib/supabase/types';

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
    const imgStyle = p.image_url
      ? `background:url('${escapeHtml(p.image_url)}') center/cover no-repeat;`
      : 'background:#e0e0e0;';
    const logoHtml = p.client_logo_url
      ? `<div class="badge-icon"><img src="${escapeHtml(p.client_logo_url)}" alt="${escapeHtml(p.client_name)}"></div>`
      : '';

    return `      <a href="/work/${escapeHtml(p.slug)}/" class="project-card-home">
        <div class="project-image" style="${imgStyle}">
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

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug = [] } = params;
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

  return <div className={bodyClass} dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
