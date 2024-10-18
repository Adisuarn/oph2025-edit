import { prisma } from '@utils/db'
import { error } from 'elysia'
import { AllData } from '@libs/data'
import { Status, Tag } from '@utils/type'
import {
  getClubReviews,
} from '@modules/clubs/clubs.controller'

import {
  getGiftedReviews,
} from '@modules/gifted/gifted.controller'

import {
  getProgramReviews,
} from '@modules/programs/programs.controller'

import {
  getOrganizationReviews,
} from '@modules/organizations/organizations.controller'

export const updateStatus = async (tag: Tag, key: string, status: Status) => {
  try {
    switch (tag) {
      case 'club':
        await prisma.clubs.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case 'organization':
        await prisma.organizations.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case 'program':
        await prisma.programs.update({
          where: { key },
          data: { status: status }
        })
        return { success: true, message: `Updating status: ${status} successfully` }
      case 'gifted':
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
    const programs = await prisma.programs.findMany({
      omit: { programId: true, id: true }
    })
    for (const program of programs) {
      const reviews = await getProgramReviews(program.key as keyof typeof AllData.Programs)
      data.programs.push({ ...program, reviews: reviews.data })
    }
    const gifted = await prisma.gifted.findMany({
      omit: { giftedId: true, id: true }
    })
    for (const gift of gifted) {
      const reviews = await getGiftedReviews(gift.key as keyof typeof AllData.Gifted)
      data.gifted.push({ ...gift, reviews: reviews.data })
    }
    const clubs = await prisma.clubs.findMany({
      omit: { clubId: true, id: true }
    })
    for (const club of clubs) {
      const reviews = await getClubReviews(club.key as keyof typeof AllData.Clubs)
      data.clubs.push({ ...club, reviews: reviews.data })
    }
    const organizations = await prisma.organizations.findMany({
      omit: { organizationId: true, id: true }
    })
    for (const organization of organizations) {
      const reviews = await getOrganizationReviews(organization.key as keyof typeof AllData.Organizations)
      data.organizations.push({ ...organization, reviews: reviews.data })
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
      case 'club':
        data = await prisma.clubs.findUnique({
          omit: { clubId: true, id: true },
          where: { key }
        })
        data.reviews = await getClubReviews(key as keyof typeof AllData.Clubs)
        break
      case 'organization':
        data = await prisma.organizations.findUnique({
          omit: { organizationId: true, id: true },
          where: { key }
        })
        data.reviews = await getOrganizationReviews(key as keyof typeof AllData.Organizations)
        break
      case 'program':
        data = await prisma.programs.findUnique({
          omit: { programId: true, id: true },
          where: { key }
        })
        data.reviews = await getProgramReviews(key as keyof typeof AllData.Programs)
        break
      case 'gifted':
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
      case 'club':
        await prisma.clubs.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case 'organization':
        await prisma.organizations.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case 'program':
        await prisma.programs.update({
          where: { key },
          data: { error: body.error }
        })
        return { success: true, message: `Updating error: ${body.error} successfully` }
      case 'gifted':
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
