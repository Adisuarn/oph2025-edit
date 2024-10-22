'use client'
import React from 'react'
import { client } from '@libs/api'

const LogoutButton = () => {
  return (
    <button onClick={
      async () => {
        const { data } = await client.auth.logout.get()
        if(data.success){
          window.location.href = '/'
        }
      }
    }
    className='underline text-neutral-500 text-xs'>
      Logout
    </button>
  )
}

export default LogoutButton
