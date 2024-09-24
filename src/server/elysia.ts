import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'

//Import Routers
import { authRouter } from '@routes/auth.router'
import { groupRouter } from '@routes/group.router'

export const elysiaApp = new Elysia({ prefix: '/api' })
    .use(swagger)
    .use(authRouter)
    .use(groupRouter)


export type TElysiaApp = typeof elysiaApp
