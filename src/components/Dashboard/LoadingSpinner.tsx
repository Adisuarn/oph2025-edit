import React from 'react'

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="loader border-gray-200 animate-spin rounded-full border-4 border-t-4 border-t-[#FCB528]"></div>
    </div>
  )
}

export default LoadingSpinner
