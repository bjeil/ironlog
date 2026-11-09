import { createClient, type SupabaseClient } from '@supabase/supabase-js';

/**
 * Supabase-klient for IronLog. URL og publishable anon key leses fra
 * miljøvariabler (VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY, se .env.example).
 * Anon-nøkkelen er offentlig by design — tilgangen styres per bruker via
 * user_id i spørringene (RLS ikke nødvendig, se beslutning i spec).
 */

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export function isSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}

export const supabase: SupabaseClient = createClient(
  SUPABASE_URL ?? 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY ?? 'placeholder-anon-key',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storage: typeof window !== 'undefined' ? window.localStorage : undefined
    }
  }
);
