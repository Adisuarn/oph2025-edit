'use server'
import { redirect } from "next/navigation";
import apiFunction from "@/components/api"

export async function handler() {
  const user = await apiFunction('GET', '/user', {});
  if(!user.data.TUCMC) {
    redirect('/403')
  }
  const data = await apiFunction('GET', '/tucmc/data', {});
  const organizations = data.data.data.organizations;
  const programs = data.data.data.programs;
  const clubs = data.data.data.clubs;
  const gifted = data.data.data.gifted;
  const userData = user.data
  return {
    props: {
      userData,
      organizations,
      programs,
      clubs,
      gifted,
    }
  }
}

export async function viewHandler(tag: string, key: string) {
  const response = await apiFunction('GET', `/tucmc/data/${tag}/${key}`, {});
  const data = response.data.data;
  const reviewData = data.reviews.data;
  return { data, reviewData };
}
