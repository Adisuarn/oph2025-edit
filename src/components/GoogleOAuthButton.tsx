'use client'
import { elysia } from '@libs/api'
import React from 'react'

const GoogleOAuthButton = () => {
  return (
    <button onClick={
        async () => {
            const {data, error} = await elysia.auth.login.get()
            const url = data.url
            if(url){
                window.location.href = url
            } else {
                console.error(error)
            }
        }
    } 
    className='underline mt-5 transition duration-0 ease-out bg-gradient-to-tr from-pink-300 to-pink-400 py-4 px-6 rounded-full text-xl shadow-lg hover:transition-all hover:from-pink-400 hover:to-pink-300 hover:duration-500'>
        Sign in with Google
    </button>
  )
}

export default GoogleOAuthButton
