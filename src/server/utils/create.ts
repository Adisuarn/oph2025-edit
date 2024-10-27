import { AllData } from "@libs/data";
import { Tag } from "@utils/type";
import { prisma } from "@utils/db";
import type { Club, Program, Organization, Gifted } from '@utils/type'
import { error } from 'elysia'

const createClubs = async (body: Club) => {
  try { 
    const clubs = await prisma.clubs.create({
      omit: { clubId: true, updatedAt: true, id: true },
      data: {
        error: '',
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
    return { success: true, message: "Created clubs successfully", data: clubs }
  } catch (err) {
    throw error(500, 'Error while creating clubs')
  }
}

const createOrganizations = async (body: Organization) => {
  try { 
    const organizations = await prisma.organizations.create({
      omit: { organizationId: true, updatedAt: true, id: true },
      data: {
        error: '',
        key: body.key,
        email: body.email,
        name: '',
        thainame: AllData.Organizations[body.key],
        ig: '',
        fb: '',
        others: '',
        activities: '',
        position: '',
        working: '',
        captureimg1: '',
        descimg1: '',
        captureimg2: '',
        descimg2: '',
        captureimg3: '',
        descimg3: '',
      }
    })
    return { success: true, message: "Created organizations successfully", data: organizations }
  } catch (err) {
    throw error(500, 'Error while creating organizations')
  }
}

const createPrograms = async (body: Program) => {
  try { 
    const programs = await prisma.programs.create({
      omit: { programId: true, updatedAt: true, id: true },
      data: {
        error: '',
        key: body.key,
        email: body.email,
        name: '',
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
    return { success: true, message: "Created programs successfully", data: programs }
  } catch (err) {
    throw error(500, 'Error while creating programs')
  }
}

const createGifted = async (body: Gifted) => {
  try { 
    const gifted = await prisma.gifted.create({
      omit: { giftedId: true, updatedAt: true, id: true },
      data: {
        error: '',
        key: body.key,
        email: body.email,
        name: '',
        thainame: AllData.Gifted[body.key],
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
    return { success: true, message: "Created gifted successfully", data: gifted }
  } catch (err) {
    throw error(500, 'Error while creating gifted')
  }
}



export const createEverything = async () => {
  const createdOrganizations = await Promise.all(
    Object.keys(AllData.Organizations).map(async (key) => {
      const organization = await createOrganizations({
        email: "",
        key: key as keyof typeof AllData.Organizations,
        tag: Tag.ORGANIZATION,
      });
      return organization.data.thainame;
    })
  )
  const createdClubs = await Promise.all(
    Object.keys(AllData.Clubs).map(async (key) => {
      const club = await createClubs({
        email: "",
        key: key as keyof typeof AllData.Clubs,
        tag: Tag.CLUB,
      });
      return club.data.thainame;
    })
  )
  const createdPrograms = await Promise.all(
    Object.keys(AllData.Programs).map(async (key) => {
      const program = await createPrograms({
        email: "",
        key: key as keyof typeof AllData.Programs,
        tag: Tag.PROGRAM,
      });
      return program.data.thainame;
    })
  )
  const createdGifteds = await Promise.all(
    Object.keys(AllData.Gifted).map(async (key) => {
      const gifted = await createGifted({
        email: "",
        key: key as keyof typeof AllData.Gifted,
        tag: Tag.GIFTED,
      });
      return gifted.data.thainame;
    })
  )
  return {
    Organization: createdOrganizations,
    Club: createdClubs,
    Program: createdPrograms,
    Gifted: createdGifteds,
  }
}
