import React, { FC } from "react";

const BackArrow: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="37"
      height="37"
      className={`${className}`}
      viewBox="0 0 37 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.334 1.00005C8.76075 1.00005 1.00007 8.73657 1.00007 18.2801C1.00007 27.8235 8.76074 35.5601 18.334 35.5601C27.9073 35.5601 35.668 27.8235 35.668 18.2801C35.668 8.73657 27.9073 1.00005 18.334 1.00005Z"
        stroke="#0C453E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M9.66703 18.2809L27.001 18.2809M9.66703 18.2809L16.6006 25.1929M9.66703 18.2809L16.6006 11.3689"
        stroke="#0C453E"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default BackArrow;
