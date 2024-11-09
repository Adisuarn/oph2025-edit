import { Google } from 'arctic'
import { Lucia } from 'lucia'
import { PrismaAdapter } from '@lucia-auth/adapter-prisma'
import { env } from '@/env'
import { prisma } from '@/server/utils/db'

const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    name: env.NEXT_PUBLIC_COOKIE_NAME,
    expires: false,
    attributes: {
      secure: env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      tag: attributes.tag,
      key: attributes.key,
      email: attributes.email,
      name: attributes.name,
      picture: attributes.picture,
      TUCMC: attributes.TUCMC,
    }
  },
})

export const google = new Google(
  env.GOOGLE_CLIENT_ID!,
  env.GOOGLE_CLIENT_SECRET!,
  env.NEXT_PUBLIC_BASE_URL + '/auth/callback',
)

// IMPORTANT!
declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia
    DatabaseUserAttributes: {
      tag: string
      key: string
      email: string
      name: string
      picture: string
      TUCMC: boolean
    }
  }
}
