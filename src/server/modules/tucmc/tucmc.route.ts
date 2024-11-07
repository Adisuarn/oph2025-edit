import { AllData } from '@libs/data'
import { ClubData, updateClubData, updateClubReview } from '@modules/clubs/clubs.controller'
import { GiftedData, updateGiftedData, updateGiftedReview } from '@/server/modules/gifted/gifted.controller'
import {
  OrganizationData,
  updateOrganizationData,
  updateOrganizationReview,
} from '@modules/organizations/organizations.controller'
import {
  ProgramData,
  updateProgramData,
  updateProgramReview,
} from '@modules/programs/programs.controller'
import { getAllData, getDataByKey, updateStatus } from '@modules/tucmc/tucmc.controller'
import { createEverything } from '@utils/create'
import { ReviewData, Status, Tag } from '@utils/type'
import { Elysia, error, t } from 'elysia'

import {
  importClubData,
  importGiftedData,
  importOrganizationData,
  importProgramData,
} from '@/server/utils/importdata'
import { EncodedUnionField, StringField } from '@/server/utils/validate'

export const tucmcRouter = new Elysia({ prefix: '/tucmc' })
  .get('/data', async () => {
    const response = await getAllData()
    switch (response.status) {
      case 200:
        return response
      case 500:
        return error(500, response.message)
    }
  })
  .get(
    '/data/:tag/:key',
    async ({ params: { tag, key } }) => {
      const response = await getDataByKey(tag, decodeURIComponent(key))
      switch (response.status) {
        case 200:
          return response
        case 400:
          return error(400, response.message)
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        tag: t.Enum(Tag, {
          error() {
            return 'Invalid Tag'
          },
        }),
        key: EncodedUnionField(true, 'Invalid Key', [
          ...Object.keys(AllData.Organizations),
          ...Object.keys(AllData.Clubs),
          ...Object.keys(AllData.Programs),
          ...Object.keys(AllData.Gifted),
        ]),
      }),
    },
  )
  .patch(
    '/data/:tag/:key',
    async ({ params: { tag, key }, body }) => {
      const response = await updateStatus(tag, decodeURIComponent(key), body.status, body.error)
      switch (response.status) {
        case 200:
          return response
        case 400:
          return error(400, response.message)
        case 500:
          return error(500, response.message)
      }
    },
    {
      params: t.Object({
        tag: t.Enum(Tag, {
          error() {
            return 'Invalid Tag'
          },
        }),
        key: EncodedUnionField(true, 'Invalid Key', [
          ...Object.keys(AllData.Organizations),
          ...Object.keys(AllData.Clubs),
          ...Object.keys(AllData.Programs),
          ...Object.keys(AllData.Gifted),
        ]),
      }),
      body: t.Object({
        status: t.Enum(Status, {
          error() {
            return 'Invalid Status'
          },
        }),
        error: StringField(false, 'Invalid Error'),
      }),
    },
  )
  .patch(
    '/data/:tag/:key/edit',
    async ({ params: { tag, key }, body, request: { headers } }) => {
      switch (tag) {
        case Tag.CLUB:
          const updatedClub = await updateClubData(
            decodeURIComponent(key) as keyof typeof AllData.Clubs,
            body as ClubData,
            headers,
          )
          switch (updatedClub.status) {
            case 200:
              return updatedClub
            case 400:
              return error(400, updatedClub.message)
            case 500:
              return error(500, updatedClub.message)
          }
        case Tag.ORGANIZATION:
          const updatedOrganization = await updateOrganizationData(
            key as keyof typeof AllData.Organizations,
            body as OrganizationData,
            headers,
          )
          switch (updatedOrganization.status) {
            case 200:
              return updatedOrganization
            case 400:
              return error(400, updatedOrganization.message)
            case 500:
              return error(500, updatedOrganization.message)
          }
        case Tag.PROGRAM:
          const updatedProgram = await updateProgramData(
            key as keyof typeof AllData.Programs,
            body as ProgramData,
            headers,
          )
          switch (updatedProgram.status) {
            case 200:
              return updatedProgram
            case 400:
              return error(400, updatedProgram.message)
            case 500:
              return error(500, updatedProgram.message)
          }
        case Tag.GIFTED:
          const updatedGifted = await updateGiftedData(
            key as keyof typeof AllData.Gifted,
            body as GiftedData,
            headers,
          )
          switch (updatedGifted.status) {
            case 200:
              return updatedGifted
            case 400:
              return error(400, updatedGifted.message)
            case 500:
              return error(500, updatedGifted.message)
          }
        default:
          return error(400, 'Invalid tag')
      }
    },
    {
      params: t.Object({
        tag: t.Enum(Tag, {
          error() {
            return 'Invalid Tag'
          },
        }),
        key: EncodedUnionField(true, 'Invalid Key', [
          ...Object.keys(AllData.Organizations),
          ...Object.keys(AllData.Clubs),
          ...Object.keys(AllData.Programs),
          ...Object.keys(AllData.Gifted),
        ]),
      }),
    },
  )
  .patch(
    '/data/:tag/:key/review/:id',
    async ({ params: { tag, key, id }, body }) => {
      switch (tag) {
        case Tag.CLUB:
          const ClubReview = await updateClubReview(
            decodeURIComponent(key) as keyof typeof AllData.Clubs,
            id,
            body as ReviewData,
          )
          switch (ClubReview.status) {
            case 200:
              return ClubReview
            case 500:
              return error(500, ClubReview.message)
          }
        case Tag.ORGANIZATION:
          const OrgReview = await updateOrganizationReview(
            key as keyof typeof AllData.Organizations,
            id,
            body as ReviewData,
          )
          switch (OrgReview.status) {
            case 200:
              return OrgReview
            case 500:
              return error(500, OrgReview.message)
          }
        case Tag.PROGRAM:
          const ProgramReview = await updateProgramReview(
            key as keyof typeof AllData.Programs,
            id,
            body as ReviewData,
          )
          switch (ProgramReview.status) {
            case 200:
              return ProgramReview
            case 500:
              return error(500, ProgramReview.message)
          }
        case Tag.GIFTED:
          const GiftedReview = await updateGiftedReview(
            key as keyof typeof AllData.Gifted,
            id,
            body as ReviewData,
          )
          switch (GiftedReview.status) {
            case 200:
              return GiftedReview
            case 500:
              return error(500, GiftedReview.message)
          }
        default:
          return error(400, 'Invalid tag')
      }
    },
    {
      params: t.Object({
        tag: t.Enum(Tag, {
          error() {
            return error(400, 'Invalid Tag')
          },
        }),
        key: EncodedUnionField(true, 'Invalid Key', [
          ...Object.keys(AllData.Organizations),
          ...Object.keys(AllData.Clubs),
          ...Object.keys(AllData.Programs),
          ...Object.keys(AllData.Gifted),
        ]),
        id: t.String(),
      }),
      body: t.Object({
        profile: t.Optional(
          t.File({
            error() {
              return 'Invalid Profile'
            },
          }),
        ),
        nick: StringField(true, 'Invalid Nick'),
        gen: StringField(true, 'Invalid Gen'),
        contact: StringField(true, 'Invalid Contact'),
        content: StringField(true, 'Invalid Content'),
      }),
    },
  )
  .post('/all', async () => {
    return createEverything()
  })
  .patch('/import', async () => {
    await importClubData()
    await importGiftedData()
    await importOrganizationData()
    await importProgramData()
    return { success: true }
  })
