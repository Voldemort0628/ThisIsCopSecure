import { createClient } from './supabase/client'
import { Session } from '@supabase/supabase-js'

class SessionManager {
  private static instance: SessionManager
  private currentSession: Session | null = null
  private supabase = createClient()

  private constructor() {}

  static getInstance(): SessionManager {
    if (!SessionManager.instance) {
      SessionManager.instance = new SessionManager()
    }
    return SessionManager.instance
  }

  async initialize() {
    const { data: { session } } = await this.supabase.auth.getSession()
    this.currentSession = session
    
    // Set up auth state change listener
    this.supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, 'Session:', session?.user?.id)
      this.currentSession = session
    })
  }

  async clearSession() {
    if (typeof window === 'undefined') return

    try {
      // Clear all localStorage
      Object.keys(localStorage).forEach(key => {
        if (key.startsWith('sb-')) {
          localStorage.removeItem(key)
        }
      })

      // Clear session cookies
      document.cookie.split(';').forEach(cookie => {
        document.cookie = cookie
          .replace(/^ +/, '')
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)
      })

      // Sign out from Supabase
      await this.supabase.auth.signOut()
      this.currentSession = null

      // Clear IndexedDB data
      const databases = await window.indexedDB.databases()
      databases.forEach(db => {
        if (db.name) window.indexedDB.deleteDatabase(db.name)
      })

      return true
    } catch (error) {
      console.error('Session clear error:', error)
      throw error
    }
  }

  getCurrentSession(): Session | null {
    return this.currentSession
  }

  getSupabaseClient() {
    return this.supabase;
  }

  onSessionChange(callback: (session: Session | null) => void) {
    const { data: { subscription } } = this.supabase.auth.onAuthStateChange((_, session) => {
      this.currentSession = session;
      callback(session);
    });
    
    return { data: { subscription } };
  }
}

export const sessionManager = SessionManager.getInstance() 