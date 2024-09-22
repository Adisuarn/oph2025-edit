import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { prisma } from "@utils/db";


export const getUser = async() => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value
  if(!sessionId) {
    return { success: false, error: 'Not found session cookie' }
  }
  const { session, user } = await lucia.validateSession(sessionId)
  try {
    if (session?.fresh) {
      const sessionCookie = lucia.createSessionCookie(session.id)
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
    if(!session){
      const sessionCookie = lucia.createBlankSessionCookie()
      cookies().set(sessionCookie.name, sessionCookie.value, sessionCookie.attributes)
    }
  } catch (error) {
    console.log(error)
    throw new Error('Error validating session')
  }
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      name: true,
      email: true,
      picture: true,
      studentId: true,
    }
  })
  return { success: true, data: dbUser }
}
