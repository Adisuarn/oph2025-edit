import axios from "axios";
import { cookies } from "next/headers";
import { lucia } from "@libs/auth";

export default async function apiFunction(method: string, url: string, body: any) {
  const options = {
    method: method,
    url: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
    headers: { 
      "Content-Type": "application/json", 
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      "Authorization": `${cookies().get(lucia.sessionCookieName)?.value}`
    },
    data: body,
  };

  try {
    axios.defaults.withCredentials = true;
    const response = await axios.request(options);
    return response;
  } catch (error: any) {
    return error;
  }
}
