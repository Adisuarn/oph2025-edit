import type { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import xior from 'xior'
import dedupePlugin from 'xior/plugins/dedupe'

export async function middleware(request: NextRequest) {
  const xiorInstance = xior.create({
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY!,
      Authorization: cookies().get(process.env.COOKIE_NAME!)?.value,
    },
  })
  xiorInstance.plugins.use(
    dedupePlugin({
      onDedupe(config) {
        console.log(`Deduped ${config.method}, ${config.url}`)
      },
    }),
  )
  xiorInstance.interceptors.response.use(
    (result) => {
      const { data, request: config, response: originalResponse } = result
      return result
    },
    async (error) => {
      if (error instanceof TypeError) {
        console.log(`Request error:`, error)
      }
      if (error?.response?.status === 401) {
        return { status: 401, body: 'Unauthorized' }
      }
      return Promise.reject(error)
    },
  )
  const nextUrl = request.nextUrl

  if (nextUrl.pathname === '/') {
    const response = await xiorInstance.get('/user')
    if (response.status === 200) return NextResponse.redirect(new URL('/account', request.url))
  }

  // if (nextUrl.pathname === '/account') {
  //   const response = await xiorInstance.get('/user')
  //   if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
  // }

  if (nextUrl.pathname === '/account/forms') {
    const response = await xiorInstance.get('/user')
    if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
    if (response.data.tag !== '' || response.data.key !== '')
      return NextResponse.redirect(new URL('/account', request.url))
  }

  if (nextUrl.pathname === '/account/dashboard') {
    const response = await xiorInstance.get('/user')
    if (response.status === 401) return NextResponse.redirect(new URL('/', request.url))
    if (response.data.TUCMC === false)
      return NextResponse.redirect(new URL('/error/403', request.url))
  }

  if (nextUrl.pathname === '/error')
    return NextResponse.redirect(new URL(process.env.SECRET_LINK!, request.url))
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
