import { prisma } from '@utils/db'
import { CustomError } from '@utils/error'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'
import { getUser, getClub } from '@middlewares/derive'

type Clubs = {
  clubKey: keyof typeof AllData.Clubs
}

interface ClubData {
  clubKey?: keyof typeof AllData.Clubs,
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
  captureimg2: File,
  captureimg3: File,
}

interface reviewData {
  clubname: string,
  profileReview: File,
  nameReview: string,
  nickReview: string,
  genReview: string,
  contactReview: string,
  contentReview: string,
}

export const createClubs = async (body: Clubs) => {
  const userData = (await getUser()).data
  const existingClub = await getClub(body.clubKey)
  if (existingClub.success) throw new CustomError('Club already exists', 400)
  const userClub = await prisma.clubs.findUnique({
    where: { studentId: userData?.studentId }
  })
  if (userClub) throw new CustomError('User already created a club', 400)
  try {
    const club = await prisma.clubs.create({
      omit: { clubId: true, updatedAt: true },
      data: {
        studentId: userData?.studentId ?? '',
        clubKey: body.clubKey,
        name: '',
        thainame: AllData.Clubs[body.clubKey],
        ig: '',
        fb: '',
        others: '',
        activities: '',
        benefits: '',
        working: '',
        captureimg1: '',
        captureimg2: '',
        captureimg3: '',
      }
    })
    return { success: true, message: "Created club successfully", data: club }
  } catch (error) {
    throw new CustomError("Error while creating club", 500)
  }
}

export const getClubByKey = async (key: string) => {
  const userData = (await getUser()).data
  const club = await getClub(key)
  if (!club) throw new CustomError('Club not found', 404)
  const clubData = club.data

  if (userData?.TUCMC || (clubData?.isAdmin && userData?.studentId === clubData?.studentId)) {
    try {
      return { success: true, data: clubData }
    } catch (error) {
      throw new CustomError('Error while getting club', 500)
    }
  } else {
    throw new CustomError('Unauthorized', 401)
  }
}

export const updateClub = async (key: string, body: ClubData) => {
  const userData = (await getUser()).data
  const clubData = (await getClub(key)).data
  if (!clubData) throw new CustomError('Club not found', 404)
  if (clubData.status === 'approved') throw new CustomError('Club was already approved', 400)

  const captureimg1 = await uploadImage(body.captureimg1)
  const captureimg2 = await uploadImage(body.captureimg2)
  const captureimg3 = await uploadImage(body.captureimg3)
  if (userData?.TUCMC || (clubData?.isAdmin && userData?.studentId === clubData.studentId)) {
    try {
      const updatedClub = await prisma.clubs.update({
        where: { studentId: userData?.studentId },
        data: {
          name: body.name,
          ig: body.ig,
          fb: body.fb,
          others: body.others,
          activities: body.activities,
          benefits: body.benefits,
          working: body.working,
          captureimg1: captureimg1,
          captureimg2: captureimg2,
          captureimg3: captureimg3,
        }
      })
      return { success: true, message: 'Updated club successfully', data: updatedClub }
    } catch (error) {
      throw new CustomError('Error while updating club', 500)
    }
  } else {
    throw new CustomError('Unauthorized', 401)
  }
}
