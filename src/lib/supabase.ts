import { createClient } from "@supabase/supabase-js";

export interface ProfileRecord {
  id: string;
  name: string;
  role: string;
  school_name: string;
  created_at?: string;
  updated_at?: string;
}

let supabaseClient: ReturnType<typeof createClient> | null = null;

function getEnvVar(name: "VITE_SUPABASE_URL" | "VITE_SUPABASE_ANON_KEY") {
  const value = import.meta.env[name];
  if (!value) {
    throw new Error("As variaveis do Supabase nao foram configuradas. Preencha o arquivo .env antes de entrar.");
  }
  return value;
}

export function getSupabaseClient() {
  if (!supabaseClient) {
    supabaseClient = createClient(getEnvVar("VITE_SUPABASE_URL"), getEnvVar("VITE_SUPABASE_ANON_KEY"));
  }

  return supabaseClient;
}
