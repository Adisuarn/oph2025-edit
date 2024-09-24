import { Elysia } from 'elysia'

import {
  addGroup,
}
from '@controllers/group.controller'

import {
  pipe,
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const groupRouter = new Elysia({ prefix: '/group' })
  .post('/add', async () => {
    return await addGroup()
  })
  .get('/', () => 'Hello from group router')

