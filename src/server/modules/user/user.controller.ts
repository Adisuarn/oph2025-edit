import { getUser } from '@middlewares/derive'
import { error } from 'elysia'

export const getUserData = async (headers: Headers) => {
  try {
    if (
      headers.get('authorization') === '' ||
      headers.get('authorization') === undefined ||
      headers.get('authorization') === null
    )
      return { status: 401, message: 'Unauthorized' }
    const userData = (await getUser(headers))?.data
    if (userData === null) return { status: 401, message: 'Unauthorized' }
    return userData
  } catch (err) {
    throw error(500, 'Internal Server Error')
  }
}
