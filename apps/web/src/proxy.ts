import { type NextRequest, NextResponse } from 'next/server'
import { EnumTokens } from '@/features/auth/lib/auth.helpers'
import { PUBLIC_URL } from '@/shared/config/url.config'

export async function proxy(request: NextRequest) {
  const refreshToken = request.cookies.get(EnumTokens.REFRESH_TOKEN)?.value

  const isAuthPage = request.url.includes(PUBLIC_URL.auth())

  if (isAuthPage) {
    if (refreshToken) {
      return NextResponse.redirect(new URL(PUBLIC_URL.user(), request.url))
    }

    return NextResponse.next()
  }

  if (refreshToken === undefined) {
    return NextResponse.redirect(new URL(PUBLIC_URL.auth(), request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/user/:path*', '/auth', '/admin/:path*'],
}
