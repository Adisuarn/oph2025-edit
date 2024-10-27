import { getUser } from '@middlewares/derive'

export const getUserData = async (headers: Headers) => {
  try {
    const userData = (await getUser(headers))?.data
    return userData
  } catch (err) {
    return { success: false, error: 'Internal Server Error' }
  }
}
