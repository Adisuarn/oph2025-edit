import { checkSession } from "@utils/session";
import { prisma } from "@utils/db";
import { cache } from "react";
import exp from "constants";

export const getUser = cache(async () => {
  const { data } = await checkSession()
  const user = data?.user
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id
    },
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

export const getOrganization = cache(async () => {
  const { data } = await checkSession()
  const user = data?.user
  const organization = await prisma.organizations.findUnique({
    where: {
      studentId: user?.studentId
    }
  })
  if(!organization) {
    return { success: false, message: 'User have not created organization yet' }
  }
  return { success: true, data: organization }
})
