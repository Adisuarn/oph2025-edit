import { createAuthUrl, getGoogleUser, Logout } from '@modules/auth/auth.controller'
import { Elysia, error, redirect } from 'elysia'

import { env } from '@/env'

export const authRouter = new Elysia({ prefix: '/auth' })
  .get('/login', () => createAuthUrl())
  .get('/callback', async ({ request }) => {
    const googleUser = await getGoogleUser(request)
    switch (googleUser.status) {
      case 200:
        return redirect(env.NEXT_PUBLIC_URL + '/account')
      case 400:
        return error(400, googleUser.message)
      case 500:
        return error(500, googleUser.message)
      default:
        return error(500, 'Internal Server Error')
    }
  })
  .get('/logout', async () => {
    return Logout()
  })
