import { t } from 'elysia'

export function RegexMatching(regex: RegExp, word: string): boolean {
  return regex.test(word)
}

export function EncodedUnionField(required: boolean, errorMsg: string, fields: string[]) {
  const encodedFields = fields.map((field) => encodeURIComponent(field))
  return required
    ? t.Union(
        encodedFields.map((field) => t.Literal(field)),
        {
          error() {
            return errorMsg
          },
        },
      )
    : t.Optional(
        t.Union(
          encodedFields.map((field) => t.Literal(field)),
          {
            error() {
              return errorMsg
            },
          },
        ),
      )
}

export function DecodedUnionField(required: boolean, errorMsg: string, fields: string[]) {
  const decodedFields = fields.map((field) => decodeURIComponent(field))
  return required
    ? t.Union(
        decodedFields.map((field) => t.Literal(field)),
        {
          error() {
            return errorMsg
          },
        },
      )
    : t.Optional(
        t.Union(
          decodedFields.map((field) => t.Literal(field)),
          {
            error() {
              return errorMsg
            },
          },
        ),
      )
}

export function UnionField(required: boolean, errorMsg: string, fields: string[]) {
  return required
    ? t.Union(
        fields.map((field) => t.Literal(field)),
        {
          error() {
            return errorMsg
          },
        },
      )
    : t.Optional(
        t.Union(
          fields.map((field) => t.Literal(field)),
          {
            error() {
              return errorMsg
            },
          },
        ),
      )
}

export function StringField(required: boolean, errorMsg: string, format?: string) {
  return required
    ? t.String({
        error() {
          return errorMsg
        },
        format: format,
      })
    : t.Optional(
        t.String({
          error() {
            return errorMsg
          },
          format: format,
        }),
      )
}
