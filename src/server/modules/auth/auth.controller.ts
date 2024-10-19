import { google, lucia } from "@libs/auth";
import { prisma } from '@utils/db'
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { error } from 'elysia'

export const createAuthUrl = () => {
  try {
    const codeVerifier = generateCodeVerifier();
    const state = generateState();
    const scope = ['email', 'profile']
    cookies().set("codeVerifier", codeVerifier, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });
    cookies().set("state", state, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })

    const authUrl = google.createAuthorizationURL(state, codeVerifier, scope, process.env.HOSTED_DOMAIN);
    return { success: true, url: authUrl.toString()}
    
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
}

export const getGoogleUser = async (req: Request) => {
  try {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const hd = url.searchParams.get('hd')


    if(!code || !state || !hd) 
      throw error(400, 'Invalid request')

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    if(!codeVerifier || !savedState)
      throw error(404, 'Code or State Not Found')

    if(state !== savedState) 
      throw error(400, 'State mismatch')

    const tokens = await google.validateAuthorizationCode(code, codeVerifier)
    const accessToken = tokens.accessToken()
    const googleResponse = await fetch('https://www.googleapis.com/oauth2/v1/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    })
    const googleData = (await googleResponse.json()) as {
      id: string,
      email: string,
      name: string,
      picture: string
    }

    let userId: string
    
    const existingUser = await prisma.user.findUnique({
      where: { email: googleData.email }
    })
    if(existingUser) {
      userId = existingUser.id
    } else {
      const user = await prisma.user.create({
        data: {
          email: googleData.email,
          name: googleData.name,
          picture: googleData.picture,
          tag: '',
          key: ''
        }
      })
      userId = user.id
    }
    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)

    return { success: true, message: 'Login success' }

  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
}

export const Logout = () => {  
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
  return { success: true, message: 'Logout success' }
}
