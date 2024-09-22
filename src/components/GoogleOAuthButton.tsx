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
    }>
        Sign in with Google
    </button>
  )
}


export default GoogleOAuthButton
