import React, { FC } from "react";

const DoubleQuoteUp: FC<{
  className?: string;
}> = ({ className }) => {
  return (
    <svg
      width="30"
      height="22"
      className={`${className}`}
      viewBox="0 0 30 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.78242 21.5794C6.5045 21.5794 5.41295 21.3398 4.50776 20.8606C3.65581 20.3813 2.96361 19.7158 2.43114 18.8638C1.89868 18.0651 1.49933 17.1067 1.2331 15.9885C0.966865 14.8171 0.833749 13.7255 0.833749 12.7138C0.833749 10.0515 1.49933 7.6288 2.83049 5.44569C4.2149 3.20934 6.31814 1.42558 9.14021 0.0944176L9.85903 1.53207C8.31488 2.17103 6.9571 3.18271 5.78567 4.56712C4.6675 5.95153 4.00192 7.36257 3.78893 8.80022C3.62919 9.81191 3.65581 10.7437 3.8688 11.5957C4.93373 10.5307 6.29152 9.99827 7.94216 9.99827C9.64605 9.99827 11.0571 10.5041 12.1753 11.5158C13.2934 12.5275 13.8525 13.9651 13.8525 15.8288C13.8525 17.5327 13.2668 18.9171 12.0954 19.982C10.924 21.0469 9.48631 21.5794 7.78242 21.5794ZM23.2772 21.5794C21.9992 21.5794 20.9077 21.3398 20.0025 20.8606C19.1505 20.3813 18.4583 19.7158 17.9259 18.8638C17.3934 18.0651 16.9941 17.1067 16.7278 15.9885C16.4616 14.8171 16.3285 13.7255 16.3285 12.7138C16.3285 10.0515 16.9941 7.6288 18.3252 5.44569C19.7096 3.20934 21.8129 1.42558 24.6349 0.0944176L25.3538 1.53207C23.8096 2.17103 22.4518 3.18271 21.2804 4.56712C20.1622 5.95153 19.4967 7.36257 19.2837 8.80022C19.1239 9.81191 19.1505 10.7437 19.3635 11.5957C20.4285 10.5307 21.7863 9.99827 23.4369 9.99827C25.1408 9.99827 26.5518 10.5041 27.67 11.5158C28.7882 12.5275 29.3473 13.9651 29.3473 15.8288C29.3473 17.5327 28.7615 18.9171 27.5901 19.982C26.4187 21.0469 24.981 21.5794 23.2772 21.5794Z"
        fill="white"
      />
    </svg>
  );
};

export default DoubleQuoteUp;