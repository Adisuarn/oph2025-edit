import { Elysia, t } from 'elysia'
import { CustomError } from '@utils/error'
import { AllData } from '@/libs/data'
import { isCreated } from '@middlewares/derive'

import {
  UnionField,
  StringField,
  VerifyEnv
}
from '@libs/validate'

import {
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

import {
  createClubs,
}
from '@controllers/clubs.controller'

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
