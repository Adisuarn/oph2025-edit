import { Elysia } from 'elysia'
import { 
  pipe,
  INVERSE,
  IS_VERIFIED,
  IS_USERCREATED,
  IS_TUCMC,
  IS_AUTHENTICATED
 } from './guards'

export const GlobalGuard = new Elysia()
  .onBeforeHandle(async ({ request: { headers } , path }) => {
    if(path.includes('/api/auth/callback')) return
    if(path.includes('/api/swagger')) return
    if(path === '/api/auth/login') return pipe('AND', [IS_VERIFIED], headers)
    if(path.includes('/api/roles/record')) return pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED, async () => await INVERSE(IS_USERCREATED, headers)], headers)
    if(path.includes('/api/tucmc')) return pipe('AND', [IS_VERIFIED, IS_TUCMC, IS_AUTHENTICATED], headers)
    else return pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED], headers)
  })
  .as('plugin')
