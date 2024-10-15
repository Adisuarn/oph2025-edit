import { Elysia, t, error } from 'elysia'
import { StringField, UnionField, DecodedUnionField } from '@utils/validate'
import { createOrganization } from '@modules/organizations/organizations.controller'
import { createClub } from '@modules/clubs/clubs.controller'
import { AllData } from '@libs/data'
import type { Organization, Club } from '@utils/type'

export const rolesRouter = new Elysia({ prefix: '/roles' })
  .post('/record', async ({ body, set }) => {
    if(!body.email.includes('student.triamudom.ac.th')) return error(400, 'Provided Email Not Triam Udom')
    if(body.tag === 'organization') {
      if(AllData.Organizations[body.key] === undefined) return error(400, 'Invalid Organization Key')
      const response = await createOrganization(body as Organization)
      if(response.success) {
        set.status = 201
        return response
      }
    }
    if(body.tag === 'club') {
      if(AllData.Clubs[body.key] === undefined) return error(400, 'Invalid Club Key')
      const response = await createClub(body as Club)
      if(response.success) {
        set.status = 201
        return response
      }
    }
  },
  {
    body: t.Object({
      email: StringField(true, 'Invalid Email', 'email'),
      tag: UnionField(true, 'Invalid Tag', ['organization', 'club']),
      key: DecodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs)]),
    })
  })
  .get('/info', async() => {
    console.log('This is a info path')
  })