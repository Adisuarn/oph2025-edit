import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'
import { Logestic } from 'logestic'

//Import Routers
import authorizeRoutes from './routers/authorizeRoutes'

export const elysiaApp = new Elysia({ prefix: '/api' })
    .use(swagger)
    .use(authorizeRoutes)

export type TElysiaApp = typeof elysiaApp
