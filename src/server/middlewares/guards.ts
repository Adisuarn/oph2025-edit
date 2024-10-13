import { cookies } from "next/headers";
import { lucia } from "@libs/auth";
import { prisma } from '@utils/db'
import { CustomError } from "@utils/error";
import { checkSession } from "@utils/session";

export const pipe = (condition: "OR" | "AND" = "AND", guards: ((...args: any[]) => Promise<{ status: number, message: string } | true>)[]) => {
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
          throw new CustomError("Invalid condition", 500)
        }
      }
      if (!allowed) {
        const error = result.find((guard) => guard !== true) as { status: number, message: string }
        throw new CustomError(`${error.message}`, error.status)
      }
  }
  return checkInstance()
}

export const INVERSE = async(args: unknown[]) => {
  args.forEach((arg) => {
    if(arg === true) throw new CustomError('Inverse', 400)
    else return true
  })
}

export const IS_VERIFIED = async(headers: Headers) => {
  if(headers.get('x-api-key') === process.env.NEXT_PUBLIC_API_KEY) return true
  else return { status: 401, message: 'Unauthorized' }
}

export const IS_AUTHENTICATED = async() => {
  if(cookies().get(lucia.sessionCookieName)?.value) return true
  else return { status: 401, message: 'Unauthorized' }
}

export const IS_TUCMC = async()  => {
  const session = cookies().get(lucia.sessionCookieName)?.value
  if(!session) return false
  const { user } = await lucia.validateSession(session)
  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
    select: {
      studentId: true,
      TUCMC: true
    }
  })
  if(!dbUser) return { status: 404, message: 'User not found' }
  if(dbUser.TUCMC) return true
  else return { status: 401, message: 'Not TUCMC' }
}

export const IS_USERCREATED = async () => {
  const { data } = await checkSession()
  if(!data) throw new CustomError('User not found', 404)
  const user = data?.user
  const organization = await prisma.organizations.findUnique({
    where: { studentId: user?.studentId }
  })
  const club = await prisma.clubs.findUnique({
    where: { studentId: user?.studentId}
  })
  return (organization || club) ? true : { status: 400, message: 'User doesnt create anything yet' }
}

export const test = async(): Promise<boolean> => {
  return true
}
