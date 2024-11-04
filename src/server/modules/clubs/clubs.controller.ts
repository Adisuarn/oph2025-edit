import type { Club } from '@utils/type'
import { AllData } from '@libs/data'
import { getClub, getUser } from '@middlewares/derive'
import { prisma } from '@utils/db'
import { ReviewData, Status } from '@utils/type'
import { uploadImage } from '@utils/uploadimg'

export interface ClubData {
  error: string
  name: string
  thainame: string
  status?: string
  members: string
  ig: string
  fb: string
  others: string
  activities: string
  benefits: string
  working: string
  captureimg1?: File
  descimg1: string
  captureimg2?: File
  descimg2: string
  captureimg3?: File
  descimg3: string
  logo?: File
}

export const createClub = async (body: Club) => {
  if ((await prisma.clubs.count({ where: { email: body.email } })) > 0)
    return { status: 400, message: 'User already created a club' }
  const existing = (
    await prisma.clubs.findUnique({ where: { key: body.key }, select: { email: true } })
  )?.email
  if (existing !== '') return { status: 400, message: 'Club key already exists' }
  try {
    const club = await prisma.clubs.update({
      omit: { clubId: true, updatedAt: true, id: true },
      where: { key: body.key },
      data: {
        key: body.key,
        email: body.email,
        clubKey: body.key,
        updatedBy: body.email,
        status: Status.PENDING,
      },
    })
    await prisma.user.update({
      where: { email: body.email },
      data: {
        tag: body.tag,
        key: body.key,
      },
    })
    return { status: 201, message: 'Created club successfully', data: club }
  } catch (err) {
    return { status: 500, message: 'Error while creating club' }
  }
}

export const getClubByKey = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  try {
    return { status: 200, data: clubData }
  } catch (err) {
    return { status: 500, message: 'Error while getting club' }
  }
}

export const updateClubData = async (
  key: keyof typeof AllData.Clubs,
  body: ClubData,
  headers: Headers,
) => {
  const clubData = (await getClub(key)).data
  const userData = (await getUser(headers)).data
  if (clubData.status === Status.APPROVED)
    return { status: 400, message: 'Club was already approved' }
  try {
    const updatedClub = await prisma.clubs.update({
      omit: { clubId: true, createdAt: true, id: true },
      where: { key: key },
      data: {
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        activities: body.activities,
        benefits: body.benefits,
        working: body.working,
        captureimg1:
          body.captureimg1 !== undefined
            ? await uploadImage(body.captureimg1)
            : clubData.captureimg1,
        descimg1: body.descimg1,
        captureimg2:
          body.captureimg2 !== undefined
            ? await uploadImage(body.captureimg2)
            : clubData.captureimg2,
        descimg2: body.descimg2,
        captureimg3:
          !body.captureimg3 === undefined
            ? await uploadImage(body.captureimg3)
            : clubData.captureimg3,
        descimg3: body.descimg3,
        logo: !body.logo === undefined ? await uploadImage(body.logo) : clubData.logo,
        updatedBy: userData?.email,
      },
    })
    if (userData?.email === clubData.email)
      await prisma.clubs.update({ where: { key: key }, data: { status: Status.PENDING } })
    return { status: 200, message: 'Updated club successfully', data: updatedClub }
  } catch (err) {
    return { status: 500, message: 'Error while updating club' }
  }
}

export const getClubReviews = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  try {
    const reviews = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: clubData.key },
    })
    return { status: 200, message: 'Getting reviews successfully', data: reviews }
  } catch (err) {
    return { status: 500, message: 'Error while getting reviews' }
  }
}

export const createClubReview = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  if ((await prisma.reviews.count({ where: { email: clubData.email } })) >= 3)
    return { status: 400, message: 'Reviews reached limit' }
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true, id: true },
      data: {
        key: clubData.key,
        email: clubData.email,
        count: ((await prisma.reviews.count({ where: { email: clubData?.email } })) + 1).toString(),
        profile: '',
        nick: '',
        gen: '',
        contact: '',
        content: '',
      },
    })
    return { status: 201, message: 'Created review successfully', data: review }
  } catch (err) {
    return { status: 500, message: 'Error while creating review' }
  }
}

export const updateClubReview = async (
  key: keyof typeof AllData.Clubs,
  count: string,
  body: ReviewData,
) => {
  const clubData = (await getClub(key)).data
  const reviewData = await prisma.reviews.findUnique({ where: { key: clubData.key, count: count } })
  try {
    const review = await prisma.reviews.update({
      omit: { reviewId: true, createdAt: true, id: true },
      where: { key: clubData.key, count: count },
      data: {
        profile:
          !body.profile === undefined ? await uploadImage(body.profile) : reviewData?.profile,
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

export const deleteClubReview = async (key: keyof typeof AllData.Clubs, id: string) => {
  const clubData = (await getClub(key)).data
  try {
    await prisma.reviews.update({
      where: { email: clubData.email, count: id },
      data: {
        profile: '',
        nick: '',
        gen: '',
        contact: '',
        content: '',
      },
    })
    return { status: 200, message: 'Deleting review successfully' }
  } catch (err) {
    return { status: 500, message: 'Error while deleting review' }
  }
}
