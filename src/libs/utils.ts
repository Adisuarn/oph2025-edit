import { getUser } from '@middlewares/derive'
import { redirect } from 'next/navigation'

// type User = {
//     success: boolean;
//     error?: string;
//     data?: {
//         studentId: string;
//         email: string;
//         name: string;
//         picture: string | null;
//         TUCMC: boolean | null;
//     } | null;
// };

// export const checkUserAndRedirect = async (path?: string) => {
//     const user: User = await getUser()
//     if (!user.success) path = '/'
//     return path
// } Maybe not necessary

// export const checkTUCMC = async (): Promise<boolean> => {
//     const user: User = await getUser()
//     if (!user.success || !user.data?.TUCMC) redirect('/account')
//     return true
// }
