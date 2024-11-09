import { cookies } from 'next/headers'
import { lucia } from '@libs/auth'
import { prisma } from '@utils/db'
import { error } from 'elysia'
import { getUser } from './derive'
import { env } from '@/env'

export const pipe = (
  condition: 'OR' | 'AND' = 'AND',
  guards: ((...args: any[]) => Promise<{ status: number; message: string } | true>)[],
  headers?: Headers,
) => {
  const checkInstance = async (...args: unknown[]): Promise<void> => {
    const result = await Promise.all(
      guards.map((guard) => {
        return guard(headers, ...args)
      }),
    )
    let allowed = true
    switch (condition) {
      case 'AND': {
        allowed = result.every((guard) => guard === true)
        break
      }
      case 'OR': {
        allowed = result.some((guard) => guard === true)
        break
      }
      default: {
        throw new Error('Invalid condition')
      }
    }
    if (!allowed) {
      const err = result.find((guard) => guard !== true) as { status: number; message: string }
      throw error(err.status, err.message)
    }
  }
  return checkInstance()
}

export const INVERSE = async (arg: Function, headers: Headers) => {
  if ((await arg(headers)) === true) return { status: 400, message: `Inversing ${arg.name}` }
  else return true
}

export const IS_VERIFIED = async (headers: Headers) => {
  if (headers.get('x-api-key') === env.NEXT_PUBLIC_API_KEY) return true
  else return { status: 401, message: 'API Key not found' }
}

export const IS_AUTHENTICATED = async (headers: Headers) => {
  if (headers.get('Authorization')) return true
  else if (cookies().get(lucia.sessionCookieName)?.value) return true
  else return { status: 401, message: 'Unauthorized' }
}

export const IS_TUCMC = async (headers: Headers) => {
  const user = await getUser(headers)
  if (user?.data?.TUCMC) return true
  else return { status: 403, message: 'Not TUCMC' }
}

export const IS_USERCREATED = async (headers: Headers) => {
  const user = (await getUser(headers)).data
  const organization = await prisma.organizations.findUnique({
    where: { email: user?.email },
  })
  const club = await prisma.clubs.findUnique({
    where: { email: user?.email },
  })
  const program = await prisma.programs.findUnique({
    where: { email: user?.email },
  })
  const gifted = await prisma.gifted.findUnique({
    where: { email: user?.email },
  })
  return organization || club || gifted || program
    ? true
    : { message: `User doesn't create anything yet` }
}
