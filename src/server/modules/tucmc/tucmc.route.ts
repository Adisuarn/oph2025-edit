import { Elysia, t, error } from 'elysia'
import { getAllData, getDataByKey, updateStatus, updateError } from '@modules/tucmc/tucmc.controller'
import { EncodedUnionField, StringField } from '@/server/utils/validate'
import { AllData } from '@libs/data'
import { Tag, Status, ReviewData } from '@utils/type'
import { updateClubData, updateClubReview,ClubData } from '@modules/clubs/clubs.controller'
import { updateOrganizationData, updateOrganizationReview,OrganizationData } from '@modules/organizations/organizations.controller'
import { updateProgramData, updateProgramReview,ProgramData } from '@modules/programs/programs.controller'
import { updateGiftedData, updateGiftedReview, GiftedData } from '@modules/gifted/gifted.controller'

export const tucmcRouter = new Elysia({ prefix: '/tucmc' })
  .get('/data', async () => {
    return await getAllData()
  })
  .get('/data/:tag/:key', async ({ params: { tag, key } }) => {
    return await getDataByKey(tag, decodeURIComponent(key))
  },{
    params: t.Object({
      tag: t.Enum(Tag, {error(){ return 'Invalid Tag' }}),
      key: EncodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
    })
  })
  .patch('/data/:tag/:key', async ({ params: { tag, key }, body }) => {
    return await updateStatus(tag, decodeURIComponent(key), body.status)
  },{
    params: t.Object({
      tag: t.Enum(Tag, {error(){ return 'Invalid Tag' }}),
      key: EncodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
    }),
    body: t.Object({
      status: t.Enum(Status, {error(){ return 'Invalid Status' }})
    })
  })
  .patch('/data/:tag/:key/edit', async ({ params: { tag,key }, body, request: { headers } }) => {
    switch (tag) {
      case 'club':
        const updatedClub = await updateClubData(decodeURIComponent(key) as keyof typeof AllData.Clubs, body as ClubData, headers)
        const err1 = await updateError(tag, decodeURIComponent(key) as keyof typeof AllData.Clubs, body as ClubData['error'])
        return { updatedClub, err1 }
      case 'organization':
        const updatedOrganization = await updateOrganizationData(key as keyof typeof AllData.Organizations, body as OrganizationData, headers)
        const err2 = await updateError(tag, key as keyof typeof AllData.Organizations, body as OrganizationData['error'])
        return { updatedOrganization, err2 }
      case 'program':
        const updatedProgram = await updateProgramData(key as keyof typeof AllData.Programs, body as ProgramData, headers)
        const err3 = await updateError(tag, key as keyof typeof AllData.Programs, body as ProgramData['error'])
        return { updatedProgram, err3 }
      case 'gifted':
        const updatedGifted = await updateGiftedData(key as keyof typeof AllData.Gifted, body as GiftedData, headers)
        const err4 = await updateError(tag, key as keyof typeof AllData.Gifted, body as GiftedData['error'])
        return { updatedGifted, err4 }
      default:
        throw error(400, 'Invalid tag')
    }
  },{
    params: t.Object({
      tag: t.Enum(Tag, {error(){ return 'Invalid Tag' }}),
      key: EncodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
    }),
  })
  .patch('/data/:tag/:key/review/:id', async ({ params: { tag, key, id }, body }) => {
    switch (tag){
      case 'club':
        return await updateClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id, body as ReviewData)
      case 'organization':
        return await updateOrganizationReview(key as keyof typeof AllData.Organizations, id, body as ReviewData)
      case 'program':
        return await updateProgramReview(key as keyof typeof AllData.Programs, id, body as ReviewData)
      case 'gifted':
        return await updateGiftedReview(key as keyof typeof AllData.Gifted, id, body as ReviewData)
      default:
        throw error(400, 'Invalid tag')
    }
  },{
    params: t.Object({
      tag: t.Enum(Tag, {error(){ return error(400, 'Invalid Tag') }}),
      key: EncodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
      id: t.String()
    }),
    body: t.Object({
      profile: t.Optional(t.File({ error () { return 'Invalid Profile' }})),
      name: StringField(true, 'Invalid Name'),
      nick: StringField(true, 'Invalid Nick'),
      gen: StringField(true, 'Invalid Gen'),
      contact: StringField(true, 'Invalid Contact'),
      content: StringField(true, 'Invalid Content'),
    })
  })
