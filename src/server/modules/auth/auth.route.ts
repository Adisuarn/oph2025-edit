import { Elysia, redirect } from 'elysia'

import { 
  createAuthUrl,
  getGoogleUser,
  Logout,
} 
from '@modules/auth/auth.controller'

export const authRouter = new Elysia({ prefix: '/auth' })
  .get('/login', () => createAuthUrl())
  .get('/callback', async ({ request }) => {
    await getGoogleUser(request)
    return redirect(process.env.NEXT_PUBLIC_URL! + '/account')
  })
  .get('/logout', async () => {
    return Logout()
  })
