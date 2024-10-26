import React, { FC } from "react";

const Profile: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="129"
      height="148"
      className={`${className}`}
      viewBox="0 0 129 148"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_i_193_696)">
        <path
          d="M89.6875 87.7894C81.4795 87.7894 77.5328 92.371 64.0625 92.371C50.5922 92.371 46.6741 87.7894 38.4375 87.7894C17.2168 87.7894 0 105.028 0 126.275V133.605C0 141.194 6.14886 147.35 13.7277 147.35H114.397C121.976 147.35 128.125 141.194 128.125 133.605V126.275C128.125 105.028 110.908 87.7894 89.6875 87.7894ZM114.397 133.605H13.7277V126.275C13.7277 112.645 24.8242 101.534 38.4375 101.534C42.613 101.534 49.391 106.116 64.0625 106.116C78.8484 106.116 85.4834 101.534 89.6875 101.534C103.301 101.534 114.397 112.645 114.397 126.275V133.605ZM64.0625 83.2078C86.799 83.2078 105.246 64.7383 105.246 41.9735C105.246 19.2088 86.799 0.739258 64.0625 0.739258C41.326 0.739258 22.8795 19.2088 22.8795 41.9735C22.8795 64.7383 41.326 83.2078 64.0625 83.2078ZM64.0625 14.484C79.1915 14.484 91.5179 26.8257 91.5179 41.9735C91.5179 57.1214 79.1915 69.4631 64.0625 69.4631C48.9335 69.4631 36.6071 57.1214 36.6071 41.9735C36.6071 26.8257 48.9335 14.484 64.0625 14.484Z"
          fill="url(#paint0_linear_193_696)"
        />
      </g>
      <defs>
        <filter
          id="filter0_i_193_696"
          x="0"
          y="0.739258"
          width="128.125"
          height="150.61"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="BackgroundImageFix"
            result="shape"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="shape"
            result="effect1_innerShadow_193_696"
          />
        </filter>
        <linearGradient
          id="paint0_linear_193_696"
          x1="64.0625"
          y1="0.739258"
          x2="64.0625"
          y2="147.35"
          gradientUnits="userSpaceOnUse"
        >
          <stop stop-color="#15786C" />
          <stop offset="1" stop-color="#0C453E" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Profile;
