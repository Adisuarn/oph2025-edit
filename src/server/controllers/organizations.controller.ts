import { prisma } from '@utils/db'
import { getUser } from '@middlewares/derive'

export const createOrganization = async(req: Request) => {
  const user = await getUser()
  if(!user.success) return 'User not found' // redirect to login page
  const userData = user?.data

  try {
    const userOrganization = await prisma.organizations.create({
      data: {
        studentId: userData?.studentId ?? '',
        name: 'OrganizationName',
        user: {
          connect: { id: userData?.id }
        }
      }
    })
    return { success: true, data: userOrganization }
  } catch (err) {
    console.log('Error', err)
  }
}

export const getOrganization = async(name: string) => {
  try {
    const organization = await prisma.organizations.findUnique({
      where: {
        name: name
      }
    })
    return { success: true, data: organization }
  } catch (err) {
    console.log('Error', err)
  }
}
