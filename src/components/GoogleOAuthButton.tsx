'use client'
import { client } from '@libs/api'
import React from 'react'
import Google from '@/vectors/landing/Google'

const GoogleOAuthButton = () => {
  return (
    <div className='flex justify-center items-center bg-gradient-to-b from-white to-white to-72% rounded-full shadow-xl sm:px-5 md:px-14 md:py-5 md:text-xl py-3 space-x-3 hover:opacity-75'>
        <Google className='h-4 w-4 md:h-6 md:w-6'/>
        <button onClick={
        async () => {
            const {data, error} = await client.auth.login.get()
            const url = data.url
            if(url){
                if (typeof window !== "undefined") {
                    window.location.href = url
                }
            } else {
                console.error(error)
            }
        }
    }
    className='text-sm text-greenText opacity-85' 
>
        Log in with Google
    </button>
    </div>
  )
}

export default GoogleOAuthButton
