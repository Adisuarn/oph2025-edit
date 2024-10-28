"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import Profile from "@/vectors/preview/Profile";
import BackArrow from "@/vectors/edit-page/BackArrow";
import { Status } from "@utils/type";
import "react-toastify/dist/ReactToastify.css";
import Section from "@/vectors/dashboard/Section";
import DoubleQuoteUp from "@/vectors/preview/DoubleQuoteUp";
import DoubleQuoteDown from "@/vectors/preview/DoubleQuoteDown";
import Uppercurve from "@/vectors/preview/Uppercurve";
import SLamp1 from "@/vectors/preview/SLamp1";
import SLamp2 from "@/vectors/preview/SLamp2";
import SLamp3 from "@/vectors/preview/SLamp3";
import FallingLamp from "@/vectors/preview/FallingLamp";
import ClubFallingLamp from "@/vectors/preview/ClubFallingLamp";
import Stainedglass from "@/vectors/preview/Stainedglass";
import Flower from "@/vectors/preview/Flower";
import Lamp from "@/vectors/preview/Lamp";
import LeftFrames from "@/vectors/preview/LeftFrames";
import Frames from "@/vectors/preview/Frames";
import Lowercurve from "@/vectors/preview/Lowercurve";
import Vase from "@/vectors/preview/Vase";
import BigLamp from "@/vectors/preview/BigLamp";
import Footer from "@/vectors/preview/Footer";
import BigUppercurve from "@/vectors/preview/BigUppercurve";
import BigFooter from "@/vectors/preview/BigFooter";
import BigLowercurve from "@/vectors/preview/BigLowercurve";

const ReviewAmount = 3;
const imageUrl =
  "https://alpenjournal.de/storage/2024/03/1200-grindelwald-schweiz.jpg";

const PreviewGeneralForm: React.FC<{
  editFormData: any;
  review1: any;
  review2: any;
  review3: any;
}> = ({ editFormData, review1, review2, review3 }) => {
  return (
    <section className="relative w-screen overflow-hidden bg-gradient-to-b from-[#ECF5C8] to-[#1B9A8A]">
      <div className="absolute -top-44 left-1/2 z-10 -translate-x-1/2 sm:-top-20">
        <Uppercurve className="w-[100vw] md:w-[110vw] lg:hidden" />
      </div>
      <div className="absolute -top-36 left-1/2 overflow-hidden -translate-x-1/2">
        <BigUppercurve className="hidden w-[100vw] lg:block" />
      </div>
      <div className="absolute -top-[76px]">
        <FallingLamp className="w-[100vw] sm:hidden" />
      </div>
      <div className="absolute sm:top-[146px] right-0">
        <ClubFallingLamp className="hidden sm:block w-2"/>
      </div>
      <section className="mx-12 pt-36 sm:mx-28 md:mx-36 sm:pt-72 md:pt-[400px] lg:mx-48">
        <section className="flex items-center justify-between">
          <div className="flex items-center justify-center space-x-1">
            <Link href="/account">
              <BackArrow className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
            </Link>
            <Link
              href="/account"
              className="text-xs text-greenText sm:text-lg md:text-2xl"
            >
              ย้อนกลับ
            </Link>
          </div>
          <p className="text-xs text-greenText sm:text-lg md:text-2xl">
            preview page
          </p>
        </section>

        {/* Hero */}
        <section className="w-full sm:mx-7">
          <section className="flex w-full flex-col items-center justify-center">
            <div className="flex h-20 w-full flex-col items-center justify-center md:mx-auto">
              <p className="bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-2xl sm:text-xl font-bold text-transparent sm:font-extrabold md:text-5xl">
                {editFormData.thainame}
              </p>
            </div>
            <div className="ml-6 flex items-center justify-center space-x-4">
              <div className="flex items-center justify-center">
                <Profile className="h-10 w-10 text-greenText sm:h-12 sm:w-12 md:h-20 md:w-20" />
                <div className="flex flex-col items-center">
                  <p className="text-md bg-gradient-to-b from-buttonMiddle to-greenText bg-clip-text font-bold text-transparent sm:text-2xl">
                    สมาชิก
                  </p>
                  <p className="bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
                    {editFormData.members}
                  </p>
                </div>
              </div>
              <div className="h-16 w-[2px] rounded-full bg-greenText"></div>
              <div className="sm:space-y-2">
                <div>
                  {editFormData.ig && (
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      IG : {editFormData.ig}
                    </p>
                  )}
                  {editFormData.fb && (
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      FB : {editFormData.fb}
                    </p>
                  )}
                  {editFormData.others && (
                    <p className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-lg">
                      อื่น ๆ : {editFormData.others}
                    </p>
                  )}
                </div>
              </div>
            </div>
            <Section className="h-12 sm:h-16 md:h-24" />
          </section>

          {/* section1 */}
          <div className="mb-14 mt-12 flex flex-col sm:mt-5 md:mb-20 md:mt-20">
            <div className="flex flex-col items-center justify-between sm:flex-row md:mb-8">
              <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                <p className="sm:text-xs md:text-4xl lg:text-5xl">
                  การรับสมัคร
                </p>
                <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
                <p className="sm:text-xl md:text-4xl lg:text-5xl">การสอบเข้า</p>
                <div className="flex justify-center">
                  <SLamp1 className="hidden sm:block sm:w-28" />
                </div>
              </div>
              <div className="relative z-10 sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -left-12 -top-32 -z-10 sm:-left-[344px] md:-left-[470px] lg:-left-[570px] lg:top-0">
                  <Stainedglass className="w-16 sm:w-32 lg:w-72" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                  src={editFormData.captureimg1 || ""}
                  alt="uploaded photo"
                  width={800}
                  height={600}
                  quality={100}
                />
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-xs text-greenText sm:text-sm">
                    {editFormData.descimg1}
                  </p>
                </div>
              </div>
            </div>
            <p className="w-full rounded-3xl bg-[#FFF7EB] p-3 text-xs text-greenText sm:text-lg md:text-xl">
              {editFormData.admissions}
            </p>
          </div>
          {/* section 2 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col-reverse items-center justify-between sm:flex-row md:mb-8">
              <div className="relative sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -right-12 -top-52 z-10 sm:-right-[264px] md:-right-[400px] md:-top-10 lg:-right-[540px]">
                  <Flower className="w-16 sm:w-28 md:w-52 lg:w-72" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                  src={editFormData.captureimg2 || ""}
                  alt="uploaded photo"
                  width={800}
                  height={800}
                />

                <div className="mb-3 flex items-center justify-center">
                  <p className="text-greenText">{editFormData.descimg2}</p>
                </div>
              </div>
              <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                <p className="sm:text-2xl md:text-7xl">วิชา /</p>
                <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
                <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
                <div className="flex justify-center">
                  <SLamp2 className="hidden sm:block sm:w-28" />
                </div>
              </div>
            </div>
            <p className="w-full rounded-3xl bg-[#FFF7EB] p-3 text-xs text-greenText sm:text-lg md:text-xl">
              {editFormData.courses}
            </p>
          </div>
          {/* section 3 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col items-end justify-between sm:flex-row md:mb-8 md:items-center">
              <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                <p className="sm:text-xl md:text-4xl lg:text-5xl">
                  ความน่าสนใจ
                </p>
                <p className="sm:text-3xl md:text-6xl lg:text-7xl">ของ</p>
                <p className="sm:text-xl md:text-4xl lg:text-5xl">
                  สายการเรียน
                </p>
                <div className="flex justify-center">
                  <SLamp3 className="hidden sm:block sm:w-28" />
                </div>
              </div>
              <div className="relative z-10 sm:w-[50vw] md:w-[60vw]">
                <div className="absolute -left-10 -top-60 -z-10">
                  <Lamp className="w-32 sm:hidden" />
                </div>
                <div className="absolute -left-[344px] -top-48 md:-left-[470px] lg:-left-[570px]">
                  <LeftFrames className="hidden sm:block sm:w-32 md:w-44 lg:w-52" />
                </div>
                <Image
                  className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                  src={editFormData.captureimg3 || ""}
                  alt="uploaded photo"
                  width={800}
                  height={600}
                />
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-xs text-greenText sm:text-sm">
                    {editFormData.descimg3}
                  </p>
                </div>
              </div>
            </div>
            <p className="w-full rounded-3xl bg-[#FFF7EB] p-3 text-xs text-greenText sm:text-lg md:text-xl">
              {editFormData.interests}
            </p>
          </div>
          {/* section 3 */}

          {/* end section3 */}

          <div className="mb-4 flex items-center justify-center space-x-4">
            <div className="h-[2px] w-16 rounded-full md:w-28 lg:w-36 bg-greenText"></div>
            <p className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold leading-extra-loose text-transparent sm:text-4xl">
              รีวิวจากรุ่นพี่
            </p>
            <div className="h-[2px] w-16 rounded-full md:w-28 lg:w-36 bg-greenText"></div>
          </div>

          <section className="flex flex-col space-y-10">
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="flex w-full items-start justify-around">
                <div className="flex flex-col">
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      className="mb-3 h-16 w-16 rounded-md sm:h-24 sm:w-24 md:h-36 md:w-36"
                      src={imageUrl || ""}
                      alt="photo"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="mt-2 flex flex-col text-greenText">
                    <p className="text-lg font-bold md:text-3xl">{review1.nick}</p>
                    <p className="text-xs md:text-lg">เตรียมอุดม {review1.gen}</p>
                    <p className="text-xs md:text-lg">{review1.contact}</p>
                  </div>
                </div>
                <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                  <div className="absolute -right-14 -top-36">
                    <Frames className="w-16 sm:hidden" />
                  </div>
                  <div className="absolute -right-20 md:-right-36 -top-96 lg:-right-56 lg:-top-80">
                    <BigLamp className="hidden w-48 sm:block md:w-60 lg:w-80" />
                  </div>
                  <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                    <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                  </div>
                  <p className="text-white sm:text-xl">{review1.content}</p>
                  <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                    <DoubleQuoteDown className="h-4 w-4 text-greenText" />
                  </div>
                </div>
              </div>
            </div>
            {ReviewAmount >= 2 && (
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex w-full items-start justify-around">
                  <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute -left-14 top-0 sm:-left-40 md:-left-56 lg:-left-[260px]">
                      <Vase className="w-16 sm:w-36 md:w-40 lg:w-52" />
                    </div>
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                    </div>
                    <p className="text-white sm:text-xl">{review2.content}</p>
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                      <DoubleQuoteDown className="h-4 w-4 text-greenText" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-end justify-center">
                      <Image
                        className="mb-3 h-16 w-16 rounded-md sm:h-24 sm:w-24 md:h-36 md:w-36"
                        src={imageUrl || ""}
                        alt="photo"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="mt-2 flex flex-col items-end text-greenText">
                      <p className="text-lg font-bold md:text-3xl">{review2.nick}</p>
                      <p className="text-xs md:text-lg">เตรียมอุดม {review2.gen}</p>
                      <p className="text-xs md:text-lg">{review2.contact}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {ReviewAmount === 3 && (
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex w-full items-start justify-around">
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        className="mb-3 h-16 w-16 rounded-md sm:h-24 sm:w-24 md:h-36 md:w-36"
                        src={imageUrl || ""}
                        alt="photo"
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="mt-2 flex flex-col text-greenText">
                      <p className="text-lg font-bold md:text-xl">{review3.nick}</p>
                      <p className="text-xs md:text-lg">เตรียมอุดม {review3.gen}</p>
                      <p className="text-xs md:text-lg">{review3.contact}</p>
                    </div>
                  </div>
                  <div className="relative w-4/6 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                    </div>
                    <p className="text-white sm:text-lg">{review3.content}</p>
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                      <DoubleQuoteDown className="h-4 w-4 text-greenText" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </section>
        </section>
      </section>

      <div className="relative overflow-hidden pb-48 sm:pb-96 md:pb-[580px]">
        <div className="absolute -bottom-[150px] left-1/2 -translate-x-1/2 sm:-bottom-[80px] md:-bottom-[20px] lg:hidden">
          <Lowercurve className="w-[100vw]" />
        </div>
        <div className="absolute -bottom-10 sm:-bottom-20 z-10">
          <Footer className="w-[100vw] lg:hidden" />
        </div>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <BigLowercurve className="hidden lg:block w-[100vw]"/>
        </div>
        <div className="absolute -bottom-10 z-10">
          <BigFooter className=" hidden lg:block w-[100vw]"/>
        </div>
        {/* <div className="absolute z-20 -bottom-48">
    <Footer className="w-full" />
  </div> */}
      </div>
    </section>
  );
};

export default PreviewGeneralForm;
