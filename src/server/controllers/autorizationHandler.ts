import { google } from "../../lib/auth";
import { generateState, generateCodeVerifier } from 'arctic'
import { cookies } from "next/headers";
import { prisma } from '../db/database'
import { lucia } from '../../lib/auth'

export const authURLHandler = async () => {
    try {
        const state = generateState()
        const codeVerifier = generateCodeVerifier()

        cookies().set('codeVerifier', codeVerifier, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })
        cookies().set('state', state, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
        })

        const scopes = ['email', 'profile']

        const authUrl = google.createAuthorizationURL(state, codeVerifier, scopes, process.env.HOSTED_DOMAIN)

        return { success: true, url: authUrl.toString() }

    } catch (e) {
        return { success: false, error: e }
    }
}

export const authCallbackHandler = async (req: Request) => {
    const url = new URL(req.url)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')
    const hostedDomain = url.searchParams.get('hd')

    if (!code || !state || !hostedDomain) {
        console.error('No code or state or hostedDomain')
        return new Response('Invalid Request', { status: 400})
    }

    const codeVerifier = cookies().get('codeVerifier')?.value
    const savedState = cookies().get('state')?.value

    if(!codeVerifier || !savedState) {
        console.error('No code verifier or state')
        return new Response('Invalid Request', { status: 400})
    }

    if (state !== savedState) {
        console.error('State does not match')
        return new Response('Invalid Request', { status: 400})
    }

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
        profile: string
    }
    let userId: string

    const existingUser = await prisma.user.findUnique({
        where: {
            email: googleData.email
        }
    })
    if(existingUser) {
        userId = existingUser.id
    } else {
        const studentID = googleData.email.slice(2, googleData.email.indexOf('@'))
        const user = await prisma.user.create({
            data: {
                name: googleData.name,
                studentID: studentID,
                email: googleData.email,
                profile: googleData.picture
            }
        })
        userId = user.id
    }

    const session = await lucia.createSession(userId, {})
    const sessionCookie = lucia.createSessionCookie(session.id)
    cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
}

export const getUser = async () => {
    const sessionID = cookies().get(lucia.sessionCookieName)?.value ?? null
    if(!sessionID) {
        return { success: false, error: 'No session cookie'}
    }
    const { session, user } = await lucia.validateSession(sessionID)
    try{
        if (session && session.fresh) {
            const sessionCookie = await lucia.createSessionCookie(session.id)
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }

        if (!session){
            const sessionCookie = await lucia.createBlankSessionCookie()
            cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
        }

    } catch (e) {
        return { success: false, error: e }
    }
    const dbUser = await prisma.user.findUnique({
        where: {
            id: user?.id
        },
        select: {
            name: true,
            email: true,
            profile: true,
            studentID: true,
        }
    })
    return { success: true, dbUser }
}
