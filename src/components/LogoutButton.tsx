'use client'
import React from 'react'
import axios from 'axios'

const LogoutButton = () => {
  const handleLogoutClick = async () => {
    try {
        const options = {
            method: "GET",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/logout`,
            headers: {
                "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
            },
        }
        const data = await axios.request(options)
        if (data.data.success) {
            window.location.href = '/'
        }
    } catch (error) {
        console.log(error)
    }
}
  return (
    <button onClick={handleLogoutClick} className='underline text-neutral-500 text-xs'>
      Logout
    </button>
  )
}

export default LogoutButton
