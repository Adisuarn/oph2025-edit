import React, { FC } from "react";

const NiceStuff: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="283"
      height="83"
      className={`${className}`}
      viewBox="0 0 283 83"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M132.329 43.9969C132.329 43.9969 114.898 44.375 98.3314 44.3751C81.7648 44.3751 71.8248 54.0089 71.8248 62.6486C71.8248 83.793 104.456 86.9305 102.639 65.9714C101.677 54.8808 83.8219 55.6326 86.4034 66.6359"
        stroke="url(#paint0_linear_472_286)"
        strokeWidth="5.29407"
        strokeLinecap="round"
      />
      <path
        d="M280.165 43.5098C280.165 43.5098 52.16 43.9935 33.2524 43.9935C14.3448 43.9935 3.00027 33.0303 3.00027 23.1984C3.00027 -0.882905 40.2424 -4.43355 38.1684 19.4172C37.0706 32.0411 16.6915 31.1874 19.639 18.6609"
        stroke="url(#paint1_linear_472_286)"
        strokeWidth="5.29407"
        strokeLinecap="round"
      />
      <defs>
        <linearGradient
          id="paint0_linear_472_286"
          x1="214.358"
          y1="62.0927"
          x2="21.4125"
          y2="62.0927"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.350142" stopColor="#ECF5C8" />
          <stop offset="1" stopColor="#ADDB64" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_472_286"
          x1="601.722"
          y1="23.7983"
          x2="-108.2"
          y2="23.7983"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.356197" stopColor="#ECF5C8" />
          <stop offset="1" stopColor="#ADDB64" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default NiceStuff;
