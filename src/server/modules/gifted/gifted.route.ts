import { Elysia, t, error } from "elysia";
import { AllData } from "@libs/data";
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
    async beforeHandle({ request: { headers }, params: { name, id } }) {
      const userData = (await getUser(headers)).data;
      const giftedData = (await getGifted(name)).data;
      if (userData?.TUCMC === true) {
        return
      } else if (userData?.email !== giftedData.email) {
        return error(401, "Unauthorized");
      }
    },
    params: t.Object({
      name: UnionField(
        true,
        "Invalid Gifted Name",
        Object.keys(AllData.Gifted),
      ),
      id: StringField(false, "Invalid Review ID"),
    }),
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
    async ({ params: { name }, body, request: { headers } }) => {
      return await updateGiftedData(name, body, headers);
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
        name: StringField(false, "Invalid Name"),
        thainame: StringField(false, "Invalid Thai Name"),
        members: StringField(true, "Invalid Member"),
        ig: StringField(false, "Invalid Instagram"),
        fb: StringField(false, "Invalid Facebook"),
        others: StringField(false, "Invalid Others"),
        admissions: StringField(true, "Invalid Admissions"),
        courses: StringField(true, "Invalid Courses"),
        interests: StringField(true, "Invalid Interests"),
        captureimg1: t.Optional(t.File({ error() { return "Invalid Capture Image 1"} })),
        descimg1: StringField(true, "Invalid Description Image"),
        captureimg2: t.Optional(t.File({ error() { return "Invalid Capture Image 2" } })),
        descimg2: StringField(true, "Invalid Description Image"),
        captureimg3: t.Optional(t.File({ error() { return "Invalid Capture Image 3" } })),
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
