'use client'

import { useRouter } from 'next/navigation'
import React from 'react'
import axios from 'axios'

import Google from '@/vectors/landing/Google'

const GoogleOAuthButton = () => {
  const router = useRouter()
  const handleLoginClick = async () => {
    try {
      const options = {
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
        },
      }
      const data = await axios.request(options)
      const url = data.data.url
      if (url) {
        router.push(url)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <button onClick={handleLoginClick} className="to-72% flex items-center justify-center space-x-3 rounded-full bg-gradient-to-b from-white to-white py-3 shadow-xl hover:opacity-75 px-3 sm:px-5 md:px-14 md:py-5 md:text-xl relatvie z-20">
      <Google className="h-4 w-4 md:h-6 md:w-6" />
      <p className="text-sm text-greenText opacity-85">
        Log in with Google
      </p>
    </button>
  )
}

export default GoogleOAuthButton
