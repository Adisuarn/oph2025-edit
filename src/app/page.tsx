import React from 'react'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'
import { client } from '@/libs/api'
import apiFunction from '@/components/api'

const page = async () => {
  const clubRes = await apiFunction('GET', '/clubs/ก30927-1', {});
  return (
    <main className='flex justify-center items-center w-full text-center bg-gradient-to-b from-cyan-500 to-blue-500 py-9 text-white font-roboto h-screen'>
      <div className='border rounded-md p-5'>
        <h1 className='text-4xl font-bold mt-3'>Welcome to TU OPH2025</h1>
        <h1 className='text-4xl font-bold mt-3'>Information editing site !</h1>
        <p className='text-lg mt-3'>Please sign in to continue</p>
        <GoogleOAuthButton />
      </div>
    </main>
  )
}

export default page
