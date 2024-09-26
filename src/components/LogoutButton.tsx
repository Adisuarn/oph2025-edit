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
    className='mt-5 bg-red-500 text-white py-2 px-3 rounded-full block hover:bg-red-400'>
      Logout
    </button>
  )
}

export default LogoutButton
