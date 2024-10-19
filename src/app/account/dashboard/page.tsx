import React from 'react'
import apiFunction from '@components/api'

const DashboardTUCMC = async () => {
  const response = await apiFunction('GET', '/user', {})
  const user = response.data
  return (
    <div>Hello {user.name}</div>
  )
}

export default DashboardTUCMC
