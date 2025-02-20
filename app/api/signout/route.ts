import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  const cookieStore = cookies()
  
  // Clear auth cookies
  cookieStore.delete('sb-access-token')
  cookieStore.delete('sb-refresh-token')
  
  return new NextResponse(null, { status: 200 })
} 