import React from 'react'
import LogoutButton from '@/components/LogoutButton'
import { getUser } from '@/server/middlewares/derive'
import { redirect } from 'next/navigation'

const AccountPage = async () => {
  const user = await getUser()
  if(!user.success){
    redirect('/')
  }
  const data = user.data
  return (
    <section className='bg-gradient-to-tr from-cyan-500 to-blue-500 text-black flex just w-full text-center h-screen items-center'>
      <div className='w-full flex justify-center'>
        <div className='bg-indigo-300 w-fit px-10 py-12 rounded-[20px] leading-7 font-roboto text-lg'>
        <h1 className='underline cursor-pointer'>Account Page</h1>
        <p>Welcome {data?.name}</p>
        <p>Email: {data?.email}</p>
        <p className='underline cursor-pointer'><a href="/account/forms">Go To Form Page</a></p>
        <LogoutButton />
        </div>
      </div>
    </section>  
  )
}

export default AccountPage
