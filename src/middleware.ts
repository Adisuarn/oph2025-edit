import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import xior from 'xior'
import dedupePlugin from 'xior/plugins/dedupe'

// Middleware function
export async function middleware(request: NextRequest) {
  // Ensure required environment variables are set
  if (!process.env.NEXT_PUBLIC_BASE_URL || !process.env.NEXT_PUBLIC_API_KEY || !process.env.COOKIE_NAME || !process.env.SECRET_LINK) {
    console.error("Missing required environment variables.")
    return NextResponse.redirect(new URL('/', request.url))
  }

  // Initialize Xior instance
  const xiorInstance = xior.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      Authorization: cookies().get(process.env.COOKIE_NAME!)?.value || '', // Handle missing cookie gracefully
    },
  })

  // Use dedupe plugin with logging
  xiorInstance.plugins.use(
    dedupePlugin({
      onDedupe(config) {
        console.log(`Deduped request: ${config.method} ${config.url}`)
      },
    }),
  )

  // Add response interceptors
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

  // Process based on the request URL
  const nextUrl = request.nextUrl

  try {
    // If accessing '/', redirect authenticated users to /account
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

    // If accessing '/error', redirect to the secret link
    if (nextUrl.pathname === '/error') {
      return NextResponse.redirect(new URL(process.env.SECRET_LINK!, request.url))
    }
  } catch (error) {
    console.error('Error in middleware processing:', error)
    // Redirect to home page on error
    return NextResponse.redirect(new URL('/', request.url))
  }
}

// Middleware config to match specific routes
export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
