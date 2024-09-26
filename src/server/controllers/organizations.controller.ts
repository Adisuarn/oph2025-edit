import { prisma } from '@utils/db'
import { getUser, getOrganization } from '../middlewares/derive'

type organizationCreate = {
  name: string,
}

type organizationData = {
  description: string,
}

export const createOrganization = async (body: organizationCreate) => {
  const user = await getUser()
  if (!user.success) return 'User not found' // redirect to login page
  const userData = user?.data
  // Check if the user already has an organization && the organization are already created
  // Created at
  const organization = await getOrganization()
  if (organization.success) {
    return 'User already created an organization'
  }
  try {
    const existingOrganization = await prisma.organizations.findUnique({
      where: { name: body.name },
    })
    if (existingOrganization) {
      return {
        success: false,
        message: 'Organization already exists'
      }
    }
    const organization = await prisma.organizations.create({
      omit: {
        organizationId: true,
      },
      data: {
        studentId: userData?.studentId ?? '',
        name: body.name,
        description: '',
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

export const getOrganizationByName = async (name: string) => {
  const user = await getUser()
  if (!user.success) return 'User not found'
  const userData = user?.data
  const organization = await getOrganization()
  if (!organization.success) return 'Organization not found'
  const organizationData = organization?.data
  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData?.studentId)) {
    try {
      const organizationData = await prisma.organizations.findUnique({
        omit: {
          organizationId: true,
        },
        where: { name: name },
      })
      if (!organizationData) {
        return {
          success: false,
          message: 'Organization not found'
        }
      }
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
  } else {
    return 'Unauthorized'
  }
}

export const updateOrganizationData = async (name: string, body: organizationData) => {
  // Check if isAdmin is true && user is the owner of the organization
  // Check if the organization exists
  // Update the organization data
  // Return the updated organization data
  // NEW updated at
  const user = await getUser()
  if (!user.success) return 'User not found'
  const userData = user?.data
  const organization = await getOrganization()
  if (!organization.success) return 'Organization not found'
  const organizationData = organization?.data

  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData?.studentId)) {
    try {
      const organizationData = await prisma.organizations.findUnique({
        omit: { organizationId: true },
        where: { name: name },
      })
      if (!organizationData) {
        return {
          success: false,
          message: 'Organization not found'
        }
      }

      const updatedOrganizationData = await prisma.organizations.update({
        omit: { organizationId: true },
        where: { name: name },
        data: {
          description: body.description,
        }
      })
      return {
        success: true,
        message: 'Updating organization data successfully',
        data: updatedOrganizationData
      }
    } catch (err) {
      return {
        success: false,
        message: 'Failed to update organization data', err
      }
    }
  } else {
    return 'Unauthorized'
  }
}
