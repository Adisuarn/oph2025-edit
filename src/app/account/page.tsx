import React from 'react'
import LogoutButton from '@/components/LogoutButton'
import { getUser } from '@/server/middlewares/derive'

const DashboardPage = async () => {
  const user = await getUser()
  const data = user.data
  return (
    <div>
        <h1>Account Page</h1>
        <p>Welcome {data?.name}</p>
        <p>Email: {data?.email}</p>
        <LogoutButton />
    </div>
  )
}

export default DashboardPage
