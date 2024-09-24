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
    <div>
        <h1>Account Page</h1>
        <p>Welcome {data?.name}</p>
        <p>Email: {data?.email}</p>
        <p><a href="/account/forms">Go To Form Page</a></p>
        <LogoutButton />
    </div>
  )
}

export default AccountPage
