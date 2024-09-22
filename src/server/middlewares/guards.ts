import { cookies } from "next/headers";
import { lucia } from "@libs/auth";

export const pipe = (condition: "OR" | "AND" = "AND", guards: ((...args: unknown[]) => Promise<unknown>)[]) => {
    const checkInstance = async(...args: unknown[]): Promise<void> => 
    {
      const result = await Promise.all(guards.map((guard) => guard(...args)))
      console.log(result)
      let allowed = true;
      switch (condition) {
        case "AND": {
          allowed = result.every((guard) => guard === true)
          break
        }
        case "OR": {
          allowed = result.some((guard) => guard === true)
          break
        }
        default: {
          throw new Error("Invalid condition")
        }
      }
      if (!allowed) throw new Error("Unauthorized")
  }
  return checkInstance()
}

export const INVERSE = (fn: (...args: unknown[]) => boolean) => {
  return (...args: unknown[]) => {
    if(!fn(...args)) return new Response('Unauthorized', { status: 401 })
  }
}

export const IS_AUTHENTICATED = async(): Promise<boolean> => {
  const session = cookies().get(lucia.sessionCookieName)?.value
  return session ?  true : false
}

export const test = async(): Promise<boolean> => {
  return true
}
