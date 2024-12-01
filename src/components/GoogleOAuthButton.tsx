'use client'

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { env } from '@/env'
import Google from '@/vectors/landing/Google'

const GoogleOAuthButton = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  const handleLoginClick = async () => {
    setLoading(true) 

    const options = {
      method: 'GET',
      url: `${env.NEXT_PUBLIC_BASE_URL}/auth/login`,
      headers: {
        'x-api-key': env.NEXT_PUBLIC_API_KEY,
      },
    }

    await toast.promise(axios.request(options), {
      loading: 'กำลังเข้าสู่ระบบ...',
      success: (data) => {
        const url = data.data.url
        if (url) {
          router.push(url)
        }
        return 'เข้าสู่ระบบสำเร็จ!'
      },
      error: 'ไม่สามารถเข้าสู่ระบบได้ กรุณาติดต่อผู้ดูแล',
    })

    setLoading(false)
  }

  return (
    <button
      onClick={handleLoginClick}
      disabled={loading}
      className={`to-72% relatvie z-20 flex items-center justify-center space-x-3 rounded-full bg-gradient-to-b from-white to-white px-3 py-3 shadow-xl hover:opacity-75 sm:px-5 md:px-14 md:py-5 md:text-xl ${
        loading ? 'cursor-not-allowed opacity-50' : ''
      }`}
    >
      <Google className="h-4 w-4 md:h-6 md:w-6" />
      <p className="text-sm text-greenText opacity-85">
        {loading ? 'Loading...' : 'Log in with Google'}
      </p>
    </button>
  )
}

export default GoogleOAuthButton
