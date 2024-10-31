import { Elysia, t, error } from 'elysia'
import { getAllData, getDataByKey, updateStatus } from '@modules/tucmc/tucmc.controller'
import { EncodedUnionField, StringField } from '@/server/utils/validate'
import { AllData } from '@libs/data'
import { Tag, Status, ReviewData } from '@utils/type'
import { updateClubData, updateClubReview,ClubData } from '@modules/clubs/clubs.controller'
import { updateOrganizationData, updateOrganizationReview,OrganizationData } from '@modules/organizations/organizations.controller'
import { updateProgramData, updateProgramReview,ProgramData } from '@modules/programs/programs.controller'
import { updateGiftedData, updateGiftedReview, GiftedData } from '@modules/gifted/gifted.controller'
import { createEverything } from '@utils/create'
import { importClubData, importGiftedData, importOrganizationData, importProgramData } from '@/server/utils/importdata'

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
    return await updateStatus(tag, decodeURIComponent(key), body.status, body.error)
  },{
    params: t.Object({
      tag: t.Enum(Tag, {error(){ return 'Invalid Tag' }}),
      key: EncodedUnionField(true, 'Invalid Key', [...Object.keys(AllData.Organizations), ...Object.keys(AllData.Clubs), ...Object.keys(AllData.Programs), ...Object.keys(AllData.Gifted)]),
    }),
    body: t.Object({
      status: t.Enum(Status, {error(){ return 'Invalid Status' }}),
      error: StringField(false, 'Invalid Error')
    })
  })
  .patch('/data/:tag/:key/edit', async ({ params: { tag,key }, body, request: { headers } }) => {
    switch (tag) {
      case Tag.CLUB:
        const updatedClub = await updateClubData(decodeURIComponent(key) as keyof typeof AllData.Clubs, body as ClubData, headers)
        return updatedClub
      case Tag.ORGANIZATION:
        const updatedOrganization = await updateOrganizationData(key as keyof typeof AllData.Organizations, body as OrganizationData, headers)
        return updatedOrganization 
      case Tag.PROGRAM:
        const updatedProgram = await updateProgramData(key as keyof typeof AllData.Programs, body as ProgramData, headers)
        return updatedProgram
      case Tag.GIFTED:
        const updatedGifted = await updateGiftedData(key as keyof typeof AllData.Gifted, body as GiftedData, headers)
        return updatedGifted
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
      case Tag.CLUB:
        return await updateClubReview(decodeURIComponent(key) as keyof typeof AllData.Clubs, id, body as ReviewData)
      case Tag.ORGANIZATION:
        return await updateOrganizationReview(key as keyof typeof AllData.Organizations, id, body as ReviewData)
      case Tag.PROGRAM:
        return await updateProgramReview(key as keyof typeof AllData.Programs, id, body as ReviewData)
      case Tag.GIFTED:
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
      nick: StringField(true, 'Invalid Nick'),
      gen: StringField(true, 'Invalid Gen'),
      contact: StringField(true, 'Invalid Contact'),
      content: StringField(true, 'Invalid Content'),
    })
  })
  .post('/all', async() => {
    return createEverything()
  })
  .patch('/import', async() => {
    await importClubData();
    await importGiftedData();
    await importOrganizationData();
    await importProgramData();
    return { success: true };
  })
