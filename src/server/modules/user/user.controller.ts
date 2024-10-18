import { getUser } from '@middlewares/derive'
import { error } from 'elysia'

export const getUserData = async () => {
  try {
    const userData = (await getUser()).data
    return userData
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
}
