import { prisma } from '@utils/db'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'
import { getOrganization } from '@middlewares/derive'
import type { Organization } from '@utils/type'
import { error } from 'elysia'
import { ReviewData } from '@utils/type'

export interface OrganizationData {
  error: string,
  name: string,
  thainame: string,
  status?: string,
  members: string,
  ig: string,
  fb: string,
  others: string,
  activities: string,
  position: string,
  working: string,
  captureimg1: File,
  descimg1: string,
  captureimg2: File,
  descimg2: string,
  captureimg3: File,
  descimg3: string
}

export const createOrganization = async (body: Organization) => {
  if ((await prisma.organizations.count({ where: { email: body.email } }) > 0))
    throw error(400, 'User already created an organization')
  try {
    const organization = await prisma.organizations.create({
      omit: { organizationId: true, updatedAt: true },
      data: {
        error: '',
        key: body.key,
        email: body.email,
        name: body.key,
        thainame: AllData.Organizations[body.key],
        ig: '',
        fb: '',
        others: '',
        activities: '',
        position: '',
        working: '',
        captureimg1: '',
        descimg1: '',
        captureimg2: '',
        descimg2: '',
        captureimg3: '',
        descimg3: '',
      }
    })
    await prisma.user.update({
      where: { email: body.email },
      data: {
        tag: body.tag,
        key: body.key,
      }
    })
    return { success: true, message: 'Creating organization successfully', data: organization }
  } catch (err) {
    throw error(500, 'Error while creating organization')
  }
}

export const getOrganizationByName = async (name: Organization["key"]) => {
  const organizationData = (await getOrganization(name)).data
  try {
    return { success: true, message: 'Getting organization successfully', data: organizationData }
  } catch (err) {
    throw error(500, 'Error while getting organization')
  }
}

export const updateOrganizationData = async (name: keyof typeof AllData.Organizations, body: OrganizationData) => {
  const organizationData = (await getOrganization(name)).data
  if(organizationData.status === 'approved') throw error(400, 'Organization already approved')
  try {
    const updatedOrganization = await prisma.organizations.update({
      omit: { organizationId: true, createdAt: true },
      where: { key: name },
      data: {
        name: body.name,
        thainame: body.thainame,
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        activities: body.activities,
        position: body.position,
        working: body.working,
        captureimg1: await uploadImage(body.captureimg1) ?? organizationData.captureimg1,
        descimg1: body.descimg1,
        captureimg2: await uploadImage(body.captureimg2) ?? organizationData.captureimg2,
        descimg2: body.descimg2,
        captureimg3: await uploadImage(body.captureimg3) ?? organizationData.captureimg3,
        descimg3: body.descimg3,
      }
    })
    return { success: true, message: 'Updating organization data successfully', data: updatedOrganization }
  } catch (err) {
    throw error(500, 'Error while updating organization data')
  }
}

export const getOrganizationReviews = async(name: keyof typeof AllData.Organizations) => {
  const organizationData = (await getOrganization(name)).data
  try {
    const reviewData = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: organizationData.key }
    })
    return { success: true, message: 'Getting reviews successfully', data: reviewData}
  } catch (err) {
    throw error(500, 'Error while getting reviews')
  }
}

export const createOrganizationReview = async (name: keyof typeof AllData.Organizations) => {
  const organizationData = (await getOrganization(name)).data
  if((await prisma.reviews.count({ where: { email: organizationData.email }})) >= 3) throw error(400, 'Review reachs limit')
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true },
      data: {
        key: organizationData.key,
        email: organizationData.email,
        count: ((await prisma.reviews.count({ where: { email: organizationData.email } })) + 1).toString(),
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
    throw error(500, 'Error while creating review')
  }
}

export const updateOrganizationReview = async (name: keyof typeof AllData.Organizations, count: string, body: ReviewData) => {
  const organizationData = (await getOrganization(name)).data
  const reviewData = await prisma.reviews.findFirst({ where: { email: organizationData.email, count: count } })
    try {
      const review = await prisma.reviews.update({
        omit: { reviewId: true, createdAt: true },
        where: { email: organizationData.email, count: count },
        data: {
          profile: await uploadImage(body.profile) ?? reviewData?.profile,
          name: body.name,
          nick: body.nick,
          gen: body.gen,
          contact: body.contact,
          content: body.content,
        }
      })
      return { success: true, message: 'Updating review successfully', data: review }
    } catch (err) {
      throw error(500, 'Error while updating review')
    }
}

export const deleteOrganizationReview = async (name: keyof typeof AllData.Organizations, id: string) => {
  const organizationData = (await getOrganization(name)).data
  try {
    await prisma.reviews.update({
      omit: { reviewId: true },
      where: { email: organizationData.email, count: id },
      data: {
        profile: '',
        name: '',
        nick: '',
        gen: '',
        contact: '',
        content: '',
      }
    })
    return { success: true, message: 'Deleting review successfully' }
  } catch (err) {
    throw error(500, 'Error while deleting review')
  }
}
