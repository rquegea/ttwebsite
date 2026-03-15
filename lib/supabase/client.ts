import { createClient } from '@supabase/supabase-js';

// Cliente público para el frontend (usa anon key, respeta RLS)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
