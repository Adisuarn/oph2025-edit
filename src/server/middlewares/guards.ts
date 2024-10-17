import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { prisma } from '@utils/db'
import { checkSession } from "@utils/session";
import { error } from 'elysia'
import { getUser } from "./derive";

export const pipe = (condition: "OR" | "AND" = "AND", guards: ((...args: any[]) => Promise<{ status: number, message: string } | true>)[], headers?: Headers) => {
  const checkInstance = async (...args: unknown[]): Promise<void> => {
    const result = await Promise.all(guards.map((guard) => {
      if (guard === IS_VERIFIED && headers) {
        return guard(headers);
      }
      return guard(...args);
    }));
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
        throw new Error('Invalid condition')
      }
    }
    if (!allowed) {
      const err = result.find((guard) => guard !== true) as { status: number, message: string }
      throw error(err.status, err.message)
    }
  }
  return checkInstance()
}

export const INVERSE = async (arg: Function) => {
  if (await arg() === true) return { status: 400, message: `Inversing ${arg.name}` }
  else return true
}

export const IS_VERIFIED = async (headers: Headers) => {
  if (headers.get('x-api-key') === process.env.NEXT_PUBLIC_API_KEY) return true
  else return { status: 401, message: 'API Key not found' }
}

export const IS_AUTHENTICATED = async () => {
  if (cookies().get(lucia.sessionCookieName)?.value) return true
  else return { status: 401, message: 'Unauthorized' }
}

export const IS_TUCMC = async () => {
  const userData = (await getUser()).data
  if (userData?.TUCMC) return true
  else return { status: 401, message: 'Not TUCMC' }
}

export const IS_USERCREATED = async () => {
  const { data } = await checkSession()
  if (!data) throw error(404, 'User Not Found')
  const user = data?.user
  const organization = await prisma.organizations.findUnique({
    where: { email: user?.email }
  })
  const club = await prisma.clubs.findUnique({
    where: { email: user?.email }
  })
  return (organization || club) ? true : { status: 400, message: 'User doesnt create anything yet' }
}

export const test = async (): Promise<boolean> => {
  return true
}
