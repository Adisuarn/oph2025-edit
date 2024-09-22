import { Elysia } from 'elysia'

import { 
  createAuthUrl,
  getGoogleUser,
  Logout,
} 
from '@controllers/auth.controller'

import {
  pipe, 
  IS_AUTHENTICATED,
}
from '@middlewares/guards'

export const authRouter = new Elysia({ prefix: '/auth' })
  .get('/login', () => createAuthUrl())
  .get('/callback', async ({request, redirect}) => {
    await getGoogleUser(request)
    return redirect('http://localhost:3000/dashboard')
  })
  .get('/logout', async () => {
    await Logout()
    return {
      status: 200,
      success: true,
      message: 'Logged out'
    }
  },
  {
    beforeHandle(){
      return pipe("AND", [IS_AUTHENTICATED])
    }
  }
)
