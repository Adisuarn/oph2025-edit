import { Elysia, t, error } from "elysia";
import { AllData } from "@libs/data";
import { prisma } from "@utils/db";
import { UnionField, StringField } from "@utils/validate";

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
        name: t.String(),
        thainame: t.String(),
        members: t.String(),
        ig: t.String(),
        fb: t.String(),
        others: t.String(),
        admissions: t.String(),
        courses: t.String(),
        interests: t.String(),
        captureimg1: t.File(),
        descimg1: t.String(),
        captureimg2: t.File(),
        descimg2: t.String(),
        captureimg3: t.File(),
        descimg3: t.String(),
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
      return await updateGiftedReview(name, id, body);
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
        profile: t.File(),
        name: t.String(),
        nick: t.String(),
        gen: t.String(),
        contact: t.String(),
        content: t.String(),
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
