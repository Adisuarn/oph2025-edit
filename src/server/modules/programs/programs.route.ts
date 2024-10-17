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

export const programRouter = new Elysia({ prefix: '/programs' })
  .guard({
    async beforeHandle() {
      const userData = (await getUser()).data
      const program  = await prisma.programs.findUnique({
        where: { email: userData?.email },
        select: { name: true }
      })
      const name = program?.name
      if (!name) return error(404, 'Program Not Found')
      if (typeof name !== 'string') return error(400, 'Invalid Program Name')
      const programData = (await getProgram(name)).data
      if (!userData?.TUCMC && (userData?.email !== programData.email)) return error(401, 'Unauthorized')
    }
  })
  .get('/:name', async ({ params: { name } }) => {
    return await getProgramByName(name)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
      })
    })
  .patch('/:name', async ({ params: { name }, body }) => {
    return await updateProgramData(name, body)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs))
      }),
      body: t.Object({
        name: t.String(),
        thainame: t.String(),
        members: t.String(),
        ig: t.String(),
        fb: t.String(),
        others: t.String(),
        admission: t.String(),
        courses: t.String(),
        interests: t.String(),
        captureimg1: t.File(),
        descimg1: t.String(),
        captureimg2: t.File(),
        descimg2: t.String(),
        captureimg3: t.File(),
        descimg3: t.String()
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
    return await updateProgramReview(name, id, body)
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
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
  .delete('/:name/review/:id', async ({ params: { name, id } }) => {
    return await deleteProgramReview(name, id)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Program Name', Object.keys(AllData.Programs)),
        id: StringField(true, 'Invalid Review ID')
      })
    })
