import { t } from 'elysia'

export function VerifyEnv(headers: Headers): any {
  if(headers.get('x-api-key') === process.env.NEXT_PUBLIC_API_KEY) {
    return { success: true, message: "API key verified"}
  } else {
    return { success: false, message: "API key not verified", status: 401}
  }
}
 
export function UnionField(required: boolean, errorMsg: string, fields: string[]){
  return required
    ? t.Union(fields.map(field => t.Literal(field, { error: errorMsg })))
    : t.Optional(t.Union(fields.map(field => t.Literal(field, { error: errorMsg }))))
}

export function StringField(required: boolean, errorMsg: string){
  return required
    ? t.String({ error: errorMsg })
    : t.Optional(t.String({ error: errorMsg }))
}
