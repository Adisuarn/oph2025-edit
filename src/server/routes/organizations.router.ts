import { Elysia, t } from 'elysia'

import {
  createOrganization,
  getOrganizationByName,
  updateOrganizationData,
  createReview,
  updateReview,
}
from '@/server/controllers/organizations.controller'

import {
  UnionField,
  StringField
}
from '@/libs/validate'

import {
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const groupRouter = new Elysia({ prefix: '/organizations' })
  .guard({
    beforeHandle(){
      return pipe('AND', [IS_AUTHENTICATED])
    }
  })
  .post('/', async ({ body, set }) => {
    const response = await createOrganization(body)
    if(response.success) {
      set.status = 201
      return response
    }
  },
  {
    body: t.Object({
      name: UnionField(true, 'Invalid Organization Name' , ['TUCMC', 'TUSC', 'AIC', 'TUPRO'])
    })
  })
  .get('/:name', async ({ params }) => {
    return await getOrganizationByName(params.name)
  }, 
  {
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name' , ['TUCMC', 'TUSC', 'AIC', 'TUPRO'])
    })
  })
  .patch('/:name', async ({ params, body }) => {
    return await updateOrganizationData(params.name, body)
  },
  {
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name' , ['TUCMC', 'TUSC', 'AIC', 'TUPRO'])
    }),
     body: t.Object({
       name: t.String(),
       thainame: t.String(),
       members: t.String(),
       ig: t.String(),
       fb: t.String(),
       others: t.String(),
       organizationdo: t.String(),
       position: t.String(),
       working: t.String(),
       captureimg1: t.File(),
       captureimg2: t.File(),
       captureimg3: t.File(),
     }),
  })
  .post('/:name/review', async({ params, set }) => {
    const response = await createReview(params.name)
    if(response?.success) {
      set.status = 201
      return response
    }
  },{
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name' , ['TUCMC', 'TUSC', 'AIC', 'TUPRO'])
    })
  })
  .patch('/:name/review/:id', async({ params, body }) => {
    return await updateReview(params.name, params.id, body)
  },{
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name' , ['TUCMC', 'TUSC', 'AIC', 'TUPRO']),
      id: StringField(true, 'Invalid Review ID')
    }),
    body: t.Object({
      orgname: t.String(),
      profileReview: t.File(),
      nameReview: t.String(),
      nickReview: t.String(),
      genReview: t.String(),
      contactReview: t.String(),
      contentReview: t.String(),
    })
  })
