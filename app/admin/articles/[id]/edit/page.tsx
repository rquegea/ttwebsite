import { supabaseAdmin } from '@/lib/supabase/server';
import EditClient from './EditClient';

export const dynamicParams = false;

export async function generateStaticParams() {
  const { data } = await supabaseAdmin.from('articles').select('id');
  const ids = (data ?? []).map((a: { id: string }) => ({ id: a.id }));
  return ids.length > 0 ? ids : [{ id: 'new' }];
}

export default function Page() {
  return <EditClient />;
}
