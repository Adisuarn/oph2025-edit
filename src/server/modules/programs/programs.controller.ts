import { prisma } from '@utils/db'
import { uploadImage } from '@utils/uploadimg'
import { AllData } from '@libs/data'
import { getProgram, getUser } from '@middlewares/derive'
import type { Program } from '@utils/type'
import { error } from 'elysia'
import { ReviewData, Status } from '@utils/type'

export interface ProgramData {
  error: string,
  name: string,
  thainame: string,
  status?: string,
  members: string,
  ig: string,
  fb: string,
  others: string,
  admission: string,
  courses: string,
  interests: string,
  captureimg1: File,
  descimg1: string,
  captureimg2: File,
  descimg2: string,
  captureimg3: File,
  descimg3: string
}

export const createProgram = async(body: Program) => {
  if((await prisma.programs.count({ where: { email: body.email } }) > 0))
    throw error(400, 'User already created a program')
  try {
    const program = await prisma.programs.update({
      omit: { programId: true, updatedAt: true, id:true },
      where: { key: body.key },
      data: {
        error: '',
        key: body.key,
        email: body.email,
        name: body.key,
        thainame: AllData.Programs[body.key],
        ig: '',
        fb: '',
        others: '',
        admissions: '',
        courses: '',
        interests: '',
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
    return { success: true, message: 'Creating program successfully', data: program }
  } catch (err) {
    throw error(500, 'Error while creating program')
  }
}

export const getProgramByName = async (name: Program["key"]) => {
  const programData = (await getProgram(name)).data
  try {
    return { success: true, message: 'Getting program successfully', data: programData }
  } catch (err) {
    throw error(500, 'Error while getting program')
  }
}

export const updateProgramData = async (name: keyof typeof AllData.Programs, body: ProgramData) => {
  const programData = (await getProgram(name)).data
  const userData = (await getUser()).data
  if(programData.status === 'approved') throw error(400, 'Program already approved')
  try {
    const updatedOrganization = await prisma.programs.update({
      omit: { programId: true, createdAt: true, id: true },
      where: { key: name },
      data: {
        name: body.name,
        thainame: body.thainame,
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        admissions: body.admission,
        courses: body.courses,
        interests: body.interests,
        captureimg1: (!body.captureimg1 === undefined ) ? await uploadImage(body.captureimg1) : programData.captureimg1,
        descimg1: body.descimg1,
        captureimg2: (!body.captureimg2 === undefined ) ? await uploadImage(body.captureimg2) : programData.captureimg2,
        descimg2: body.descimg2,
        captureimg3: (!body.captureimg3 === undefined) ? await uploadImage(body.captureimg3) : programData.captureimg3,
        descimg3: body.descimg3,
      }
    })
    if(userData?.email === programData.email) await prisma.programs.update({ where: { key: name }, data: { status: Status.PENDING }})
    return { success: true, message: 'Updating program data successfully', data: updatedOrganization }
  } catch (err) {
    throw error(500, 'Error while updating program data')
  }
}

export const getProgramReviews = async(name: keyof typeof AllData.Programs) => {
  const programData = (await getProgram(name)).data
  try {
    const reviewData = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: programData.key }
    })
    return { success: true, message: 'Getting reviews successfully', data: reviewData}
  } catch (err) {
    throw error(500, 'Error while getting reviews')
  }
}

export const createProgramReview = async (name: keyof typeof AllData.Programs) => {
  const programData = (await getProgram(name)).data
  if((await prisma.reviews.count({ where: { email: programData.email }})) >= 3) throw error(400, 'Review reachs limit')
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true, id: true },
      data: {
        key: programData.key,
        email: programData.email,
        count: ((await prisma.reviews.count({ where: { email: programData.email } })) + 1).toString(),
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

export const updateProgramReview = async (name: keyof typeof AllData.Programs, count: string, body: ReviewData) => {
  const programData = (await getProgram(name)).data
  const reviewData = await prisma.reviews.findUnique({ where: { email: programData.email, count }})
    try {
      const review = await prisma.reviews.update({
        omit: { reviewId: true, createdAt: true, id: true },
        where: { email: programData.email, count: count },
        data: {
          profile: (!body.profile === undefined) ? await uploadImage(body.profile) : reviewData?.profile,
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

export const deleteProgramReview = async (name: keyof typeof AllData.Organizations, id: string) => {
  const programData = (await getProgram(name)).data
  try {
    await prisma.reviews.update({
      where: { email: programData.email, count: id },
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
