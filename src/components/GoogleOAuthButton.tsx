'use client'
import React from 'react'
import Google from '@/vectors/landing/Google'
import axios from 'axios'
const GoogleOAuthButton = () => {
    const handleLoginClick = async () => {
        try {
            const options = {
                method: "GET",
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                headers: {
                    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
                },
            }
            const data = await axios.request(options)
            const url = data.data.url
            if (url && typeof window !== "undefined") {
                window.location.href = url
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className='flex justify-center items-center bg-gradient-to-b from-white to-white to-72% rounded-full shadow-xl sm:px-5 md:px-14 md:py-5 md:text-xl py-3 space-x-3 hover:opacity-75'>
            <Google className='h-4 w-4 md:h-6 md:w-6' />
            <button onClick={handleLoginClick} className='text-sm text-greenText opacity-85'>
                Log in with Google
            </button>
        </div>
    )
}

export default GoogleOAuthButton
