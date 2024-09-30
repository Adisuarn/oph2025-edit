import React from 'react'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'

export default async function page (){
  return (
    <section className='flex justify-center items-center w-full text-center bg-gradient-to-b from-cyan-500 to-blue-500 py-9 text-white font-roboto h-screen'>
      <div className='border rounded-md p-5'>
        <h1 className='text-4xl font-bold mt-3'>Welcome to TU OPH2025</h1>
        <h1 className='text-4xl font-bold mt-3'>Club's information editing site !</h1>
        <p className='text-lg mt-3'>Please sign in to continue</p>
        <GoogleOAuthButton />
      </div>
    </section>
  )
}

