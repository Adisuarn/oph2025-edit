import axios from 'axios'
import { getCookies } from 'next-client-cookies/server'

import { env } from '@/env'

export default async function apiFunction(method: string, url: string, body: any) {
  const cookies = await getCookies()
  const config = {
    withCredentails: true,
    method: method,
    url: `${env.NEXT_PUBLIC_BASE_URL}${url}`,
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': env.NEXT_PUBLIC_API_KEY,
      Authorization: cookies.get(env.NEXT_PUBLIC_COOKIE_NAME),
    },
    data: body,
  }

  try {
    const response = await axios.request(config)
    return response
  } catch (error: any) {
    return error
  }
}
