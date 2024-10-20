import React from "react";
import LogoutButton from "@/components/LogoutButton";
import { getUser } from "@/server/middlewares/derive";
import { redirect } from "next/navigation";
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaLessThanEqual, FaWpforms } from "react-icons/fa6";
import Link from "next/link";
import apiFunction from "@/components/api";
import Section from "@/vectors/dashboard/Section";
import { FaPen } from "react-icons/fa";

const AccountPage = async () => {
  const response = await apiFunction("GET", "/user", {});
  const data = response.data;

  const test = {
    name: "ชมรมไพ่เพื่อการเรียนรู้",
    key: "gifted",
    members: 30,
  };

  const submittedInit = true;
  const submittedForm = false;
  const checked = true;
  const passed = true;

  console.log(data);
  return (
    <section className="flex h-screen flex-col items-center justify-center space-y-4 text-formText">
      {submittedInit ? (
        <p>ข้อมูลหน่วยงาน</p>
      ) : (
        <p className="text-xl">ยินดีตอนรับ</p>
      )}
      <p className="relative -space-y-2 bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
        {submittedInit ? <>{test.name}</> : <>{data.name}</>}
      </p>
      {submittedInit ? (
        <p className="opacity-70">จำนวนสมาชิก {test.members} คน</p>
      ) : (
        ""
      )}
      <Section />
      {submittedInit ? (
        <Link href={`/editingform/${test.key}`}>
          <div className="to-91% flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-heroFirst from-10% via-heroMiddle via-55% to-greenText px-20 py-2 text-white">
            <p>แก้ไข</p>
            <FaPen className="h-3 w-3" />
          </div>
        </Link>
      ) : (
        <Link href={`/account/forms`}>
          <div className="to-91% flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-heroFirst from-10% via-heroMiddle via-55% to-greenText px-20 py-2 text-white">
            <p>เลือกหน่วยงานที่รับผิดชอบ</p>
            <FaPen className="h-3 w-3" />
          </div>
        </Link>
      )}

      {submittedInit ? (
        submittedForm ? (
          checked ? (
            passed ? (
              <div className="flex items-center justify-center space-x-1">
                <div className="h-4 w-4 rounded-full bg-[#19C57C]"></div>
                <p className="text-[#19C57C]">ผ่านการตรวจสอบ</p>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-1">
                <div className="h-4 w-4 rounded-full bg-[#E80808]"></div>
                <p className="text-[#E80808]">ไม่ผ่านการตรวจสอบ</p>
              </div>
            )
          ) : (
            <div className="flex items-center justify-center space-x-1">
              <div className="h-4 w-4 rounded-full bg-[#FCB52B]"></div>
              <p className="text-[#FCB52B]">อยู่ระหว่างการตรวจสอบ</p>
            </div>
          )
        ) : (
          <p>ยังไม่ได้ส่งแบบฟอร์ม</p>
        )
      ) : (
        ""
      )}

      <div>
        <p className="text-2xl">แก้ไข้ข้อมูลหน่วยงาน</p>
        <p className="opacity-70">ข้อมูลจะแสดงผลในหน้าเว็บไซต์</p>
      </div>
    </section>
  );
};

export default AccountPage;
