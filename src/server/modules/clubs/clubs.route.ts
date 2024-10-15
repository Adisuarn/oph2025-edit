import { Elysia, t, error } from 'elysia'
import { AllData } from '@libs/data'
import { getUser, getClub } from '@middlewares/derive'
import { prisma } from '@utils/db'

import {
  EncodedUnionField,
  StringField,
}
from '@/server/utils/validate'

import {
  getClubByKey,
  updateClubData,
  getReviews,
  createReview,
  updateReview,
  deleteReview
}
from '@modules/clubs/clubs.controller'

export const clubRouter = new Elysia({ prefix: '/clubs' })
  .guard({
    async beforeHandle() {
      const userData = (await getUser()).data
      const club = await prisma.clubs.findUnique({
        where: { email: userData?.email },
        select: { key: true }
      })
      const key = club?.key
      if (!key) return error(404, 'Club Not Found')
      if (typeof key !== 'string') return error(400, 'Invalid Club Key')
      const clubData = (await getClub(key)).data
      if (!userData?.TUCMC && (userData?.email !== clubData.email)) return error(401, 'Unauthorized')
    }
  })
  .get('/:key', async ({ params: { key } }) => {
    return (await getClubByKey(decodeURIComponent(key) as keyof typeof AllData.Clubs))
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .patch('/:key', async ({ params: { key }, body }) => {
    return await updateClubData(decodeURIComponent(key) as keyof typeof AllData.Clubs, body)
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    }),
    body: t.Object({
      name: StringField(true, 'Invalid Name'),
      thainame: StringField(true, 'Invalid Thai Name'),
      members: StringField(true, 'Invalid Member'),
      ig: StringField(true, 'Invalid Instagram'),
      fb: StringField(true, 'Invalid Facebook'),
      others: StringField(true, 'Invalid Others'),
      activities: StringField(true, 'Invalid Activities'),
      benefits: StringField(true, 'Invalid Benefits'),
      working: StringField(true, 'Invalid Working'),
      captureimg1: t.File(),
      descimg1: StringField(true, 'Invalid Description Image'),
      captureimg2: t.File(),
      descimg2: StringField(true, 'Invalid Description Image'),
      captureimg3: t.File(),
      descimg3: StringField(true, 'Invalid Description Image'),
      logo: t.File()
    })
  })
  .get('/:key/review', async ({ params: { key } }) => {
    return await getReviews(decodeURIComponent(key) as keyof typeof AllData.Clubs)
  },{
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .post('/:key/review', async ({ params: { key }, set }) => {
    const response = await createReview(decodeURIComponent(key) as keyof typeof AllData.Clubs)
    if (response?.success) {
      set.status = 201
      return response
    }
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .patch('/:key/review/:id', async ({ params: { key, id }, body }) => {
    return await updateReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id, body)
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      id: StringField(true, 'Invalid Review ID')
    }),
    body: t.Object({
      profile: t.File(),
      name: t.String(),
      nick: t.String(),
      gen: t.String(),
      contact: t.String(),
      content: t.String(),
    })
  })
  .delete('/:key/review/:id', async ({ params: { key, id } }) => {
    return await deleteReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id)
  },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
        id: StringField(true, 'Invalid Review ID')
      })
    })
