import { AllData } from '@libs/data'
import { getClub, getUser } from '@middlewares/derive'
import {
  createClubReview,
  deleteClubReview,
  getClubByKey,
  getClubReviews,
  updateClubData,
  updateClubReview,
} from '@modules/clubs/clubs.controller'
import { Elysia, error, t } from 'elysia'

import { ReviewData } from '@/server/utils/type'
import { EncodedUnionField, StringField } from '@/server/utils/validate'

export const clubRouter = new Elysia({ prefix: '/clubs' })
  .guard({
    async beforeHandle({ request: { headers }, params: { key, id } }) {
      const userData = (await getUser(headers)).data
      const clubData = (await getClub(decodeURIComponent(key))).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== clubData.email) {
        return error(403, 'Forbidden')
      }
    },
    params: t.Object({
      key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      id: StringField(false, 'Invalid Review ID'),
    }),
  })
  .get(
    '/:key',
    async ({ params: { key } }) => {
      const response = await getClubByKey(decodeURIComponent(key) as keyof typeof AllData.Clubs)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      }),
    },
  )
  .patch(
    '/:key',
    async ({ params: { key }, body, request: { headers } }) => {
      const response = await updateClubData(
        decodeURIComponent(key) as keyof typeof AllData.Clubs,
        body,
        headers,
      )
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        activities: StringField(true, 'Invalid Activities'),
        benefits: StringField(true, 'Invalid Benefits'),
        working: StringField(true, 'Invalid Working'),
        captureimg1: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 1'
            },
          }),
        ),
        descimg1: StringField(true, 'Invalid Description Image'),
        captureimg2: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 2'
            },
          }),
        ),
        descimg2: StringField(true, 'Invalid Description Image'),
        captureimg3: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 3'
            },
          }),
        ),
        descimg3: StringField(true, 'Invalid Description Image'),
        logo: t.Optional(
          t.File({
            error() {
              return 'Invalid Logo'
            },
          }),
        ),
      }),
    },
  )
  .get(
    '/:key/review',
    async ({ params: { key } }) => {
      const response = await getClubReviews(decodeURIComponent(key) as keyof typeof AllData.Clubs)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      }),
    },
  )
  .post(
    '/:key/review',
    async ({ params: { key }, set }) => {
      const response = await createClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs)
      if (response.status !== 201) {
        return error(response.status, response.message)
      }
      set.status = 201
      return response

    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
      }),
    },
  )
  .patch(
    '/:key/review/:id',
    async ({ params: { key, id }, body }) => {
      const response = await updateClubReview(
        decodeURIComponent(key) as keyof typeof AllData.Clubs,
        id,
        body as ReviewData,
      )
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
        id: StringField(true, 'Invalid Review ID'),
      }),
      body: t.Object({
        profile: t.Optional(
          t.File({
            error() {
              return 'Invalid Profile'
            },
          }),
        ),
        nick: StringField(true, 'Invalid Nickname'),
        gen: StringField(true, 'Invalid Generation'),
        contact: StringField(true, 'Invalid Contact'),
        content: StringField(true, 'Invalid Content'),
      }),
    },
  )
  .delete(
    '/:key/review/:id',
    async ({ params: { key, id } }) => {
      const response = await deleteClubReview(
        decodeURIComponent(key) as keyof typeof AllData.Clubs,
        id,
      )
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response.message
    },
    {
      params: t.Object({
        key: EncodedUnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs)),
        id: StringField(true, 'Invalid Review ID'),
      }),
    },
  )
