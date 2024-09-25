import { Elysia } from 'elysia'

import { 
  getOrganization,
  createOrganization,
  //updateOrganization,
}
from '@controllers/organizations.controller'

import {
  pipe, 
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const organizationsRouter = new Elysia({ prefix: '/organizations' })
  .post('/create', async ({ request }) => {
    const organization = await createOrganization(request)
    return organization
  })
  .get('/:name', async ({ params }) => {
    const organization = await getOrganization(params.name)
    return organization
  })
