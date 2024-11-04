import { cache } from 'react'
import { prisma } from '@utils/db'
import { checkSession } from '@utils/session'
import { error } from 'elysia'

export const getUser = cache(async (headers: Headers) => {
  const { data } = await checkSession(headers)
  if (data?.user === null) return { success: false, data: null }
  const user = data?.user
  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
  })
  return { success: true, data: dbUser }
})

export const getOrganization = cache(async (name: string) => {
  const organization = await prisma.organizations.findUnique({
    omit: { organizationId: true },
    where: { key: name },
  })
  if (!organization) throw error(404, 'Organization not found')
  return { success: true, data: organization }
})

export const getClub = cache(async (clubKey: string) => {
  try {
    const club = await prisma.clubs.findUnique({
      omit: { clubId: true, id: true },
      where: { key: clubKey },
    })
    if (!club) throw error(404, 'Club not found')
    return { success: true, data: club }
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
})

export const getProgram = cache(async (name: string) => {
  const program = await prisma.programs.findUnique({
    omit: { programId: true, id: true },
    where: { key: name },
  })
  if (!program) throw error(404, 'Program not found')
  return { success: true, data: program }
})

export const getGifted = cache(async (name: string) => {
  const gifted = await prisma.gifted.findUnique({
    omit: { giftedId: true, id: true },
    where: { key: name },
  })
  if (!gifted) throw error(404, 'Gifted not found')
  return { success: true, data: gifted }
})
