import { prisma } from '@utils/db'
import { CustomError } from '@utils/error'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'
import { getUser, getClub } from '@middlewares/derive'

type Clubs = {
  clubKey: keyof typeof AllData.Clubs
}

interface ClubData {
  clubKey: keyof typeof AllData.Clubs,
  name: string,
  thainame: string,
  status?: string,
  member: string,
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
