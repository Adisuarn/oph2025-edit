import { Elysia, t, error } from "elysia";
import { AllData } from "@libs/data";
import { prisma } from "@utils/db";
import { UnionField, StringField } from "@utils/validate";
import { ReviewData } from "@utils/type";
import { getUser, getGifted } from "@middlewares/derive";

import {
  getGiftedByName,
  updateGiftedData,
  getGiftedReviews,
  createGiftedReview,
  updateGiftedReview,
  deleteGiftedReview,
} from "@modules/gifted/gifted.controller";


export const giftedRouter = new Elysia({ prefix: "/gifted" })
  .guard({
    async beforeHandle() {
      const userData = (await getUser()).data;
      const organization = await prisma.gifted.findUnique({
        where: { email: userData?.email },
        select: { name: true },
      });
      const name = organization?.name;
      if (!name) return error(404, "Organization Not Found");
      if (typeof name !== "string")
        return error(400, "Invalid Organization Name");
      const organizationData = (await getGifted(name)).data;
      if (!userData?.TUCMC && userData?.email !== organizationData.email)
        return error(401, "Unauthorized");
    },
  })
  .get(
    "/:name",
    async ({ params: { name } }) => {
      return await getGiftedByName(name);
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Gifted Name",
          Object.keys(AllData.Gifted),
        ),
      }),
    },
  )
  .patch(
    "/:name",
    async ({ params: { name }, body }) => {
      return await updateGiftedData(name, body);
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Gifted Name",
          Object.keys(AllData.Gifted),
        ),
      }),
      body: t.Object({
        error: StringField(false, "Invalid Error"),
        name: StringField(true, "Invalid Name"),
        thainame: StringField(true, "Invalid Thai Name"),
        members: StringField(true, "Invalid Member"),
        ig: StringField(true, "Invalid Instagram"),
        fb: StringField(true, "Invalid Facebook"),
        others: StringField(true, "Invalid Others"),
        admissions: StringField(true, "Invalid Admissions"),
        courses: StringField(true, "Invalid Courses"),
        interests: StringField(true, "Invalid Interests"),
        captureimg1: t.File({ error() { return  "Invalid Capture Image" } }),
        descimg1: StringField(true, "Invalid Description Image"),
        captureimg2: t.File({ error() { return "Invalid Capture Image" } }),
        descimg2: StringField(true, "Invalid Description Image"),
        captureimg3: t.File({ error() { return "Invalid Capture Image" } }),
        descimg3: StringField(true, "Invalid Description Image"),
      }),
    },
  )
  .get(
    "/:name/review",
    async ({ params: { name } }) => {
      return await getGiftedReviews(name);
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Gifted Name",
          Object.keys(AllData.Gifted),
        ),
      }),
    },
  )
  .post(
    "/:name/review",
    async ({ params: { name }, set }) => {
      const response = await createGiftedReview(name);
      if (response?.success) {
        set.status = 201;
        return response;
      }
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Gifted Name",
          Object.keys(AllData.Gifted),
        ),
      }),
    },
  )
  .patch(
    "/:name/review/:id",
    async ({ params: { name, id }, body }) => {
      return await updateGiftedReview(name, id, body as ReviewData);
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Organization Name",
          Object.keys(AllData.Gifted),
        ),
        id: StringField(true, "Invalid Review ID"),
      }),
      body: t.Object({
        profile: t.Optional(t.File({ error() { return "Invalid Profile" } })),
        name: StringField(true, "Invalid Name"),
        nick: StringField(true, "Invalid Nickname"),
        gen: StringField(true, "Invalid Generation"),
        contact: StringField(true, "Invalid Contact"),
        content: StringField(true, "Invalid Content"),
      }),
    },
  )
  .delete(
    "/:name/review/:id",
    async ({ params: { name, id } }) => {
      return await deleteGiftedReview(name, id);
    },
    {
      params: t.Object({
        name: UnionField(
          true,
          "Invalid Gifted Name",
          Object.keys(AllData.Gifted),
        ),
        id: StringField(true, "Invalid Review ID"),
      }),
    },
  );
