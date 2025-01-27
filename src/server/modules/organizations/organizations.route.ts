import { AllData } from '@libs/data'
import { getOrganization, getUser } from '@middlewares/derive'
import {
  createOrganizationReview,
  deleteOrganizationReview,
  getOrganizationByName,
  getOrganizationReviews,
  updateOrganizationData,
  updateOrganizationReview,
} from '@modules/organizations/organizations.controller'
import { ReviewData } from '@utils/type'
import { StringField, UnionField } from '@utils/validate'
import { Elysia, error, t } from 'elysia'

export const organizationRouter = new Elysia({ prefix: '/organizations' })
  .guard({
    async beforeHandle({ request: { headers }, params: { name, id } }) {
      const userData = (await getUser(headers)).data
      const organizationData = (await getOrganization(name)).data
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== organizationData.email) {
        return error(403, 'Forbidden')
      }
    },
    params: t.Object({
      name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      id: StringField(false, 'Invalid Review'),
    }),
  })
  .get(
    '/:name',
    async ({ params: { name } }) => {
      const response = await getOrganizationByName(name)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      }),
    },
  )
  .patch(
    '/:name',
    async ({ params: { name }, body, request: { headers } }) => {
      const response = await updateOrganizationData(name, body, headers)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      }),
      body: t.Object({
        error: StringField(false, 'Invalid Error'),
        members: StringField(true, 'Invalid Member'),
        ig: StringField(false, 'Invalid Instagram'),
        fb: StringField(false, 'Invalid Facebook'),
        others: StringField(false, 'Invalid Others'),
        activities: StringField(true, 'Invalid Activities'),
        position: StringField(true, 'Invalid Position'),
        working: StringField(true, 'Invalid Working'),
        captureimg1: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 1'
            },
          }),
        ),
        descimg1: StringField(true, 'Invalid Description Image'),
        captureimg2: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 2'
            },
          }),
        ),
        descimg2: StringField(true, 'Invalid Description Image'),
        captureimg3: t.Optional(
          t.File({
            error() {
              return 'Invalid Capture Image 3'
            },
          }),
        ),
        descimg3: StringField(true, 'Invalid Description Image'),
      }),
    },
  )
  .get(
    '/:name/review',
    async ({ params: { name } }) => {
      const response = await getOrganizationReviews(name)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      }),
    },
  )
  .post(
    '/:name/review',
    async ({ params: { name }, set }) => {
      const response = await createOrganizationReview(name)
      if (response.status !== 201) {
        return error(response.status, response.message)
      }
      
      set.status = 201
      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
      }),
    },
  )
  .patch(
    '/:name/review/:id',
    async ({ params: { name, id }, body }) => {
      const response = await updateOrganizationReview(name, id, body as ReviewData)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
        id: StringField(true, 'Invalid Review ID'),
      }),
      body: t.Object({
        profile: t.Optional(
          t.File({
            error() {
              return 'Invalid Profile'
            },
          }),
        ),
        nick: StringField(true, 'Invalid Nickname'),
        gen: StringField(true, 'Invalid Generation'),
        contact: StringField(true, 'Invalid Contact'),
        content: StringField(true, 'Invalid Content'),
      }),
    },
  )
  .delete(
    '/:name/review/:id',
    async ({ params: { name, id } }) => {
      const response = await deleteOrganizationReview(name, id)
      if (response.status !== 200) {
        return error(response.status, response.message)
      }

      return response.message
    },
    {
      params: t.Object({
        name: UnionField(true, 'Invalid Organization Name', Object.keys(AllData.Organizations)),
        id: StringField(true, 'Invalid Review ID'),
      }),
    },
  )
