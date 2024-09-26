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
    className='underline mt-5 py-4 px-6 rounded-full text-xl shadow-lg transition-all duration-500 bg-gradient-to-tl to-pink-400 via-pink-300 from-pink-500 bg-size-200 bg-pos-0 hover:bg-pos-100'>
        Sign in with Google
    </button>
  )
}

export default GoogleOAuthButton
