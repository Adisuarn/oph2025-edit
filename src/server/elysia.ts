import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'
import { Logestic } from 'logestic'

//Import Routers
import helloRouter from './routers/helloRouter'

export const elysiaApp = new Elysia({ prefix: '/api' })
    .use(Logestic.preset('common'))
    .use(swagger)
    .use(helloRouter)

export type TElysiaApp = typeof elysiaApp
