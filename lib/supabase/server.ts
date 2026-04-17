import { createClient } from '@supabase/supabase-js';

// Cliente de servidor con service_role (bypassa RLS, solo para server-side)
// cache: 'no-store' evita que Next.js cachee las respuestas de Supabase en dev mode
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    global: {
      fetch: (url, options) => fetch(url, { ...options, cache: 'no-store' }),
    },
  }
);
