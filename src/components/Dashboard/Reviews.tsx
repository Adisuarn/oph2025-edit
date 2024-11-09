import Image from 'next/image'
import React, { useState } from 'react'

import ReviewEditor from './ReviewEditor'

const Reviews = ({ reviewData, setFieldValue }: any) => {
  const [imageLoaded, setImageLoaded] = useState<{ [key: number]: boolean }>({}) // Track each image's loading state

  // Handle image load for each review
  const handleImageLoad = (index: number) => {
    setImageLoaded((prevState) => ({ ...prevState, [index]: true }))
  }

  return (
    <div className="mb-20 mt-16 flex flex-col items-center">
      <p className="text-6xl font-semibold text-[#0C453E]">รีวิวจากรุ่นพี่</p>
      {reviewData.map((review: any, index: number) =>
        review.count % 2 === 0 ? (
          <div key={index} className="mx-44 mt-28 flex w-[100%] justify-center">
            <div className="flex w-4/5 justify-evenly">
              <div className="min-h-[300px] min-w-[531.1px] max-w-[531.1px] overflow-hidden rounded-3xl border">
                <ReviewEditor
                  content={review.content}
                  index={index}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="flex flex-col items-end">
                {/* Profile Image with fade-in */}
                <div className="mb-5 h-[150px] w-[150px] overflow-hidden rounded-2xl relative">
                  <div
                    className={`transition-opacity duration-500 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image
                      src={review.profile}
                      alt="Profile Image"
                      width={150}
                      height={150}
                      onLoadingComplete={() => handleImageLoad(index)}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Loading Spinner */}
                  {!imageLoaded[index] && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <p className="font-bold">{review.nick}</p>
                <p>เตรียมอุดม {review.gen}</p>
                <p>{review.contact}</p>
              </div>
            </div>
          </div>
        ) : (
          <div key={index} className="mx-44 mt-28 flex w-[100%] justify-center">
            <div className="flex w-4/5 justify-evenly">
              <div>
                {/* Profile Image with fade-in */}
                <div className="mb-5 h-[150px] w-[150px] overflow-hidden rounded-2xl relative">
                  <div
                    className={`transition-opacity duration-500 ${imageLoaded[index] ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <Image
                      src={review.profile}
                      alt="Profile Image"
                      width={150}
                      height={150}
                      onLoadingComplete={() => handleImageLoad(index)}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  {/* Loading Spinner */}
                  {!imageLoaded[index] && (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-8 h-8 border-4 border-t-4 border-green-500 border-solid rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>
                <p className="font-bold">{review.nick}</p>
                <p>เตรียมอุดม {review.gen}</p>
                <p>{review.contact}</p>
              </div>
              <div className="min-h-[300px] min-w-[531.1px] max-w-[531.1px] overflow-hidden rounded-3xl border">
                <ReviewEditor
                  content={review.content}
                  index={index}
                  setFieldValue={setFieldValue}
                />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  )
}

export default Reviews
