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
    className='underline mt-5 bg-pink-300 py-4 px-6 rounded-full text-xl'>
        Sign in with Google
    </button>
  )
}

export default GoogleOAuthButton
