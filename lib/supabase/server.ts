import { createClient } from '@supabase/supabase-js';

// Cliente de servidor con service_role (bypassa RLS, solo para server-side)
export const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);
