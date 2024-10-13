import { Elysia, t } from 'elysia'
import { CustomError } from '@utils/error'
import { AllData } from '@libs/data'
//import { isCreated } from '@middlewares/derive'

import {
  UnionField,
  StringField,
  VerifyEnv
}
from '@/server/utils/validate'

import {
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

import {
  createClubs,
  getClubByKey,
  updateClub,
}
from '@modules/clubs/clubs.controller'

export const clubRouter = new Elysia({ prefix: '/clubs' })
  .guard({
    async beforeHandle({ request: { headers } }) {
      await isCreated()
      const verified = VerifyEnv(headers)
      if(!verified) throw new CustomError('Unauthorized', 401)
      return pipe('AND', [IS_AUTHENTICATED])
    }
  })
  .post('/', async ({ body, set}) => {
    const response = await createClubs(body)
    if(response.success) {
      set.status = 201
      return response.data
    }
  },
  {
    body: t.Object({
      clubKey: UnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
    })
  })
  .patch('/key', async ({ params: { key }, body }) => {
    return await updateClub(key, body)
  }, {
    params: t.Object({
      key: UnionField(true, 'Invalid Club Key', Object.keys(AllData.Clubs))
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
      captureimg2: t.File(),
      captureimg3: t.File(),
    })
  })
