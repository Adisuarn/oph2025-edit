import axios from 'axios'
import { error } from 'elysia'

interface ImgurResponse {
  data: {
    link: string
  }
}

export const uploadImage = async(file: File | undefined): Promise<string | undefined> => {
  try {
    if (!file) throw new Error('No file provided')
    const response = await axios.post<ImgurResponse>('https://api.imgur.com/3/image', await file.arrayBuffer(), {
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
        'Content-Type': 'image/*',
      }})
    return response.data.data.link
  } catch (err) {
    throw error(500, 'Error while uploading image')
  }
}
