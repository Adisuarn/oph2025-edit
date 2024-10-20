import React, { FC } from "react";

const UserIcon: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="41"
      height="41"
      viewBox="0 0 41 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M26.8864 11.8064C26.8864 15.5078 23.8858 18.5083 20.1845 18.5083C16.4831 18.5083 13.4826 15.5078 13.4826 11.8064C13.4826 8.10504 16.4831 5.10449 20.1845 5.10449C23.8858 5.10449 26.8864 8.10504 26.8864 11.8064Z"
        stroke="#111827"
        stroke-width="3.28652"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
      <path
        d="M20.1845 23.5348C13.7071 23.5348 8.45612 28.7857 8.45612 35.2631H31.9128C31.9128 28.7857 26.6619 23.5348 20.1845 23.5348Z"
        stroke="#111827"
        stroke-width="3.28652"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default UserIcon;
