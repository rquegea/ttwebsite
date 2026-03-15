import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const existingProjects = [
  {
    title: "ESCAPARATE EL CORTE INGLÉS",
    client_name: "Moët & Chandon",
    category: "Luxury & Spirits",
    slug: "moet-chandon-escaparate",
    client_logo_path: "/favicon/moet.png",
    image_path: "/projects/moet-chandon-escaparate/hero.jpg",
    sort_order: 1
  },
  {
    title: "TEAMBUILDING",
    client_name: "Lotus",
    category: "FMCG & Snacks",
    slug: "lotus-teambuilding",
    client_logo_path: "/favicon/lotus.png",
    image_path: null,
    sort_order: 2
  },
  {
    title: "CAMPAÑAS DIGITALES",
    client_name: "ROC",
    category: "Entertainment",
    slug: "roc-digital",
    client_logo_path: "/favicon/Roc.png",
    image_path: "/projects/roc-digital/hero.jpg",
    sort_order: 3
  },
  {
    title: "POP UP EL CORTE INGLÉS",
    client_name: "Pancracio",
    category: "FMCG & Gourmet",
    slug: "pancracio-popup",
    client_logo_path: "/favicon/pancracio.jpg",
    image_path: "/projects/pancracio-popup/hero.jpg",
    sort_order: 4
  },
  {
    title: "DOM PÉRIGNON X LADY GAGA",
    client_name: "Dom Pérignon",
    category: "Luxury & Spirits",
    slug: "dom-perignon-lady-gaga",
    client_logo_path: "/favicon/domperignom.png",
    image_path: "/projects/dom-perignon-lady-gaga/hero.jpg",
    sort_order: 5
  },
  {
    title: "DAYS OF PLAY",
    client_name: "PlayStation",
    category: "Entertainment",
    slug: "sony-playstation-days-of-play",
    client_logo_path: "/favicon/playstation.jpg",
    image_path: "/projects/sony-playstation-days-of-play/hero.jpg",
    sort_order: 6
  },
  {
    title: "WELCOME PACK",
    client_name: "Prime",
    category: "Energy & Beverages",
    slug: "prime-welcome-pack",
    client_logo_path: "/favicon/prime.jpg",
    image_path: "/projects/prime-welcome-pack/hero.jpg",
    sort_order: 7
  },
  {
    title: "NEVALIA",
    client_name: "Barceló",
    category: "Hospitality",
    slug: "barcelo-nevalia",
    client_logo_path: "/favicon/barcelo.png",
    image_path: "/projects/barcelo-nevalia/hero.jpg",
    sort_order: 8
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
  console.log('Iniciando migración de proyectos...\n');

  let ok = 0;
  let fail = 0;

  for (const project of existingProjects) {
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

  console.log(`\nMigración completada: ${ok} exitosos, ${fail} fallidos de ${existingProjects.length} totales.`);
}

migrate();
