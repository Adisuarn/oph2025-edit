import { prisma } from "@utils/db";
import { uploadImage } from "@utils/uploadimg";
import { AllData } from "@libs/data";
import { getGifted } from "@middlewares/derive";
import type { Gifted } from "@utils/type";
import { error } from "elysia";

interface GiftedData {
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

interface reviewData {
    profile: File,
    name: string,
    nick: string,
    gen: string,
    contact: string,
    content: string,
}

export const createGifted = async (body: Gifted) => {
  if ((await prisma.gifted.count({ where: { email: body.email } })) > 0)
    throw error(400, "User already created an organization");

  try {
    const gifted = await prisma.gifted.create({
      omit: { giftedId: true, updatedAt: true },
      data: {
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
    return { success: false, message: 'Getting organization successfully', data: giftedData };
  } catch (err) {
    throw error(500, "Error while getting gifted")
  }
};

export const updateGiftedData = async (
  name: keyof typeof AllData.Gifted,
  body: GiftedData,
) => {
  try {
    const updatedGifted = await prisma.gifted.update({
      omit: { giftedId: true, createdAt: true },
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
        captureimg1: await uploadImage(body.captureimg1),
        descimg1: body.descimg1,
        captureimg2: await uploadImage(body.captureimg2),
        descimg2: body.descimg2,
        captureimg3: await uploadImage(body.captureimg3),
        descimg3: body.descimg3,
      },
    });
    return {
      success: true,
      message: "Updating gifted data successfully",
      dara: updatedGifted,
    };
  } catch (err) {
    throw error(500, "Error while updating gifted data");
  }
};

export const getReviews = async (name: keyof typeof AllData.Gifted) => {
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

export const createReview = async (name: keyof typeof AllData.Gifted) => {
  const giftedData = (await getGifted(name)).data;
  if (
    (await prisma.reviews.count({
      where: { email: giftedData.email },
    })) >= 3
  )
    throw error(400, "Review reachs limit");
  try {
    const review = await prisma.reviews.create({
      omit: { reviewId: true, updatedAt: true },
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

export const updateReview = async (
  name: keyof typeof AllData.Gifted,
  count: string,
  body: reviewData,
) => {
  const giftedData = (await getGifted(name)).data;
  try {
    const review = await prisma.reviews.update({
      omit: { reviewId: true, createdAt: true },
      where: { email: giftedData.email, count: count },
      data: {
        profile: await uploadImage(body.profile),
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

export const deleteReview = async (
  name: keyof typeof AllData.Gifted,
  id: string,
) => {
  const giftedData = (await getGifted(name)).data;
  try {
    await prisma.reviews.update({
      omit: { reviewId: true },
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
