import React from "react";
import LogoutButton from "@/components/LogoutButton";
import { redirect } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaLessThanEqual, FaWpforms } from "react-icons/fa6";
import Link from "next/link";
import apiFunction from "@/components/api";
import Section from "@/vectors/dashboard/Section";
import { FaPen } from "react-icons/fa";
import { Status } from "@utils/type";

const AccountPage = async () => {
  const userResponse = await apiFunction("GET", "/user", {});
  const userData = userResponse.data;
  if(userData.tag === "") redirect('/account/forms')
  const userForm = await apiFunction("GET", `/${userData.tag}/${userData.key}/`, {});

  const submittedInit = (userData.tag === "" || userData.tag === null || userData.tag === undefined ) ? false : true;
  const submittedForm = (userForm.data.data.sendForm) ? true : false;
  const checked = (userForm.data.data.status = Status.PENDING) ? false : true;
  const approved = (userForm.data.data.status = Status.APPROVED) ? true : false;


  return (
    <section className="flex h-screen flex-col items-center justify-center sm:space-y-4 text-formText">
      {submittedInit ? (
        <p className="text-xs sm:text-lg mb-2 sm:mb-0">ข้อมูลหน่วยงาน</p>
      ) : (
        <p className="text-xs sm:text-lg mb-2 sm:mb-0">ยินดีต้อนรับ</p>
      )}
      <p className="relative -space-y-2 bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
        {submittedInit ? <>{userForm.data.data.thainame}</> : <>{userData.name}</>}
      </p>
      {submittedInit ? (
        <p className="opacity-70">จำนวนสมาชิก {userForm.data.data.members} คน</p>
      ) : (
        ""
      )}
      <Section className="w-[80vw] sm:w-full" />
      {submittedInit ? (
        <Link href={`/editingform/${userData.tag}`}>
          <div className="to-91% flex items-center justify-center space-x-2 rounded-full transition-all duration-500 bg-gradient-to-r from-heroFirst from-10% via-heroMiddle via-55% to-greenText bg-size-200 bg-pos-0 hover:bg-pos-100 px-8 sm:px-20 py-1 sm:py-2 text-white">
            <p>แก้ไข</p>
            <FaPen className="h-2 w-2 sm:h-3 sm:w-3" />
          </div>
        </Link>
      ) : (
        <Link href={`/account/forms`}>
          <div className="to-91% flex items-center justify-center space-x-2 rounded-full transition-all duration-500 bg-gradient-to-r from-heroFirst from-10% via-heroMiddle via-55% to-greenText bg-size-200 bg-pos-0 hover:bg-pos-100 px-8 sm:px-20 py-1 sm:py-2 text-white">
            <p className="text-sm sm:text-lg">เลือกหน่วยงานที่รับผิดชอบ</p>
            <FaPen className="h-2 w-2 sm:h-3 sm:w-3" />
          </div>
        </Link>
      )}

      {submittedInit ? (
        submittedForm ? (
          checked ? (
            approved ? (
              <div className="flex items-center justify-center mt-2 sm:mt-0 space-x-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 rounded-full bg-[#19C57C]"></div>
                <p className="text-[#19C57C] sm:text-lg md:text-2xl">ผ่านการตรวจสอบ</p>
              </div>
            ) : (
              <div className="flex items-center justify-center mt-2 sm:mt-0 space-x-1">
                <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6  rounded-full bg-[#E80808]"></div>
                <p className="text-[#E80808] sm:text-lg md:text-2xl">ไม่ผ่านการตรวจสอบ</p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center mt-2 sm:mt-0 space-x-1">
              <div className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6  rounded-full bg-[#FCB52B]"></div>
              <p className="text-[#FCB52B] sm:text-lg md:text-2xl">อยู่ระหว่างการตรวจสอบ</p>
            </div>
          )
        ) : (
          <p className="mt-2 sm:mt-0">ยังไม่ได้ส่งแบบฟอร์ม</p>
        )
      ) : (
        ""
      )}

      <div className="text-center mt-2 sm:mt-0">
        <p className="sm:text-2xl text-md">แก้ไข้ข้อมูลหน่วยงาน</p>
        <p className="opacity-70 text-xs sm:text-sm md:text-md">ข้อมูลจะแสดงผลในหน้าเว็บไซต์</p>
      </div>
      <LogoutButton />
    </section>
  );
};

export default AccountPage;
