import { elysiaApp } from '@/server/elysia'

export const maxDuration = 60;

export const GET = elysiaApp.handle;
export const POST = elysiaApp.handle;
export const PATCH = elysiaApp.handle;
export const DELETE = elysiaApp.handle;
