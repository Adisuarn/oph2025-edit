import { prisma } from '@utils/db'
import { error } from 'elysia'
import { uploadImage } from '@utils/uploadimg'
import type { Club } from '@utils/type'
import { AllData } from '@libs/data'
import { getClub } from '@middlewares/derive'

interface ClubData {
  name: string,
  thainame: string,
  status?: string,
  members: string,
  ig: string,
  fb: string,
  others: string,
  activities: string,
  benefits: string,
  working: string,
  captureimg1: File,
  descimg1: string,
  captureimg2: File,
  descimg2: string,
  captureimg3: File,
  descimg3: string,
  logo: File
}

interface reviewData {
  profile: File,
  name: string,
  nick: string,
  gen: string,
  contact: string,
  content: string,
}

export const createClub = async (body: Club) => {
  if ((await prisma.clubs.count({ where: { email: body.email } }) > 0)) 
    throw error(400, 'User already created a club')
  try {
    const club = await prisma.clubs.create({
      omit: { clubId: true, updatedAt: true },
      data: {
        key: body.key,
        email: body.email,
        clubKey: body.key,
        name: '',
        thainame: AllData.Clubs[body.key],
        ig: '',
        fb: '',
        others: '',
        activities: '',
        benefits: '',
        working: '',
        captureimg1: '',
        descimg1: '',
        captureimg2: '',
        descimg2: '',
        captureimg3: '',
        descimg3: '',
        logo: '',
      }
    })
    await prisma.user.update({
      where: { email: body.email },
      data: {
        tag: body.tag,
        key: body.key,
      }
    })
    return { success: true, message: "Created club successfully", data: club }
  } catch (err) {
    throw error(500, 'Error while creating club')
  }
}

export const getClubByKey = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  try {
    return { success: true, data: clubData }
  } catch (err) {
    throw error(500, 'Error while getting club')
  }
}

export const updateClubData = async (key: keyof typeof AllData.Clubs, body: ClubData) => {
  const clubData = (await getClub(key)).data
  if (clubData.status === 'approved') throw error(400, 'Club was already approved')
  try {
    const updatedClub = await prisma.clubs.update({
      omit: { clubId: true, createdAt: true },
      where: { key: key },
      data: {
        name: body.name,
        thainame: body.thainame,
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        activities: body.activities,
        benefits: body.benefits,
        working: body.working,
        captureimg1: await uploadImage(body.captureimg1),
        descimg1: body.descimg1,
        captureimg2: await uploadImage(body.captureimg2),
        descimg2: body.descimg2,
        captureimg3: await uploadImage(body.captureimg3),
        descimg3: body.descimg3,
        logo: await uploadImage(body.logo)
      }
    })
    return { success: true, message: 'Updated club successfully', data: updatedClub }
  } catch (err) {
    throw error(500, 'Error while updating club')
  }
}

export const getReviews = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  try {
    const reviews = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: clubData.key },
    })
    return { success: true, message: 'Getting reviews successfully', data: reviews }
  } catch (err) {
    throw error(500, 'Error while getting reviews')
  }
}

export const createReview = async (key: keyof typeof AllData.Clubs) => {
  const clubData = (await getClub(key)).data
  if((await prisma.reviews.count({ where: { email: clubData?.email }})) >= 3) throw error(400, 'Review reachs limit')
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true },
      data: {
        key: clubData.key,
        email: clubData.email,
        count: ((await prisma.reviews.count({ where: { email: clubData?.email } })) + 1).toString(),
        profile: '',
        name: '',
        nick: '',
        gen: '',
        contact: '',
        content: '',
      }
    })
    return { success: true, message: 'Created review successfully', data: review }
  } catch (err) {
    throw error(500, 'Error while creating review')
  }
}

export const updateReview = async (key: keyof typeof AllData.Clubs, count: string, body: reviewData) => {
  const clubData = (await getClub(key)).data
    try {
      const review = await prisma.reviews.update({
        omit: { reviewId: true, createdAt: true },
        where: { email: clubData.email, count: count },
        data: {
          profile: await uploadImage(body.profile),
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

export const deleteReview = async (key: keyof typeof AllData.Clubs, id: string) => {
  const clubData = (await getClub(key)).data
  try {
    await prisma.reviews.update({
      omit: { reviewId: true },
      where: { email: clubData.email, count: id },
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
