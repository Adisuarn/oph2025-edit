import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import Checkmark from '@/vectors/Checkmark';
import Rejected from '@/vectors/Rejected';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import { Status } from '@utils/type';
import { Toaster, toast } from 'react-hot-toast';
import Header from '@components/Dashboard/Header';
import Passage1 from '@components/Dashboard/Passage1';
import Passage2 from '@components/Dashboard/Passage2';
import Passage3 from '@components/Dashboard/Passage3';
import Reviews from '@components/Dashboard/Reviews';

const MySwal = withReactContent(Swal);
const ViewData = ({ data, type, onStatusUpdate }: any) => {
  const dateString = data.data.updatedAt;
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  };

  let formattedDate = new Intl.DateTimeFormat('en-GB', options).format(date);
  formattedDate = formattedDate.replace(/am|pm/g, match => match.toUpperCase());

  const handleApproval = () => {
    MySwal.fire({
      title: 'อนุมัติข้อมูลนี้',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(onStatusUpdate(data, Status.APPROVED), {
          loading: 'กำลังอัพเดตสถานะ...',
          success: 'อัพเดตสถานะสำเร็จ',
          error: 'อัพเดตสถานะไม่สำเร็จ',
        });
      }
    });
  };

  const handleRejection = () => {
    MySwal.fire({
      title: 'ปฎิเสธข้อมูลนี้',
      text: "",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        toast.promise(onStatusUpdate(data, Status.REJECTED), {
          loading: 'กำลังอัพเดตสถานะ...',
          success: 'อัพเดตสถานะสำเร็จ',
          error: 'อัพเดตสถานะไม่สำเร็จ',
        });
      }
    });
  };

  return (
    <>
      <div className="mt-10 rounded-2xl overflow-hidden my-5 border">
        <Toaster position="top-center" />
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
            {(() => {
              switch (data.data.status) {
                case Status.PENDING:
                  return (
                    <div className="flex items-center mr-3">
                      <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-4"></p>
                      <p className="text-[#FFA500]">อยู่ระหว่างการตรวจสอบ</p>
                    </div>
                  );
                case Status.APPROVED:
                  return (
                    <div className="flex items-center mr-3">
                      <p className="w-4 h-4 bg-[#19C57C] rounded-full mr-4"></p>
                      <p className="text-[#19C57C]">อนุมัติ</p>
                    </div>
                  );
                case Status.REJECTED:
                  return (
                    <div className="flex items-center mr-3">
                      <p className="w-4 h-4 bg-[#F83E3E] rounded-full mr-4"></p>
                      <p className="text-[#F83E3E]">ไม่อนุมัติ</p>
                    </div>
                  );
                default:
                  return null;
              }
            })()}
            {/* Action Buttons */}
            <button onClick={handleApproval}>
              <Checkmark className="bg-[#19C57C] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
            </button>
            <button onClick={handleRejection}>
              <Rejected className="bg-[#F83E3E] rounded-md mr-4 transition-opacity duration-300 hover:opacity-75" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="pt-5 flex flex-col items-center mt-10">
          {/* Header Content Section */}
          <div className="text-[#2f2f2f]"> ข้อมูลอัปเดต {formattedDate}</div>
          <Header type={type} data={data} />
          {/* Conditional Content Based on Type */}
          <div className="mt-24 mx-44 flex flex-col content-center justif-between">
            <div>
              {/* Content Section 1*/}
              <Passage1 type={type} data={data} />
              {/* Content Section 2*/}
              <Passage2 type={type} data={data} />
              {/* Content Section 3*/}
              <Passage3 type={type} data={data} />
            </div>
          </div>
        </div>
        {/* Reviews Section */}
        <Reviews data={data} />
      </div>
    </>
  );
};

export default ViewData;
