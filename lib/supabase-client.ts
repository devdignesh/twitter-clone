import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

let supabase: SupabaseClient | null = null;

if (supabaseUrl && supabaseKey && supabaseUrl !== "https://<project-ref>.supabase.co" && supabaseKey !== "your_supabase_anon_key_here") {
  try {
    supabase = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: false,
      },
    });
    console.log("✅ Supabase client initialized successfully");
  } catch (error) {
    console.warn("⚠️ Failed to initialize Supabase client:", error);
    console.warn("⚠️ Media upload features will be disabled. Please configure Supabase environment variables.");
  }
} else {
  console.warn("⚠️ Supabase environment variables not configured.");
  console.warn("⚠️ Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in .env file to enable media upload features.");
}

export { supabase };

export const getSupabase = (): SupabaseClient | null => {
  if (!supabase) {
    console.warn("⚠️ Supabase is not configured. Media upload features are disabled.");
  }
  return supabase;
};
