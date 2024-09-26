import { Elysia, t } from 'elysia'

import {
  createOrganization,
  getOrganizationByName,
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
  .get('/get/:name', async ({ params }) => {
    return await getOrganizationByName(params.name)
  },
  {
    params: t.Object({
      name: t.String(),
    }),
  })
