'use server'
import apiFunction from "../api";
import { Status } from '@utils/type'

export const updateStatus = async (data: any, status: Status) => {
  const statusInfo = { status: status }
  await apiFunction('PATCH', `/tucmc/data/${data.data.tag}/${data.data.key}`, statusInfo)
}
