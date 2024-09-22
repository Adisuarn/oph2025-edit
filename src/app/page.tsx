import React from 'react'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'
import { getUser } from '@middlewares/derive'
import { redirect } from 'next/navigation'

const page = async () => {
  const user = await getUser()
  /// Check if user is authenticated then redirect to dashboard
  if(user.success) {
    redirect('/dashboard')
  }
  return (
    <div>
      <p>HomePage</p>
      <GoogleOAuthButton />
    </div>
  )
}

export default page
