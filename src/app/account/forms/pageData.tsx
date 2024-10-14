"use server";

import { getUser } from "@/server/middlewares/derive";
import { redirect } from "next/navigation";

export default async function Data() {
  const userData = await getUser();
  return userData.data;
}
