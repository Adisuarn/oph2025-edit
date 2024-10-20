import { Elysia, t, error } from 'elysia'
import { StringField, DecodedUnionField } from '@utils/validate'
import { createOrganization } from '@modules/organizations/organizations.controller'
import { createClub } from '@modules/clubs/clubs.controller'
import { createProgram } from '@modules/programs/programs.controller'
import { createGifted } from '@modules/gifted/gifted.controller'
import { AllData } from '@libs/data'
import type { Organization, Club, Program, Gifted } from '@utils/type'
import { Tag } from '@utils/type'
import { prisma } from '@utils/db'
import { createEverything } from '@utils/create'

export const rolesRouter = new Elysia({ prefix: '/roles' })
  .post('/record', async ({ body, set }) => {
    if(!body.email.includes('student.triamudom.ac.th')) return error(400, 'Provied Email Not Triam Udom')
    if(!await prisma.user.findUnique({ where: { email: body.email } })) return error(404, 'User Not Found')
    switch(body.tag) {
      case Tag.ORGANIZATION: {
        if(AllData.Organizations[body.key] === undefined) return error(400, 'Invalid Organization Key')
        const response = await createOrganization(body as Organization)
        if(response.success) {
          set.status = 201
          return response
        }
      }
      case Tag.CLUB: {
        if(AllData.Clubs[body.key] === undefined) return error(400, 'Invalid Club Key')
        const response = await createClub(body as Club)
        if(response.success) {
          set.status = 201
          return response
        }
      }
      case Tag.PROGRAM: {
        if(AllData.Programs[body.key] === undefined) return error(400, 'Invalid Program Key')
        const response = await createProgram(body as Program)
        if(response.success) {
          set.status = 201
          return response
        }
      }
      case Tag.GIFTED: {
        if(AllData.Gifted[body.key] === undefined) return error(400, 'Invalid Gifted Key')
        const response = await createGifted(body as Gifted)
        if(response.success) {
          set.status = 201
          return response
        }
      }
      default: return error(400, 'Invalid Tag')
    }
  },
  {
    body: t.Object({
      email: StringField(true, 'Invalid Email', 'email'),
      tag: t.Enum(Tag, {error(){ return 'Invalid Tag' }}),
      key: DecodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
    })
  })
  // .post('/all', async() => {
  //   return createEverything()
  // })
