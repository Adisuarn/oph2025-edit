'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Status } from '@utils/type'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { FaPen } from 'react-icons/fa'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import * as Yup from 'yup'

import BackArrow from '@/vectors/edit-page/BackArrow'
import GalleryIcon from '@/vectors/edit-page/GalleryIcon'
import Trash from '@/vectors/edit-page/Trash'
import UserIcon from '@/vectors/edit-page/UserIcon'

import 'react-toastify/dist/ReactToastify.css'

import dynamic from 'next/dynamic'
import axios from 'axios'
import { useCookies } from 'next-client-cookies'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import 'react-quill/dist/quill.snow.css'

import { MdReviews } from 'react-icons/md'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

const QuillField: React.FC<{ field: any; form: any }> = ({ field, form }) => (
  <ReactQuill
    value={field.value}
    onChange={(value) => form.setFieldValue(field.name, value)}
    onBlur={() => form.setFieldTouched(field.name, true)}
    theme="snow"
  />
)

const GeneralForm: React.FC<{
  userData: any
  editFormData: any
  reviews: any
  review1: any
  review2: any
  review3: any
}> = ({ userData, editFormData, reviews, review1, review2, review3 }) => {
  review1
    ? review1
    : (review1 = { count: 1, profile: null, nick: '', gen: '', contact: '', content: '' }),
    review2
      ? review2
      : (review2 = { count: 2, profile: null, nick: '', gen: '', contact: '', content: '' }),
    review3
      ? review3
      : (review3 = { count: 3, profile: null, nick: '', gen: '', contact: '', content: '' })
  const MySwal = withReactContent(Swal)
  const cookies = useCookies()
  const notifySuccess = () =>
    toast.success('Successfully Sent!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
      transition: Bounce,
    })
  const notifyError = () =>
    toast.error('There was an error!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    })
  const notifyWarning = ({ props }: { props: string }) =>
    toast.warn(`${props} is still missing!`, {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'light',
      transition: Bounce,
    })

  const [image1, setImage1] = useState<File | null>(null)
  const [imageUrl1, setImageUrl1] = useState<string | null>(editFormData.captureimg1)
  const [displayImage1, setDisplayImage1] = useState<boolean>(editFormData.captureimg1)
  const [image2, setImage2] = useState<File | null>(null)
  const [imageUrl2, setImageUrl2] = useState<string | null>(editFormData.captureimg2)
  const [displayImage2, setDisplayImage2] = useState<boolean>(editFormData.captureimg2)
  const [image3, setImage3] = useState<File | null>(null)
  const [imageUrl3, setImageUrl3] = useState<string | null>(editFormData.captureimg3)
  const [displayImage3, setDisplayImage3] = useState<boolean>(editFormData.captureimg3)
  const [image4, setImage4] = useState<File | null>(null)
  const [imageUrl4, setImageUrl4] = useState<string | null>(review1.profile)
  const [displayImage4, setDisplayImage4] = useState<boolean>(
    review1?.profile
  )
  const [image5, setImage5] = useState<File | null>(null)
  const [imageUrl5, setImageUrl5] = useState<string | null>(review2?.profile)
  const [displayImage5, setDisplayImage5] = useState<boolean>(
    review2?.profile
  )
  const [image6, setImage6] = useState<File | null>(null)
  const [imageUrl6, setImageUrl6] = useState<string | null>(review3?.profile)
  const [displayImage6, setDisplayImage6] = useState<boolean>(
    review3?.profile 
  )
  const [clubLogo, setClubLogo] = useState<File | null>(null)
  const [clubLogoUrl, setClubLogoUrl] = useState<string | null>(editFormData.logo)
  const [displayClubLogo, setDisplayClubLogo] = useState<boolean>(editFormData.logo)
  // const [successDataSent, setSuccessDataSent] = useState<boolean>(false);
  const [ReviewAmount, setReviewAmount] = useState<number>(reviews)
  const [loading, setLoading] = useState(false)
  const [warning, setWarning] = useState(false)

  const handleFileSelect1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage1(selectedFile)
      setDisplayImage1(true)
    }
  }

  useEffect(() => {
    if (image1) {
      const imageUrl1 = URL.createObjectURL(image1)
      setImageUrl1(imageUrl1)
      return () => URL.revokeObjectURL(imageUrl1)
    }
  }, [image1])

  const handleFileSelect2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage2(selectedFile)
      setDisplayImage2(true)
    }
  }

  useEffect(() => {
    if (image2) {
      const imageUrl2 = URL.createObjectURL(image2)
      setImageUrl2(imageUrl2)
      return () => URL.revokeObjectURL(imageUrl2)
    }
  }, [image2])

  const handleFileSelect3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage3(selectedFile)
      setDisplayImage3(true)
    }
  }

  useEffect(() => {
    if (image3) {
      const imageUrl3 = URL.createObjectURL(image3)
      setImageUrl3(imageUrl3)
      return () => URL.revokeObjectURL(imageUrl3)
    }
  }, [image3])

  const handleFileSelect4 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage4(selectedFile)
      setDisplayImage4(true)
    }
  }

  useEffect(() => {
    if (image4) {
      const imageUrl4 = URL.createObjectURL(image4)
      setImageUrl4(imageUrl4)
      return () => URL.revokeObjectURL(imageUrl4)
    }
  }, [image4])

  const handleFileSelect5 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage5(selectedFile)
      setDisplayImage5(true)
    }
  }

  useEffect(() => {
    if (image5) {
      const imageUrl5 = URL.createObjectURL(image5)
      setImageUrl5(imageUrl5)
      return () => URL.revokeObjectURL(imageUrl5)
    }
  }, [image5])

  const handleFileSelect6 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setImage6(selectedFile)
      setDisplayImage6(true)
    }
  }

  useEffect(() => {
    if (image6) {
      const imageUrl6 = URL.createObjectURL(image6)
      setImageUrl6(imageUrl6)
      return () => URL.revokeObjectURL(imageUrl6)
    }
  }, [image6])

  const handleFileSelectClub = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]

      if (!selectedFile.type.startsWith('image/')) {
        alert('Please select a valid image file (png, jpg, jpeg).')
        return
      }

      setClubLogo(selectedFile)
      setDisplayClubLogo(true)
    }
  }

  useEffect(() => {
    if (clubLogo) {
      const clubLogoUrl = URL.createObjectURL(clubLogo)
      setClubLogoUrl(clubLogoUrl)
      return () => URL.revokeObjectURL(clubLogoUrl)
    }
  }, [clubLogo])

  return (
    <section className="mx-10 mt-16 sm:mx-24">
      <ToastContainer />
      <Formik
        initialValues={{
          textField1: editFormData.text1,
          textField2: editFormData.text2,
          textField3: editFormData.text3,
          photoDescription1: editFormData.descimg1,
          photoDescription2: editFormData.descimg2,
          photoDescription3: editFormData.descimg3,
          textField4: review1.content ? review1.content : '',
          P1Name: review1.nick ? review1.nick : '',
          P1Gen: review1.gen ? review1.gen : '',
          P1Contact: review1.contact ? review1.contact : '',
          textField5: review2.content ? review2.content : '',
          P2Name: review2.nick ? review2.nick : '',
          P2Gen: review2.gen ? review2.gen : '',
          P2Contact: review2.contact ? review2.contact : '',
          textField6: review3.content ? review3.content : '',
          P3Name: review3.nick ? review3.nick : '',
          P3Gen: review3.gen ? review3.gen : '',
          P3Contact: review3.contact ? review3.contact : '',
          Members: editFormData.members ?? '',
          IG: editFormData.ig ?? '',
          FB: editFormData.fb ?? '',
          others: editFormData.others ?? '',
        }}
        validationSchema={Yup.object({
          //.min(150, "Required More than 150 words ")
          textField1: Yup.string()
            // .min(150, "Required More than 150 words ")
            .required('Required Description'),
          textField2: Yup.string()
            // .min(150, "Required More than 150 words ")
            .required('Required Description'),
          textField3: Yup.string()
            // .min(150, "Required More than 150 words ")
            .required('Required Description'),
          textField4: Yup.string().required('Required Description'),
          // textField5: Yup.string().required("Required Description"),
          // textField6: Yup.string().required("Required Description"),
          photoDescription1: Yup.string().required('Required Description'),
          photoDescription2: Yup.string().required('Required Description'),
          photoDescription3: Yup.string().required('Required Description'),
          P1Name: Yup.string().required('Required Description'),
          // P2Name: Yup.string().required("Required Name"),
          // P3Name: Yup.string().required("Required Name"),
          P1Gen: Yup.string().required('Required Description'),
          // P2Gen: Yup.string().required("Required Triamudom Gen"),
          // P3Gen: Yup.string().required("Required Triamudom Gen"),
          P1Contact: Yup.string().required('Required Description'),
          // P2Contact: Yup.string().required("Required Contact"),
          // P3Contact: Yup.string().required("Required Contact"),
          Members: Yup.string().required('Required Description'),
        })}
        onSubmit={async (
          values: {
            textField1: string
            textField2: string
            textField3: string
            textField4: string
            textField5: string
            textField6: string
            // image1: File
            // image2: File;
            // image3: File;
            // image4: File;
            // image5: File;
            // image6: File;
            photoDescription1: string
            photoDescription2: string
            photoDescription3: string
            P1Name: string
            P2Name: string
            P3Name: string
            P1Gen: string
            P2Gen: string
            P3Gen: string
            P1Contact: string
            P2Contact: string
            P3Contact: string
            Members: string
            IG: string
            FB: string
            others: string
          },
          { setSubmitting },
        ) => {
          const userConfirmed = await Swal.fire({
            title: 'ยืนยันการส่งข้อมูลหรือไม่?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'ยืนยัน',
            cancelButtonText: 'ยกเลิก',
          })
          if (userConfirmed.isConfirmed) {
            try {
              setLoading(true)
              editFormData.members = values.Members
              editFormData.ig = values.IG
              editFormData.fb = values.FB
              editFormData.others = values.others
              editFormData.text1 = values.textField1
              editFormData.text2 = values.textField2
              editFormData.text3 = values.textField3
              if (
                (editFormData.tagThai === 'ชมรม' && clubLogoUrl === undefined) ||
                clubLogoUrl === '' ||
                clubLogoUrl === null
              ) {
                notifyWarning({ props: 'club logo' })
                throw new Error('')
              }
              if (imageUrl1 === null || imageUrl1 === '' || imageUrl1 === undefined) {
                notifyWarning({ props: 'Photo 1' })
                throw new Error('')
              }
              if (imageUrl2 === null || imageUrl2 === '' || imageUrl2 === undefined) {
                notifyWarning({ props: 'Photo 2' })
                throw new Error('')
              }
              if (imageUrl3 === null || imageUrl3 === '' || imageUrl3 === undefined) {
                notifyWarning({ props: 'Photo 3' })
                throw new Error('')
              }
              if (imageUrl4 === null || imageUrl4 === '' || imageUrl4 === undefined) {
                notifyWarning({ props: 'Review Photo' })
                throw new Error('')
              }
              editFormData.captureimg1 = image1
              editFormData.captureimg2 = image2
              editFormData.captureimg3 = image3
              review1.profile = image4
              review2.profile = image5
              review3.profile = image6
              review1.nick = values.P1Name
              review2.nick = values.P2Name
              review3.nick = values.P3Name
              review1.gen = values.P1Gen
              review2.gen = values.P2Gen
              review3.gen = values.P3Gen
              review1.contact = values.P1Contact
              review2.contact = values.P2Contact
              review3.contact = values.P3Contact
              review1.content = values.textField4
              review2.content = values.textField5
              review3.content = values.textField6
              editFormData.descimg1 = values.photoDescription1
              editFormData.descimg2 = values.photoDescription2
              editFormData.descimg3 = values.photoDescription3
              editFormData.sendForm = true
              const formData = new FormData()
              formData.append('members', editFormData.members)
              formData.append('ig', editFormData.ig)
              formData.append('fb', editFormData.fb)
              formData.append('others', editFormData.others)
              if (editFormData.tagThai === 'ชมรม' || editFormData.tagThai === 'องค์กร') {
                formData.append('activities', editFormData.text1)
              } else {
                formData.append('admissions', editFormData.text1)
              }

              if (editFormData.tagThai === 'ชมรม') {
                formData.append('benefits', editFormData.text2)
              } else if (editFormData.tagThai === 'องค์กร') {
                formData.append('position', editFormData.text2)
              } else {
                formData.append('courses', editFormData.text2)
              }

              if (editFormData.tagThai === 'ชมรม' || editFormData.tagThai === 'องค์กร') {
                formData.append('working', editFormData.text3)
              } else {
                formData.append('interests', editFormData.text3)
              }

              if (image1 !== null) formData.append('captureimg1', image1)
              if (image2 !== null) formData.append('captureimg2', image2)
              if (image3 !== null) formData.append('captureimg3', image3)

              if (editFormData.tagThai === 'ชมรม' && clubLogo !== null) {
                formData.append('logo', clubLogo)
              }
              formData.append('descimg1', editFormData.descimg1)
              formData.append('descimg2', editFormData.descimg2)
              formData.append('descimg3', editFormData.descimg3)
              formData.append('sendForm', editFormData.sendForm)
              const options = {
                method: 'PATCH',
                url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.tag}/${userData.key}`,
                headers: {
                  'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                  Authorization: `${cookies.get(process.env.COOKIE_NAME!)}`,
                },
                data: formData,
              }

              await axios.request(options)

              //send review data
              const postReviews = [review1, review2, review3]
              const images = [image4, image5, image6]
              postReviews.map(async (review: any, index: number) => {
                if (
                  review.content === '' ||
                  review.nick === '' ||
                  review.gen === '' ||
                  review.contact === ''
                )
                  return
                const reviewData = new FormData()
                const profileImage = images[index]
                if (profileImage) reviewData.append('profile', profileImage)
                reviewData.append('nick', review.nick || '')
                reviewData.append('gen', review.gen || '')
                reviewData.append('contact', review.contact || '')
                reviewData.append('content', review.content || '')
                return axios({
                  method: 'PATCH',
                  url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.tag}/${userData.key}/review/${index + 1}`,
                  headers: {
                    'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                    Authorization: `${cookies.get(process.env.COOKIE_NAME!)}`,
                  },
                  data: reviewData,
                })
              })
              notifySuccess()
            } catch (error) {
              console.log(error)
              notifyError()
            } finally {
              setSubmitting(false)
              setLoading(false)
            }
          } else {
            setSubmitting(false)
          }
        }}
      >
        {({ isSubmitting, setFieldValue }) => (
          <Form>
            {loading && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="loader"></div>
              </div>
            )}
            <section className="mb-8 flex flex-col items-start space-y-3">
              <div className="flex items-center justify-center space-x-1 transition-all hover:scale-105">
                <Link href="/account">
                  <BackArrow className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
                </Link>
                <Link
                  href="/account"
                  className="relative font-Thai text-xs text-greenTextext sm:text-lg md:text-2xl"
                >
                  ย้อนกลับ
                </Link>
              </div>
              <div>
                <div className="flex w-[80vw] items-center justify-between md:w-[85vw] xl:w-[90vw]">
                  <div className="flex items-center justify-center space-x-2">
                    <p className="md:text-md text-xs sm:text-sm lg:text-lg">สถานะ : </p>
                    {editFormData.status === '' && (
                      <div className="flex items-center justify-center space-x-1 sm:mt-0">
                        <p className="md:text-md text-xs text-zinc-700 sm:text-sm">
                          ยังไม่ได้ส่งแบบฟอร์ม
                        </p>
                      </div>
                    )}
                    {editFormData.status === Status.PENDING && (
                      <div className="flex items-center justify-center space-x-1 sm:mt-0">
                        <div className="h-2 w-2 rounded-full bg-[#FCB52B] sm:h-3 sm:w-3"></div>
                        <p className="md:text-md text-xs text-[#FCB52B] sm:text-sm">
                          อยู่ระหว่างการตรวจสอบ
                        </p>
                      </div>
                    )}
                    {editFormData.status === Status.APPROVED && (
                      <div className="flex items-center justify-center space-x-1 sm:mt-0">
                        <div className="h-2 w-2 rounded-full bg-[#19C57C] sm:h-3 sm:w-3"></div>
                        <p className="md:text-md text-xs text-[#19C57C] sm:text-sm">
                          ผ่านการตรวจสอบ
                        </p>
                      </div>
                    )}
                    {editFormData.status === Status.REJECTED && (
                      <div className="flex items-center justify-center space-x-1 sm:mt-0">
                        <div className="h-2 w-2 rounded-full bg-[#E80808] sm:h-3 sm:w-3"></div>
                        <p className="md:text-md text-xs text-[#E80808] sm:text-sm">
                          ไม่ผ่านการตรวจสอบ
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-center space-x-2 sm:space-x-4">
                    <Link
                      href={`/preview/${editFormData.tag}`}
                      className="md:text-md rounded-full border border-greenText px-2 text-[10px] text-greenText transition-all hover:scale-105 hover:bg-greenText hover:text-white hover:shadow-xl sm:px-4 sm:text-lg"
                    >
                      preview
                    </Link>
                    <button
                      className="rounded-full border bg-gradient-to-r from-buttonFirst via-buttonMiddle to-greenText px-2 font-Thai text-[10px] font-extralight text-white transition-all hover:scale-105 hover:shadow-xl sm:px-4 sm:text-lg"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      ส่งการแก้ไข
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Hero */}
            <section className="w-full sm:mx-7">
              <section className="w-full rounded-2xl bg-gradient-to-br from-heroFirst via-heroMiddle to-greenText shadow-xl">
                {editFormData.tagThai !== 'ชมรม' ? (
                  <div className="flex h-40 w-full flex-col items-center justify-center space-y-2 text-xs text-white sm:h-60 sm:w-3/5 sm:space-y-4 md:mx-auto">
                    <p className="sm:border-3 rounded-full border border-white px-6 py-1 text-lg font-extrabold sm:text-2xl">
                      {editFormData.thainame}
                    </p>
                    <div className="flex items-center justify-center">
                      <p className="sm:text-md text-xs md:text-lg">{editFormData.tagThai}</p>
                      <Field
                        type="text"
                        name="Members"
                        className="sm:text-md w-12 bg-transparent text-center text-xs text-white md:text-lg"
                      />
                      <FaPen className="-mt-4 h-2 text-white" />
                      <p className="sm:text-md text-xs md:text-lg">คน</p>
                    </div>
                    <div className="justify- whitespace-nowrapcenter flex items-center sm:space-y-2">
                        <div className="items-center justify-center space-y-1 text-start sm:text-lg">
                          <div className="flex">
                            <p className="text-[8px] sm:text-lg">IG : </p>
                            <Field
                              type="text"
                              name="IG"
                              className="ml-1 w-8 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                          <div className="flex">
                            <p className="whitespace-nowrap text-[8px] sm:text-lg">FB : </p>
                            <Field
                              type="text"
                              name="FB"
                              className="ml-1 w-8 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                          <div className="flex">
                            <p className="whitespace-nowrap text-[8px] sm:text-lg">อื่น ๆ : </p>
                            <Field
                              type="text"
                              name="others"
                              className="ml-1 w-8 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                        </div>
                      </div>
                  </div>
                ) : (
                  <div className="flex h-40 w-full items-center justify-around space-y-2 text-xs text-white sm:h-60 sm:w-3/5 sm:space-y-4 md:mx-auto md:w-[60vw]">
                    {displayClubLogo ? (
                      <div className="relative flex flex-col items-center justify-center">
                        <Image
                          className="flex h-28 w-28 rounded-lg object-cover md:h-40 md:w-40 lg:h-52 lg:w-52"
                          src={clubLogoUrl || ''}
                          alt="uploaded photo"
                          width={400}
                          height={600}
                          quality={100}
                        />
                        <button
                          onClick={() => {
                            setDisplayClubLogo(false)
                            setClubLogo(null)
                            setClubLogoUrl('')
                          }}
                          className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:-right-5 lg:-right-4"
                        >
                          X
                        </button>
                      </div>
                    ) : (
                      <label className="flex h-28 w-28 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] md:h-40 md:w-40 lg:h-52 lg:w-52">
                        <div className="flex flex-col items-center justify-center pb-6 pt-5">
                          <GalleryIcon className="h-6 w-6 text-greenText sm:h-8 sm:w-8 md:h-16 md:w-16" />
                          <p className="mt-1 text-[8px] text-black sm:mt-2 sm:text-lg">Club Logo</p>
                        </div>
                        <input type="file" className="hidden" onChange={handleFileSelectClub} />
                      </label>
                    )}
                    <div className="h-32 w-[2px] rounded-full bg-white lg:h-48 lg:w-[4px] md:ml-4 lg:ml-8"></div>
                    <div className="flex w-1/2 sm:w-2/3 flex-col items-center justify-center md:ml-4 lg:space-y-2">
                      <p className="rounded-full border border-white px-[8px] text-[10px] font-bold md:text-lg md:font-extrabold lg:px-4 lg:py-2 lg:text-2xl">
                        {editFormData.thainame}
                      </p>
                      <div className="flex items-center justify-center">
                        <p className="sm:text-md text-[8px] md:text-lg">{editFormData.tagThai}</p>
                        <Field
                          type="text"
                          name="Members"
                          className="sm:text-md w-5 bg-transparent text-center text-[8px] text-white sm:w-12 md:text-lg"
                        />
                        <FaPen className="-mt-2 h-1 text-white sm:h-2 md:-mt-4" />
                        <p className="sm:text-md text-[8px] md:text-lg">คน</p>
                      </div>
                      <div className="whitespace-nowrapcenter flex items-center sm:space-y-2">
                        <div className="items-center justify-center space-y-1 text-start sm:text-lg">
                          <div className="flex">
                            <p className="text-[8px] sm:text-lg">IG : </p>
                            <Field
                              type="text"
                              name="IG"
                              className="ml-1 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 w-36 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                          <div className="flex">
                            <p className="whitespace-nowrap text-[8px] sm:text-lg">FB : </p>
                            <Field
                              type="text"
                              name="FB"
                              className="ml-1 w-8 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                          <div className="flex">
                            <p className="whitespace-nowrap text-[8px] sm:text-lg">อื่น ๆ : </p>
                            <Field
                              type="text"
                              name="others"
                              className="ml-1 w-8 bg-transparent text-center text-[8px] text-white sm:text-lg md:ml-2 md:w-[200px]"
                            />
                            <FaPen className="h-1 text-white sm:h-2" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </section>

              {/* section1 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row">
                  {editFormData.tagThai === 'ชมรม' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:py-1 sm:text-3xl sm:leading-[1.8] md:py-2 md:text-5xl md:leading-[1.5] lg:py-2 lg:text-7xl lg:leading-[1.3]">
                        ชมรมนี้
                      </p>

                      <p className="sm:text-3xl md:text-5xl lg:text-7xl">ทำอะไร</p>
                    </div>
                  ) : editFormData.tagThai === 'องค์กร' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col sm:items-end">
                      <p className="-mb-2 sm:py-1 sm:text-xs sm:leading-[1.8] md:py-2 md:text-5xl md:leading-[1.4] lg:py-2 lg:text-6xl lg:leading-[1.3]">
                        องค์กรนี้
                      </p>

                      <p className="sm:text-xl md:text-4xl lg:text-5xl">ทำอะไร</p>
                    </div>
                  ) : (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:text-xs md:text-4xl lg:text-5xl">การรับสมัคร</p>
                      <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
                      <p className="sm:text-xl md:text-4xl lg:text-5xl">การสอบเข้า</p>
                    </div>
                  )}
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage1 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-2/3 md:h-60 lg:h-72"
                            src={imageUrl1 || ''}
                            alt="uploaded photo"
                            width={800}
                            height={600}
                            quality={100}
                          />
                          <button
                            onClick={() => {
                              setDisplayImage1(false)
                              setImage1(null)
                              setImageUrl1('')
                            }}
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white md:right-[68px] lg:right-24 xl:right-[7.5rem]"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-2/3 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input type="file" className="hidden" onChange={handleFileSelect1} />
                        </label>
                      )}
                    </div>
                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription1"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription1"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField1"
                  component={QuillField}
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                />
                <ErrorMessage name="textField1" component="div" className="text-red-400" />
              </div>
              {/* section 2 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row-reverse">
                  {editFormData.tagThai === 'ชมรม' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:text-4xl md:text-5xl lg:text-7xl">ประโยชน์</p>
                      <p className="sm:text-lg md:text-2xl lg:text-4xl">ที่ได้รับ</p>
                      <p className="sm:-mt-2 sm:text-lg md:text-lg lg:text-3xl">จากการเข้าชมรม</p>
                    </div>
                  ) : editFormData.tagThai === 'องค์กร' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:text-lg md:text-5xl lg:text-6xl">ตำแหน่ง</p>
                      <p className="sm:text-lg md:text-2xl lg:text-4xl">/หน้าที่</p>
                    </div>
                  ) : (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:text-2xl md:text-7xl">วิชา /</p>
                      <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
                      <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
                    </div>
                  )}
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage2 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-2/3 md:h-60 lg:h-72"
                            src={imageUrl2 || ''}
                            alt="uploaded photo"
                            width={800}
                            height={600}
                            quality={100}
                          />
                          <button
                            onClick={() => {
                              setDisplayImage2(false)
                              setImage2(null)
                              setImageUrl2('')
                            }}
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-2 md:right-[68px] lg:right-24 xl:right-[7.5rem]"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-2/3 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input type="file" className="hidden" onChange={handleFileSelect2} />
                        </label>
                      )}
                    </div>

                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription2"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription2"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField2"
                  component={QuillField}
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                />
                <ErrorMessage name="textField2" component="div" className="text-red-400" />
              </div>
              {/* section 3 */}
              <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
                <div className="flex flex-col items-start justify-between sm:flex-row">
                  {editFormData.tagThai === 'ชมรม' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="sm:text-5xl md:text-6xl lg:text-7xl">ผลงาน</p>
                      <p className="sm:text-3xl md:text-4xl lg:text-5xl">ของชมรม</p>
                    </div>
                  ) : editFormData.tagThai === 'องค์กร' ? (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col sm:items-end">
                      <p className="sm:text-5xl md:text-4xl lg:text-5xl">ผลงาน</p>
                      <p className="sm:text-3xl md:text-3xl lg:text-5xl">ขององค์กร</p>
                    </div>
                  ) : (
                    <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                      <p className="-mb-3 sm:text-xl sm:leading-[2] md:text-4xl md:leading-[1.7] lg:text-5xl lg:leading-[1.5]">
                        ความน่าสนใจ
                      </p>
                      <p className="sm:text-5xl md:text-6xl lg:text-7xl">ของ</p>
                      <p className="sm:text-3xl md:text-4xl lg:text-5xl">สายการเรียน</p>
                    </div>
                  )}
                  <div className="sm:w-[50vw] md:w-[60vw]">
                    <div className="flex w-full items-center justify-center">
                      {displayImage3 ? (
                        <div className="relative w-full">
                          <Image
                            className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-2/3 md:h-60 lg:h-72"
                            src={imageUrl3 || ''}
                            alt="uploaded photo"
                            width={800}
                            height={600}
                            quality={100}
                          />
                          <button
                            onClick={() => {
                              setDisplayImage3(false)
                              setImage3(null)
                              setImageUrl3('')
                            }}
                            className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-2 md:right-[68px] lg:right-24 xl:right-[7.5rem]"
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <label className="flex h-44 w-[80vw] flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-48 sm:w-2/3 md:h-60 lg:h-72">
                          <div className="flex flex-col items-center justify-center pb-6 pt-5">
                            <GalleryIcon className="h-6 w-6 text-greenText sm:h-12 sm:w-12 md:h-16 md:w-16" />
                          </div>
                          <input type="file" className="hidden" onChange={handleFileSelect3} />
                        </label>
                      )}
                    </div>

                    <div className="mb-3 flex items-center justify-center">
                      <Field
                        type="text"
                        name="photoDescription3"
                        className="md:text-md text-center text-xs text-greenText sm:text-sm"
                        placeholder="Photo description"
                      />
                      <FaPen className="h-2 text-greenText" />
                      <ErrorMessage
                        name="photoDescription3"
                        component="div"
                        className="text-xs text-red-400 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
                <Field
                  as="textarea"
                  name="textField3"
                  component={QuillField}
                  className="rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:text-lg md:text-xl"
                  placeholder="Your description here"
                  rows="5"
                />
                <ErrorMessage name="textField3" component="div" className="text-red-400" />
              </div>

              <div className="flex h-24 items-center justify-center space-x-4">
                <p className="inline-block h-full bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold leading-[1.85] text-transparent sm:text-4xl sm:leading-[1.6]">
                  รีวิวจากรุ่นพี่
                </p>
              </div>

              <section className="flex flex-col space-y-10">
                {/* {ReviewAmount >= 1 && ( */}
                  <div className="flex flex-col items-center justify-center space-y-5">
                    <div className="flex w-full items-start justify-around">
                      <div className="flex flex-col">
                        <div className="flex flex-col items-center justify-center">
                          {displayImage4 ? (
                            <div className="relative w-full">
                              <Image
                                className="mb-3 h-[66px] w-16 rounded-md sm:h-24 sm:w-24 md:h-[150px] md:w-36"
                                src={imageUrl4 || ''}
                                alt="photo4"
                                width={800}
                                height={600}
                              />
                              <button
                                onClick={() => setDisplayImage4(false)} // Replace with your deletion logic
                                className="absolute -top-2 right-20 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-16"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <div className="flex w-full items-center justify-start">
                              <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                  <UserIcon className="h-3 w-3 text-greenText sm:h-6 sm:w-6" />
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileSelect4}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex flex-col">
                          <Field
                            type="text"
                            name="P1Name"
                            className="text-sm font-bold text-greenText w-full sm:text-lg"
                            placeholder="ชื่อเล่น"
                          />
                          <ErrorMessage
                            name="P1Name"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <div className="flex">
                            <label className="text-[8px] text-gray sm:text-sm" htmlFor="P1Gen">
                              เตรียมอุดม{' '}
                            </label>
                            <Field
                              type="text"
                              id="P1Gen"
                              name="P1Gen"
                              className="ml-1 w-5 text-[8px] text-heroMiddle sm:w-8 sm:text-sm"
                              placeholder="xx"
                            />
                          </div>
                          <ErrorMessage
                            name="P1Gen"
                            component="div"
                            className="block text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P1Contact"
                            className="w-full text-[8px] text-heroMiddle sm:text-sm"
                            placeholder="contact"
                          />
                          <ErrorMessage
                            name="P1Contact"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                        </div>
                      </div>
                      <div className="flex w-3/5 flex-col items-center justify-center">
                        <Field
                          as="textarea"
                          name="textField4"
                          component={QuillField}
                          className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                          rows="5"
                          placeholder="รีวิวจากรุ่นพี่"
                        />
                        <ErrorMessage name="textField4" component="div" className="text-red-300" />
                      </div>
                    </div>
                  </div>
                {/* )} */}
                {ReviewAmount >= 2 && (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex w-full items-start justify-around">
                      <div className="flex w-3/5 flex-col items-center justify-center">
                        <Field
                          as="textarea"
                          name="textField5"
                          component={QuillField}
                          className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                          rows="5"
                          placeholder="รีวิวจากรุ่นพี่"
                        />
                        <ErrorMessage name="textField5" component="div" className="text-red-300" />
                      </div>
                      <div className="flex flex-col items-end justify-end">
                        <div className="flex flex-col items-center justify-center">
                          {displayImage5 ? (
                            <div className="relative w-full">
                              <Image
                                className="mb-3 h-[66px] w-16 rounded-md sm:h-24 sm:w-24 md:h-[150px] md:w-36"
                                src={imageUrl5 || ''}
                                alt="photo5"
                                width={800}
                                height={600}
                              />
                              <button
                                onClick={() => setDisplayImage5(false)} // Replace with your deletion logic
                                className="absolute -right-2 -top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-0 md:-right-2"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <div className="flex w-full items-center justify-end">
                              <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                  <UserIcon className="h-3 w-3 text-greenText sm:h-6 sm:w-6" />
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileSelect5}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex flex-col items-end">
                          <Field
                            type="text"
                            name="P2Name"
                            className="w-full text-end text-sm font-bold text-greenText sm:text-lg"
                            placeholder="ชื่อเล่น"
                          />
                          <ErrorMessage
                            name="P2Name"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <div className="flex items-center justify-end">
                            <label className="text-[8px] text-gray sm:text-sm" htmlFor="P2Gen">
                              เตรียมอุดม{' '}
                            </label>
                            <Field
                              type="text"
                              id="P2Gen"
                              name="P2Gen"
                              className="w-5 text-end text-[8px] text-heroMiddle sm:text-sm"
                              placeholder="xx"
                            />
                          </div>
                          <ErrorMessage
                            name="P2Gen"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P2Contact"
                            className="w-full text-end text-[8px] text-heroMiddle sm:text-sm"
                            placeholder="contact"
                          />
                          <ErrorMessage
                            name="P2Contact"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {ReviewAmount === 3 && (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="flex w-full items-start justify-around">
                      <div className="flex flex-col">
                        <div className="flex flex-col items-center justify-center">
                          {displayImage6 ? (
                            <div className="relative w-full">
                              <Image
                                className="mb-3 h-[66px] w-16 rounded-md sm:h-24 sm:w-24 md:h-[150px] md:w-36"
                                src={imageUrl6 || ''}
                                alt="photo6"
                                width={800}
                                height={600}
                              />
                              <button
                                onClick={() => setDisplayImage6(false)} // Replace with your deletion logic
                                className="absolute -top-2 right-20 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-zinc-500 font-roboto text-[10px] text-white sm:right-16"
                              >
                                X
                              </button>
                            </div>
                          ) : (
                            <div className="flex w-full items-center justify-start">
                              <label className="flex h-12 w-12 flex-col items-center justify-center rounded-lg bg-[#D9D9D9] sm:h-24 sm:w-24 md:h-36 md:w-36">
                                <div className="flex flex-col items-center justify-center pb-6 pt-5">
                                  <UserIcon className="h-3 w-3 text-greenText sm:h-6 sm:w-6" />
                                </div>
                                <input
                                  type="file"
                                  className="hidden"
                                  onChange={handleFileSelect6}
                                />
                              </label>
                            </div>
                          )}
                        </div>
                        <div className="mt-2 flex flex-col">
                          <Field
                            type="text"
                            name="P3Name"
                            className="w-full text-sm font-bold text-greenText sm:text-lg"
                            placeholder="ชื่อเล่น"
                          />
                          <ErrorMessage
                            name="P3Name"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <div className="flex">
                            <label className="text-[8px] text-gray sm:text-sm" htmlFor="P3Gen">
                              เตรียมอุดม{' '}
                            </label>
                            <Field
                              type="text"
                              id="P3Gen"
                              name="P3Gen"
                              className="ml-1 w-5 text-[8px] text-heroMiddle sm:w-8 sm:text-sm"
                              placeholder="xx"
                            />
                          </div>
                          <ErrorMessage
                            name="P3Gen"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                          <Field
                            type="text"
                            name="P3Contact"
                            className="w-full text-[8px] text-heroMiddle sm:text-sm"
                            placeholder="contact"
                          />
                          <ErrorMessage
                            name="P3Contact"
                            component="div"
                            className="text-[8px] text-red-400"
                          />
                        </div>
                      </div>
                      <div className="flex w-3/5 flex-col items-center justify-center">
                        <Field
                          as="textarea"
                          name="textField6"
                          component={QuillField}
                          className="w-full rounded-xl border border-greenText pb-28 pl-3 pt-3 text-xs text-greenText shadow-lg sm:h-[30vh] sm:text-lg md:text-xl"
                          rows="5"
                          placeholder="รีวิวจากรุ่นพี่"
                        />
                        <ErrorMessage name="textField6" component="div" className="text-red-300" />
                      </div>
                    </div>
                  </div>
                )}
              </section>
              <div className="my-10 flex w-full flex-col items-center space-y-3">
                {ReviewAmount > 1 && (
                  <div
                    onClick={async () => {
                      const userConfirmed = await Swal.fire({
                        title: 'ยืนยันการลบข้อมูลหรือไม่?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonText: 'ยืนยัน',
                        cancelButtonText: 'ยกเลิก',
                      })
                      if (userConfirmed.isConfirmed) {
                        if (ReviewAmount === 3) {
                          setDisplayImage6(false)
                          setImageUrl6('')
                          setFieldValue('textField6', '')
                          setFieldValue('P3Name', '')
                          setFieldValue('P3Gen', '')
                          setFieldValue('P3Contact', '')
                          await axios.request({
                            method: 'DELETE',
                            headers: {
                              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                              Authorization: `${cookies.get(process.env.COOKIE_NAME!)}`,
                            },
                            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.tag}/${userData.key}/review/3`,
                            data: {},
                          })
                          setReviewAmount(ReviewAmount - 1)
                        } else if (ReviewAmount === 2) {
                          setDisplayImage5(false)
                          setImageUrl5('')
                          setFieldValue('textField5', '')
                          setFieldValue('P2Name', '')
                          setFieldValue('P2Gen', '')
                          setFieldValue('P2Contact', '')
                          await axios.request({
                            method: 'DELETE',
                            headers: {
                              'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                              Authorization: `${cookies.get(process.env.COOKIE_NAME!)}`,
                            },
                            url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.tag}/${userData.key}/review/2`,
                            data: {},
                          })
                          setReviewAmount(ReviewAmount - 1)
                        }
                      }
                    }}
                    className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full shadow-xl"
                  >
                    <Trash className="h-3 w-3 transition-all hover:scale-105 sm:h-6 sm:w-6" />
                  </div>
                )}
                <div>
                  {ReviewAmount !== 3 && (
                    <button
                      type="button"
                      onClick={async () => {
                        await axios.request({
                          method: 'POST',
                          headers: {
                            'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
                            Authorization: `${cookies.get(process.env.COOKIE_NAME!)}`,
                          },
                          url: `${process.env.NEXT_PUBLIC_BASE_URL}/${userData.tag}/${userData.key}/review`,
                          data: {},
                        })
                        setReviewAmount(ReviewAmount + 1)
                      }}
                      className="mx-auto rounded-full hover:shadow-xl bg-gradient-to-br from-buttonFirst via-buttonMiddle via-45% to-greenText px-2 py-1 text-center text-xs text-white transition-all hover:scale-105 sm:px-4 sm:py-2 sm:text-lg"
                    >
                      + เพิ่มรีวิวจากรุ่นพี่
                    </button>
                  )}
                </div>
              </div>
            </section>
            <ErrorMessage
              name="textField1"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="textField2"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="textField3"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="textField4"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="photoDescription1"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="photoDescription2"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="photoDescription3"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="P1Name"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="P1Gen"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
            <ErrorMessage
              name="P1Contact"
              component="div"
              className="absolute left-1/2 top-5 -translate-x-1/2 transform text-xs text-red-400 sm:text-lg"
            />
          </Form>
        )}
      </Formik>
    </section>
  )
}

export default GeneralForm
