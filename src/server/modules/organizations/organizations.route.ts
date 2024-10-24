import { Elysia, t, error } from 'elysia'
import { AllData } from '@libs/data'
import { ReviewData } from '@utils/type'
import {
  UnionField,
  StringField,
}
  from '@utils/validate'

import { getUser, getOrganization } from '@middlewares/derive'

import {
  getOrganizationByName,
  updateOrganizationData,
  getOrganizationReviews,
  createOrganizationReview,
  updateOrganizationReview,
  deleteOrganizationReview
}
  from '@modules/organizations/organizations.controller'

import { prisma } from '@utils/db'

export const organizationRouter = new Elysia({ prefix: '/organizations' })
  .guard({
    async beforeHandle({ request: { headers } }) {
      const userData = (await getUser(headers)).data
      const organization = await prisma.organizations.findUnique({
        where: { email: userData?.email },
        select: { key: true }
      })
      const name = organization?.key
      if (!name) return error(404, 'Organization Not Found')
      if (typeof name !== 'string') return error(400, 'Invalid Organization Name')
      const organizationData = (await getOrganization(name)).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== organizationData.email) {
        return error(401, 'Unauthorized')
    }
  }
  })
  .get('/:name', async ({ params: { name } }) => {
    return await getOrganizationByName(name)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations))
      })
    })
  .patch('/:name', async ({ params: { name }, body, request: { headers } }) => {
    return await updateOrganizationData(name, body, headers)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations))
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        name: StringField(false, 'Invalid Name'),
        thainame: StringField(false, 'Invalid Thai Name'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        activities: StringField(true, 'Invalid Activities'),
        position: StringField(true, 'Invalid Position'),
        working: StringField(true, 'Invalid Working'),
        captureimg1: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg1: StringField(true, 'Invalid Description Image'),
        captureimg2: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg2: StringField(true, 'Invalid Description Image'),
        captureimg3: t.Optional(t.File({ error() { return 'Invalid Capture Image' } })),
        descimg3: StringField(true, 'Invalid Description Image'),
      }),
    })
  .get('/:name/review', async ({ params: { name } }) => {
    return await getOrganizationReviews(name)
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations))
    })
  })
  .post('/:name/review', async ({ params: { name }, set }) => {
    const response = await createOrganizationReview(name)
    if (response?.success) {
      set.status = 201
      return response
    }
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations))
    })
  })
  .patch('/:name/review/:id', async ({ params: { name, id }, body }) => {
    return await updateOrganizationReview(name, id, body as ReviewData)
  }, {
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      id: StringField(true, 'Invalid Review ID')
    }),
    body: t.Object({
      profile: t.Optional(t.File({ error() { return 'Invalid Profile' } })),
      nick: StringField(true, 'Invalid Nickname'),
      gen: StringField(true, 'Invalid Generation'),
      contact: StringField(true, 'Invalid Contact'),
      content: StringField(true, 'Invalid Content'),
    })
  })
  .delete('/:name/review/:id', async ({ params: { name, id } }) => {
    return await deleteOrganizationReview(name, id)
  },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
        id: StringField(true, 'Invalid Review ID')
      })
    })
