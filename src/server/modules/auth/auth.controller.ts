import { cookies } from 'next/headers'
import { google, lucia } from '@libs/auth'
import { prisma } from '@utils/db'
import { generateCodeVerifier, generateState } from 'arctic'

import { env } from '@/env'

export const createAuthUrl = async () => {
  try {
    const codeVerifier = generateCodeVerifier()
    const state = generateState()
    const scope = ['email', 'profile']
    cookies().set('codeVerifier', codeVerifier, {
      path: '/',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      sameSite: 'lax',
    })
    cookies().set('state', state, {
      path: '/',
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      maxAge: 60 * 10,
      sameSite: 'lax',
    })

    const authUrl = google.createAuthorizationURL(
      state,
      codeVerifier,
      scope,
      env.HOSTED_DOMAIN,
    )
    return { status: 200, url: authUrl.toString() }
  } catch (err) {
    return { status: 500, message: 'Internal Server Error' }
  }
}

export const getGoogleUser = async (req: Request) => {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const hd = url.searchParams.get('hd')

    if (!code || !state || !hd) return { status: 400, message: 'Bad Request' }

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    if (!codeVerifier || !savedState)
      return { status: 400, message: 'codeVerifier or state missed' }

    if (state !== savedState) return { status: 400, message: 'State mismatch' }
    cookies().delete('state')
    const tokens = await google.validateAuthorizationCode(code, codeVerifier)
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${tokens.accessToken()}`,
      },
    })
    const googleData = (await googleResponse.json()) as {
      id: string
      email: string
      name: string
      picture: string
    }
    let userId: string

    const existingUser = await prisma.user.findUnique({
      where: { email: googleData.email },
    })
    if (existingUser) {
      userId = existingUser.id
    } else {
      const user = await prisma.user.create({
        data: {
          email: googleData.email,
          name: googleData.name,
          picture: googleData.picture,
          tag: '',
          key: '',
        },
      })
      userId = user.id
    }
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    return { status: 200, message: 'Login success' }
  } catch (err) {
    return { status: 500, message: 'Internal Server Error' }
  }
}

export const Logout = () => {
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return { status: 200, message: 'Logout success' }
}
