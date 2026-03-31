import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function main() {
  const { data, error } = await supabase
    .from('projects')
    .update({ video_url: '/lotus-loop.mp4' })
    .eq('slug', 'lotus-teambuilding')
    .select('id, title, slug, video_url');

  if (error) {
    console.error('Error actualizando proyecto:', error.message);
    process.exit(1);
  }

  if (!data || data.length === 0) {
    console.warn('No se encontró el proyecto con slug "lotus-teambuilding"');
    process.exit(1);
  }

  console.log('Proyecto actualizado correctamente:');
  console.log(data[0]);
}

main();
