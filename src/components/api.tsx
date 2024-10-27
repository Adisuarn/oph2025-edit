'use server'
import axios from "axios";
import { getCookies } from 'next-client-cookies/server'

export default async function apiFunction(method: string, url: string, body: any) {
  const cookies = await getCookies();
  const options = {
    method: method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      "Authorization": `${cookies.get('oph2025-auth-cookie')}`,
    },
    data: body,
  };

  try {
    const response = await axios.request(options);
    return response;
  } catch (error: any) {
    return error;
  }
}
