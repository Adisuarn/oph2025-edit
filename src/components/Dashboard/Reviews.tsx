import Image from 'next/image'
import React from 'react'

import ReviewEditor from './ReviewEditor'

const Reviews = ({ reviewData, setFieldValue }: any) => {
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
                <div className="mb-5 h-[150px] w-[150px] overflow-hidden rounded-2xl">
                  <Image src={review.profile} alt="Profile Image" width={150} height={150} />
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
                <div className="mb-5 h-[150px] w-[150px] overflow-hidden rounded-2xl">
                  <Image src={review.profile} alt="Profile Image" width={150} height={150} />
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
