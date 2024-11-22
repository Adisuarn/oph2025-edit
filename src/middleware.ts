import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import xior from 'xior'
import dedupePlugin from 'xior/plugins/dedupe'

// Middleware function
export async function middleware(request: NextRequest) {

  if (
    !process.env.NEXT_PUBLIC_BASE_URL ||
    !process.env.NEXT_PUBLIC_API_KEY ||
    !process.env.NEXT_PUBLIC_COOKIE_NAME ||
    !process.env.NEXT_PUBLIC_SECRET_LINK
  ) {
    console.error('Missing required environment variables.')
    return NextResponse.redirect(new URL('/', request.url))
  }

  const xiorInstance = xior.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
      Authorization: cookies().get(process.env.NEXT_PUBLIC_COOKIE_NAME)?.value || '',
    },
  })

  xiorInstance.plugins.use(
    dedupePlugin({
      onDedupe(config) {
        console.log(`Deduped request: ${config.method} ${config.url}`)
      },
    }),
  )

  xiorInstance.interceptors.response.use(
    (result) => result,
    async (error) => {
      if (error instanceof TypeError) {
        console.log(`Request error:`, error)
      }
      if (error?.response?.status === 401) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
      }
      return Promise.reject(error)
    },
  )

  const nextUrl = request.nextUrl

  try {
    
    if (nextUrl.pathname === '/') {
      const response = await xiorInstance.get('/user')
      if (response.status === 200) return NextResponse.redirect(new URL('/account', request.url))
    }

    // If accessing '/account', redirect unauthenticated users to '/'
    if (nextUrl.pathname === '/account') {
      const response = await xiorInstance.get('/user')
      if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
    }

    // If accessing '/account/forms', redirect based on user data
    if (nextUrl.pathname === '/account/forms') {
      const response = await xiorInstance.get('/user')
      if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
      if (response.data?.tag !== '' || response.data?.key !== '') {
        return NextResponse.redirect(new URL('/account', request.url))
      }
    }

    // If accessing '/account/dashboard', redirect if user lacks TUCMC permission
    if (nextUrl.pathname === '/account/dashboard') {
      const response = await xiorInstance.get('/user')
      if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
      if (response.data?.TUCMC === false) {
        return NextResponse.redirect(new URL('/error/403', request.url))
      }
    }

    if (nextUrl.pathname === '/error') {
      return NextResponse.redirect(new URL(process.env.NEXT_PUBLIC_SECRET_LINK, request.url))
    }
  } catch (error) {
    console.error('Error in middleware processing:', error)
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
