import { Elysia, t } from 'elysia'
import swagger from '@elysiajs/swagger'
import { MainRouter } from './modules/router'

export const elysiaApp = new Elysia({ prefix: '/api' })
    .use(swagger)
    .use(MainRouter)

export type TElysiaApp = typeof elysiaApp
