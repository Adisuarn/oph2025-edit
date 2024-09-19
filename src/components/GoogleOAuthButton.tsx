'use client'
import { elysia } from '../lib/api'
import React from 'react'

const GoogleOAuthButton = () => {
  return (
    <button onClick={
        async () => {
            const res = await elysia.auth.google.get()
            const url = res.data.url
            if(url){
                window.location.href = url
            } else {
                console.error('Error')
            }
        }
    }>
        Sign in with Google
    </button>
  )
}


export default GoogleOAuthButton
