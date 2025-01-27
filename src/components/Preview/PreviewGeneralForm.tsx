'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

import BackArrow from '@/vectors/edit-page/BackArrow'
import Profile from '@/vectors/preview/Profile'

import 'react-toastify/dist/ReactToastify.css'

import Section from '@/vectors/dashboard/Section'
import BigFooter from '@/vectors/preview/BigFooter'
import BigLamp from '@/vectors/preview/BigLamp'
import BigLowercurve from '@/vectors/preview/BigLowercurve'
import BigStainedGlass from '@/vectors/preview/BigStainedGlass'
import BigUppercurve from '@/vectors/preview/BigUppercurve'
import ClubFallingLamp from '@/vectors/preview/ClubFallingLamp'
import DoubleQuoteDown from '@/vectors/preview/DoubleQuoteDown'
import DoubleQuoteUp from '@/vectors/preview/DoubleQuoteUp'
import FallingLamp from '@/vectors/preview/FallingLamp'
import Flower from '@/vectors/preview/Flower'
import Footer from '@/vectors/preview/Footer'
import Frames from '@/vectors/preview/Frames'
import Lamp from '@/vectors/preview/Lamp'
import LeftFrames from '@/vectors/preview/LeftFrames'
import Lowercurve from '@/vectors/preview/Lowercurve'
import SLamp1 from '@/vectors/preview/SLamp1'
import SLamp2 from '@/vectors/preview/SLamp2'
import SLamp3 from '@/vectors/preview/SLamp3'
import Stainedglass from '@/vectors/preview/Stainedglass'
import Uppercurve from '@/vectors/preview/Uppercurve'
import Vase from '@/vectors/preview/Vase'
import { useFormStore, useReviewStore1, useReviewStore2, useReviewStore3 } from '@/store/formStore'

const PreviewGeneralForm: React.FC<{
  editFormData: any
  review1: any
  review2: any
  review3: any
  reviews: any
}> = ({ editFormData, review1, review2, review3, reviews }) => {
  const formData = useFormStore((state) => state.formData)
  const reviewData1 = useReviewStore1((state) => state.reviewData)
  const reviewData2 = useReviewStore2((state) => state.reviewData)
  const reviewData3 = useReviewStore3((state) => state.reviewData)
  const ReviewAmount = reviews
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleImageLoad = () => {
    setImageLoaded(true)
  }
  return (
    <section className="via-41% relative w-screen overflow-hidden bg-gradient-to-b from-[#ECF5C8] via-[#91CDAD] to-[#C8E5BD]">
      <div className="absolute -top-[340px] left-1/2 z-10 -translate-x-1/2 sm:-top-20">
        <Uppercurve className="w-[100vw] md:w-[110vw] lg:hidden" />
      </div>
      <div className="absolute lg:-top-72 xl:-top-36 left-0 z-10 overflow-hidden">
        <BigUppercurve className="hidden w-screen lg:block" />
      </div>
      <section className="relative z-40 mx-12 pt-48 sm:mx-28 sm:pt-72 md:mx-36 md:pt-[300px] lg:mx-48 xl:mx-60 2xl:pt-[550px]">
        <section className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-1 transition-all hover:scale-105">
            <Link href={`/editingform/${editFormData.tag}`}>
              <BackArrow className="h-5 w-5 text-heroMiddle sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </Link>
            <Link
              href={`/editingform/${editFormData.tag}`}
              className="text-xs text-heroMiddle sm:text-lg md:text-2xl"
            >
              ย้อนกลับ
            </Link>
          </div>
          <p className="text-xs text-heroMiddle sm:text-lg md:text-2xl">preview page</p>
        </section>

        {/* Hero */}
        <section className="w-full sm:mx-7">
          <section className="flex w-full flex-col items-center justify-center">
            <div className="relative z-20 flex h-20 w-full flex-col items-center justify-center md:mx-auto">
              <p className="bg-gradient-to-b from-[#75B667] via-[#15786C] via-80% to-[#12665B] bg-clip-text text-center text-lg font-bold text-transparent sm:text-xl sm:font-extrabold md:text-4xl">
                {editFormData.thainame}
              </p>
            </div>
            <div className="ml-6 flex items-center justify-center space-x-6">
              <div className="flex items-center justify-center">
                <Profile className="h-10 w-10 text-greenText sm:h-12 sm:w-12 md:mr-5 md:h-20 md:w-20" />
                <div className="flex flex-col items-center">
                  <p className="text-md bg-gradient-to-b from-buttonMiddle to-greenText bg-clip-text font-bold text-transparent sm:text-2xl">
                    สมาชิก
                  </p>
                  <p className="from-19% to-94% bg-gradient-to-b from-[#75B667] via-[#15786C] via-80% to-[#0C453E] bg-clip-text text-xl font-bold text-transparent sm:text-6xl">
                    {formData.members ? formData.members : editFormData.members}
                  </p>
                </div>
              </div>
              {(editFormData.ig || editFormData.fb || editFormData.others) && (
                <div className="h-16 w-[2px] rounded-full bg-greenText"></div>
              )}
              <div className="sm:space-y-2">
                <div>
                  {/* {editFormData.ig && ( */}
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      IG : {formData.ig ? formData.ig : editFormData.ig}
                    </p>
                  {/* )} */}
                  {/* {editFormData.fb && ( */}
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      FB : {formData.fb ? formData.fb : editFormData.fb}
                    </p>
                  {/* )} */}
                  {/* {editFormData.others && ( */}
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      อื่น ๆ : {formData.others ? formData.others : editFormData.others}
                    </p>
                  {/* )} */}
                </div>
              </div>
            </div>
            <Section className="h-12 sm:h-16 md:h-24" />
          </section>

          {/* section1 */}
          <div className="mb-14 mt-12 flex flex-col sm:mt-5 md:mb-20 md:mt-20">
            <div className="flex flex-col items-start justify-between sm:flex-row md:mb-8 sm:space-x-4">
              {editFormData.tagThai === 'ชมรม' ? (
                <div className="flex bg-gradient-to-b lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="sm:py-1 sm:text-3xl sm:leading-[1.8] md:py-2 md:text-5xl md:leading-[1.5] lg:py-2 lg:text-7xl lg:leading-[1.3]">
                    ชมรมนี้
                  </p>

                  <p className="sm:text-3xl md:text-5xl lg:text-7xl">ทำอะไร</p>
                  <div className="flex justify-center">
                    <SLamp1 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : editFormData.tagThai === 'องค์กร' ? (
                <div className="flex bg-gradient-to-b lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col sm:items-end">
                      <p className="-mb-2 sm:py-1 sm:text-xs sm:leading-[1.8] md:py-2 md:text-4xl md:leading-[1.4] lg:py-2 lg:text-6xl lg:leading-[1.3]">
                    องค์กรนี้
                  </p>

                  <p className="sm:text-xl md:text-3xl lg:text-4xl xl:text-5xl">ทำอะไร</p>
                  <div className="flex justify-center">
                    <SLamp1 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : (
                <div className="flex bg-gradient-to-b  lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="sm:text-xs md:text-4xl lg:text-5xl">การรับสมัคร</p>
                  <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
                  <p className="sm:text-xl md:text-4xl lg:text-5xl">การสอบเข้า</p>
                  <div className="flex justify-center">
                    <SLamp1 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              )}
              <div className="relative z-10 sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -left-12 -top-32 -z-10 sm:-left-[344px] md:-left-[490px] lg:top-0">
                  <Stainedglass className="w-16 sm:w-32 lg:hidden" />
                </div>
                <div className="absolute lg:-left-[510px] lg:-top-24 xl:-left-[570px] 2xl:-left-[870px]">
                  <BigStainedGlass className="hidden sm:w-32 md:w-48 lg:block xl:w-52 2xl:w-72" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover transition-opacity duration-500 sm:h-48 sm:w-2/3 md:h-60 md:w-[50vw] lg:h-72 xl:w-[40vw] 2xl:w-[27vw]"
                  src={formData.captureimg1 ? formData.captureimg1 : editFormData.captureimg1}
                  alt="uploaded photo"
                  width={800}
                  height={600}
                  quality={100}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                  </div>
                )}
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-xs text-greenText sm:text-sm">{formData.descimg1 ? formData.descimg1 : editFormData.descimg1}</p>
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: formData.text1 ? formData.text1 : editFormData.text1
              }}
              className="w-full preview-content rounded-3xl bg-[#FFF7EB] bg-opacity-50 p-6 font-BaiJamjuree font-normal text-greenText"
            ></div>
          </div>
          {/* section 2 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col-reverse items-center justify-between sm:flex-row md:mb-8">
              <div className="relative sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -right-12 -top-52 z-10 sm:-right-[264px] md:-right-[480px] md:-top-10 xl:-right-[570px] 2xl:-right-[870px]">
                  <Flower className="w-16 sm:w-28 md:w-52 lg:w-72 2xl:w-96" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover transition-opacity duration-500 sm:h-48 sm:w-2/3 md:h-60 md:w-[50vw] lg:h-72 xl:w-[40vw] 2xl:w-[27vw]"
                  src={formData.captureimg2 ? formData.captureimg2 : editFormData.captureimg2}
                  alt="uploaded photo"
                  width={800}
                  height={800}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                  </div>
                )}
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-greenText">{formData.descimg2 ? formData.descimg2 : editFormData.descimg2}</p>
                </div>
              </div>
              {editFormData.tagThai === 'ชมรม' ? (
                <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col md:ml-4">
                  <p className="sm:text-4xl md:text-5xl lg:text-7xl">ประโยชน์</p>
                  <p className="sm:text-lg md:text-2xl lg:text-4xl">ที่ได้รับ</p>
                  <p className="sm:-mt-2 sm:text-lg md:text-lg lg:text-3xl">จากการเข้าชมรม</p>
                  <div className="flex justify-center 2xl:justify-start">
                    <SLamp2 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : editFormData.tagThai === 'องค์กร' ? (
                <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col md:ml-4">
                  <p className="sm:text-lg md:text-5xl lg:text-6xl">ตำแหน่ง</p>
                  <p className="sm:text-lg md:text-2xl lg:text-4xl">/หน้าที่</p>
                  <div className="flex justify-center 2xl:justify-start">
                    <SLamp2 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : (
                <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col md:ml-4">
                  <p className="sm:text-2xl md:text-7xl">วิชา /</p>
                  <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
                  <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
                  <div className="flex justify-center 2xl:justify-start">
                    <SLamp2 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              )}
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: formData.text2 ? formData.text2 : editFormData.text2,
              }}
              className="w-full preview-content rounded-3xl bg-[#FFF7EB] bg-opacity-50 p-6 font-BaiJamjuree font-normal text-greenText"
            ></div>
          </div>
          {/* section 3 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col items-end justify-between sm:flex-row md:mb-8 md:items-center sm:space-x-4">
              {editFormData.tagThai === 'ชมรม' ? (
                <div className="flex bg-gradient-to-b lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="sm:text-5xl md:text-6xl lg:text-7xl">ผลงาน</p>
                  <p className="sm:text-3xl md:text-4xl lg:text-5xl">ของชมรม</p>
                  <div className="flex justify-center">
                    <SLamp3 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : editFormData.tagThai === 'องค์กร' ? (
                <div className="flex bg-gradient-to-b lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col sm:items-end">
                  <p className="sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">ผลงาน</p>
                  <p className="sm:text-3xl md:text-3xl lg:text-3xl xl:text-5xl">ขององค์กร</p>
                  <div className="flex justify-center">
                    <SLamp3 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              ) : (
                <div className="flex bg-gradient-to-b lg:mr-4 xl:mr-0 from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                  <p className="-mb-3 sm:text-xl sm:leading-[2] md:text-4xl md:leading-[1.7] lg:text-5xl lg:leading-[1.5]">
                    ความน่าสนใจ
                  </p>
                  <p className="sm:text-5xl md:text-6xl lg:text-7xl">ของ</p>
                  <p className="sm:text-3xl md:text-4xl lg:text-5xl">สายการเรียน</p>
                  <div className="flex justify-center">
                    <SLamp3 className="hidden sm:block sm:w-28" />
                  </div>
                </div>
              )}
              <div className="relative z-10 sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -left-10 -top-60 -z-10">
                  <Lamp className="w-32 sm:hidden" />
                </div>
                <div className="absolute -left-[344px] -top-48 lg:-left-[480px] xl:-left-[570px] 2xl:-left-[870px]">
                  <LeftFrames className="hidden sm:block sm:w-32 md:w-44 lg:w-52 2xl:w-72" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover transition-opacity duration-500 sm:h-48 sm:w-2/3 md:h-60 md:w-[50vw] lg:h-72 xl:w-[40vw] 2xl:w-[27vw]"
                  src={formData.captureimg3 ? formData.captureimg3 : editFormData.captureimg3}
                  alt="uploaded photo"
                  width={800}
                  height={600}
                  onLoad={handleImageLoad}
                />
                {!imageLoaded && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                  </div>
                )}
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-xs text-greenText sm:text-sm">{formData.descimg3 ? formData.descimg3 : editFormData.descimg3}</p>
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: formData.text3 ? formData.text3 : editFormData.text3
              }}
              className="w-full preview-content rounded-3xl bg-[#FFF7EB] bg-opacity-50 p-6 font-BaiJamjuree font-normal text-greenText"
            ></div>
          </div>
          {/* end section3 */}

          {/* Review */}
          <div className="mb-4 flex items-center justify-center space-x-4 md:mb-10">
            <div className="h-[2px] w-16 rounded-full bg-greenText md:w-28 lg:w-36 xl:w-48"></div>
            <p className="inline-block h-full bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold leading-[1.85] text-transparent sm:text-4xl sm:leading-[1.6] md:text-5xl md:leading-[1.4]">
              รีวิวจากรุ่นพี่
            </p>
            <div className="h-[2px] w-16 rounded-full bg-greenText md:w-28 lg:w-36 xl:w-48"></div>
          </div>

          <section className="flex flex-col space-y-10">
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="flex w-full items-start justify-around">
                <div className="flex flex-col">
                  <div className="flex flex-col items-start justify-center">
                    <Image
                      className={`mb-3 h-[66px] w-16 rounded-md transition-opacity duration-500 sm:h-24 sm:w-24 md:h-[150px] md:w-36 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                      src={reviewData1.profile ? reviewData1.profile : review1.profile}
                      alt="photo"
                      width={100}
                      height={100}
                      onLoad={handleImageLoad}
                    />
                    {!imageLoaded && (
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                        <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                      </div>
                    )}
                  </div>

                  <div className="mt-2 flex flex-col text-greenText">
                    <p className="text-lg font-bold md:text-3xl">{reviewData1.nick ? reviewData1.nick : review1.nick}</p>
                    <p className="text-xs md:text-lg">เตรียมอุดม {reviewData1.gen ? reviewData1.gen : review1.gen}</p>
                    <p className="text-xs md:text-lg">{reviewData1.contact ? reviewData1.contact : review1.contact}</p>
                  </div>
                </div>
                <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                  <div className="absolute -right-14 -top-40">
                    <Frames className="w-16 sm:hidden" />
                  </div>
                  <div className="absolute -right-20 -top-96 md:-right-36 lg:-right-56 lg:-top-[420px]">
                    <BigLamp className="hidden w-48 sm:block md:w-60 lg:w-[480px]" />
                  </div>
                  <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                    <DoubleQuoteUp className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                  </div>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: reviewData1.content ? reviewData1.content : review1.content,
                    }}
                    className="text-[12px] preview-content text-white sm:text-xl"
                  ></div>
                  <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                    <DoubleQuoteDown className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                  </div>
                </div>
              </div>
            </div>
            {ReviewAmount >= 2 && (
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex w-full items-start justify-around">
                  <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute -left-14 top-0 sm:-left-40 md:-left-56 lg:-left-[260px]">
                      <Vase className="hidden w-16 sm:block sm:w-36 md:w-40 lg:w-52" />
                    </div>
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: reviewData2.content ? reviewData2.content : review2.content,
                      }}
                      className="text-[12px] preview-content text-white sm:text-xl"
                    ></div>
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                      <DoubleQuoteDown className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-end justify-center">
                      <Image
                        className={`mb-3 h-[66px] w-16 rounded-md transition-opacity duration-500 sm:h-24 sm:w-24 md:h-[150px] md:w-36 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={reviewData2.profile ? reviewData2.profile : review2.profile}
                        alt="photo"
                        width={100}
                        height={100}
                        onLoad={handleImageLoad}
                      />
                      {!imageLoaded && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex flex-col items-end text-end text-greenText">
                      <p className="text-lg font-bold md:text-3xl">{reviewData2.nick ? reviewData2.nick : review2.nick}</p>
                      <p className="text-xs md:text-lg">เตรียมอุดม {reviewData2.gen ? reviewData2.gen : review2.gen}</p>
                      <p className="text-xs md:text-lg">{reviewData2.contact ? reviewData2.contact : review2.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {ReviewAmount === 3 && (
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex w-full items-start justify-around">
                  <div className="flex flex-col">
                    <div className="flex flex-col items-start justify-center">
                      <Image
                        className={`mb-3 h-[66px] w-16 rounded-md transition-opacity duration-500 sm:h-24 sm:w-24 md:h-[150px] md:w-36 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                        src={reviewData3.profile ? reviewData3.profile : review3.profile}
                        alt="photo"
                        width={100}
                        height={100}
                        onLoad={handleImageLoad}
                      />
                      {!imageLoaded && (
                        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                          <div className="h-8 w-8 animate-spin rounded-full border-4 border-t-4 border-solid border-green-500"></div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 flex flex-col text-greenText">
                      <p className="text-lg font-bold md:text-3xl">{reviewData3.nick ? reviewData3.nick : review3.nick}</p>
                      <p className="text-xs md:text-lg">เตรียมอุดม {reviewData3.gen ? reviewData3.gen : review3.gen}</p>
                      <p className="text-xs md:text-lg">{reviewData3.contact ? reviewData3.contact : review3.contact}</p>
                    </div>
                  </div>
                  <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                    </div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: reviewData3.content ? reviewData3.content : review3.content,
                      }}
                      className="text-[12px] preview-content text-white sm:text-xl"
                    ></div>
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                      <DoubleQuoteDown className="h-3 w-3 text-greenText md:h-4 md:w-4" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </section>

      <div className="relative overflow-hidden pb-48 sm:pb-96 md:pb-[580px] xl:pb-[800px] 2xl:pb-[1000px]">
        <div className="absolute -bottom-[150px] left-1/2 -translate-x-1/2 sm:-bottom-[60px] md:-bottom-[20px] lg:hidden">
          <Lowercurve className="w-[100vw]" />
        </div>
        <div className="absolute -bottom-10 z-10 sm:bottom-5">
          <Footer className="w-[100vw] lg:hidden" />
        </div>
        <div className="absolute bottom-0 left-1/2 w-screen -translate-x-1/2 overflow-hidden lg:-bottom-14 xl:-bottom-5 2xl:-bottom-10">
          <BigLowercurve className="hidden w-full lg:block xl:h-[50vw]" />
        </div>

        <div className="absolute z-10 lg:-bottom-8 xl:-bottom-1 2xl:-bottom-5">
          <BigFooter className="hidden w-[100vw] lg:block 2xl:h-[10vw]" />
        </div>
      </div>
    </section>
  )
}

export default PreviewGeneralForm
