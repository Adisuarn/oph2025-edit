import React, { FC } from "react";

const Footer: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="1208"
      height="112"
      viewBox="0 0 1208 112"
      className={`${className}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        y="0.947266"
        width="1208"
        height="111.053"
        fill="url(#paint0_radial_190_1920)"
      />
      <defs>
        <radialGradient
          id="paint0_radial_190_1920"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(604.826 330.791) rotate(-90) scale(1065.78 1062.58)"
        >
          <stop offset="0.13482" stop-color="#0C453E" />
          <stop offset="0.553725" stop-color="#1B9A8A" />
          <stop offset="0.870278" stop-color="#F4F15B" />
        </radialGradient>
      </defs>
    </svg>
  );
};

export default Footer;
