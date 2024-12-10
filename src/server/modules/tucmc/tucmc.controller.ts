import { AllData } from '@libs/data'
import { getClubReviews } from '@modules/clubs/clubs.controller'
import { getOrganizationReviews } from '@modules/organizations/organizations.controller'
import { getProgramReviews } from '@modules/programs/programs.controller'
import { getGiftedReviews } from '@/server/modules/gifted/gifted.controller'
import { prisma } from '@utils/db'
import { Status, Tag } from '@utils/type'
import { Workbook } from 'exceljs'
import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'

export const updateStatus = async (tag: Tag, key: string, status: Status, errorMsg: string) => {
  try {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: {
            status: status,
            error: errorMsg,
          },
        })
        return { status: 200, message: `Updating status: ${status} successfully` }
      default:
        return { status: 400, message: 'Invalid tag' }
    }
  } catch (err) {
    return { status: 500, message: 'Error while updating status' }
  }
}

export const getAllData = async () => {
  let data: {
    clubs: any[]
    organizations: any[]
    programs: any[]
    gifted: any[]
  } = {
    clubs: [],
    organizations: [],
    programs: [],
    gifted: [],
  }
  try {
    const programs = await prisma.programs.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const program of programs) {
      data.programs.push({ ...program })
    }
    const gifted = await prisma.gifted.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const gift of gifted) {
      data.gifted.push({ ...gift })
    }
    const clubs = await prisma.clubs.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const club of clubs) {
      data.clubs.push({ ...club })
    }
    const organizations = await prisma.organizations.findMany({
      select: { key: true, tag: true, thainame: true, status: true },
    })
    for (const organization of organizations) {
      data.organizations.push({ ...organization })
    }
  } catch (err) {
    return { status: 500, message: 'Error while getting all data' }
  }
  return { status: 200, message: 'Getting all data successfully', data }
}

export const getDataByKey = async (tag: string, key: string) => {
  let data: any
  try {
    switch (tag) {
      case Tag.CLUB:
        data = await prisma.clubs.findUnique({
          omit: { clubId: true, id: true },
          where: { key },
        })
        data.reviews = await getClubReviews(key as keyof typeof AllData.Clubs)
        break
      case Tag.ORGANIZATION:
        data = await prisma.organizations.findUnique({
          omit: { organizationId: true, id: true },
          where: { key },
        })
        data.reviews = await getOrganizationReviews(key as keyof typeof AllData.Organizations)
        break
      case Tag.PROGRAM:
        data = await prisma.programs.findUnique({
          omit: { programId: true, id: true },
          where: { key },
        })
        data.reviews = await getProgramReviews(key as keyof typeof AllData.Programs)
        break
      case Tag.GIFTED:
        data = await prisma.gifted.findUnique({
          omit: { giftedId: true, id: true },
          where: { key },
        })
        data.reviews = await getGiftedReviews(key as keyof typeof AllData.Gifted)
        break
      default:
        return { status: 400, message: 'Invalid tag' }
    }
  } catch (err) {
    return { status: 500, message: 'Error while getting data by key' }
  }
  return { status: 200, message: 'Getting data by key successfully', data }
}

export const handlerWrongSubmit = async (email: string, changedTag: any, changedKey: any) => {
  const user = await prisma.user.findUnique({
    where: { email },
  })

  const upperCaseTag = changedTag.charAt(0).toUpperCase() + changedTag.slice(1)

  const isKeyInTag = Object.keys(AllData[upperCaseTag as keyof typeof AllData]).includes(changedKey)
  if (!isKeyInTag) return { status: 400, message: 'Key and Tag mismatch' }

  if (!user) return { status: 404, message: 'User not found' }
  if (user.key === changedKey) return { status: 400, message: 'Key is the same' }

  const resetData = async (tag: Tag) => {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key: user.key },
          data: {
            email: '',
            updatedBy: '',
          },
        })
        break
    }
  }

  const updateDataByTag = async (tag: Tag, key: any) => {
    switch (tag) {
      case Tag.CLUB:
        await prisma.clubs.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.ORGANIZATION:
        await prisma.organizations.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.PROGRAM:
        await prisma.programs.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
      case Tag.GIFTED:
        await prisma.gifted.update({
          where: { key },
          data: {
            email: email,
            updatedBy: email,
          },
        })
        await prisma.user.update({
          where: { email },
          data: {
            key: key,
            tag: tag,
          },
        })
        break
    }
  }

  switch (user.tag) {
    case Tag.CLUB:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.ORGANIZATION:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.PROGRAM:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    case Tag.GIFTED:
      await resetData(user.tag)
      await updateDataByTag(changedTag, changedKey)
      return {
        status: 200,
        message: `Change user ${email} to ${changedTag} and ${changedKey} successfully`,
      }
    default:
      return { status: 400, message: 'Invalid tag' }
  }
}

const exportEntityData = async (
  entityType: 'organizations' | 'gifted' | 'clubs' | 'programs',
  getReviewsFn: Function
) => {
  const data = await (prisma[entityType] as any).findMany();

  return Promise.all(
    data.map(async (item: any) => {
      const reviewsData = await getReviewsFn(
        item.key as any
      );

      const filteredReviews = reviewsData.data?.map((review: any) => ({
        count: review.count,
        profile: review.profile,
        nick: review.nick,
        gen: review.gen,
        contact: review.contact,
        content: review.content
      })) ?? [];

      const {
        updatedAt,
        updatedBy,
        organizationId,
        clubId,
        programId,
        giftedId,
        createdAt,
        error,
        isAdmin,
        status,
        id,
        email,
        ...filteredItem
      } = item;

      return {
        ...filteredItem,
        reviews: filteredReviews
      };
    })
  );
};

export const mapAllData = async () => {
  const exportDir = path.join(process.cwd(), 'exports/_maps');
  const imageDir = path.join(process.cwd(), 'exports/assets/all-images');
  const outputFile = path.join(exportDir, 'mapData.json');

  await fs.mkdir(imageDir, { recursive: true });
  await fs.mkdir(exportDir, { recursive: true });

  const mapData: any[] = [];

  const entities = [
    {
      type: 'organizations',
      getReviews: getOrganizationReviews,
      model: prisma.organizations
    },
    {
      type: 'clubs',
      getReviews: getClubReviews,
      model: prisma.clubs
    },
    {
      type: 'gifted',
      getReviews: getGiftedReviews,
      model: prisma.gifted
    },
    {
      type: 'programs',
      getReviews: getProgramReviews,
      model: prisma.programs
    }
  ];

  for (const entity of entities) {
    const items = await (entity.model as any).findMany();

    for (const item of items) {
      const {
        id, updatedAt, updatedBy, createdAt, error,
        isAdmin, status, email, captureimg1, captureimg2,
        captureimg3, descimg1, descimg2, descimg3,
        ig, fb, others, organizationId, clubId, programId, giftedId,
        ...filteredItem
      } = item;

      console.log(`Mapping ${entity.type}/${filteredItem.key}`);

      if (item.logo) {
        try {
          const logoPath = path.join(imageDir, `${filteredItem.key}-logo.png`);
          const response = await axios({
            method: 'GET',
            url: item.logo,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          await fs.writeFile(logoPath, response.data);
          filteredItem.logo = `/assets/all-images/${filteredItem.key}-logo.png`;
        } catch (error) {
          console.error(`Error downloading logo for ${filteredItem.key}:`, error);
        }
      }

      const images = [captureimg1, captureimg2, captureimg3];
      const captureimages = await Promise.all(images.map(async (img, index) => {
        if (!img) return null;
        try {
          const imgPath = path.join(imageDir, `${filteredItem.key}-${index + 1}.png`);
          const response = await axios({
            method: 'GET',
            url: img,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          await fs.writeFile(imgPath, response.data);
          return {
            url: `/assets/all-images/${filteredItem.key}-${index + 1}.png`,
            description: item[`descimg${index + 1}`]
          };
        } catch (error) {
          console.error(`Error downloading image for ${filteredItem.key}:`, error);
          return null;
        }
      }));

      const reviews = (await entity.getReviews(filteredItem.key as never)).data || [];
      const filteredReviews = await Promise.all(reviews.map(async ({ key, createdAt, updatedAt, updatedBy, profile, ...rest }, index) => {
        if (!profile) return null;
        try {
          const imgPath = path.join(imageDir, `profile-${key}-${index + 1}.png`);
          const response = await axios({
            method: 'GET',
            url: profile,
            responseType: 'arraybuffer',
            headers: { 'User-Agent': 'Mozilla/5.0' }
          });
          await fs.writeFile(imgPath, response.data);
          return {
            profile: `/assets/all-images/profile-${key}-${index + 1}.png`,
            ...rest
          };
        } catch (error) {
          console.error(`Error downloading profile for ${key}:`, error);
          return null;
        }
      }));

      mapData.push({
        type: entity.type,
        ...filteredItem,
        images: captureimages.filter(Boolean),
        reviews: filteredReviews.filter(Boolean),
        contacts: {
          ig: ig,
          fb: fb,
          others: others
        }
      });
    }

    await fs.writeFile(outputFile, JSON.stringify(mapData, null, 2));
  }

  return mapData;
};

export const exportAllData = async () => {
  try {
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const exportDir = path.join(process.cwd(), 'exports');
    await fs.mkdir(exportDir, { recursive: true });

    
    const exports = await Promise.all([
      exportEntityData('organizations', getOrganizationReviews),
      exportEntityData('gifted', getGiftedReviews),
      exportEntityData('clubs', getClubReviews),
      exportEntityData('programs', getProgramReviews)
    ]);

    
    const fileNames = ['organizations', 'gifted', 'clubs', 'programs'];
    await Promise.all(
      exports.map(async (data: any, index: any) => {
        const filename = `${fileNames[index]}-${timestamp}.json`;
        const filePath = path.join(exportDir, filename);
        await fs.writeFile(
          filePath,
          JSON.stringify(data, null, 2)
        );
      })
    );

    return {
      status: 200,
      message: `Data exported successfully for all entities at ${timestamp}`,
    };

  } catch (err) {
    console.error('Error exporting data:', err);
    return { status: 500, message: 'Error while exporting data' };
  }
};

export const notSendInfo = async () => {
  const unSendClubs = await prisma.clubs.findMany({
    where: { status: "" },
    select: {
      key: true,
      thainame: true,
    }
  })
  const unSendOrg = await prisma.organizations.findMany({
    where: { status: "" },
    select: {
      key: true,
      thainame: true,
    }
  })
  const unSendPrograms = await prisma.programs.findMany({
    where: { status: "" },
    select: {
      key: true,
      thainame: true,
    }
  })
  const unSendGifted = await prisma.gifted.findMany({
    where: { status: "" },
    select: {
      key: true,
      thainame: true,
    }
  })

  const workbook = new Workbook()

  const sheets = {
    'ชมรม': unSendClubs,
    'องค์กร': unSendOrg,
    'สายการเรียน': unSendPrograms,
    'โครงการพัฒนาฯ': unSendGifted
  }

  for (const [sheetName, data] of Object.entries(sheets)) {
    const worksheet = workbook.addWorksheet(sheetName);

    worksheet.columns = [
      { header: 'รหัส', key: 'key', width: 15 },
      { header: 'ชื่อ', key: 'thainame', width: 30 }
    ];

    worksheet.addRows(data);
  }

  await workbook.xlsx.writeFile('not-send-info.xlsx');
}
