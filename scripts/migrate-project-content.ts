import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// --- Upload helper (same as migrate-projects.ts) ---

async function uploadFile(localPath: string, storagePath: string): Promise<string | null> {
  const absolutePath = path.join(process.cwd(), 'public', localPath);

  if (!fs.existsSync(absolutePath)) {
    console.warn(`  ⚠ Archivo no encontrado: ${absolutePath}`);
    return null;
  }

  const fileBuffer = fs.readFileSync(absolutePath);
  const ext = path.extname(localPath).slice(1).toLowerCase();
  const mimeMap: Record<string, string> = {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    png: 'image/png',
    webp: 'image/webp',
  };

  const { error } = await supabase.storage
    .from('media')
    .upload(storagePath, fileBuffer, {
      contentType: mimeMap[ext] || 'application/octet-stream',
      upsert: true,
    });

  if (error) {
    console.warn(`  ⚠ Error subiendo ${storagePath}: ${error.message}`);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('media')
    .getPublicUrl(storagePath);

  return publicUrl;
}

// --- HTML parsing helpers (regex-based) ---

function extractFeatureText(html: string, heading: string): string | null {
  // Match <div class="feature-stack-item"> containing the heading, then grab the <p>
  const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(
    `<div[^>]*class="feature-stack-item"[^>]*>\\s*<h3>${escaped}</h3>\\s*<p>([\\s\\S]*?)</p>`,
    'i'
  );
  const match = html.match(re);
  return match ? match[1].trim() : null;
}

function extractDisciplines(html: string): { title: string; description: string }[] {
  const disciplines: { title: string; description: string }[] = [];

  // Find the subpage-capabilities section
  const sectionMatch = html.match(
    /<section[^>]*class="subpage-capabilities[^"]*"[^>]*>([\s\S]*?)<\/section>/i
  );
  if (!sectionMatch) return disciplines;

  const section = sectionMatch[1];

  // Extract each capability-card
  const cardRe = /<div[^>]*class="capability-card"[^>]*>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = cardRe.exec(section)) !== null) {
    disciplines.push({
      title: match[1].trim(),
      description: match[2].trim(),
    });
  }

  return disciplines;
}

function extractShowcaseUrl(html: string): string | null {
  // Match .showcase-image with background:url('...')
  const re = /class="showcase-image"[^>]*style="[^"]*background:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i;
  const match = html.match(re);
  return match ? match[1].trim() : null;
}

function extractSplitUrl(html: string): string | null {
  // Match .split-media with background:url('...')
  const re = /class="split-media"[^>]*style="[^"]*background:\s*url\(\s*['"]?([^'")]+)['"]?\s*\)/i;
  const match = html.match(re);
  return match ? match[1].trim() : null;
}

function extractGalleryUrls(html: string): string[] {
  const urls: string[] = [];

  // Find the subpage-gallery section
  const sectionMatch = html.match(
    /<section[^>]*class="subpage-gallery[^"]*"[^>]*>([\s\S]*?)<\/section>/i
  );
  if (!sectionMatch) return urls;

  const section = sectionMatch[1];

  // Extract img src values
  const imgRe = /<img[^>]*src="([^"]+)"[^>]*>/gi;
  let match;
  while ((match = imgRe.exec(section)) !== null) {
    urls.push(match[1].trim());
  }

  return urls;
}

// --- Main migration ---

async function migrate() {
  console.log('=== Migración de contenido estructurado de proyectos ===\n');

  const workDir = path.join(process.cwd(), 'work');
  const entries = fs.readdirSync(workDir, { withFileTypes: true });
  const projectDirs = entries
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .filter((name) => fs.existsSync(path.join(workDir, name, 'index.html')));

  console.log(`Encontrados ${projectDirs.length} proyectos en work/\n`);

  let ok = 0;
  let skip = 0;
  let fail = 0;

  for (const slug of projectDirs) {
    console.log(`── ${slug}`);

    // Check if project exists in Supabase
    const { data: project, error: fetchError } = await supabase
      .from('projects')
      .select('id, slug')
      .eq('slug', slug)
      .single();

    if (fetchError || !project) {
      console.log(`  ⏭ No encontrado en Supabase, saltando`);
      skip++;
      continue;
    }

    // Read HTML
    const htmlPath = path.join(workDir, slug, 'index.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');

    // Extract text fields
    const challenge = extractFeatureText(html, 'El desafío');
    const solution = extractFeatureText(html, 'La solución');
    const result = extractFeatureText(html, 'El resultado');
    const disciplines = extractDisciplines(html);

    console.log(`  Textos: desafío=${challenge ? '✓' : '–'} solución=${solution ? '✓' : '–'} resultado=${result ? '✓' : '–'}`);
    console.log(`  Disciplinas: ${disciplines.length}`);

    // Upload showcase image
    let showcase_image_url: string | null = null;
    const showcaseSrc = extractShowcaseUrl(html);
    if (showcaseSrc) {
      console.log(`  Showcase: ${showcaseSrc}`);
      const storagePath = `projects/showcase/${slug}${path.extname(showcaseSrc)}`;
      showcase_image_url = await uploadFile(showcaseSrc, storagePath);
    }

    // Upload split image
    let split_image_url: string | null = null;
    const splitSrc = extractSplitUrl(html);
    if (splitSrc) {
      console.log(`  Split: ${splitSrc}`);
      const storagePath = `projects/split/${slug}${path.extname(splitSrc)}`;
      split_image_url = await uploadFile(splitSrc, storagePath);
    }

    // Upload gallery images
    const gallerySrcs = extractGalleryUrls(html);
    const gallery_urls: string[] = [];
    if (gallerySrcs.length > 0) {
      console.log(`  Galería: ${gallerySrcs.length} imágenes`);
      for (let i = 0; i < gallerySrcs.length; i++) {
        const src = gallerySrcs[i];
        const storagePath = `projects/gallery/${slug}/${i + 1}${path.extname(src)}`;
        const url = await uploadFile(src, storagePath);
        if (url) gallery_urls.push(url);
      }
    }

    // Update in Supabase
    const updates: Record<string, unknown> = {
      challenge: challenge || null,
      solution: solution || null,
      result: result || null,
      disciplines: disciplines.length > 0 ? disciplines : null,
      gallery_urls: gallery_urls.length > 0 ? gallery_urls : null,
      showcase_image_url,
      split_image_url,
    };

    const { error: updateError } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', project.id);

    if (updateError) {
      console.error(`  ✗ Error actualizando: ${updateError.message}`);
      fail++;
      continue;
    }

    console.log(`  ✓ Actualizado correctamente`);
    ok++;
  }

  console.log(`\n=== Resultado: ${ok} actualizados, ${skip} omitidos, ${fail} errores de ${projectDirs.length} totales ===`);
}

migrate();
