"use client";
import React from "react";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import BackArrow from "@/vectors/edit-page/BackArrow";
import { Status } from "@utils/type";
import "react-toastify/dist/ReactToastify.css";

const PreviewGeneralForm: React.FC<{
  editFormData: any;
  review1: any;
  review2: any;
  review3: any;
}> = ({ editFormData, review1, review2, review3 }) => {
  return (
    <section className="mx-10 mt-16 sm:mx-24">
      <section className="mb-8 flex flex-col items-start space-y-3">
        <div className="flex items-center justify-center space-x-1">
          <Link href="/account">
            <BackArrow className="h-5 w-5 sm:h-8 sm:w-8 md:h-10 md:w-10" />
          </Link>
          <Link
            href="/account"
            className="font-Thai text-xs text-greenText sm:text-lg md:text-2xl"
          >
            ย้อนกลับ
          </Link>
        </div>
        <div>
          <div className="flex w-[80vw] items-center justify-between">
            <div className="flex items-center justify-center space-x-2">
              <p className="md:text-md text-xs sm:text-sm lg:text-lg">
                สถานะ:{" "}
              </p>
              {
                editFormData.status !== Status.PENDING ? (
                  editFormData.status === Status.APPROVED ? (
                    <div className="flex items-center justify-center space-x-1 sm:mt-0">
                      <div className="h-2 w-2 rounded-full bg-[#19C57C] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                      <p className="md:text-md text-xs text-[#19C57C] sm:text-sm">
                        ผ่านการตรวจสอบ
                      </p>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-1 sm:mt-0">
                      <div className="h-2 w-2 rounded-full bg-[#E80808] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                      <p className="md:text-md text-xs text-[#E80808] sm:text-sm">
                        ไม่ผ่านการตรวจสอบ
                      </p>
                    </div>
                  )
                ) : (
                  <div className="flex items-center justify-center space-x-1 sm:mt-0">
                    <div className="h-2 w-2 rounded-full bg-[#FCB52B] sm:h-5 sm:w-5 md:h-6 md:w-6"></div>
                    <p className="md:text-md text-xs text-[#FCB52B] sm:text-sm">
                      อยู่ระหว่างการตรวจสอบ
                    </p>
                  </div>
                )
              }
            </div>

            <div className="flex items-center justify-center space-x-2 sm:space-x-4">
              <Link
                href={`/preview/${editFormData.tag}`}
                className="md:text-md rounded-full border border-greenText px-2 text-xs text-greenText transition-all hover:bg-greenText hover:text-white sm:px-4 sm:text-lg"
              >
                preview
              </Link>
              <button
                className="rounded-full border bg-gradient-to-r from-buttonFirst via-buttonMiddle to-greenText px-2 font-Thai text-xs font-extralight text-white sm:px-4 sm:text-lg"
                type="submit"
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
          <div className="flex h-40 w-full flex-col items-center justify-center space-y-2 text-xs text-white sm:h-60 sm:w-3/5 sm:space-y-4 md:mx-auto">
            <p className="sm:border-3 rounded-full border border-white px-6 py-1 text-lg font-extrabold sm:text-2xl">
              {editFormData.thainame}
            </p>
            <div className="flex">
              <p>{editFormData.tagThai}</p>
              <p> member data</p>
              <p>คน</p>
            </div>
            <div className="sm:space-y-2">
              <div className="space-y-1 text-start sm:text-lg">
                <div className="flex">
                  <p>IG : data</p>
                </div>
                <div className="flex">
                  <p>FB : data</p>
                </div>
                <div className="flex">
                  <p>อื่น ๆ : others data </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* section1 */}
        <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
          <div className="flex flex-col items-start justify-between sm:flex-row">
            <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
              <p className="sm:text-xs md:text-4xl lg:text-5xl">การรับสมัคร</p>
              <p className="sm:text-3xl md:text-6xl lg:text-7xl">และ</p>
              <p className="sm:text-xl md:text-4xl lg:text-5xl">การสอบเข้า</p>
            </div>
            <div className="sm:w-[50vw] md:w-[60vw]">
            <Image
                      className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                      src={imageUrl1 || ""}
                      alt="uploaded photo"
                      width={0}
                      height={0}
                    />
              <div className="mb-3 flex items-center justify-center">
                <p>photo description 1 data</p>
              </div>
            </div>
          </div>
          <p>text field 1</p>
        </div>
        {/* section 2 */}
        <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
          <div className="flex flex-col items-start justify-between sm:flex-row-reverse">
            <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
              <p className="sm:text-2xl md:text-7xl">วิชา /</p>
              <p className="sm:text-lg md:text-2xl">หลักสูตรเพิ่มเติม</p>
              <p className="sm:text-lg md:text-2xl">ที่เรียน</p>
            </div>
            <div className="sm:w-[50vw] md:w-[60vw]">
            <Image
                      className="mx-auto mb-3 h-44 w-[80vw] rounded-lg object-cover sm:h-48 sm:w-4/5 md:h-60 lg:h-72"
                      src={imageUrl2 || ""}
                      alt="uploaded photo"
                      width={0}
                      height={0}
                    />

              <div className="mb-3 flex items-center justify-center">
                <p>photo description 2 data</p>
              </div>
            </div>
          </div>
          <p>text field 2</p>
        </div>
        {/* section 3 */}
        <div className="mb-14 mt-3 flex flex-col sm:mt-5 md:mb-20 md:mt-8">
          <div className="flex flex-col items-start justify-between sm:flex-row">
            <div className="flex bg-gradient-to-b from-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:w-2/5 sm:flex-col">
              <p className="sm:text-3xl md:text-4xl lg:text-5xl">ความน่าสนใจ</p>
              <p className="sm:text-5xl md:text-6xl lg:text-7xl">ของ</p>
              <p className="sm:text-3xl md:text-4xl lg:text-5xl">สายการเรียน</p>
            </div>
            <div className="sm:w-[50vw] md:w-[60vw]">

              <div className="mb-3 flex items-center justify-center">
                <p>photo description 3</p>
              </div>
            </div>
          </div>
          <p>text field 3</p>
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
                <Image
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
                      />
                </div>
                <div className="mt-2 flex flex-col">
                  <p>nick 1</p>
                  <p>gen 1</p>
                  <p>contact 1</p>
                </div>
              </div>
              <p>review 1</p>
            </div>
          </div>
          {ReviewAmount >= 2 && (
            <div className="flex flex-col items-center justify-center space-y-3">
              <div className="flex w-full items-center justify-around">
                <p>review 5</p>
                <div className="flex flex-col">
                  <div className="flex flex-col items-center justify-center">
                  <Image
                        className="mb-3"
                        src={imageUrl5 || ""}
                        alt="photo4"
                        width={100}
                        height={100}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                      />
                  </div>
                  <div className="mt-2 flex flex-col items-end">
                    <p>nick 2</p>
                    <p>gen 2</p>
                    <p>contact 2</p>
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
                  <Image
                        className="mb-3"
                        src={imageUrl6 || ""}
                        alt="photo6"
                        width={100}
                        height={100}
                        style={{
                          width: "3rem",
                          height: "3rem",
                          borderRadius: "0.5rem",
                        }}
                      />
                  </div>
                  <div className="mt-2 flex flex-col">
                    <p>nick 3</p>
                    <p>gen 3</p>
                    <p>contact 3</p>
                  </div>
                </div>
                <p>review 3</p>
              </div>
            </div>
          )}
        </section>
      </section>
    </section>
  );
};

export default PreviewGeneralForm;
