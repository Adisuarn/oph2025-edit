'use client'
import React from 'react'
import { elysia } from '@libs/api'

const LogoutButton = () => {
  return (
    <button onClick={
      async () => {
        const { data } = await elysia.auth.logout.get()
        if(data.success){
          window.location.href = '/'
        }
      }
    }
    className='bg-red-500 text-white '>
      Logout
    </button>
  )
}

export default LogoutButton
