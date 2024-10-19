import type { TElysiaApp } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'

const url = process.env.URL_DOMAIN ?? "localhost:3000"

export const client = treaty<TElysiaApp>(url,{
  headers: {
    'x-api-key': process.env.NEXT_PUBLIC_API_KEY!
  }
}).api
