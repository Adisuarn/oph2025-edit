import type { Organization } from '@utils/type'
import { AllData } from '@libs/data'
import { getOrganization, getUser } from '@middlewares/derive'
import { prisma } from '@utils/db'
import { ReviewData, Status } from '@utils/type'
import { uploadImage } from '@utils/uploadimg'

export interface OrganizationData {
  error: string
  status?: string
  members: string
  ig: string
  fb: string
  others: string
  activities: string
  position: string
  working: string
  captureimg1?: File
  descimg1: string
  captureimg2?: File
  descimg2: string
  captureimg3?: File
  descimg3: string
}

export const createOrganization = async (body: Organization) => {
  if ((await prisma.organizations.count({ where: { email: body.email } })) > 0)
    return { status: 400, message: 'User already created an organization' }
  const existing = (
    await prisma.organizations.findUnique({ where: { key: body.key }, select: { email: true } })
  )?.email
  if (existing !== '') return { status: 400, message: 'Organization key already exists' }
  try {
    const organization = await prisma.organizations.update({
      omit: { organizationId: true, updatedAt: true, id: true },
      where: { key: body.key },
      data: {
        key: body.key,
        email: body.email,
        updatedBy: body.email,
      },
    })
    await prisma.user.update({
      where: { email: body.email },
      data: {
        tag: body.tag,
        key: body.key,
      },
    })
    return { status: 201, message: 'Creating organization successfully', data: organization }
  } catch (err) {
    return { status: 500, message: 'Error while creating organization' }
  }
}

export const getOrganizationByName = async (name: Organization['key']) => {
  const organizationData = (await getOrganization(name)).data
  try {
    return { status: 200, message: 'Getting organization successfully', data: organizationData }
  } catch (err) {
    return { status: 500, message: 'Error while getting organization' }
  }
}

export const updateOrganizationData = async (
  name: keyof typeof AllData.Organizations,
  body: OrganizationData,
  headers: Headers,
) => {
  const organizationData = (await getOrganization(name)).data
  const userData = (await getUser(headers)).data
  if (organizationData.status === Status.APPROVED)
    return { status: 400, message: 'Organization already approved' }
  console.log(body.captureimg1)
  try {
    const updatedOrganization = await prisma.organizations.update({
      omit: { organizationId: true, createdAt: true, id: true },
      where: { key: name },
      data: {
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        activities: body.activities,
        position: body.position,
        working: body.working,
        captureimg1:
          body.captureimg1 !== undefined
            ? await uploadImage(body.captureimg1)
            : organizationData.captureimg1,
        descimg1: body.descimg1,
        captureimg2:
          body.captureimg2 !== undefined
            ? await uploadImage(body.captureimg2)
            : organizationData.captureimg2,
        descimg2: body.descimg2,
        captureimg3:
          body.captureimg3 !== undefined
            ? await uploadImage(body.captureimg3)
            : organizationData.captureimg3,
        descimg3: body.descimg3,
        updatedBy: userData?.email,
      },
    })
    if (userData?.email === organizationData.email)
      await prisma.organizations.update({ where: { key: name }, data: { status: Status.PENDING } })
    return {
      status: 200,
      message: 'Updating organization data successfully',
      data: updatedOrganization,
    }
  } catch (err) {
    return { status: 500, message: err }
  }
}

export const getOrganizationReviews = async (name: keyof typeof AllData.Organizations) => {
  const organizationData = (await getOrganization(name)).data
  try {
    const reviewData = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: organizationData.key },
    })
    return { status: 200, message: 'Getting reviews successfully', data: reviewData }
  } catch (err) {
    return { status: 500, message: 'Error while getting reviews' }
  }
}

export const createOrganizationReview = async (name: keyof typeof AllData.Organizations) => {
  const organizationData = (await getOrganization(name)).data
  if ((await prisma.reviews.count({ where: { key: organizationData.key } })) >= 3)
    return { status: 400, message: 'Review reachs limit' }
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true, id: true },
      data: {
        key: organizationData.key,
        count: (
          (await prisma.reviews.count({ where: { key: organizationData.key } })) + 1
        ).toString(),
        profile: '',
        nick: '',
        gen: '',
        contact: '',
        content: '',
      },
    })
    return { status: 201, message: 'Creating review successfully', data: review }
  } catch (err) {
    return { status: 500, message: 'Error while creating review' }
  }
}

export const updateOrganizationReview = async (
  name: keyof typeof AllData.Organizations,
  count: string,
  body: ReviewData,
) => {
  const organizationData = (await getOrganization(name)).data
  const reviewData = await prisma.reviews.findUnique({
    where: { key: organizationData.key, count: count },
  })
  try {
    const review = await prisma.reviews.update({
      omit: { reviewId: true, createdAt: true, id: true },
      where: { key: organizationData.key, count: count },
      data: {
        profile: body.profile !== undefined ? await uploadImage(body.profile) : reviewData?.profile,
        nick: body.nick,
        gen: body.gen,
        contact: body.contact,
        content: body.content,
      },
    })
    return { status: 200, message: 'Updating review successfully', data: review }
  } catch (err) {
    return { status: 500, message: 'Error while updating review' }
  }
}

export const deleteOrganizationReview = async (
  name: keyof typeof AllData.Organizations,
  id: string,
) => {
  const organizationData = (await getOrganization(name)).data
  try {
    await prisma.reviews.delete({
      where: { key: organizationData.key, count: id },
    })
    return { status: 200, message: 'Deleting review successfully' }
  } catch (err) {
    console.log(err)
    return { status: 500, message: 'Error while deleting review' }
  }
}
