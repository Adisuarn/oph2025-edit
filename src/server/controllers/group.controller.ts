import { prisma } from '@utils/db'
import { getUser } from '../middlewares/derive'

export const addGroup = async() => {
  const user = await getUser()
  if(!user.success) return 'User not found' // redirect to login page
  const userData = user?.data

  try {
    const userGroup = await prisma.group.create({
      data: {
        studentId: userData?.studentId ?? '',
        email: userData?.email ?? '',
        group: 'Organization',
        groupName: 'TUSC',
        organization: {
          create: {
            name: 'TUSC'
          }
        }
      }
    })
    return { success: true, data: userGroup }
  } catch (error) {
    console.log(error)
  }
}
