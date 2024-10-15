import { checkSession } from "@utils/session";
import { prisma } from "@utils/db";
import { cache } from "react";
import { error } from 'elysia'

export const getUser = cache(async () => {
  const { data } = await checkSession()
  if(!data) throw error(404, 'User Not Found')
  const user = data?.user
  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
  })
  return { success: true, data: dbUser }
})

export const getOrganization = cache(async (name: string) => {
  const organization = await prisma.organizations.findUnique({
    omit: { organizationId: true},
    where: { name: name }
  })
  if(!organization) throw error(404, 'Organization not found')
  return { success: true, data: organization }
})

export const getClub = cache(async (clubKey: string) => {
  const club = await prisma.clubs.findUnique({
    omit: { clubId: true },
    where: { clubKey: clubKey }
  })
  if(!club) throw error(404, 'Club not found')
  return { success: true, data: club }
})

export const getGifted = cache(async (name: string) => {
  const gifted = await prisma.gifted.findUnique({
    omit: { giftedId: true },
    where: { name: name}
  })
  if (!gifted) throw error(404, 'Organization not found')
  return { success: true, data: gifted}
})