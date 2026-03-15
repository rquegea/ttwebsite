import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const additionalProjects = [
  {
    title: "ROOF TOP PALACIO DE LOS DUQUES",
    client_name: "Ruinart",
    category: "Luxury & Spirits",
    slug: "ruinart-rooftop",
    client_logo_path: "/favicon/ruinart.png",
    image_path: "/projects/ruinart-rooftop/hero.jpg",
    sort_order: 9
  },
  {
    title: "KELLOGG'S X SINACIO",
    client_name: "Kellogg's",
    category: "FMCG & Food",
    slug: "kelloggs-sinacio",
    client_logo_path: "/favicon/kelloggs.jpg",
    image_path: "/projects/kelloggs-sinacio/hero.jpg",
    sort_order: 10
  },
  {
    title: "MOËT X PHARRELL",
    client_name: "Moët & Chandon",
    category: "Luxury & Spirits",
    slug: "moet-chandon-pharrell",
    client_logo_path: "/favicon/moet.png",
    image_path: "/projects/moet-chandon-pharrell/hero.jpg",
    sort_order: 11
  },
  {
    title: "SNACKIN'",
    client_name: "Campofrío",
    category: "FMCG & Food",
    slug: "campofrio-snackin",
    client_logo_path: "/favicon/campofrio.jpeg",
    image_path: "/projects/campofrio-snackin/hero.jpg",
    sort_order: 12
  }
];

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

async function migrate() {
  console.log('Iniciando migración de proyectos adicionales (batch 2)...\n');

  let ok = 0;
  let fail = 0;

  for (const project of additionalProjects) {
    try {
      console.log(`Procesando: ${project.client_name} - ${project.title}`);

      // Upload imagen principal
      let image_url = '';
      if (project.image_path) {
        const storagePath = `projects/${project.slug}-hero${path.extname(project.image_path)}`;
        const url = await uploadFile(project.image_path, storagePath);
        image_url = url || '';
      } else {
        console.log('  ⏭ Sin imagen (usa video), se omite upload de imagen');
      }

      // Upload logo del cliente
      let client_logo_url: string | null = null;
      if (project.client_logo_path) {
        const storagePath = `logos/${project.slug}-logo${path.extname(project.client_logo_path)}`;
        const url = await uploadFile(project.client_logo_path, storagePath);
        client_logo_url = url;
      }

      // Insertar en la base de datos
      const { error } = await supabase.from('projects').insert({
        title: project.title,
        client_name: project.client_name,
        category: project.category,
        slug: project.slug,
        image_url,
        client_logo_url,
        sort_order: project.sort_order,
        published: true,
      });

      if (error) {
        console.error(`  ✗ Error insertando en DB: ${error.message}`);
        fail++;
        continue;
      }

      console.log(`  Migrado: ${project.client_name} - ${project.title} ✓`);
      ok++;
    } catch (err) {
      console.error(`  ✗ Error inesperado: ${(err as Error).message}`);
      fail++;
    }
  }

  console.log(`\nMigración completada: ${ok} exitosos, ${fail} fallidos de ${additionalProjects.length} totales.`);
}

migrate();
