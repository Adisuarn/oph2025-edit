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
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

type Organization = {
  name: "TUCMC" | "TUSC" | "AIC" | "TUPRO"
}

export const groupRouter = new Elysia({ prefix: '/organizations' })
  .post('/', async ({ body, set }) => {
    const data = await createOrganization(body)
    if(data.success) {
      set.status = 201
      return data
    }
  },
  {
    body: t.Object({
      name: t.Union([t.Literal('TUCMC'), t.Literal('TUSC'), t.Literal('AIC'), t.Literal('TUPRO')]),
    }, {
      error: 'Invalid organization name'
    })
  })
  .get('/:name', async ({ params }) => {
    return await getOrganizationByName(params.name)
  }, 
  {
    params: t.Object({
      name: t.String(),
    }),
  })
  .patch('/:name', async ({ params, body }) => {
    return await updateOrganizationData(params.name, body)
  },
  {
    params: t.Object({
      name: t.Union([t.Literal('TUCMC'), t.Literal('TUSC'), t.Literal('AIC'), t.Literal('TUPRO')]),
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
  .post('/:name/review', async({ params }) => {
    return await createReview(params.name)
  },{
    params: t.Object({
      name: t.Union([t.Literal('TUCMC'), t.Literal('TUSC'), t.Literal('AIC'), t.Literal('TUPRO')]),
    })
  })
  .patch('/:name/review/:id', async({ params, body }) => {
    return await updateReview(params.name, params.id, body)
  },{
    params: t.Object({
      name: t.Union([t.Literal('TUCMC'), t.Literal('TUSC'), t.Literal('AIC'), t.Literal('TUPRO')]),
      id: t.String(),
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
