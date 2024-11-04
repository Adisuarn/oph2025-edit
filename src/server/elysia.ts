import { GlobalGuard } from '@middlewares/globalguard'
import { authRouter } from '@modules/auth/auth.route'
import { clubRouter } from '@modules/clubs/clubs.route'
import { giftedRouter } from '@modules/gifted/gifted.route'
import { organizationRouter } from '@modules/organizations/organizations.route'
import { rolesRouter } from '@modules/roles/roles.route'
import { tucmcRouter } from '@modules/tucmc/tucmc.route'
import { userRouter } from '@modules/user/user.route'
import { Elysia } from 'elysia'

import { programRouter } from '@/server/modules/programs/programs.route'

export const elysiaApp = new Elysia({ prefix: '/api' })
  .use(GlobalGuard)
  .use(authRouter)
  .use(clubRouter)
  .use(organizationRouter)
  .use(programRouter)
  .use(giftedRouter)
  .use(tucmcRouter)
  .use(userRouter)
  .use(rolesRouter)

export type TElysiaApp = typeof elysiaApp
