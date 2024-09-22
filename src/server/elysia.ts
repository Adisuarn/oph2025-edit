import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'

//Import Routers
import { authRouter } from '@routes/auth.router'

export const elysiaApp = new Elysia({ prefix: '/api' })
    .use(swagger)
    .use(authRouter)


export type TElysiaApp = typeof elysiaApp
