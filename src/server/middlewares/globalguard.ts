import { Elysia } from 'elysia'
import { 
  pipe,
  IS_VERIFIED,
  IS_AUTHENTICATED,
 } from './guards'

export const GlobalGuard = new Elysia()
  .onBeforeHandle(() => {
    return pipe('AND', [IS_VERIFIED, IS_AUTHENTICATED])
  })
  .as('plugin') 
