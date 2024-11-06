'use server'

import apiFunction from './api'

export const postRecord = async (dataRecord: any) => {
  try {
    const response = await apiFunction('POST', '/roles/record', dataRecord)
    return { status: response.status, data: response.data }
  } catch (error) {
    console.log(error)
  }
}
