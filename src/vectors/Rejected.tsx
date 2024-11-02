import React, { FC } from "react";

const Rejected: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path d="M7.5 22.5L22.5 7.5M7.5 7.5L22.5 22.5" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default Rejected;
