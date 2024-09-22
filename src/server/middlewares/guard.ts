import { cookies } from "next/headers";
import { lucia } from "@libs/auth";

const pipe = (guards: Function[], condition: "OR" | "AND" = "AND") => {
  return async(...args: any[]) => {
    const result = await Promise.all(guards.map((guard) => guard(...args)))
    let allowed = true
    if (condition === "OR") allowed = result.some((guard) => guard === undefined)
    if (condition === "AND") allowed = result.every((guard) => guard === undefined)
    if (!allowed) throw new Error("Unauthorized")
  }
}

export const AND = (...guards: Function[]) => {
  return pipe(guards)
}

export const OR = (...guards: Function[]) => {
  return pipe(guards, "OR")
}

export const INVERSE = (fn: Function) => {
  return (...args: any[]) => {
    if(!fn(...args)) return new Response('Unauthorized', { status: 401 })
  }
}

export const IS_AUTHENTICATED = async() => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value
  if(!sessionId) {
    return new Response('Unauthorized', { status: 401 })
  }
}
