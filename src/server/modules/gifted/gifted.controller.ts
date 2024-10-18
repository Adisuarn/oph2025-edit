import { prisma } from "@utils/db";
import { uploadImage } from "@utils/uploadimg";
import { AllData } from "@libs/data";
import { getGifted, getUser } from "@middlewares/derive";
import type { Gifted } from "@utils/type";
import { error } from "elysia";
import { ReviewData, Status } from "@utils/type";

export interface GiftedData {
  error: string;
  name: string;
  thainame: string;
  status?: string;
  members: string;
  ig: string;
  fb: string;
  others: string;
  admissions: string;
  courses: string;
  interests: string;
  captureimg1: File;
  descimg1: string;
  captureimg2: File;
  descimg2: string;
  captureimg3: File;
  descimg3: string;
}

export const createGifted = async (body: Gifted) => {
  if ((await prisma.gifted.count({ where: { email: body.email } })) > 0)
    throw error(400, "User already created an organization");

  try {
    const gifted = await prisma.gifted.create({
      omit: { giftedId: true, updatedAt: true, id: true },
      data: {
        error: "",
        key: body.key,
        email: body.email,
        name: body.key,
        thainame: AllData.Gifted[body.key],
        ig: "",
        fb: "",
        others: "",
        admissions: "",
        courses: "",
        interests: "",
        captureimg1: "",
        descimg1: "",
        captureimg2: "",
        descimg2: "",
        captureimg3: "",
        descimg3: "",
      },
    });
    await prisma.user.update({
      where: { email: body.email },
      data: {
        tag: body.tag,
        key: body.key,
      },
    });
    return {
      success: true,
      message: "Creating gifted successful",
      data: gifted,
    };
  } catch (err) {
    throw error(500, "Error while creating gifted");
  }
};

export const getGiftedByName = async (name: Gifted["key"]) => {
  const giftedData = (await getGifted(name)).data;
  try {
    return { success: false, message: 'Getting gifted successfully', data: giftedData };
  } catch (err) {
    throw error(500, "Error while getting gifted")
  }
};

export const updateGiftedData = async (
  name: keyof typeof AllData.Gifted,
  body: GiftedData,
) => {
  const giftedData = (await getGifted(name)).data
  const userData = (await getUser()).data
  if(giftedData.status === 'approved') throw error(400, 'Gifted already approved')
  try {
    const updatedGifted = await prisma.gifted.update({
      omit: { giftedId: true, createdAt: true, id: true },
      where: { name: name },
      data: {
        name: body.name,
        thainame: body.thainame,
        status: body.status,
        members: body.members,
        ig: body.ig,
        fb: body.fb,
        others: body.others,
        admissions: body.admissions,
        courses: body.courses,
        interests: body.interests,
        captureimg1: (!body.captureimg1 === undefined ) ? await uploadImage(body.captureimg1) : giftedData.captureimg1,
        descimg1: body.descimg1,
        captureimg2: (!body.captureimg2 === undefined ) ? await uploadImage(body.captureimg2) : giftedData.captureimg2,
        descimg2: body.descimg2,
        captureimg3: (!body.captureimg3 === undefined ) ? await uploadImage(body.captureimg3) : giftedData.captureimg3,
        descimg3: body.descimg3,
      },
    });
    if(userData?.email === giftedData.email) await prisma.gifted.update({ where: { key: name}, data: { status: Status.PENDING }}) 
    return {
      success: true,
      message: "Updating gifted data successfully",
      dara: updatedGifted,
    };
  } catch (err) {
    throw error(500, "Error while updating gifted data");
  }
};

export const getGiftedReviews = async (name: keyof typeof AllData.Gifted) => {
  const giftedData = (await getGifted(name)).data;
  try {
    const reviewData = await prisma.reviews.findMany({
      omit: { reviewId: true, id: true },
      where: { key: giftedData.key },
    });
    return {
      success: true,
      message: "Getting reviews successfully",
      data: reviewData,
    };
  } catch (err) {
    throw error(500, "Error while getting reviews");
  }
};

export const createGiftedReview = async (name: keyof typeof AllData.Gifted) => {
  const giftedData = (await getGifted(name)).data;
  if (
    (await prisma.reviews.count({
      where: { email: giftedData.email },
    })) >= 3
  )
    throw error(400, "Review reachs limit");
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true, id:true },
      data: {
        key: giftedData.key,
        email: giftedData.email,
        count: (
          (await prisma.reviews.count({
            where: { email: giftedData.email },
          })) + 1
        ).toString(),
        profile: "",
        name: "",
        nick: "",
        gen: "",
        contact: "",
        content: "",
      },
    });
    return {
      success: true,
      message: "Creating review successfully",
      data: review,
    };
  } catch (err) {
    throw error(500, "Error while creating review");
  }
};

export const updateGiftedReview = async (
  name: keyof typeof AllData.Gifted,
  count: string,
  body: ReviewData,
) => {
  const giftedData = (await getGifted(name)).data;
  const reviewData = await prisma.reviews.findFirst({ where: { email: giftedData.email, count: count } })
  try {
    const review = await prisma.reviews.update({
      omit: { reviewId: true, createdAt: true, id:true },
      where: { email: giftedData.email, count: count },
      data: {
        profile: (!body.profile) ? await uploadImage(body.profile) : reviewData?.profile,
        name: body.name,
        nick: body.nick,
        gen: body.gen,
        contact: body.contact,
        content: body.content,
      },
    });
    return {
      success: true,
      message: "Updating review successfully",
      data: review,
    };
  } catch (err) {
    throw error(500, "Error while updating review");
  }
};

export const deleteGiftedReview = async (
  name: keyof typeof AllData.Gifted,
  id: string,
) => {
  const giftedData = (await getGifted(name)).data;
  try {
    await prisma.reviews.update({
      where: { email: giftedData.email, count: id },
      data: {
        profile: "",
        name: "",
        nick: "",
        gen: "",
        contact: "",
        content: "",
      },
    });
    return { success: true, message: "Deleting review successfully" };
  } catch (err) {
    throw error(500, "Error while deleting review");
  }
};
