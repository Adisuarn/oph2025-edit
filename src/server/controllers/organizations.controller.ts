import { prisma } from '@utils/db'
import { getUser } from '../middlewares/derive'

type organizationCreate = {
  name: string,
}

export const createOrganization = async(body: organizationCreate) => {
  const user = await getUser()
  if(!user.success) return 'User not found' // redirect to login page
  const userData = user?.data

  try {
    const organization = await prisma.organizations.create({
      data: {
        studentId: userData?.studentId ?? '',
        name: body.name,
      }
    })
    return { 
      success: true, 
      message: 'creating organization successfully', 
      data: organization
    }
  } catch (err) {
    return {
      success: false,
      message: 'Failed to create organization', err
    }
  }
}

export const getOrganizationByName = async(name: string) => {
  try {
    const organizationData = await prisma.organizations.findUnique({
      where: { name: name },
      select: {
        id: true,
        name: true,
      }
    })
    return { 
      success: true, 
      message: 'Getting organization successfully', 
      data: organizationData
    }
  } catch (err) {
    return {
      success: false,
      message: 'Failed to get organization', err
    }
  }
}
