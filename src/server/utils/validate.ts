import { t } from 'elysia'
 
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
