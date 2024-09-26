import { Elysia, t } from 'elysia'

import {
  createOrganization,
  getOrganizationByName,
  updateOrganizationData,
  //update/add OrganizationData,
}
from '@/server/controllers/organizations.controller'

import {
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const groupRouter = new Elysia({ prefix: '/organizations' })
  .post('/create', async ({ body }) => {
    return await createOrganization(body)
  },
  {
    body: t.Object({
      name: t.String(),
    }),
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
      name: t.String(),
    }),
    body: t.Object({
      description: t.String(),
    }),
  })
