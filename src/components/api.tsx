import axios from "axios"

export default async function apiFunction(method: string, url: string, body: any) {
  const options = {
    method: method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    headers: { "Content-Type": "application/json", "x-api-key": process.env.NEXT_PUBLIC_API_KEY },
    data: body,
  }

  try {
    const response = await axios.request(options)
    return response
  } catch (error: any) {
    return error
  }
}