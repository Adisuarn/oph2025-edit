'use client'
import React from 'react'
import { elysia } from '../../lib/api'
import { redirect } from 'next/navigation'

const DashboardPage = () => {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    elysia.auth.getuser.get()
      .then(res => setUser(res.data))
      .catch(err => {
        console.error(err);
        setUser(null);
      });
  }, []);
  if(user && user.success === false) {
    redirect('/')
  }
  const userData = user?.dbUser
  return (
    <div>
        <h1>Dashboard</h1>
        {userData && (
            <div>
            <h2>{userData.name}</h2>
            <p>{userData.email}</p>
            </div>
        )}
    </div>
  )
}

export default DashboardPage
