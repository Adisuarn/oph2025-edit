import { checkSession } from "@utils/session";
import { prisma } from "@utils/db";
import { cache } from "react";
import { CustomError } from "@utils/error";

export const isCreated = async (): Promise<void> => {
  const { data } = await checkSession()
  if(!data) throw new CustomError('User not found', 404)
  const user = data?.user
  const organization = await prisma.organizations.findUnique({
    where: { studentId: user?.studentId }
  })
  const club = await prisma.clubs.findUnique({
    where: { studentId: user?.studentId}
  })
  if(organization || club) throw new CustomError('User already created something', 400)
}

export const getUser = cache(async () => {
  const { data } = await checkSession()
  if(!data) throw new CustomError('User not found', 404)
  const user = data?.user
  const dbUser = await prisma.user.findUnique({
    where: { id: user?.id },
    select: {
      name: true,
      email: true,
      picture: true,
      studentId: true,
      TUCMC: true
    }
  })
  return { success: true, data: dbUser }
})

export const getOrganization = cache(async (name: string) => {
  const organization = await prisma.organizations.findUnique({
    omit: { organizationId: true},
    where: { name: name }
  })
  if(!organization) {
    return { success: false, message: 'Organization not found' }
  }
  return { success: true, data: organization }
})

export const getClub = cache(async (clubKey: string) => {
  const club = await prisma.clubs.findUnique({
    omit: { clubId: true },
    where: { clubKey: clubKey }
  })
  if(!club) {
    return { success: false, message: 'Club not found' }
  }
  return { success: true, data: club }
})
