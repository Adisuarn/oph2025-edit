import fs from 'fs'
import path from 'path'

import { AllData } from '@/libs/data'
import { prisma } from './db'

interface Club {
  _id: { $oid: string }
  id: number
  tag: string
  name: string
  engname: string
  status: string
  members: string
  ig: string
  facebook: string
  others: string
  clubsactivity: string
  benefits: string
  workings: string
  counts: number
  review_1: { name: string; gen: string; contact: string; review: string }
  review_2: { name: string; gen: string; contact: string; review: string }
  review_3: { name: string; gen: string; contact: string; review: string }
  logo: string
  image1: string
  image2: string
  image3: string
  imgprofile1: string
  imgprofile2: string
  imgprofile3: string
  capturepic1: string
  capturepic2: string
  capturepic3: string
  __v: number
}

interface Organization {
  _id: { $oid: string }
  id: number
  tag: string
  name: string
  engname: string
  status: string
  members: string
  ig: string
  facebook: string
  others: string
  organizationdo: string
  position: string
  working: string
  counts: number
  review_1: { name: string; gen: string; contact: string; review: string }
  review_2: { name: string; gen: string; contact: string; review: string }
  review_3: { name: string; gen: string; contact: string; review: string }
  logo: string
  image1: string
  image2: string
  image3: string
  imgprofile1: string
  imgprofile2: string
  imgprofile3: string
  capturepic1: string
  capturepic2: string
  capturepic3: string
  __v: number
}

interface Programs {
  _id: { $oid: string }
  id: number
  tag: string
  name: string
  engname: string
  status: string
  members: string
  ig: string
  facebook: string
  others: string
  admission: string
  subjects: string
  interests: string
  counts: number
  review_1: { name: string; gen: string; contact: string; review: string }
  review_2: { name: string; gen: string; contact: string; review: string }
  review_3: { name: string; gen: string; contact: string; review: string }
  image1: string
  image2: string
  image3: string
  imgprofile1: string
  imgprofile2: string
  imgprofile3: string
  capturepic1: string
  capturepic2: string
  capturepic3: string
  __v: number
}

interface Gifted {
  _id: { $oid: string }
  id: number
  tag: string
  name: string
  engname: string
  status: string
  members: string
  ig: string
  facebook: string
  others: string
  admission: string
  subjects: string
  interests: string
  counts: number
  review_1: { name: string; gen: string; contact: string; review: string }
  review_2: { name: string; gen: string; contact: string; review: string }
  review_3: { name: string; gen: string; contact: string; review: string }
  image1: string
  image2: string
  image3: string
  imgprofile1: string
  imgprofile2: string
  imgprofile3: string
  capturepic1: string
  capturepic2: string
  capturepic3: string
  __v: number
}

export async function importClubData() {
  const filePath = path.join(__dirname, '../../../../../src/libs/old_data/test.clubs.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Club[]
  console.log('ClubData import started...')
  for (const item of data) {
    const key = Object.keys(AllData.Clubs).find(
      (k) => AllData.Clubs[k as keyof typeof AllData.Clubs] === item.name,
    )
    console.log(`Importing ${item.name}, existing key: ${key}`)
    const transformedItem = {
      thainame: item.name,
      name: item.engname || '',
      members: item.members.replace(/\D/g, '') || '0',
      ig: item.ig.trim(),
      fb: item.facebook.trim(),
      others: item.others.trim(),
      activities: item.clubsactivity,
      benefits: item.benefits,
      working: item.workings,
      captureimg1: item.image1,
      captureimg2: item.image2,
      captureimg3: item.image3,
      logo: item.logo,
    }

    await prisma.clubs.update({
      where: { key: key!, thainame: item.name },
      data: transformedItem,
    })

    for (let count = 1; count <= 3; count++) {
      const review = item[`review_${count as 1 | 2 | 3}`] as Club['review_1']
      if (review && review.review) {
        const reviewData = {
          profile: item[`imgprofile${count as 1 | 2 | 3}`],
          nick: review.name,
          gen: review.gen,
          contact: review.contact,
          content: review.review,
        }
        await prisma.reviews.create({
          data: {
            key: key!,
            count: count.toString(),
            ...reviewData,
          },
        })
      }
    }
  }

  return console.log('ClubData import completed.')
}

export async function importProgramData() {
  const filePath = path.join(__dirname, '../../../../../src/libs/old_data/test.lesson-plans.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Programs[]
  console.log('ProgramData import started...')
  for (const item of data) {
    const key = Object.keys(AllData.Programs).find(
      (k) => AllData.Programs[k as keyof typeof AllData.Programs] === item.name,
    )
    console.log(`Importing ${item.name}, existing key: ${key}`)
    const transformedItem = {
      thainame: item.name,
      name: item.engname || '',
      members: item.members.replace(/\D/g, '') || '0',
      ig: item.ig.trim(),
      fb: item.facebook.trim(),
      others: item.others.trim(),
      admissions: item.admission,
      courses: item.subjects,
      interests: item.interests,
      captureimg1: item.image1,
      captureimg2: item.image2,
      captureimg3: item.image3,
    }

    await prisma.programs.update({
      where: { key: key!, thainame: item.name },
      data: transformedItem,
    })

    for (let count = 1; count <= 3; count++) {
      const review = item[`review_${count as 1 | 2 | 3}`] as Club['review_1']
      if (review && review.review) {
        const reviewData = {
          profile: item[`imgprofile${count as 1 | 2 | 3}`],
          nick: review.name,
          gen: review.gen,
          contact: review.contact,
          content: review.review,
        }
        await prisma.reviews.create({
          data: {
            key: key!,
            count: count.toString(),
            ...reviewData,
          },
        })
      }
    }
  }

  return console.log('ProgramData import completed.')
}

export async function importGiftedData() {
  const filePath = path.join(__dirname, '../../../../../src/libs/old_data/test.gifteds.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Gifted[]
  console.log('Gifted import started...')
  for (const item of data) {
    const key = Object.keys(AllData.Gifted).find(
      (k) => AllData.Gifted[k as keyof typeof AllData.Gifted] === item.name,
    )
    console.log(`Importing ${item.name}, existing key: ${key}`)
    const transformedItem = {
      thainame: item.name,
      name: item.engname || '',
      members: item.members.replace(/\D/g, '') || '0',
      ig: item.ig.trim(),
      fb: item.facebook.trim(),
      others: item.others.trim(),
      admissions: item.admission,
      courses: item.subjects,
      interests: item.interests,
      captureimg1: item.image1,
      captureimg2: item.image2,
      captureimg3: item.image3,
    }

    await prisma.gifted.update({
      where: { key: key!, thainame: item.name },
      data: transformedItem,
    })

    for (let count = 1; count <= 3; count++) {
      const review = item[`review_${count as 1 | 2 | 3}`] as Club['review_1']
      if (review && review.review) {
        const reviewData = {
          profile: item[`imgprofile${count as 1 | 2 | 3}`],
          nick: review.name,
          gen: review.gen,
          contact: review.contact,
          content: review.review,
        }
        await prisma.reviews.create({
          data: {
            key: key!,
            count: count.toString(),
            ...reviewData,
          },
        })
      }
    }
  }

  return console.log('GiftedData import completed.')
}

export async function importOrganizationData() {
  const filePath = path.join(__dirname, '../../../../../src/libs/old_data/test.organizations.json')
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8')) as Organization[]
  console.log('Organization import started...')
  try {
    for (const item of data) {
      const key = Object.keys(AllData.Organizations).find(
        (k) => AllData.Organizations[k as keyof typeof AllData.Organizations] === item.name,
      )
      console.log(`Importing ${item.name}, existing key: ${key}`)
      const transformedItem = {
        thainame: item.name,
        name: item.engname || '',
        members: item.members.replace(/\D/g, '') || '0',
        ig: item.ig.trim(),
        fb: item.facebook.trim(),
        others: item.others.trim(),
        activities: item.organizationdo,
        position: item.position,
        working: item.working,
        captureimg1: item.image1,
        captureimg2: item.image2,
        captureimg3: item.image3,
      }

      await prisma.organizations.update({
        where: { key: key!, thainame: item.name },
        data: transformedItem,
      })

      for (let count = 1; count <= 3; count++) {
        const review = item[`review_${count as 1 | 2 | 3}`] as Club['review_1']
        if (review && review.review) {
          const reviewData = {
            profile: item[`imgprofile${count as 1 | 2 | 3}`],
            nick: review.name,
            gen: review.gen,
            contact: review.contact,
            content: review.review,
          }
          await prisma.reviews.create({
            data: {
              key: key!,
              count: count.toString(),
              ...reviewData,
            },
          })
        }
      }
    }
  } catch (error) {
    console.log(error)
  }
  return console.log('OrganizationData import completed.')
}
