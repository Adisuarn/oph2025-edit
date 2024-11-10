import { AllData } from '@libs/data'
import { getClubReviews } from '@modules/clubs/clubs.controller'
import { getOrganizationReviews } from '@modules/organizations/organizations.controller'
import { getProgramReviews } from '@modules/programs/programs.controller'
import { prisma } from '@utils/db'
import { Status, Tag } from '@utils/type'

import { getGiftedReviews } from '@/server/modules/gifted/gifted.controller'

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

export const handlerWrongSubmit = async (email: string, changedTag: any, changedKey: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  const upperCaseTag = changedTag.charAt(0).toUpperCase() + changedTag.slice(1)

  const isKeyInTag = Object.keys(AllData[upperCaseTag as keyof typeof AllData]).includes(changedKey)
  if (!isKeyInTag) return { status: 400, message: 'Key and Tag mismatch' }

  if (!user) return { status: 404, message: 'User not found' }
  if (user.key === changedKey) return { status: 400, message: 'Key is the same' }

  const resetData = async (tag: Tag) => {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
    }
  }

  const updateDataByTag = async (tag: Tag, key: any) => {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
    }
  }

  switch (user.tag) {
    case Tag.CLUB:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.ORGANIZATION:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.PROGRAM:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.GIFTED:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    default:
      return { status: 400, message: 'Invalid tag' }
  }
}
