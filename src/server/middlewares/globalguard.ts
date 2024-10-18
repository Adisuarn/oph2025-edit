import { Elysia } from 'elysia'
import { 
  pipe,
  INVERSE,
  IS_VERIFIED,
  IS_AUTHENTICATED,
  IS_USERCREATED,
  IS_TUCMC
 } from './guards'

export const GlobalGuard = new Elysia()
  //TODO Implement the global guard middleware for every routes
  .onBeforeHandle(async ({ request: { headers} , path }) => {
    if(path.includes('/api/auth/callback')) return
    if(path === '/api/auth/login') return pipe('AND', [IS_VERIFIED], headers)
    if(path.includes('/api/roles/record')) return await pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED, () => INVERSE(IS_USERCREATED)], headers)
    if(path.includes('/api/tucmc')) return pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED, IS_TUCMC], headers)
    else return pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED], headers)
  })
  .as('plugin')
