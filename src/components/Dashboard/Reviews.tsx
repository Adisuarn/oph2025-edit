import React from 'react'
import Image from 'next/image'

const Reviews = ({ data } : any) => {
  const reviewData = data.data.reviews.data // Array of reviews
  return (
    <div className="flex flex-col items-center mt-16 mb-20">
      <p className="font-semibold text-6xl text-[#0C453E]">รีวิวจากรุ่นพี่</p>
      {reviewData.map((review: any) => (
        review.count % 2 === 0 ? (
          <div key={review.id} className="mx-44 mt-28 flex">
            <div className="flex justify-between">
              <div className="p-8 border rounded-3xl w-2/3">
                <p>{review.content}</p>
              </div>
              <div className="flex flex-col items-end">
                <div className="rounded-2xl overflow-hidden mb-5 w-[150px] h-[150px]">
                  <Image src={review.profile} alt="Image" width={150} height={150} />
                </div>
                <p className="font-bold">{review.nick}</p>
                <p>เตรียมอุดม {review.gen}</p>
                <p>{review.contact}</p>
              </div>
            </div>
          </div>
        ) : (
          <div key={review.id} className="mx-44 mt-28 flex">
            <div className="flex justify-between">
              <div>
                <div className="rounded-2xl overflow-hidden mb-5 w-[150px] h-[150px]">
                  <Image src={review.profile} alt="Image" width={150} height={150} />
                </div>
                <p className="font-bold">{review.nick}</p>
                <p>เตรียมอุดม {review.gen}</p>
                <p>{review.contact}</p>
              </div>
              <div className="p-8 border rounded-3xl w-2/3">
                <p>{review.content}</p>
              </div>
            </div>
          </div>
        )
      ))}
    </div>
  )
}

export default Reviews
