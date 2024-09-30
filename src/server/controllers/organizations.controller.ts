import { prisma } from '@utils/db'
import { getUser, getOrganization } from '../middlewares/derive'
import { CustomError } from '@utils/error'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'

type Organization = {
  name: "TUCMC" | "TUSC" | "AIC" | "TUPRO"
}

interface OrganizationData {
  name: string,
  thainame: string,
  status?: string,
  members: string,
  ig: string,
  fb: string,
  others: string,
  organizationdo: string,
  position: string,
  working: string,
  captureimg1: File,
  captureimg2: File,
  captureimg3: File,
}

interface reviewData {
  orgname: string,
  profileReview: File,
  nameReview: string,
  nickReview: string,
  genReview: string,
  contactReview: string,
  contentReview: string,
}

export const createOrganization = async (body: Organization) => {
  const userData = (await getUser()).data
  const existingOrganization = await getOrganization(body.name)
  if (existingOrganization.success) throw new CustomError('Organization already exists', 400)
  const userOrganization = await prisma.organizations.findUnique({
    where: { studentId: userData?.studentId }
  })  

  if (userOrganization) throw new CustomError('User already created an organization', 400)
  try {
    const organization = await prisma.organizations.create({
      omit: { organizationId: true },
      data: {
        studentId: userData?.studentId ?? '',
        name: body.name,
        thainame: AllData.องค์กรนักเรียน[body.name],
        ig: '',
        fb: '',
        others: '',
        organizationdo: '',
        position: '',
        working: '',
        captureimg1: '',
        captureimg2: '',
        captureimg3: '',
      }
    })
    return { success: true, message: 'Creating organization successfully', data: organization }
  } catch (err) {
    throw new CustomError('Failed to create organization', 500)
  }
}

export const getOrganizationByName = async (name: Organization["name"]) => {
  const userData = (await getUser()).data
  const organization = await getOrganization(name)
  if (!organization.success) throw new CustomError('Organization not found', 404)
  const organizationData = organization.data

  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData?.studentId)) {
    try {
      return { success: true, message: 'Getting organization successfully', data: organizationData }
    } catch (err) {
      throw new CustomError('Failed to get organization', 500)
    }
  } else {
    throw new CustomError('Unauthorized', 401)
  }
}

export const updateOrganizationData = async (name: keyof typeof AllData.องค์กรนักเรียน, body: OrganizationData) => {
  const userData = (await getUser()).data
  const organization = await getOrganization(name)
  if (!organization.success) throw new CustomError('Organization not found', 404)
  const organizationData = organization.data

  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData.studentId)) {
    try {
      const updatedOrganization = await prisma.organizations.update({
        omit: { organizationId: true, createdAt: true },
        where: { name: name },
        data: {
          name: body.name,
          thainame: body.thainame,
          members: body.members,
          ig: body.ig,
          fb: body.fb,
          others: body.others,
          organizationdo: body.organizationdo,
          position: body.position,
          working: body.working,
          captureimg1: await uploadImage(body.captureimg1),
          captureimg2: await uploadImage(body.captureimg2),
          captureimg3: await uploadImage(body.captureimg3),
        }
      })
      return { success: true, message: 'Updating organization data successfully', data: updatedOrganization }
    } catch (err) {
      throw new CustomError('Failed to update organization data', 500)
    }
  } else {
    throw new CustomError('Unauthorized', 401)
  }
}

export const createReview = async (name: keyof typeof AllData.องค์กรนักเรียน) => {
  const userData = (await getUser()).data
  const organization = await getOrganization(name)
  if (!organization.success) throw new CustomError('Organization not found', 404)
  const organizationData = organization.data
  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData.studentId)) {
    try {
      const review = await prisma.reviews.create({
        omit: { reviewId: true },
        data: {
          studentId: userData?.studentId ?? '',
          count: ((await prisma.reviews.count({ where: { studentId: userData?.studentId } })) + 1).toString(),
          orgname: name,
          profile: '',
          name: '',
          nick: '',
          gen: '',
          contact: '',
          content: '',
        }
      })
      return { success: true, message: 'Creating review successfully', data: review }
    } catch (err) {
      throw new CustomError('Failed to create review', 500)
    }
  }
}

export const updateReview = async (name: keyof typeof AllData.องค์กรนักเรียน, count: string, body: reviewData) => {
  const userData = (await getUser()).data
  const organization = await getOrganization(name)
  if (!organization.success) throw new CustomError('Organization not found', 404)
  const organizationData = organization.data
  if (userData?.TUCMC || (organizationData?.isAdmin && userData?.studentId === organizationData.studentId)) {
    try {
      const review = await prisma.reviews.update({
        omit: { reviewId: true },
        where: { studentId: userData?.studentId, count: count },
        data: {
          profile: await uploadImage(body.profileReview),
          name: body.nameReview,
          nick: body.nickReview,
          gen: body.genReview,
          contact: body.contactReview,
          content: body.contentReview,
        }
      })
      return { success: true, message: 'Updating review successfully', data: review }
    } catch (err) {
      throw new CustomError('Failed to update review', 500)
    }
  }
}
