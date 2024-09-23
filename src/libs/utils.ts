import { getUser } from '@middlewares/derive'
import { redirect } from 'next/navigation'

const user = await getUser()

export const checkUserAndRedirect = async (path?: string) => {
    if(path === undefined || !user.success) {
        path = '/'
        redirect(path)
    } 
    if(path !== undefined && user.success){
        path = path
        redirect(path)
    }
}

export const checkTUCMC = async () => {
    if(user.success && user.data?.TUCMC === true){
        return true
    } else {
        redirect('/account')
    }
}
