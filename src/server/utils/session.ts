import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { cache } from "react";

export const checkSession = cache(async() => {
  const cookie = cookies()
  const sessionId = cookie.get(lucia.sessionCookieName)?.value
  if(!sessionId) return { success: false, error: 'Not found session cookie' }
  const { session, user } = await lucia.validateSession(sessionId)

  try {
    if(!session){
      const sessionCookie = lucia.createBlankSessionCookie()
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }  

    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookie.set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

  } catch (error) {
    console.log(error)
    throw new Error('Error validating session')
  }
  // return data consisting of user's id in database
  return { success:true, data: { user } }
  
})
