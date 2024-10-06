import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { prisma } from '@utils/db'
import { CustomError } from "@utils/error";
import { checkSession } from "@utils/session";

export const pipe = (condition: "OR" | "AND" = "AND", guards: ((...args: unknown[]) => Promise<unknown>)[]) => {
    const checkInstance = async(...args: unknown[]): Promise<void> => 
    {
      const result = await Promise.all(guards.map((guard) => guard(...args)))
      let allowed = true;
      switch (condition) {
        case "AND": {
          allowed = result.every((guard) => guard === true)
          break
        }
        case "OR": {
          allowed = result.some((guard) => guard === true)
          break
        }
        default: {
          throw new Error("Invalid condition")
        }
      }
      if (!allowed) throw new Error("Unauthorized")
  }
  return checkInstance()
}

export const INVERSE = (fn: (...args: unknown[]) => boolean) => {
  return (...args: unknown[]) => {
    if(!fn(...args)) return new Response('Unauthorized', { status: 401 })
  }
}

export const IS_AUTHENTICATED = async(): Promise<boolean> => {
  const session = cookies().get(lucia.sessionCookieName)?.value
  return session ?  true : false
}

export const IS_TUCMC = async(): Promise<boolean> => {
  const session = cookies().get(lucia.sessionCookieName)?.value
  if(!session) return false
  const { user } = await lucia.validateSession(session)
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      studentId: true,
      TUCMC: true
    }
  })
  if(!dbUser) return false
  return dbUser?.TUCMC ? true : false
}

export const IS_USERCREATED = async (): Promise<boolean> => {
  const { data } = await checkSession()
  if(!data) throw new CustomError('User not found', 404)
  const user = data?.user
  const organization = await prisma.organizations.findUnique({
    where: { studentId: user?.studentId }
  })
  const club = await prisma.clubs.findUnique({
    where: { studentId: user?.studentId}
  })
  if(organization || club){
    return true
  }
  return false
}
export const test = async(): Promise<boolean> => {
  return true
}
