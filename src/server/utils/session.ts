import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { cache } from "react";
import { error } from 'elysia' 

export const checkSession = cache(async(headers: Headers) => {
  const sessionId = cookies().get(lucia.sessionCookieName) ? cookies().get(lucia.sessionCookieName)?.value : headers.get('Authorization')
  if(!sessionId) return { success: false, error: 'Not found session cookie' }
  try {
    const { session, user } = await lucia.validateSession(sessionId)
    if(!session){
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }  
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    return { success:true, data: { user } }
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }  
})
