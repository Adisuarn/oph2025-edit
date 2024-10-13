import { Elysia, t , error } from 'elysia'
import { authRouter } from './auth/auth.route'
import { clubRouter } from './clubs/clubs.route'
import { organizationRouter } from './organizations/organizations.route'

export const MainRouter = new Elysia()
  .use(authRouter)
  .use(clubRouter)
  .use(organizationRouter)

