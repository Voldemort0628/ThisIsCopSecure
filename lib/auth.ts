import { createClient } from '@/lib/supabase/client'
import { UserRole } from './supabase/database.types'
import { sessionManager } from './session-manager'

export async function signUp(email: string, password: string, role: UserRole, fullName: string) {
  const supabase = createClient()
  
  // Create the auth user first
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
  })

  if (authError) throw authError
  if (!authData.user) throw new Error('Failed to create user')

  // Create the profile
  const { error: profileError } = await supabase
    .from('profiles')
    .insert({
      id: authData.user.id,
      email,
      full_name: fullName,
      role
    })

  if (profileError) {
    // Clean up auth user if profile creation fails
    await supabase.auth.signOut()
    throw new Error(`Failed to create profile: ${profileError.message}`)
  }

  return authData
}

export async function signIn(email: string, password: string) {
  const supabase = createClient()
  
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) throw error
  if (!data.user) throw new Error('No user returned from authentication')

  // Get profile data
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', data.user.id)
    .single()

  if (profileError) {
    throw new Error(`Failed to fetch profile: ${profileError.message}`)
  }

  return { user: data.user, profile }
}

export async function signOut() {
  if (typeof window === 'undefined') return

  try {
    // Clear all session data
    await sessionManager.clearSession()

    // Force a clean reload
    window.location.href = '/login'
  } catch (error) {
    console.error('Sign out error:', error)
    // Force reload even on error
    window.location.href = '/login'
  }
}