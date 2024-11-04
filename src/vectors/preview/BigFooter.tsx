import React, { FC } from 'react'

const BigFooter: FC<{
  className?: string
}> = ({ className }) => {
  return (
    <svg
      width="1512"
      height="139"
      className={`${className}`}
      viewBox="0 0 1512 139"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="1512" height="139" fill="url(#paint0_radial_299_273)" />
      <defs>
        <radialGradient
          id="paint0_radial_299_273"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(757.034 412.851) rotate(-90) scale(1333.99 1329.98)"
        >
          <stop offset="0.13482" stopColor="#0C453E" />
          <stop offset="0.553725" stopColor="#1B9A8A" />
          <stop offset="0.870278" stopColor="#F4F15B" />
        </radialGradient>
      </defs>
    </svg>
  )
}

export default BigFooter
