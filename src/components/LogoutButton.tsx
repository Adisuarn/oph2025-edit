'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'

import { env } from '@/env'

const LogoutButton: React.FC<{ disabled?: boolean }> = ({ disabled }) => {
  const router = useRouter()
  const handleLogoutClick = async () => {
    if (disabled) return
    try {
      const options = {
        method: 'GET',
        url: `${env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
        headers: {
          'x-api-key': env.NEXT_PUBLIC_API_KEY,
        },
      }
      const response = await axios.request(options)
      if (response.status === 200) router.push('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <button
      type="button"
      onClick={() => handleLogoutClick()}
      disabled={disabled}
      className={`relative text-sm text-neutral-500 before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-neutral-500 before:transition-all before:duration-300 hover:before:w-full ${disabled ? 'cursor-not-allowed opacity-50' : ''}`}
    >
      Log out
    </button>
  )
}

export default LogoutButton
