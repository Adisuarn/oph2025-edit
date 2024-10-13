import { Elysia } from 'elysia'

import { 
  createAuthUrl,
  getGoogleUser,
  Logout,
} 
from '@modules/auth/auth.controller'

import {
  pipe, 
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const authRouter = new Elysia({ prefix: '/auth' })
  .get('/login', () => createAuthUrl())
  .get('/callback', async ({request, redirect}) => {
    await getGoogleUser(request)
    return redirect('http://localhost:3000/account')
  })
  .get('/logout', async () => {
    return await Logout()
  },
  {
    beforeHandle(){
      return pipe("AND", [IS_AUTHENTICATED])
    }
  })
  .get('/test', () => 'test router', {
    beforeHandle(){
      return pipe("AND", [IS_AUTHENTICATED])
    }
  })
