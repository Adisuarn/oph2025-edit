import { Elysia, t, error } from 'elysia'
import { AllData } from '@libs/data'

import {
  UnionField,
  StringField,
}
  from '@utils/validate'

import { getUser, getProgram } from '@middlewares/derive'

import {
  getProgramByName,
  updateProgramData,
  getProgramReviews,
  createProgramReview,
  updateProgramReview,
  deleteProgramReview
}
from '@modules/programs/programs.controller'

import { prisma } from '@utils/db'
import { ReviewData } from '@/server/utils/type'

export const programRouter = new Elysia({ prefix: '/programs' })
  .guard({
    async beforeHandle({ request: { headers } }) {
      const userData = (await getUser(headers)).data
      const program  = await prisma.programs.findUnique({
        where: { email: userData?.email },
        select: { key: true }
      })
      const name = program?.key
      if (!name) return error(404, 'Program Not Found')
      if (typeof name !== 'string') return error(400, 'Invalid Program Name')
      const programData = (await getProgram(name)).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== programData.email) {
        return error(401, 'Unauthorized')
    }}
  })
  .get('/:name', async ({ params: { name } }) => {
    return await getProgramByName(name)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
      })
    })
  .patch('/:name', async ({ params: { name }, body, request: { headers }}) => {
    return await updateProgramData(name, body, headers)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        name: StringField(false, 'Invalid Name'),
        thainame: StringField(false, 'Invalid Thai Name'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        admissions: StringField(true, 'Invalid Admission'),
        courses: StringField(true, 'Invalid Courses'),
        interests: StringField(true, 'Invalid Interests'),
        captureimg1: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg1: StringField(true, 'Invalid Description Image'),
        captureimg2: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg2: StringField(true, 'Invalid Description Image'),
        captureimg3: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg3: StringField(true, 'Invalid Description Image'),
      }),
    })
  .get('/:name/review', async ({ params: { name } }) => {
    return await getProgramReviews(name)
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
    })
  })
  .post('/:name/review', async ({ params: { name }, set }) => {
    const response = await createProgramReview(name)
    if (response?.success) {
      set.status = 201
      return response
    }
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
    })
  })
  .patch('/:name/review/:id', async ({ params: { name, id }, body }) => {
    return await updateProgramReview(name, id, body as ReviewData)
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
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
  .delete('/:name/review/:id', async ({ params: { name, id } }) => {
    return await deleteProgramReview(name, id)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
        id: StringField(true, 'Invalid Review ID')
      })
    })
