import type { TElysiaApp } from '@/server/elysia'
import { treaty } from '@elysiajs/eden'

const url = process.env.URL_DOMAIN ?? "localhost:3000"
export const elysia = treaty<TElysiaApp>(url,{
    fetch: {
        next: {revalidate:0}
    }
}).api