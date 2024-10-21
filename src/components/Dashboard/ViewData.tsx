import React from 'react';
import Checkmark from '@/vectors/Checkmark';
import Rejected from '@/vectors/Rejected';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import Image from 'next/image';

const ViewData = ({ data }: any) => {
  return (
    <div className="mt-10 border border-black rounded-2xl overflow-hidden my-5">
      <div className="flex justify-between bg-[#0C453E] p-5">
        <div className="flex items-center">
          <PeopleIcon className=" mr-4" />
          <p className="text-white">{data.data.key} : ชมรม{data.data.thainame}</p>
        </div>
        <div className="flex items-center">
          <div>
            {(() => {
              switch (data.data.status) {
                case 'pending':
                  return (
                    <div className="flex items-center mr-3">
                      <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-4"></p>
                      <p className="text-[#FFA500]">อยู่ระหว่างการตรวจสอบ</p>
                    </div>
                  );
              }
            })()}
          </div>
          <button>
            <Checkmark className="bg-[#19C57C] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
          </button>
          <button>
            <Rejected className="bg-[#F83E3E] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
          </button>
        </div>
      </div>
      <div className="p-5 flex flex-col items-center mt-10">
        <div className="flex flex-col items-center">
          <p className="font-bold text-3xl">ชมรม{data.data.thainame}</p>
          <p>{data.data.name}</p>
          <p>ชมรม {data.data.members} คน</p>
          <div className="mt-6">
            <p>IG: {data.data.ig}</p>
            <p>FB: {data.data.fb}</p>
            <p>อื่น ๆ: {data.data.others}</p>
          </div>
        </div>
        <div className="mt-24 mx-44">
          <div>
            <div className="flex justify-between">
              <div>
                <p className="text-6xl font-semibold text-[#0C453E]">ชมรมนี้</p>
                <p className="text-6xl font-semibold text-[#0C453E]">ทำอะไร</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg1}</p>
              </div>
            </div>
          </div>
          <p className="mt-6">{data.data.activities}</p>
        </div>
        <div className="mt-24 mx-44">
          <div>
            <div className="flex justify-between">
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg2}</p>
              </div>
              <div>
                <p className="text-6xl font-semibold text-[#0C453E]">ประโยชน์</p>
                <p className="text-4xl font-semibold text-[#0C453E]">ที่ได้รับ</p>
                <p className="text-2xl font-semibold text-[#0C453E]">จากการเข้าชมรม</p>
              </div>
            </div>
          </div>
          <p className="mt-6">{data.data.benefits}</p>
        </div>
        <div className="mt-24 mx-44">
          <div>
            <div className="flex justify-between">
              <div>
                <p className="text-6xl font-semibold text-[#0C453E]">ผลงาน</p>
                <p className="text-4xl font-semibold text-[#0C453E]">ของชมรม</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="rounded-2xl overflow-hidden">
                  <Image src="https://placehold.co/300x200" alt="Image" width={500} height={500} />
                </div>
                <p className="mt-3">{data.data.descimg3}</p>
              </div>
            </div>
          </div>
          <p className="mt-6">{data.data.working}</p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-16">
        <p className="font-semibold text-6xl text-[#0C453E]">รีวิวจากรุ่นพี่</p>
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium a voluptates commodi quos, maxime iure quasi ipsum, aperiam nostrum voluptas minus facilis dolorum illo ad minima quibusdam consectetur hic earum nobis. Illo beatae ab omnis earum magnam. Ipsa, similique omnis quia natus, quisquam debitis illo culpa atque assumenda illum quod alias, repellendus eaque. Commodi dignissimos incidunt, obcaecati beatae qui perferendis at velit quam est, voluptatem, fugit vero laboriosam earum omnis nihil. Ipsa provident sequi veritatis fugit, mollitia esse! Pariatur ad ea officia, similique nulla eligendi provident ipsam. Quidem earum reiciendis aut eligendi, asperiores placeat ipsum velit, tempore, ad inventore ab.
              </p>
            </div>
          </div>
        </div>
        <div className="mx-44 mt-28 flex">
          <div className="flex justify-between">
            <div className="p-5 border rounded-3xl w-2/3">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium a voluptates commodi quos, maxime iure quasi ipsum, aperiam nostrum voluptas minus facilis dolorum illo ad minima quibusdam consectetur hic earum nobis. Illo beatae ab omnis earum magnam. Ipsa, similique omnis quia natus, quisquam debitis illo culpa atque assumenda illum quod alias, repellendus eaque. Commodi dignissimos incidunt, obcaecati beatae qui perferendis at velit quam est, voluptatem, fugit vero laboriosam earum omnis nihil. Ipsa provident sequi veritatis fugit, mollitia esse! Pariatur ad ea officia, similique nulla eligendi provident ipsam. Quidem earum reiciendis aut eligendi, asperiores placeat ipsum velit, tempore, ad inventore ab.
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium a voluptates commodi quos, maxime iure quasi ipsum, aperiam nostrum voluptas minus facilis dolorum illo ad minima quibusdam consectetur hic earum nobis. Illo beatae ab omnis earum magnam. Ipsa, similique omnis quia natus, quisquam debitis illo culpa atque assumenda illum quod alias, repellendus eaque. Commodi dignissimos incidunt, obcaecati beatae qui perferendis at velit quam est, voluptatem, fugit vero laboriosam earum omnis nihil. Ipsa provident sequi veritatis fugit, mollitia esse! Pariatur ad ea officia, similique nulla eligendi provident ipsam. Quidem earum reiciendis aut eligendi, asperiores placeat ipsum velit, tempore, ad inventore ab.
              </p>
            </div>
          </div>
        </div>
        <div className="flex content-center my-16">
        </div>
      </div>
    </div>
  );
};

export default ViewData;
