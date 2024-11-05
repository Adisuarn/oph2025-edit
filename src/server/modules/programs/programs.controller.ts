import type { Program } from '@utils/type'
import { AllData } from '@libs/data'
import { getProgram, getUser } from '@middlewares/derive'
import { prisma } from '@utils/db'
import { ReviewData, Status } from '@utils/type'
import { uploadImage } from '@utils/uploadimg'

export interface ProgramData {
  error: string
  name: string
  thainame: string
  status?: string
  members: string
  ig: string
  fb: string
  others: string
  admissions: string
  courses: string
  interests: string
  captureimg1?: File
  descimg1: string
  captureimg2?: File
  descimg2: string
  captureimg3?: File
  descimg3: string
}

export const createProgram = async (body: Program) => {
  if ((await prisma.programs.count({ where: { email: body.email } })) > 0)
    return { status: 400, message: 'User already created a program' }
  const existing = (
    await prisma.programs.findUnique({ where: { key: body.key }, select: { email: true } })
  )?.email
  if (existing !== '') return { status: 400, message: 'Program key already exists' }
  try {
    const program = await prisma.programs.update({
      omit: { programId: true, updatedAt: true, id: true },
      where: { key: body.key },
      data: {
        key: body.key,
        email: body.email,
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
    return { status: 201, message: 'Creating program successfully', data: program }
  } catch (err) {
    return { status: 500, message: 'Error while creating program' }
  }
}

export const getProgramByName = async (name: Program['key']) => {
  const programData = (await getProgram(name)).data
  try {
    return { status: 200, message: 'Getting program successfully', data: programData }
  } catch (err) {
    return { status: 500, message: 'Error while getting program' }
  }
}

export const updateProgramData = async (
  name: keyof typeof AllData.Programs,
  body: ProgramData,
  headers: Headers,
) => {
  const programData = (await getProgram(name)).data
  const userData = (await getUser(headers)).data
  if (programData.status === Status.APPROVED)
    return { status: 400, message: 'Program already approved' }
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
        admissions: body.admissions,
        courses: body.courses,
        interests: body.interests,
        captureimg1:
          body.captureimg1 !== undefined
            ? await uploadImage(body.captureimg1)
            : programData.captureimg1,
        descimg1: body.descimg1,
        captureimg2:
          body.captureimg2 !== undefined
            ? await uploadImage(body.captureimg2)
            : programData.captureimg2,
        descimg2: body.descimg2,
        captureimg3:
          body.captureimg3 !== undefined
            ? await uploadImage(body.captureimg3)
            : programData.captureimg3,
        descimg3: body.descimg3,
        updatedBy: userData?.email,
      },
    })
    if (userData?.email === programData.email)
      await prisma.programs.update({ where: { key: name }, data: { status: Status.PENDING } })
    return { status: 200, message: 'Updating program data successfully', data: updatedOrganization }
  } catch (err) {
    return { status: 500, message: 'Error while updating program data' }
  }
}

export const getProgramReviews = async (name: keyof typeof AllData.Programs) => {
  const programData = (await getProgram(name)).data
  try {
    const reviewData = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: programData.key },
    })
    return { status: 200, message: 'Getting reviews successfully', data: reviewData }
  } catch (err) {
    return { status: 500, message: 'Error while getting reviews' }
  }
}

export const createProgramReview = async (name: keyof typeof AllData.Programs) => {
  const programData = (await getProgram(name)).data
  if ((await prisma.reviews.count({ where: { key: programData.key } })) >= 3)
    return { status: 400, message: 'Review reachs limit' }
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true, id: true },
      data: {
        key: programData.key,
        count: (
          (await prisma.reviews.count({ where: { key: programData.key } })) + 1
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

export const updateProgramReview = async (
  name: keyof typeof AllData.Programs,
  count: string,
  body: ReviewData,
) => {
  const programData = (await getProgram(name)).data
  const reviewData = await prisma.reviews.findUnique({ where: { key: programData.key, count } })
  try {
    const review = await prisma.reviews.update({
      omit: { reviewId: true, createdAt: true, id: true },
      where: { key: programData.key, count: count },
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

export const deleteProgramReview = async (name: keyof typeof AllData.Organizations, id: string) => {
  const programData = (await getProgram(name)).data
  try {
    await prisma.reviews.update({
      where: { key: programData.key, count: id },
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
