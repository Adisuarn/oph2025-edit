import React from 'react'
import { getUser } from '@middlewares/derive'
import { redirect } from 'next/navigation'
import LogoutButton from '@/components/LogoutButton'

const DashboardPage = async () => {
  const user = await getUser()
  /// Check if user is not authenticated then redirect to homepage
  if(!user.success) {
    redirect('/')
  }
  const userData = user.data
  return (
    <div>
        <h1>Dashboard</h1>
        <p>Welcome {userData?.name}</p>
        <p>Email: {userData?.email}</p>
        <LogoutButton />
    </div>
  )
}

export default DashboardPage
