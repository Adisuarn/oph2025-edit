import { prisma } from '@utils/db'
import { CustomError } from '@utils/error'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'
import { getUser, getOrganization } from '@middlewares/derive'

interface reviewData {
  clubname: string,
  profileReview: File,
  nameReview: string,
  nickReview: string,
  genReview: string,
  contactReview: string,
  contentReview: string,
}
