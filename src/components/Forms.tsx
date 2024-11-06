'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import { Tag } from '@utils/type'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { toast, Toaster } from 'react-hot-toast'
import * as Yup from 'yup'

import LogoutButton from '@/components/LogoutButton'
import { AllData } from '@/libs/data'
import BigLamp from '@/vectors/forms/BigLamp'
import FormLeft from '@/vectors/forms/FormLeft'
import Frames from '@/vectors/forms/Frames'
import SmallFormLeft from '@/vectors/forms/SmallFormLeft'
import { postRecord } from './Forms.action'

type FormProps = {
  dataRecord: {
    email: string
    tag?: string
    key?: string
  }
}

const Forms: React.FC<FormProps> = ({ dataRecord }) => {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { Programs, Clubs, Gifted, Organizations } = AllData

  const tagOptions = useMemo(
    () => [
      { key: 'สายการเรียน', value: Tag.PROGRAM, options: Programs },
      { key: 'ชมรม', value: Tag.CLUB, options: Clubs },
      { key: 'โครงการพัฒนาความสามารถพิเศษ', value: Tag.GIFTED, options: Gifted },
      { key: 'องค์กรนักเรียน', value: Tag.ORGANIZATION, options: Organizations },
    ],
    [Programs, Clubs, Gifted, Organizations],
  )

  const validationSchema = Yup.object({
    tagOptions: Yup.string().required('กรุณาเลือกประเภท'),
    keyOptions: Yup.string().required('กรุณาเลือกข้อมูล'),
  })

  const onSubmit = useCallback(
    async (values: { tagOptions: string; keyOptions: string }) => {
      setIsSubmitting(true)
      const loadingToastId = toast.loading('กำลังบันทึกข้อมูล...')

      try {
        dataRecord.tag = values.tagOptions
        dataRecord.key = values.keyOptions
        const response = await postRecord(dataRecord)

        if (response?.status === 201) {
          toast.success('บันทึกข้อมูลสำเร็จ', { id: loadingToastId })
          router.push('/account')
          router.refresh()
        } else {
          const errorMessages: Record<number, string> = {
            400: 'มีผู้ใช้ได้บันทึกข้อมูลนี้แล้ว',
            500: 'เกิดข้อผิดพลาด',
          }
          toast.error(errorMessages[response?.status] || 'เกิดข้อผิดพลาดที่เซิฟเวอร์', {
            id: loadingToastId,
          })
        }
      } catch {
        toast.error('เกิดข้อผิดพลาดที่เซิฟเวอร์', { id: loadingToastId })
        setTimeout(() => {
          router.push('/error/500')
        }, 2000)
      } finally {
        setIsSubmitting(false)
      }
    },
    [dataRecord, router],
  )

  return (
    <main className="relative flex h-screen w-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#ECF5C8] to-[#1A8B6D]">
      <Toaster position="top-center" />
      <div className="absolute -left-20 bottom-0 z-40 sm:-left-10">
        <FormLeft className="hidden sm:block sm:h-screen" />
      </div>
      <div className="absolute -left-24 bottom-0 z-40 sm:-left-10">
        <SmallFormLeft className="h-screen sm:hidden" />
      </div>
      <div className="absolute bottom-0 right-0 z-20 2xl:top-14">
        <BigLamp className="hidden sm:block sm:h-full" />
      </div>
      <div className="absolute -right-20 top-16 z-20">
        <Frames className="h-[50vh] sm:hidden" />
      </div>

      <Formik
        initialValues={{ tagOptions: '', keyOptions: '' }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          const selectedTag = tagOptions.find((opt) => opt.value === values.tagOptions)
          const defaultOptionText = selectedTag ? selectedTag.key : 'กรุณาเลือก'
          const isKeyOptionsDisabled = !values.tagOptions

          return (
            <Form>
              <div className="relative z-50 -mt-14 flex h-[60vh] w-[80vw] flex-col items-center justify-center space-y-5 rounded-2xl bg-white shadow-xl sm:w-[50vw]">
                <p className="text-3xl font-bold">กรอกข้อมูล</p>
                <div className="relative w-4/5 rounded-md border border-gray py-2 pl-2 pr-12 sm:w-3/5">
                  <span className="absolute -top-2 left-3 bg-white px-1 text-xs text-[#A9A9A9]">
                    Email
                  </span>
                  <p className="sm:text-md text-xs text-[#A9A9A9] md:text-lg">{dataRecord.email}</p>
                </div>

                <div className="flex flex-col space-y-2">
                  <p>ประเภท</p>
                  {tagOptions.map(({ key, value }) => (
                    <div key={value} className="space-x-2">
                      <Field
                        type="radio"
                        id={value}
                        name="tagOptions"
                        value={value}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                          setFieldValue('tagOptions', e.target.value)
                          setFieldValue('keyOptions', '')
                        }}
                      />
                      <label htmlFor={value}>{key}</label>
                    </div>
                  ))}
                </div>

                <Field
                  as="select"
                  name="keyOptions"
                  className={`form-select rounded-md border border-gray bg-white px-8 py-2 pl-2 ${values.keyOptions ? 'text-black' : 'text-[#A9A9A9]'}`}
                  disabled={isKeyOptionsDisabled}
                >
                  <option value="" disabled hidden>
                    {defaultOptionText}
                  </option>
                  {Object.entries(selectedTag?.options || {}).map(([code, name]) => (
                    <option key={code} value={code}>
                      {name}
                    </option>
                  ))}
                </Field>

                <ErrorMessage name="tagOptions" component="div" className="text-red-500" />
                <ErrorMessage name="keyOptions" component="div" className="text-red-500" />

                <button
                  className={`transform rounded-lg border border-indigo-500 px-4 py-2 text-center text-indigo-500 transition-all duration-200 hover:scale-105 hover:bg-indigo-500 hover:text-white active:scale-95 ${isSubmitting ? 'cursor-not-allowed opacity-50' : ''}`}
                  type="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </button>
                <LogoutButton />
              </div>
            </Form>
          )
        }}
      </Formik>

      <div className="absolute bottom-0 h-44 w-screen bg-[#ECF5C8]"></div>
      <div className="absolute bottom-36 z-10 h-2 w-screen bg-[#6AB692]"></div>
    </main>
  )
}

export default Forms
