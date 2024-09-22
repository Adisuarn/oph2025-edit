import { Elysia } from 'elysia'

import { 
  createAuthUrl,
  getGoogleUser,
  Logout,
} 
from '@controllers/auth.controller'

import {
  AND, OR, INVERSE,
  IS_AUTHENTICATED
}
from '@middlewares/guard'

export const authRouter = new Elysia({ prefix: '/auth' })
  .get('/login', () => createAuthUrl())
  .get('/callback', async ({request, redirect}) => {
    await getGoogleUser(request)
    return redirect('http://localhost:3000/dashboard')
  })
  .get('/logout', async ({redirect}) => {
    await Logout()
    return redirect('http://localhost:3000/')
  })
