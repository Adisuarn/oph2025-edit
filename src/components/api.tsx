'use server'
import axios from "axios";
import { cookies } from "next/headers";

export default async function apiFunction(method: string, url: string, body: any) {
  const cookieStore = cookies()
  const options = {
    method: method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      "Authorization": cookieStore.get('oph2025-auth-cookie')?.value ?? '',
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
