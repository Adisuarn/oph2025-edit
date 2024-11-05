import { AllData } from '@libs/data'
import { getClubReviews } from '@modules/clubs/clubs.controller'
import { getGiftedReviews } from '@/server/modules/gifted/gifted.controller'
import { getOrganizationReviews } from '@modules/organizations/organizations.controller'
import { getProgramReviews } from '@modules/programs/programs.controller'
import { prisma } from '@utils/db'
import { Status, Tag } from '@utils/type'

export const updateStatus = async (tag: Tag, key: string, status: Status, errorMsg: string) => {
  try {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      default:
        return { status: 400, message: 'Invalid tag' }
    }
  } catch (err) {
    return { status: 500, message: 'Error while updating status' }
  }
}

export const getAllData = async () => {
  let data: {
    clubs: any[]
    organizations: any[]
    programs: any[]
    gifted: any[]
  } = {
    clubs: [],
    organizations: [],
    programs: [],
    gifted: [],
  }
  try {
    const programs = await prisma.programs.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const program of programs) {
      data.programs.push({ ...program })
    }
    const gifted = await prisma.gifted.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const gift of gifted) {
      data.gifted.push({ ...gift })
    }
    const clubs = await prisma.clubs.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const club of clubs) {
      data.clubs.push({ ...club })
    }
    const organizations = await prisma.organizations.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const organization of organizations) {
      data.organizations.push({ ...organization })
    }
  } catch (err) {
    return { status: 500, message: 'Error while getting all data' }
  }
  return { status: 200, message: 'Getting all data successfully', data }
}

export const getDataByKey = async (tag: string, key: string) => {
  let data: any
  try {
    switch (tag) {
      case Tag.CLUB:
        data = await prisma.clubs.findUnique({
          omit: { clubId: true, id: true },
          where: { key },
        })
        data.reviews = await getClubReviews(key as keyof typeof AllData.Clubs)
        break
      case Tag.ORGANIZATION:
        data = await prisma.organizations.findUnique({
          omit: { organizationId: true, id: true },
          where: { key },
        })
        data.reviews = await getOrganizationReviews(key as keyof typeof AllData.Organizations)
        break
      case Tag.PROGRAM:
        data = await prisma.programs.findUnique({
          omit: { programId: true, id: true },
          where: { key },
        })
        data.reviews = await getProgramReviews(key as keyof typeof AllData.Programs)
        break
      case Tag.GIFTED:
        data = await prisma.gifted.findUnique({
          omit: { giftedId: true, id: true },
          where: { key },
        })
        data.reviews = await getGiftedReviews(key as keyof typeof AllData.Gifted)
        break
      default:
        return { status: 400, message: 'Invalid tag' }
    }
  } catch (err) {
    return { status: 500, message: 'Error while getting data by key' }
  }
  return { status: 200, message: 'Getting data by key successfully', data }
}
