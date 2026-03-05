import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import fs from 'fs';
import path from 'path';

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

export default function Page({ params }: Props) {
  const { lang, slug = [] } = params;
  const htmlPath = getHtmlPath(lang, slug);

  if (!fs.existsSync(htmlPath)) notFound();

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const bodyContent = extractBody(html);

  return <div dangerouslySetInnerHTML={{ __html: bodyContent }} />;
}
