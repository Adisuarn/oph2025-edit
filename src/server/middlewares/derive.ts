import { checkSession } from "@utils/session";
import { prisma } from "@utils/db";
import { cache } from "react";

export const getUser = cache(async () => {
  const { data } = await checkSession()
  const user = data?.user
  const dbUser = await prisma.user.findUnique({
    where: {
      id: user?.id
    },
    select: {
      id: true,
      name: true,
      email: true,
      picture: true,
      studentId: true,
      TUCMC: true
    }
  })
  return { success: true, data: dbUser }
})
