import type { Club, Gifted, Organization, Program } from '@utils/type'
import { AllData } from '@libs/data'
import { createClub } from '@modules/clubs/clubs.controller'
import { createOrganization } from '@modules/organizations/organizations.controller'
import { createProgram } from '@modules/programs/programs.controller'
import { prisma } from '@utils/db'
import { Tag } from '@utils/type'
import { DecodedUnionField, StringField, RegexMatching } from '@utils/validate'
import { Elysia, error, t } from 'elysia'

import { createGifted } from '@/server/modules/gifted/gifted.controller'

export const rolesRouter = new Elysia({ prefix: '/roles' }).post(
  '/record',
  async ({ body, set }) => {
    if (!RegexMatching(/^[a-zA-Z0-9]+@(student\.)?triamudom\.ac\.th$/, body.email))
      return error(403, 'Provied Email Not Triam Udom')
    if (!(await prisma.user.findUnique({ where: { email: body.email } })))
      return error(404, 'User Not Found')
    switch (body.tag) {
      case Tag.ORGANIZATION: {
        if (AllData.Organizations[body.key] === undefined)
          return error(400, 'Invalid Organization Key')
        const response = await createOrganization(body as Organization)
        switch (response.status) {
          case 201: { set.status = 201; return response }
          case 400: return error(400, response.message)
          case 500: return error(500, response.message)
          default: return error(504, "Unknown Error")
        }
      }
      case Tag.CLUB: {
        if (AllData.Clubs[body.key] === undefined) return error(400, 'Invalid Club Key')
        const response = await createClub(body as Club)
        switch (response.status) {
          case 201: { set.status = 201; return response }
          case 400: return error(400, response.message)
          case 500: return error(500, response.message)
          default: return error(504, "Unknown Error")
        }
      }
      case Tag.PROGRAM: {
        if (AllData.Programs[body.key] === undefined) return error(400, 'Invalid Program Key')
        const response = await createProgram(body as Program)
        switch (response.status) {
          case 201: { set.status = 201; return response }
          case 400: return error(400, response.message)
          case 500: return error(500, response.message)
          default: return error(504, "Unknown Error")
        }
      }
      case Tag.GIFTED: {
        if (AllData.Gifted[body.key] === undefined) return error(400, 'Invalid Gifted Key')
        const response = await createGifted(body as Gifted)
        switch (response.status) {
          case 201: { set.status = 201; return response }
          case 400: return error(400, response.message)
          case 500: return error(500, response.message)
          default: return error(504, "Unknown Error")
        }
      }
      default:
        return error(400, 'Invalid Tag')
    }
  },
  {
    body: t.Object({
      email: StringField(true, 'Invalid Email', 'email'),
      tag: t.Enum(Tag, {
        error() {
          return 'Invalid Tag'
        },
      }),
      key: DecodedUnionField(true, 'Invalid Key', [
        ...Object.keys(AllData.Organizations),
        ...Object.keys(AllData.Clubs),
        ...Object.keys(AllData.Programs),
        ...Object.keys(AllData.Gifted),
      ]),
    }),
  },
)
