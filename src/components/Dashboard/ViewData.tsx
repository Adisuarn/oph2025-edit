import React, { useState } from 'react'
import { Header, Passage1, Passage2, Passage3, Reviews } from '@components/Dashboard'
import { emails } from '@libs/admin'
import { Status } from '@utils/type'
import { Form, Formik } from 'formik'
import { toast, Toaster } from 'react-hot-toast'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import * as Yup from 'yup'

import Checkmark from '@/vectors/Checkmark'
import PeopleIcon from '@/vectors/dashboard/PeopleIcon'
import Rejected from '@/vectors/Rejected'
import { updateData } from './ViewData.action'

const MySwal = withReactContent(Swal)

const ViewData = ({ data, type, onStatusUpdate }: any) => {
  const [loading, setLoading] = useState(false)  // New loading state

  const formattedDate = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Asia/Bangkok',
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })
    .format(new Date(data.data.updatedAt))
    .replace(/am|pm/g, (match) => match.toUpperCase())

  const valuesSchema = Yup.object().shape({
    activities: Yup.string().min(150, 'ข้อมูลต่ำกว่า 150 คำ').required('กรุณากรอกข้อมูล'),
    descimg1: Yup.string().required('กรุณากรอกข้อมูล'),
    benefits: Yup.string().min(150, 'ข้อมูลต่ำกว่า 150 คำ').required('กรุณากรอกข้อมูล'),
    descimg2: Yup.string().required('กรุณากรอกข้อมูล'),
    working: Yup.string().min(150, 'ข้อมูลต่ำกว่า 150 คำ').required('กรุณากรอกข้อมูล'),
    descimg3: Yup.string().required('กรุณากรอกข้อมูล'),
  })

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
  }

  const handleSubmit = async (values: any) => {
    setLoading(true)  // Start loading when submit is clicked
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
          toast.promise(
            updateData(values, data.data.tag, data.data.key).then(() => {
              if (typeof window !== 'undefined') {
                window.location.reload()
              }
              setLoading(false)  // Stop loading on successful update
            }),
            {
              loading: 'กำลังอัปเดตข้อมูล...',
              success: 'อัปเดตข้อมูลสำเร็จ',
              error: 'อัปเดตข้อมูลไม่สำเร็จ',
            },
          ).finally(() => setLoading(false))  // Stop loading on any result
        } else {
          setLoading(false)  // Stop loading if user cancels
        }
      })
    } catch (error) {
      setLoading(false)  // Stop loading on error
      toast.error('ไม่สามารถอัปเดตข้อมูลได้')
    }
  }

  const handleStatusChange = (status: Status) => {
    setLoading(true)  // Start loading when status change is clicked
    const titles: { [key in Status]: string } = {
      [Status.APPROVED]: 'อนุมัติข้อมูลนี้',
      [Status.REJECTED]: 'ปฎิเสธข้อมูลนี้',
      [Status.PENDING]: '',
    }

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
        const message = status === Status.REJECTED
          ? (document.getElementById('rejection-message') as HTMLTextAreaElement).value
          : ""

        toast.promise(
          onStatusUpdate(data, status, message).finally(() => setLoading(false)),  // Stop loading on completion
          {
            loading: 'กำลังกำหนดสถานะ...',
            success: 'อัปเดตสถานะสำเร็จ',
            error: 'อัปเดตสถานะไม่สำเร็จ',
          }
        )
      } else {
        setLoading(false)  // Stop loading if user cancels
      }
    })
  }

  return (
    <>
      <Toaster position="top-center" />
      <div className="my-5 mt-10 overflow-hidden rounded-2xl border">
        <div className="flex justify-between bg-[#0C453E] p-5">
          <div className="flex items-center">
            <PeopleIcon className="mr-4" />
            <p className="text-white">{`${data.data.key} : ${type === 'organization' ? ' องค์กร' : type === 'club' ? ' ชมรม' : ''} ${data.data.thainame}`}</p>
          </div>
          <div className="flex items-center">
            <div className="mr-3 flex items-center">
              <p
                className={`mr-4 h-4 w-4 rounded-full ${data.data.status === Status.PENDING ? 'bg-[#FCB528]' : data.data.status === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]'}`}
              />
              <p
                className={`${data.data.status === Status.PENDING ? 'text-[#FCB528]' : data.data.status === Status.APPROVED ? 'text-[#19C57C]' : 'text-[#F83E3E]'}`}
              >
                {data.data.status === Status.PENDING
                  ? 'อยู่ระหว่างการตรวจสอบ'
                  : data.data.status === Status.APPROVED
                    ? 'อนุมัติ'
                    : 'ไม่อนุมัติ'}
              </p>
            </div>
            <button
              onClick={() => handleStatusChange(Status.APPROVED)}
              className={`mr-4 rounded-md transition-all duration-300 hover:scale-105 hover:brightness-125 
    ${loading ? 'opacity-50 bg-[#19C57C] cursor-not-allowed' : 'bg-[#19C57C]'}`}
              disabled={loading}
            >
              <Checkmark />
            </button>

            <button
              onClick={() => handleStatusChange(Status.REJECTED)}
              className={`mr-4 rounded-md transition-all duration-300 hover:scale-105 hover:brightness-125 
    ${loading ? 'opacity-50 bg-[#F83E3E] cursor-not-allowed' : 'bg-[#F83E3E]'}`}
              disabled={loading}
            >
              <Rejected />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center pt-5">
          {data.data.status === Status.REJECTED && data.data.error && (
            <div className="mx-20 mb-7 rounded-md border border-red-400 bg-red-100 px-4 py-2 text-center text-red-600">
              <p className="my-5 text-3xl">เหตุผลที่ปฎิเสธ</p>
              <div className="text-left">{data.data.error}</div>
            </div>
          )}

          <div className="text-[#2f2f2f]"> ข้อมูลอัปเดต {formattedDate}</div>
          {data.data.updatedBy && (
            <div className="text-[#2f2f2f]">
              โดย
              {emails[data.data.updatedBy as keyof typeof emails]
                ? ` TUCMC ${emails[data.data.updatedBy as keyof typeof emails]}`
                : " " + data.data.updatedBy}
            </div>
          )}
          <Header type={type} data={data} />
          <Formik
            initialValues={initialValues}
            validationSchema={valuesSchema}
            onSubmit={handleSubmit}
          >
            {({ values, setFieldValue, errors, touched }) => (
              <Form className="w-full">
                <Passage1 type={type} data={values} setFieldValue={setFieldValue} errors={errors}
                  touched={touched} />
                <Passage2 type={type} data={values} setFieldValue={setFieldValue} errors={errors}
                  touched={touched} />
                <Passage3 type={type} data={values} setFieldValue={setFieldValue} errors={errors}
                  touched={touched} />
                <Reviews reviewData={values.reviews} setFieldValue={setFieldValue} />

                <div className="bg-custom-gradient w-full">
                  <button
                    type="submit"
                    className={`w-full text-center transform py-3 text-[#ffffff] transition duration-300 ease-in-out hover:scale-105 hover:bg-[#ff6b6b] active:scale-100 active:bg-[#ff4d4d] 
    ${loading ? 'opacity-50 bg-gray-400 cursor-not-allowed' : ''}`}
                    disabled={loading}
                  >
                    {loading ? "กำลังอัปเดตข้อมูล..." : "ยืนยันการแก้ไขข้อมูล"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </>
  )
}

export default ViewData
