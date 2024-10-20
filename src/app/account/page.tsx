import React from 'react'
import LogoutButton from '@/components/LogoutButton'
import { getUser } from '@/server/middlewares/derive'
import { redirect } from 'next/navigation'
import { MdOutlineAccountCircle } from "react-icons/md";
import { FaWpforms } from "react-icons/fa6";
import Link from 'next/link'
import apiFunction from '@/components/api';

const AccountPage = async () => {
  const response = await apiFunction('GET', '/user', {})
  const data = response.data
  return (
    <section className='bg-gradient-to-tl from-blue-500 to-blue-400 text-white flex just w-full h-screen items-center'>
      <div className='w-full flex justify-center'>
        <div className='border rounded-md p-10 font-roboto'>
          <p className='font-semibold text-3xl'>Welcome {data?.name}</p>
          <p className='font-semibold text-3xl'>Email: {data?.email}</p>
        <div className='flex justify-around mt-5'>
          <div>
            <FaWpforms size={20} className='inline'/>
            <Link href={'/account/forms'} className='underline cursor-pointer inline'>Go To Form Page</Link>
          <div>
            <MdOutlineAccountCircle size={20} className='inline'/>
            <Link href={'/editingform'} className='underline cursor-pointer inline'>Edit your Form</Link>
          </div>
          </div>
        </div>
          <LogoutButton />
        </div>
      </div>
    </section>  
  )
}

export default AccountPage
