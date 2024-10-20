import { getUser } from '@middlewares/derive'
import { error } from 'elysia'

export const getUserData = async (headers: Headers) => {
  try {
    const userData = (await getUser(headers)).data
    return userData
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
}
