import { supabaseAdmin } from '@/lib/supabase/server';
import EditClient from './EditClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await supabaseAdmin.from('projects').select('id');
  const ids = (data ?? []).map((p: { id: string }) => ({ id: p.id }));
  return ids.length > 0 ? ids : [{ id: 'new' }];
}

export default function Page() {
  return <EditClient />;
}
