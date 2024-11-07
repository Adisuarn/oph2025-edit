'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'

const LogoutButton = () => {
  const router = useRouter()
  const handleLogoutClick = async () => {
    try {
      const options = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
      const response = await axios.request(options)
      if (response.status === 200) {
        router.push('/')
      } else {
        router.push('/error/500')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      onClick={handleLogoutClick}
      className="relative text-sm text-neutral-500 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-neutral-500 before:transition-all before:duration-300 hover:before:w-full"
    >
      Log out
    </button>
  )
}

export default LogoutButton
