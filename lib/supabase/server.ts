import { createClient } from '@supabase/supabase-js';

// Cliente de servidor con service_role (bypassa RLS, solo para server-side)
// En production (static export): force-cache para permitir renderizado estático
// En dev: sin cache por defecto para ver cambios inmediatos
const cacheMode = process.env.NODE_ENV === 'production' ? 'force-cache' : undefined;

export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    global: {
      fetch: (url, options) => {
        const fetchOptions = { ...options };
        if (cacheMode) fetchOptions.cache = cacheMode;
        return fetch(url, fetchOptions);
      },
    },
  }
);
