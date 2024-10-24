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
  getClubReviews,
  createClubReview,
  updateClubReview,
  deleteClubReview
}
from '@modules/clubs/clubs.controller'
import { ReviewData } from '@/server/utils/type'

export const clubRouter = new Elysia({ prefix: '/clubs' })
  .guard({
    async beforeHandle({ request: { headers } }) {
      const userData = (await getUser(headers)).data
      const club = await prisma.clubs.findUnique({
        where: { email: userData?.email },
        select: { key: true }
      })
      const key = club?.key
      if (!key) return error(404, 'Club Not Found')
      if (typeof key !== 'string') return error(400, 'Invalid Club Key')
      const clubData = (await getClub(key)).data
      if(userData?.TUCMC === true) {
        return
      } else if (userData?.email !== clubData.email) {
        return error(401, 'Unauthorized')
      }
    }
  })
  .get('/:key', async ({ params: { key } }) => {
    console.log(decodeURIComponent(key))
    return (await getClubByKey(decodeURIComponent(key) as keyof typeof AllData.Clubs))
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .patch('/:key', async ({ params: { key }, body, request: { headers } }) => {
    return await updateClubData(decodeURIComponent(key) as keyof typeof AllData.Clubs, body, headers)
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    }),
    body: t.Object({
      error: StringField(false, 'Invalid Error'),
      name: StringField(false, 'Invalid Name'),
      thainame: StringField(false, 'Invalid Thai Name'),
      members: StringField(true, 'Invalid Member'),
      ig: StringField(false, 'Invalid Instagram'),
      fb: StringField(false, 'Invalid Facebook'),
      others: StringField(false, 'Invalid Others'),
      activities: StringField(true, 'Invalid Activities'),
      benefits: StringField(true, 'Invalid Benefits'),
      working: StringField(true, 'Invalid Working'),
      captureimg1: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
      descimg1: StringField(true, 'Invalid Description Image'),
      captureimg2: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
      descimg2: StringField(true, 'Invalid Description Image'),
      captureimg3: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
      descimg3: StringField(true, 'Invalid Description Image'),
      logo: t.Optional(t.File({error() { return 'Invalid Logo' }})),
    })
  })
  .get('/:key/review', async ({ params: { key } }) => {
    return await getClubReviews(decodeURIComponent(key) as keyof typeof AllData.Clubs)
  },{
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .post('/:key/review', async ({ params: { key }, set }) => {
    const response = await createClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs)
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
    return await updateClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id, body as ReviewData)
  }, {
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      id: StringField(true, 'Invalid Review ID')
    }),
    body: t.Object({
      profile: t.Optional(t.File({ error() { return 'Invalid Profile' } })),
      nick: StringField(true, 'Invalid Nickname'),
      gen: StringField(true, 'Invalid Generation'),
      contact: StringField(true, 'Invalid Contact'),
      content: StringField(true, 'Invalid Content'),
    })
  })
  .delete('/:key/review/:id', async ({ params: { key, id } }) => {
    return await deleteClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id)
  },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
        id: StringField(true, 'Invalid Review ID')
      })
    })
