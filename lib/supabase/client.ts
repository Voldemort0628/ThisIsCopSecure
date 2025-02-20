import { createClient as createSupabaseClient } from '@supabase/supabase-js'
import { Database } from './database.types'

let supabaseClient: ReturnType<typeof createSupabaseClient<Database>> | undefined

export const createClient = () => {
  // Only create client in browser environment
  if (typeof window === 'undefined') {
    return createSupabaseClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
          detectSessionInUrl: false
        }
      }
    )
  }

  // Create the singleton client for browser environment
  if (!supabaseClient) {
    supabaseClient = createSupabaseClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        auth: {
          persistSession: true,
          autoRefreshToken: true,
          detectSessionInUrl: false,
          storage: window.localStorage
        }
      }
    )
  }

  return supabaseClient
}