import React from 'react'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'
import { client } from '@/libs/api'
import apiFunction from '@/components/api'
import Brick from '@/vectors/landing/Brick'

const page = async () => {
  const clubRes = await apiFunction('GET', '/clubs/ก30927-1', {});
  return (
    <main className='h-screen relative'>
      <GoogleOAuthButton />
      <div className='absolute bottom-0 -z-10'>
        <Brick className='w-screen' />
      </div>
    </main>
  )
}

export default page
