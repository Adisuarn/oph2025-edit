'use server'

import apiFunction from '@/components/api'

export async function fetchHandler() {
  const data = await apiFunction('GET', '/tucmc/data', {})
  const organizations = data.data.data.organizations
  const programs = data.data.data.programs
  const clubs = data.data.data.clubs
  const gifted = data.data.data.gifted
  return {
    props: {
      organizations,
      programs,
      clubs,
      gifted,
    },
  }
}

export async function viewHandler(tag: string, key: string) {
  const response = await apiFunction('GET', `/tucmc/data/${tag}/${key}`, {})
  const data = response.data.data
  const reviewData = data.reviews.data
  return { data, reviewData }
}
