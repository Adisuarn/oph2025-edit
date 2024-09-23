import React from 'react'
import GoogleOAuthButton from '@/components/GoogleOAuthButton'
import { checkUserAndRedirect } from '@/libs/utils'

const page = async () => {
  await checkUserAndRedirect('/account')
  return (
    <div>
      <p>Login Page</p>
      <GoogleOAuthButton />
    </div>
  )
}

export default page
