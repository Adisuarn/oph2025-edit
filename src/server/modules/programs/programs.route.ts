import { AllData } from '@libs/data'
import { getProgram, getUser } from '@middlewares/derive'
import {
  createProgramReview,
  deleteProgramReview,
  getProgramByName,
  getProgramReviews,
  updateProgramData,
  updateProgramReview,
} from '@modules/programs/programs.controller'
import { StringField, UnionField } from '@utils/validate'
import { Elysia, error, t } from 'elysia'

import { ReviewData } from '@/server/utils/type'

export const programRouter = new Elysia({ prefix: '/programs' })
  .guard({
    async beforeHandle({ request: { headers }, params: { name, id } }) {
      const userData = (await getUser(headers)).data
      const programData = (await getProgram(name)).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== programData.email) {
        return error(403, 'Forbidden')
      }
    },
    params: t.Object({
      name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
      id: StringField(false, 'Invalid Review ID'),
    }),
  })
  .get(
    '/:name',
    async ({ params: { name } }) => {
      const response = await getProgramByName(name)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
      }),
    },
  )
  .patch(
    '/:name',
    async ({ params: { name }, body, request: { headers } }) => {
      const response = await updateProgramData(name, body, headers)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        admissions: StringField(true, 'Invalid Admission'),
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
      const response = await getProgramReviews(name)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
      }),
    },
  )
  .post(
    '/:name/review',
    async ({ params: { name }, set }) => {
      const response = await createProgramReview(name)
      if (response.status !== 201) {
        return error(response.status, response.message)
      }

      set.status = 201
      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
      }),
    },
  )
  .patch(
    '/:name/review/:id',
    async ({ params: { name, id }, body }) => {
      const response = await updateProgramReview(name, id, body as ReviewData)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
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
      const response = await deleteProgramReview(name, id)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response.message
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
        id: StringField(true, 'Invalid Review ID'),
      }),
    },
  )
