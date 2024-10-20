import { Elysia, t, error } from 'elysia'
import { getUserData } from '@modules/user/user.controller'

export const userRouter = new Elysia({ prefix: '/user'})
  .get('/', async({ request: { headers }}) => {
    return await getUserData(headers)
  })
