import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Status } from '@utils/type';
import { Toaster, toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import Header from '@components/Dashboard/Header';
import Passage1 from '@components/Dashboard/Passage1';
import Passage2 from '@components/Dashboard/Passage2';
import Passage3 from '@components/Dashboard/Passage3';
import Reviews from '@components/Dashboard/Reviews';
import Checkmark from '@/vectors/Checkmark';
import Rejected from '@/vectors/Rejected';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import { updateData } from './ViewData.action';

const MySwal = withReactContent(Swal);

const ViewData = ({ data, type, onStatusUpdate }: any) => {
  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  }).format(new Date(data.data.updatedAt)).replace(/am|pm/g, match => match.toUpperCase());

  const initialValues = {
    activities: data.data.activities || '',
    captureimg1: data.data.captureimg1 || '',
    descimg1: data.data.descimg1 || '',
    benefits: data.data.benefits || '',
    captureimg2: data.data.captureimg2 || '',
    descimg2: data.data.descimg2 || '',
    working: data.data.working || '',
    captureimg3: data.data.captureimg3 || '',
    descimg3: data.data.descimg3 || '',
    reviews: data.data.reviews.data.map((review: any) => ({
      count: review.count || 0,
      profile: review.profile || '',
      nick: review.nick || '',
      gen: review.gen || '',
      content: review.content || '',
      contact: review.contact || '',
    })),
  };

  const handleSubmit = async (values: any) => {
    try {
      MySwal.fire({
        title: 'ยืนยันการแก้ไขข้อมูล',
        text: 'เมื่อยืนยันแล้วจะไม่สามารถย้อนข้อมูลกลับได้',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          toast.promise(updateData(values ,data.data.tag, data.data.key).then(() => {
            if (typeof window !== "undefined") {
              window.location.reload();
            }
          }), {
            loading: 'กำลังอัพเดตสถานะ...',
            success: 'อัพเดตสถานะสำเร็จ',
            error: 'อัพเดตสถานะไม่สำเร็จ',
          });
        }
      })
    } catch (error) {
      toast.error('Failed to submit data');
    }
  };

  const handleStatusChange = (status: Status) => {
    const titles: { [key in Status]: string } = {
      [Status.APPROVED]: 'อนุมัติข้อมูลนี้',
      [Status.REJECTED]: 'ปฎิเสธข้อมูลนี้',
      [Status.PENDING]: '' // Add a placeholder for PENDING if necessary
    };

    MySwal.fire({
      title: titles[status],
      html: status === Status.REJECTED ? `
        <textarea id="rejection-message" placeholder="เหตุผลที่ปฎิเสธ" style="width:100%; height:100px; border: 1px solid black; border-radius: 20px; padding: 20px;"></textarea>
      ` : '',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        if (status === Status.REJECTED) {
          const messageElement = document.getElementById('rejection-message') as HTMLTextAreaElement;
          if (messageElement) {
            toast.promise(onStatusUpdate(data, status, messageElement.value), {
              loading: 'กำลังอัพเดตสถานะ...',
              success: 'อัพเดตสถานะสำเร็จ',
              error: 'อัพเดตสถานะไม่สำเร็จ',
            })
          }
        }
      }
    });
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="mt-10 rounded-2xl overflow-hidden my-5 border">
        <div className="flex justify-between bg-[#0C453E] p-5">
          <div className="flex items-center">
            <PeopleIcon className="mr-4" />
            <p className="text-white">{`${data.data.key} : ${type === 'organization' ? ' องค์กร' : type === 'club' ? ' ชมรม' : ''} ${data.data.thainame}`}</p>
          </div>
          <div className="flex items-center">
            <div className="flex items-center mr-3">
              <p className={`w-4 h-4 rounded-full mr-4 ${data.data.status === Status.PENDING ? 'bg-[#FCB528]' : data.data.status === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]'}`} />
              <p className={`${data.data.status === Status.PENDING ? 'text-[#FCB528]' : data.data.status === Status.APPROVED ? 'text-[#19C57C]' : 'text-[#F83E3E]'}`}>
                {data.data.status === Status.PENDING ? 'อยู่ระหว่างการตรวจสอบ' : data.data.status === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
              </p>
            </div>
            <button onClick={() => handleStatusChange(Status.APPROVED)} className="mr-4"><Checkmark className="bg-[#19C57C] rounded-md transition-all duration-300 hover:brightness-125 hover:scale-105" /></button>
            <button onClick={() => handleStatusChange(Status.REJECTED)} className="mr-4"><Rejected className="bg-[#F83E3E] rounded-md transition-all duration-300 hover:brightness-125 hover:scale-105" /></button>
          </div>
        </div>

        <div className="pt-5 flex flex-col items-center mt-10">
          {data.data.status === Status.REJECTED && data.data.error && (
            <div className="text-red-600 bg-red-100 border border-red-400 rounded-md px-4 py-2 mb-7 mx-20 text-center">
              <p className="text-3xl my-5">เหตุผลที่ปฎิเสธ</p>
              <div className="text-left">
                {data.data.error}
              </div>
            </div>
          )}
          <div className="text-[#2f2f2f]"> ข้อมูลอัปเดต {formattedDate}</div>
          <Header type={type} data={data} />
          <Formik initialValues={initialValues} onSubmit={handleSubmit}>
            {({ values, setFieldValue }) => (
              <Form>
                <Passage1 type={type} data={values} setFieldValue={setFieldValue} />
                <Passage2 type={type} data={values} setFieldValue={setFieldValue} />
                <Passage3 type={type} data={values} setFieldValue={setFieldValue} />
                <Reviews reviewData={values.reviews} setFieldValue={setFieldValue} />
                <div className="bg-custom-gradient">
                  <button
                    type="submit"
                    className="w-full py-3 text-[#ffffff] transition duration-300 ease-in-out transform hover:scale-105 hover:bg-[#ff6b6b] active:scale-100 active:bg-[#ff4d4d]"
                  >
                    ยืนยันการแก้ไขข้อมูล
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  );
};

export default ViewData;
