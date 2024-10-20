import React, { FC } from "react";

const Hamburger: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg width="45" height="45" viewBox="0 0 45 45" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 11.25H37.5M7.5 22.5H37.5M7.5 33.75H37.5" stroke="#111827" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  )
}

export default Hamburger
