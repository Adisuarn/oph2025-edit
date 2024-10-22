import React from 'react';
import Checkmark from '@/vectors/Checkmark';
import Rejected from '@/vectors/Rejected';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import Image from 'next/image';

const ViewData = ({ data, type }: any) => {
  return (
    <div className="mt-10 border border-black rounded-2xl overflow-hidden my-5">
      {/* Header */}
      <div className="flex justify-between bg-[#0C453E] p-5">
        <div className="flex items-center">
          <PeopleIcon className="mr-4" />
          <p className="text-white">{data.data.key} :
            {(() => {
              switch (type) {
                case 'organization':
                  return ' องค์กร';
                case 'club':
                  return ' ชมรม';
                default:
                  return '';
              }
            })()}{data.data.thainame}</p>
        </div>
        <div className="flex items-center">
          {/* Status Indicator */}
          {data.data.status === 'pending' && (
            <div className="flex items-center mr-3">
              <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-4"></p>
              <p className="text-[#FFA500]">อยู่ระหว่างการตรวจสอบ</p>
            </div>
          )}
          {/* Action Buttons */}
          <button>
            <Checkmark className="bg-[#19C57C] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
          </button>
          <button>
            <Rejected className="bg-[#F83E3E] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-5 flex flex-col items-center mt-10">
        <p className="font-bold text-3xl">
          {(() => {
            switch (type) {
              case 'organization':
                return 'องค์กร';
              case 'club':
                return 'ชมรม';
              default:
                return '';
            }
          })
            ()}
          {data.data.thainame}</p>
        <p>{data.data.name}</p>
        <p>ชมรม {data.data.members} คน</p>
        <div className="mt-6">
          <p>IG: {data.data.ig}</p>
          <p>FB: {data.data.fb}</p>
          <p>อื่น ๆ: {data.data.others}</p>
        </div>
        {/* Conditional Content Based on Type */}
        <div className="mt-24 mx-44 flex flex-col content-center justif-between border">
          <div>
            {/* Content Section 1*/}
            <div className="flex border justify-between">
              <div>
                {(() => {
                  switch (type) {
                    case 'organization':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">องค์กร</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                        </>
                      );
                    case 'club':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">ชมรมนี้</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">ทำอะไร</p>
                        </>
                      );
                    case 'program':
                      return (
                        <>
                          <p className="text-4xl font-semibold text-[#0C453E]">การรับสมัคร</p>
                          <p className="text-6xl font-semibold text-[#0C453E]">และ</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">การสอบเข้า</p>
                        </>
                      )
                    case 'gifted':
                      return (
                        <>
                          <p className="text-4xl font-semibold text-[#0C453E]">การรับสมัคร</p>
                          <p className="text-6xl font-semibold text-[#0C453E]">และ</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">การสอบเข้า</p>
                        </>
                      )
                    case 'default':
                      return ''
                  }
                })()}
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden ml-14">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg1}</p>
              </div>
            </div>
            <p className="mt-6">{data.data.activitie}</p>
            {/* Content Section 2*/}
            <div className="flex border justify-between mt-24">
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden mr-14">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg2}</p>
              </div>
              <div>
                {(() => {
                  switch (type) {
                    case 'organization':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">ตำแหน่ง</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">/หน้าที่</p>
                        </>
                      );
                    case 'club':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">ประโยชน์</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">ที่ได้รับ</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">จากการเข้าชมรม</p>
                        </>
                      );
                    case 'program':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">วิชา /</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">หลักสูตรเพิ่มเติม</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">ที่เรียน</p>
                        </>
                      )
                    case 'gifted':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">วิชา /</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">หลักสูตรเพิ่มเติม</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">ที่เรียน</p>
                        </>
                      )
                    case 'default':
                      return ''
                  }
                })()}
              </div>
            </div>
            <p className="mt-6">{data.data.benefits}</p>
            {/* Content Section 3*/}
            <div className="flex border justify-between mt-24">
              <div>
                {(() => {
                  switch (type) {
                    case 'organization':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">ผลงาน</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">ขององค์กร</p>
                        </>
                      );
                    case 'club':
                      return (
                        <>
                          <p className="text-6xl font-semibold text-[#0C453E]">ผลงาน</p>
                          <p className="text-4xl font-semibold text-[#0C453E]">ของชมรม</p>
                        </>
                      );
                    case 'program':
                      return (
                        <>
                          <p className="text-4xl font-semibold text-[#0C453E]">ความน่าสนใจ</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">ของสายการเรียน</p>
                        </>
                      )
                    case 'gifted':
                      return (
                        <>
                          <p className="text-4xl font-semibold text-[#0C453E]">ความน่าสนใจ</p>
                          <p className="text-2xl font-semibold text-[#0C453E]">ของสายการเรียน</p>
                        </>
                      )
                    case 'default':
                      return ''
                  }
                })()}
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden ml-14">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg3}</p>
              </div>
            </div>
            <p className="mt-6">{data.data.working}</p>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="flex flex-col items-center mt-16">
        <p className="font-semibold text-6xl text-[#0C453E]">รีวิวจากรุ่นพี่</p>
        {/* Example Review 1 */}
        <div className="mx-44 mt-28 flex">
          <div className="flex justify-between">
            <div>
              <div className="rounded-2xl overflow-hidden mb-5">
                <Image src="https://placehold.co/150" alt="Image" width={150} height={150} />
              </div>
              <p className="font-bold">ชื่อ</p>
              <p>เตรียมอุดม</p>
              <p>ช่องทางการติดตาม</p>
            </div>
            <div className="p-5 border rounded-3xl w-2/3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium a voluptates commodi quos, maxime iure quasi ipsum, aperiam nostrum voluptas minus facilis dolorum illo ad minima quibusdam consectetur hic earum nobis. Illo beatae ab omnis earum magnam.
              </p>
            </div>
          </div>
        </div>
        {/* Example Review 2 */}
        <div className="mx-44 mt-28 flex">
          <div className="flex justify-between">
            <div className="p-5 border rounded-3xl w-2/3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium a voluptates commodi quos, maxime iure quasi ipsum, aperiam nostrum voluptas minus facilis dolorum illo ad minima quibusdam consectetur hic earum nobis. Illo beatae ab omnis earum magnam.
              </p>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden mb-5">
                <Image src="https://placehold.co/150" alt="Image" width={150} height={150} />
              </div>
              <p className="font-bold">ชื่อ</p>
              <p>เตรียมอุดม</p>
              <p>ช่องทางการติดตาม</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewData;
