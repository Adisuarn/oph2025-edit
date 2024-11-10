'use server'

import apiFunction from '@/components/api'

export const getUser = async (email: string) => {
  const response = await apiFunction('POST', `/tucmc/getuser`, { email })
  switch (response.status) {
    case 200:
      return response.data
    case 404:
      throw { message: 'User not found' }
  }
}

export const changeUserData = async (email: string, changedTag: string, changedKey: string) => {
  const body = { email: email, tag: changedTag, key: changedKey }
  const response = await apiFunction('PATCH', `/tucmc/fixuser`, body)
  switch (response.status) {
    case 200:
      return { status: 200, message: 'User data changed successfully' }
    case 400:
      return { status: 400, message: 'Bad Request' }
    case 404:
      return { status: 404, message: 'User not found' }
  }
}
