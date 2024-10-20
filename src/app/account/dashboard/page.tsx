import React from 'react';
import apiFunction from '@components/api';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon';
import HamburgerMenu from '@/components/Dashboard/Hamburger';

const DashboardTUCMC = async () => {
  const user = await apiFunction('GET', '/user', {});
  const data = await apiFunction('GET', '/tucmc/data', {});
  const organizations = data.data.data.organizations;

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="max-w-6xl w-full">
        <div className="mb-16">
          <p className="text-center text-2xl font-bold font-Thai">ตรวจสอบข้อมูลหน่วยงานบนเว็บไซต์</p>
        </div>
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-3"></p>
            <p className="font-Thai text-lg">หน่วยงานที่มีสถานะรอการตรวจสอบ</p>
          </div>
          <div className="flex items-center">
            <HamburgerMenu />
          </div>
        </div>
        <hr className="my-7" />
        <div>
          <ul>
            <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
              <div className="flex items-center">
                <PeopleIcon className="mr-2" />
                <span className="font-Thai font-medium text-lg ml-4">XXXXXX - ชมรมคอนท้อนจ้อกจ้อก</span>
              </div>
              <button className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75">
                ดูข้อมูลหน่วยงาน
              </button>
            </li>
            <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
              <div className="flex items-center">
                <BookIcon className="mr-2" />
                <span className="font-Thai font-medium text-lg ml-4">สายการเรียน วิทย์ - คณิต</span>
              </div>
              <button className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75">
                ดูข้อมูลหน่วยงาน
              </button>
            </li>
            {organizations
              .filter((organization: any) => organization.status === 'pending')
              .map((organization: any) => (
                <li key={organization.id} className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
                  <div className="flex items-center">
                    <PeopleIcon className="mr-2 w-6 h-6" />
                    <span className="font-Thai font-medium text-lg ml-4">{organization.thainame}</span>
                  </div>
                  <button className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75">
                    ดูข้อมูลหน่วยงาน
                  </button>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardTUCMC;
