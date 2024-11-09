import { AllData } from '@libs/data'
import { getGifted, getUser } from '@middlewares/derive'
import {
  createGiftedReview,
  deleteGiftedReview,
  getGiftedByName,
  getGiftedReviews,
  updateGiftedData,
  updateGiftedReview,
} from '@/server/modules/gifted/gifted.controller'
import { ReviewData } from '@utils/type'
import { StringField, UnionField } from '@utils/validate'
import { Elysia, error, t } from 'elysia'

export const giftedRouter = new Elysia({ prefix: '/gifted' })
  .guard({
    async beforeHandle({ request: { headers }, params: { name, id } }) {
      const userData = (await getUser(headers)).data
      const giftedData = (await getGifted(name)).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== giftedData.email) {
        return error(403, 'Forbidden')
      }
    },
    params: t.Object({
      name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
      id: StringField(false, 'Invalid Review ID'),
    }),
  })
  .get(
    '/:name',
    async ({ params: { name } }) => {
      const response = await getGiftedByName(name)
      switch (response.status) {
        case 200:
          return response
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
      }),
    },
  )
  .patch(
    '/:name',
    async ({ params: { name }, body, request: { headers } }) => {
      const response = await updateGiftedData(name, body, headers)
      switch (response.status) {
        case 200:
          return response
        case 400:
          return error(400, response.message)
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        admissions: StringField(true, 'Invalid Admissions'),
        courses: StringField(true, 'Invalid Courses'),
        interests: StringField(true, 'Invalid Interests'),
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
      }),
    },
  )
  .get(
    '/:name/review',
    async ({ params: { name } }) => {
      const response = await getGiftedReviews(name)
      switch (response.status) {
        case 200:
          return response
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
      }),
    },
  )
  .post(
    '/:name/review',
    async ({ params: { name }, set }) => {
      const response = await createGiftedReview(name)
      switch (response.status) {
        case 201:
          set.status = 201
          return response
        case 400:
          return error(400, response.message)
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
      }),
    },
  )
  .patch(
    '/:name/review/:id',
    async ({ params: { name, id }, body }) => {
      const response = await updateGiftedReview(name, id, body as ReviewData)
      switch (response.status) {
        case 200:
          return response
        case 400:
          return error(400, response.message)
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Gifted)),
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
    '/:name/review/:id',
    async ({ params: { name, id } }) => {
      const response = await deleteGiftedReview(name, id)
      switch (response.status) {
        case 200:
          return response.message
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Gifted Name', Object.keys(AllData.Gifted)),
        id: StringField(true, 'Invalid Review ID'),
      }),
    },
  )
