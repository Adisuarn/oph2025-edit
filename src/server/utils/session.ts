import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { cache } from "react";

export const checkSession = cache(async() => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value
  if(!sessionId) return { success: false, error: 'Not found session cookie' }
  const { session, user } = await lucia.validateSession(sessionId)

  try {
    if(!session){
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }  

    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }

  } catch (error) {
    console.log(error)
    throw new Error('Error validating session')
  }
  // return data consisting of user's id in database
  return { success:true, data: { user } }
  
})
