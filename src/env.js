import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']),
    DATABASE_URL: z.string(),
    GOOGLE_CLIENT_ID: z.string(),
    GOOGLE_CLIENT_SECRET: z.string(),
    IMGUR_CLIENT_ID: z.string(),
    IMGUR_CLIENT_SECRET: z.string(),
    HOSTED_DOMAIN: z.string(),
    DIRECT_DATABASE_URL: z.string(),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    NEXT_PUBLIC_SECRET_LINK: z.string(),
    NEXT_PUBLIC_API_KEY: z.string(),
    NEXT_PUBLIC_URL: z.string().url(),
    NEXT_PUBLIC_COOKIE_NAME: z.string(),
    NEXT_PUBLIC_BASE_URL: z.string().url(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DIRECT_DATABASE_URL: process.env.DIRECT_DATABASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    IMGUR_CLIENT_ID: process.env.IMGUR_CLIENT_ID,
    IMGUR_CLIENT_SECRET: process.env.IMGUR_CLIENT_SECRET,
    HOSTED_DOMAIN: process.env.HOSTED_DOMAIN,
    NEXT_PUBLIC_COOKIE_NAME: process.env.NEXT_PUBLIC_COOKIE_NAME,
    NEXT_PUBLIC_SECRET_LINK: process.env.NEXT_PUBLIC_SECRET_LINK,
    NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
    NEXT_PUBLIC_URL: process.env.NEXT_PUBLIC_URL,
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
