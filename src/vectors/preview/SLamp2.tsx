import React, { FC } from "react";

const SLamp2: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="168"
      height="143"
      className={`${className}`}
      viewBox="0 0 168 143"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M56.5371 22.2822V58.6881"
        stroke="url(#paint0_linear_153_1695)"
        strokeWidth="3"
      />
      <ellipse
        cx="56.5"
        cy="62.5"
        rx="4.5"
        ry="5.5"
        fill="url(#paint1_radial_153_1695)"
      />
      <rect
        width="21"
        height="86"
        transform="matrix(-1 0 0 1 124 30.96)"
        fill="url(#paint2_linear_153_1695)"
      />
      <g filter="url(#filter0_d_153_1695)">
        <path
          d="M144.55 110.939C131.054 103.12 95.4754 103.961 81.98 110.938C72.9619 115.601 69.97 121.823 68.9774 125.439C68.5388 127.037 69.8278 128.387 71.4846 128.387H155.045C156.702 128.387 157.978 127.032 157.499 125.445C156.455 121.989 153.412 116.073 144.55 110.939Z"
          fill="url(#paint3_linear_153_1695)"
        />
      </g>
      <path
        d="M124.195 29.1601C123.04 26.7098 120.574 25.1465 117.864 25.1465H52.367C49.8053 25.1465 47.4482 26.5458 46.2216 28.7948L5.64575 103.192C3.10168 107.857 6.47791 113.544 11.7912 113.544H82H152.958C158.092 113.544 161.48 108.2 159.289 103.557L124.195 29.1601Z"
        fill="url(#paint4_radial_153_1695)"
        fillOpacity="0.75"
      />
      <path
        d="M135.488 2.65961C134.161 0.97984 132.137 0 129.996 0H39.9737C37.8568 0 35.8537 0.957939 34.5248 2.60573L18.4818 22.4991C14.7891 27.0779 18.0483 33.8933 23.9307 33.8933H145.718C151.569 33.8933 154.838 27.1428 151.21 22.553L135.488 2.65961Z"
        fill="url(#paint5_linear_153_1695)"
      />
      <defs>
        <filter
          id="filter0_d_153_1695"
          x="58.8906"
          y="99.3857"
          width="108.71"
          height="43.001"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="4" />
          <feGaussianBlur stdDeviation="5" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_153_1695"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_153_1695"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_153_1695"
          x1="35.7539"
          y1="45.6822"
          x2="87.855"
          y2="64.2815"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.0490119" stopColor="#F4F15B" />
          <stop offset="0.343421" stopColor="#F77E33" />
          <stop offset="1" stopColor="#590101" />
        </linearGradient>
        <radialGradient
          id="paint1_radial_153_1695"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(52.8173 60.8658) rotate(75.4793) scale(13.8682 12.403)"
        >
          <stop stopColor="#F4F15B" />
          <stop offset="0.464235" stopColor="#F77E33" />
          <stop offset="1" stopColor="#590101" />
        </radialGradient>
        <linearGradient
          id="paint2_linear_153_1695"
          x1="10.6049"
          y1="-30.1112"
          x2="10.4198"
          y2="68.5674"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD77" />
          <stop offset="1" stopColor="#0C453E" />
        </linearGradient>
        <linearGradient
          id="paint3_linear_153_1695"
          x1="113.265"
          y1="128.387"
          x2="113.707"
          y2="95.6653"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.095" stopColor="#0C453E" />
          <stop offset="1" stopColor="#FFDD77" />
        </linearGradient>
        <radialGradient
          id="paint4_radial_153_1695"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(83.7446 31.5436) rotate(90) scale(82 182.342)"
        >
          <stop stopColor="#FFDD77" />
          <stop offset="0.46" stopColor="#F5EEBF" stopOpacity="0.5" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint5_linear_153_1695"
          x1="92.9328"
          y1="-31.16"
          x2="92.4995"
          y2="44"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#F4F15B" />
          <stop offset="0.634965" stopColor="#15786C" />
          <stop offset="0.795365" stopColor="#0C453E" />
          <stop offset="0.943045" stopColor="#E2DD94" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SLamp2;
