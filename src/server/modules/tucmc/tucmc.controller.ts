import { prisma } from '@utils/db'
import { error } from 'elysia'
import { AllData } from '@libs/data'
import { Status, Tag } from '@utils/type'
import { getClubReviews } from '@modules/clubs/clubs.controller'
import { getGiftedReviews } from '@modules/gifted/gifted.controller'
import { getProgramReviews } from '@modules/programs/programs.controller'
import { getOrganizationReviews } from '@modules/organizations/organizations.controller'

export const updateStatus = async (tag: Tag, key: string, status: Status) => {
  try {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      default:
        throw error(400, 'Invalid tag')
    }
  } catch (err) {
    throw error(500, 'Error while updating status')
  }
}

export const getAllData = async () => {
  let data: {
    clubs: any[],
    organizations: any[],
    programs: any[],
    gifted: any[]
  } = {
    clubs: [],
    organizations: [],
    programs: [],
    gifted: []
  }
  try {
    const programs = await prisma.programs.findMany({ select: { key: true, tag: true, thainame: true, status: true } })
    for (const program of programs) {
      data.programs.push({ ...program })
    }
    const gifted = await prisma.gifted.findMany({ select: { key: true, tag: true, thainame: true, status: true } })
    for (const gift of gifted) {
      data.gifted.push({ ...gift })
    }
    const clubs = await prisma.clubs.findMany({ select: { key: true, tag: true, thainame: true, status: true } })
    for (const club of clubs) {
      data.clubs.push({ ...club })
    }
    const organizations = await prisma.organizations.findMany({ select: { key: true, tag: true, thainame: true, status: true } })
    for (const organization of organizations) {
      data.organizations.push({ ...organization })
    }
  } catch (err) {
    throw error(500, 'Error while getting all data')
  }
  return { success: true, message: 'Getting all data successfully', data }
}

export const getDataByKey = async (tag: string, key: string) => {
  let data: any
  try {
    switch (tag) {
      case Tag.CLUB:
        data = await prisma.clubs.findUnique({
          omit: { clubId: true, id: true },
          where: { key }
        })
        data.reviews = await getClubReviews(key as keyof typeof AllData.Clubs)
        break
      case Tag.ORGANIZATION:
        data = await prisma.organizations.findUnique({
          omit: { organizationId: true, id: true },
          where: { key }
        })
        data.reviews = await getOrganizationReviews(key as keyof typeof AllData.Organizations)
        break
      case Tag.PROGRAM:
        data = await prisma.programs.findUnique({
          omit: { programId: true, id: true },
          where: { key }
        })
        data.reviews = await getProgramReviews(key as keyof typeof AllData.Programs)
        break
      case Tag.GIFTED:
        data = await prisma.gifted.findUnique({
          omit: { giftedId: true, id: true },
          where: { key }
        })
        data.reviews = await getGiftedReviews(key as keyof typeof AllData.Gifted)
        break
      default:
        throw error(400, 'Invalid tag')
    }
  } catch (err) {
    throw error(500, 'Error while getting data by key')
  }
  return { success: true, message: 'Getting data by key successfully', data }
}

export const updateError = async (tag: Tag, key: string, body: any) => {
  try {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      default:
        throw error(400, 'Invalid tag')
    }
  } catch (err) {
    throw error(500, 'Error while updating error')
  }
}
