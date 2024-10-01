import { t } from 'elysia'

export function VerifyEnv({ headers }: { headers: Record<string, string | undefined | null> }): any {
  if(!headers) return { success: false, error: 'Headers not found' }
  if(!headers['x-api-key']) return { success: false, error: 'API Key not found' }
  if(!process.env.NEXT_PUBLIC_API_KEY) return { success: false, error: 'ENV not found' }
  return headers['x-api-key'] === process.env.NEXT_PUBLIC_API_KEY
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
