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

const ReviewAmount = 3;

const PreviewGeneralForm: React.FC<{
  editFormData: any;
  review1: any;
  review2: any;
  review3: any;
}> = ({ editFormData, review1, review2, review3 }) => {
  return (
    <section>
      {/* <div className="absolute -top-8">
        <Uppercurve className="w-full" />
      </div> */}
    <section className="bg-gradient-to-b from-[#ECF5C8] to-[#1B9A8A]">
      <section className="mx-10 mt-14 sm:mx-20">
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
              <p className="bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-2xl font-bold text-transparent sm:font-extrabold md:text-4xl">
                {editFormData.thainame}
              </p>
            </div>
            <div className="flex items-start justify-center space-x-4">
              <div className="flex items-center justify-center">
                <Profile className="h-10 w-10 text-greenText sm:h-12 sm:w-12 md:h-20 md:w-20" />
                <div className="flex flex-col items-center">
                  <p className="bg-gradient-to-b from-buttonMiddle to-greenText bg-clip-text text-lg font-bold text-transparent">
                    สมาชิก
                  </p>
                  <p className="bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent">
                    {editFormData.members}
                  </p>
                </div>
              </div>
              <div className="mx-6 h-16 w-[2px] rounded-full bg-greenText"></div>
              <div className="sm:space-y-2">
                <div className="bg-gradient-to-b from-greenText to-heroMiddle bg-clip-text text-xs text-transparent sm:text-sm">
                  {editFormData.ig && <p>IG : {editFormData.ig}</p>}
                  {editFormData.fb && <p>FB : {editFormData.fb}</p>}
                  {editFormData.others && <p>อื่น ๆ : {editFormData.others}</p>}
                </div>
              </div>
            </div>
            <Section className="h-8 sm:h-16" />
          </section>

          {/* section1 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col items-center justify-between sm:flex-row md:mb-8">
              <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                <p className="sm:text-xs md:text-4xl lg:text-5xl">
                  การรับสมัคร
                </p>
                <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
                <p className="sm:text-xl md:text-4xl lg:text-5xl">การสอบเข้า</p>
              </div>
              <div className="sm:w-[50vw] md:w-[60vw]">
                {/* <Image
                      className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                      src={imageUrl1 || ""}
                      alt="uploaded photo"
                      width={0}
                      height={0}
                    /> */}
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-greenText">photo description 1 data</p>
                </div>
              </div>
            </div>
            <p className="w-full rounded-3xl bg-[#FFF7EB] p-3 text-xs text-greenText sm:text-lg md:text-xl">
              {editFormData.admissions}
            </p>
          </div>
          {/* section 2 */}
          <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
            <div className="flex flex-col items-start justify-between sm:flex-row-reverse md:mb-8 md:items-center">
              <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
                <p className="sm:text-2xl md:text-7xl">วิชา /</p>
                <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
                <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
              </div>
              <div className="sm:w-[50vw] md:w-[60vw]">
                {/* <Image
                      className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                      src={imageUrl2 || ""}
                      alt="uploaded photo"
                      width={0}
                      height={0}
                    /> */}

                <div className="mb-3 flex items-center justify-center">
                  <p className="text-greenText">photo description 2 data</p>
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
                <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                  ความน่าสนใจ
                </p>
                <p className="sm:text-5xl md:text-6xl lg:text-7xl">ของ</p>
                <p className="sm:text-3xl md:text-4xl lg:text-5xl">
                  สายการเรียน
                </p>
              </div>
              <div className="sm:w-[50vw] md:w-[60vw]">
                <div className="mb-3 flex items-center justify-center">
                  <p className="text-greenText">photo description 3</p>
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
            <p className="inline-block bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-center text-2xl font-bold leading-10 text-transparent sm:text-4xl">
              รีวิวจากรุ่นพี่
            </p>
          </div>

          <section className="flex flex-col space-y-10">
            <div className="flex flex-col items-center justify-center space-y-5">
              <div className="flex w-full items-start justify-around">
                <div className="flex flex-col">
                  <div className="flex flex-col items-center justify-center">
                    {/* <Image
                        className="mb-3"
                        src={imageUrl4 || ""}
                        alt="photo4"
                        width={100}
                        height={100}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                      /> */}
                  </div>
                  <div className="mt-2 flex flex-col text-greenText">
                    <p className="text-lg font-bold">{review1.nick}</p>
                    <p className="text-xs">{review1.gen}</p>
                    <p className="text-xs">{review1.contact}</p>
                  </div>
                </div>
                <div className="relative w-3/5 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                  <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                    <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                  </div>
                  <p className="text-white">{review1.content}</p>
                  <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                    <DoubleQuoteDown className="h-4 w-4 text-greenText" />
                  </div>
                </div>
              </div>
            </div>
            {ReviewAmount >= 2 && (
              <div className="flex flex-col items-center justify-center space-y-5">
                <div className="flex w-full items-start justify-around">
                  <div className="relative w-3/5 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                    </div>
                    <p className="text-white">{review2.content}</p>
                    <div className="absolute bottom-2 right-2 sm:bottom-6 sm:right-6">
                      <DoubleQuoteDown className="h-4 w-4 text-greenText" />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="flex flex-col items-center justify-center">
                      {/* <Image
                        className="mb-3"
                        src={imageUrl4 || ""}
                        alt="photo4"
                        width={100}
                        height={100}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                      /> */}
                    </div>
                    <div className="mt-2 flex flex-col text-greenText">
                      <p className="text-lg font-bold">{review2.nick}</p>
                      <p className="text-xs">{review2.gen}</p>
                      <p className="text-xs">{review2.contact}</p>
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
                      {/* <Image
                        className="mb-3"
                        src={imageUrl4 || ""}
                        alt="photo4"
                        width={100}
                        height={100}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                      /> */}
                    </div>
                    <div className="mt-2 flex flex-col text-greenText">
                      <p className="text-lg font-bold">{review3.nick}</p>
                      <p className="text-xs">{review3.gen}</p>
                      <p className="text-xs">{review3.contact}</p>
                    </div>
                  </div>
                  <div className="relative w-3/5 rounded-3xl bg-gradient-to-br from-[#6FB07C] via-[#4F8D78] to-[#072923] p-6 text-[8px] shadow-md sm:p-10 sm:text-xs">
                    <div className="absolute left-2 top-2 sm:left-6 sm:top-6">
                      <DoubleQuoteUp className="h-4 w-4 text-greenText" />
                    </div>
                    <p className="text-white">{review3.content}</p>
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
    </section>
   </section>
  );
};

export default PreviewGeneralForm;
