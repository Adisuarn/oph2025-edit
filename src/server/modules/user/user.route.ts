import { getUserData } from '@modules/user/user.controller'
import { Elysia, error } from 'elysia'

export const userRouter = new Elysia({ prefix: '/user' }).get(
  '/',
  async ({ request: { headers } }) => {
    const user = await getUserData(headers)
    if ('status' in user! && user.status === 401) return error(401, 'Unauthorized')
    return user
  },
)
