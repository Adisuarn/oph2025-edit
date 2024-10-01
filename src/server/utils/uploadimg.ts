import axios from 'axios'
import { CustomError } from '@utils/error'

interface ImgurResponse {
  data: {
    link: string
  }
}

export const uploadImage = async(file: File): Promise<string | undefined> => {
  try {
    if (!file) throw new CustomError('No file uploaded', 400)
    const response = await axios.post<ImgurResponse>('https://api.imgur.com/3/image', await file.arrayBuffer(), {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'image/*',
      }})
    return response.data.data.link
  } catch (err) {
    throw new CustomError('Failed to upload image', 500)
  }
}
