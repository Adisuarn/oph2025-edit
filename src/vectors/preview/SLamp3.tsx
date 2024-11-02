import React, { FC } from "react";

const SLamp3: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="136"
      height="161"
      className={`${className}`}
      viewBox="0 0 136 161"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        x="54.499"
        y="58.3438"
        width="22.895"
        height="70.5935"
        fill="url(#paint0_linear_153_1732)"
      />
      <g filter="url(#filter0_d_153_1732)">
        <path
          d="M40.7648 124.17C51.8333 117.757 81.014 118.447 92.0825 124.169C99.2669 127.884 101.788 132.806 102.673 135.803C103.1 137.249 101.929 138.481 100.421 138.481H32.4263C30.9186 138.481 29.7591 137.249 30.2235 135.814C31.1507 132.95 33.7085 128.258 40.7648 124.17Z"
          fill="url(#paint1_linear_153_1732)"
        />
      </g>
      <path
        d="M33.0771 69.629C34.1289 67.3992 36.3729 65.9766 38.8383 65.9766H91.7854C94.1166 65.9766 96.2616 67.25 97.3777 69.2966L129.971 129.058C132.286 133.303 129.214 138.478 124.379 138.478H67.8546H10.6485C5.97668 138.478 2.89416 133.616 4.88728 129.39L33.0771 69.629Z"
        fill="url(#paint2_radial_153_1732)"
        fillOpacity="0.7"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.649 82.0507C114.07 73.3404 119.864 61.4859 119.864 48.4233C119.864 21.6799 95.5752 0 65.6129 0C35.6506 0 11.3613 21.6799 11.3613 48.4233C11.3613 61.4859 17.1561 73.3404 26.5763 82.0507H104.649Z"
        fill="url(#paint3_radial_153_1732)"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M104.649 82.0507C114.07 73.3404 119.864 61.4859 119.864 48.4233C119.864 21.6799 95.5752 0 65.6129 0C35.6506 0 11.3613 21.6799 11.3613 48.4233C11.3613 61.4859 17.1561 73.3404 26.5763 82.0507H104.649Z"
        fill="url(#paint4_linear_153_1732)"
      />
      <defs>
        <filter
          id="filter0_d_153_1732"
          x="11.92"
          y="105.055"
          width="109.042"
          height="55.2654"
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
          <feOffset dy="3.64002" />
          <feGaussianBlur stdDeviation="9.10005" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_153_1732"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_153_1732"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_153_1732"
          x1="66.0609"
          y1="33.6268"
          x2="65.9465"
          y2="114.628"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#FFDD77" />
          <stop offset="1" stopColor="#0C453E" />
        </linearGradient>
        <linearGradient
          id="paint1_linear_153_1732"
          x1="66.4237"
          y1="138.481"
          x2="66.0612"
          y2="111.643"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.095" stopColor="#0C453E" />
          <stop offset="1" stopColor="#FFDD77" />
        </linearGradient>
        <radialGradient
          id="paint2_radial_153_1732"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(66.4237 71.2234) rotate(90) scale(67.2546 149.552)"
        >
          <stop offset="0.115" stopColor="#FFDD77" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="paint3_radial_153_1732"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(65.1645 27.5) rotate(90) scale(82.7976 92.7631)"
        >
          <stop stopColor="#F28041" />
          <stop offset="0.41" stopColor="#D9392B" />
          <stop offset="1" stopColor="#7E0001" />
        </radialGradient>
        <linearGradient
          id="paint4_linear_153_1732"
          x1="66.0005"
          y1="61.5"
          x2="66.0005"
          y2="112"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#D7D993" stopOpacity="0" />
          <stop offset="1" stopColor="#D7D993" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default SLamp3;
