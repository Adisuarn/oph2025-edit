'use server'
import apiFunction from "../api";
import { Status, Tag } from '@utils/type'

export const updateStatus = async (data: any, status: Status, rejectionMessage: string) => {
  const body = {
    status: status,
    error: rejectionMessage
  }
  await apiFunction('PATCH', `/tucmc/data/${data.data.tag}/${data.data.key}`, body)
}

export const updateData = async (data: any, tag: any, key: any) => {
  switch(tag) {
    case Tag.CLUB:
      const body = {
        activities: data.activities,
        benefits: data.benefits,
        working: data.working,
        descimg1: data.descimg1,
        descimg2: data.descimg2,
        descimg3: data.descimg3,
      }
      await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/edit`, body)
      data.reviews.map(async (review: any) =>{
        const bodyReview = {
          nick: review.nick,
          gen: review.gen,
          content: review.content,
          contact: review.contact,
        }
        await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/review/${review.count}`, bodyReview)
      })
      break
    case Tag.ORGANIZATION:
      const bodyOrg = {
        activities: data.activities,
        position: data.benefits,
        working: data.working,
        descimg1: data.descimg1,
        descimg2: data.descimg2,
        descimg3: data.descimg3,
      }
      await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/edit`, bodyOrg)
      data.reviews.map(async (review: any) =>{
        const bodyReview = {
          nick: review.nick,
          gen: review.gen,
          content: review.content,
          contact: review.contact,
        }
        await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/review/${review.count}`, bodyReview)
      })
      break
    case Tag.PROGRAM:
      const bodyProg = {
        admissions: data.activities,
        courses: data.benefits,
        interests: data.working,
        descimg1: data.descimg1,
        descimg2: data.descimg2,
        descimg3: data.descimg3,
      }
      await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/edit`, bodyProg)
      data.reviews.map(async (review: any) =>{
        const bodyReview = {
          nick: review.nick,
          gen: review.gen,
          content: review.content,
          contact: review.contact,
        }
        await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/review/${review.count}`, bodyReview)
      })
      break 
    case Tag.GIFTED:
      const bodyGift = {
        admissions: data.activities,
        courses: data.benefits,
        interests: data.working,
        descimg1: data.descimg1,
        descimg2: data.descimg2,
        descimg3: data.descimg3,
      }
      await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/edit`, bodyGift)
      data.reviews.map(async (review: any) =>{
        const bodyReview = {
          nick: review.nick,
          gen: review.gen,
          content: review.content,
          contact: review.contact,
        }
        await apiFunction('PATCH', `/tucmc/data/${tag}/${key}/review/${review.count}`, bodyReview)
      })
      break
  }
}
