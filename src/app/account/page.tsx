import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'
import { Status } from '@utils/type'
import { FaPen } from 'react-icons/fa'

import apiFunction from '@/components/api'
import LogoutButton from '@/components/LogoutButton'
import Section from '@/vectors/dashboard/Section'

const StatusMessage = ({ status }: { status: Status }) => {
  const statusInfo =
    {
      [Status.APPROVED]: { color: '#19C57C', text: 'ผ่านการตรวจสอบ' },
      [Status.REJECTED]: { color: '#E80808', text: 'ไม่ผ่านการตรวจสอบ' },
      [Status.PENDING]: { color: '#FCB52B', text: 'อยู่ระหว่างการตรวจสอบ' },
    }[status] || null

  return statusInfo ? (
    <div className="mt-2 flex items-center justify-center space-x-1 sm:mt-0">
      <div
        className="h-4 w-4 rounded-full sm:h-5 sm:w-5 md:h-6 md:w-6"
        style={{ backgroundColor: statusInfo.color }}
      ></div>
      <p className={`text-[${statusInfo.color}] sm:text-lg md:text-2xl`}>{statusInfo.text}</p>
    </div>
  ) : (
    <p className="mt-2 sm:mt-0">ยังไม่ได้ส่งแบบฟอร์ม</p>
  )
}

const AccountPage = async () => {
  const userResponse = await apiFunction('GET', '/user', {})

  const { tag, name, key, picture, TUCMC } = userResponse.data

  let userFormData: { thainame?: string; members?: number; status?: Status } = {}

  if (tag && key) {
    const userFormResponse = await apiFunction('GET', `/${tag}/${key}/`, {})
    userFormData = userFormResponse?.data?.data || {}
  }

  const { thainame, members, status } = userFormData
  const submittedInit = !!tag

  return (
    <section className="flex h-screen flex-col items-center justify-center text-formText space-y-2 sm:space-y-4">
      <p className="mb-2 text-xs sm:mb-0 sm:text-lg">
        {submittedInit ? 'ข้อมูลหน่วยงาน' : 'ยินดีต้อนรับ'}
      </p>
      <div className="h-16 w-16 overflow-hidden rounded-full sm:h-20 sm:w-20">
        <Image src={picture} alt="profile" width={150} height={150} />
      </div>
      <p className="relative -space-y-2 bg-gradient-to-b from-heroFirst via-heroMiddle to-greenText bg-clip-text text-xl font-bold text-transparent sm:flex sm:text-2xl md:text-4xl">
        {submittedInit ? thainame : name}
      </p>
      {submittedInit && <p className="opacity-70">จำนวนสมาชิก {members} คน</p>}
      <Section className="w-[80vw] -my-5 sm:w-full" />

      <Link
        href={
          TUCMC ? '/account/dashboard' : submittedInit ? `/editingform/${tag}` : '/account/forms'
        }
      >
        <div className="flex items-center justify-center space-x-2 rounded-full bg-gradient-to-r from-heroFirst from-10% via-heroMiddle via-55% to-greenText bg-size-200 bg-pos-0 px-8 py-1 text-white transition-all duration-500 hover:bg-pos-100 sm:px-20 sm:py-2">
          <p>
            {TUCMC
              ? 'ตรวจสอบข้อมูลหน่วยงาน'
              : submittedInit
                ? 'แก้ไข'
                : 'เลือกหน่วยงานที่รับผิดชอบ'}
          </p>
          <FaPen className="h-2 w-2 sm:h-3 sm:w-3" />
        </div>
      </Link>

      {submittedInit && status !== undefined && <StatusMessage status={status} />}

      {TUCMC ? (
        ''
      ) : (
        <div className="mt-2 text-center sm:mt-0">
          <p className="text-md sm:text-2xl">แก้ไขข้อมูลหน่วยงาน</p>
          <p className="md:text-md text-xs opacity-70 sm:text-sm">ข้อมูลจะแสดงผลในหน้าเว็บไซต์</p>
        </div>
      )}
      <LogoutButton />
    </section>
  )
}

export default AccountPage
