import { createClient as createSupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create a new Supabase client instance
export function createClient() {
  return createSupabaseClient(supabaseUrl, supabaseAnonKey)
}

// Export a singleton instance for convenience
export const supabase = createClient()
