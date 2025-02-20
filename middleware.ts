import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import type { Database } from '@/lib/supabase/database.types'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const res = NextResponse.next()
  const supabase = createMiddlewareClient<Database>({ req: request, res })
  
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession()

    // Handle sign-out specifically
    if (pathname === '/api/auth/signout') {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/login', request.url))
    }

    // Protect dashboard routes
    if (pathname.startsWith('/dashboard') || pathname.startsWith('/provider-dashboard')) {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }

      // Check if email is verified
      if (!session.user.email_confirmed_at && pathname !== '/auth/verify-email') {
        return NextResponse.redirect(new URL('/auth/verify-email', request.url))
      }

      // Check if provider is accessing provider dashboard
      if (pathname.startsWith('/provider-dashboard')) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role !== 'provider') {
          return NextResponse.redirect(new URL('/dashboard', request.url))
        }
      }

      // Check if user is accessing user dashboard
      if (pathname.startsWith('/dashboard') && !pathname.startsWith('/provider-dashboard')) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        if (profile?.role === 'provider') {
          return NextResponse.redirect(new URL('/provider-dashboard', request.url))
        }
      }
    }

    // Redirect authenticated users from auth pages
    if (pathname.startsWith('/login') || pathname.startsWith('/register')) {
      if (session) {
        if (!session.user.email_confirmed_at) {
          return NextResponse.redirect(new URL('/auth/verify-email', request.url))
        }

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        return NextResponse.redirect(
          new URL(profile?.role === 'provider' ? '/provider-dashboard' : '/dashboard', request.url)
        )
      }
    }

    // Protect verify-email page
    if (pathname === '/auth/verify-email') {
      if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
      }
      if (session.user.email_confirmed_at) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single()

        return NextResponse.redirect(
          new URL(profile?.role === 'provider' ? '/provider-dashboard' : '/dashboard', request.url)
        )
      }
    }
  } catch (error) {
    console.error('Middleware error:', error)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return res
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}