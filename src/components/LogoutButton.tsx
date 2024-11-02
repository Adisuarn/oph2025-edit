'use client'
import React from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

const LogoutButton = () => {
  const router = useRouter()
  const handleLogoutClick = async () => {
    try {
      const options = {
        method: "GET",
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        headers: {
          "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
        },
      }
      const response = await axios.request(options)
      if (response.status === 200) {
        router.push('/')
      } else {
        router.push('/500')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleLogoutClick} className='underline text-neutral-500 text-xs'>
      Logout
    </button>
  )
}

export default LogoutButton
