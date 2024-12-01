'use client'

import React, { useState } from 'react'
import Swal from 'sweetalert2'

import { AllData } from '@/libs/data'
import { changeUserData, getUser } from './Modal.action'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [activeTab, setActiveTab] = useState<'search' | 'edit'>('search')
  const [userData, setUserData] = useState<any>(null) 
  const [keyData, setKeyData] = useState<string | null>(null) 
  const [isLoading, setIsLoading] = useState(false) 
  const [error, setError] = useState<string>('') 
  const [selectedType, setSelectedType] = useState<
    'clubs' | 'organizations' | 'programs' | 'gifted' | null
  >(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [emailInput, setEmailInput] = useState<string>('') 
  const [isSubmitting, setIsSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSearchClick = () => {
    setActiveTab('search')
  }

  const handleEditClick = () => {
    setActiveTab('edit')
  }

  const handleSearchSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const email = e.currentTarget.email.value
    setIsLoading(true) 
    setError('') 
    try {
      const data = await getUser(email)
      if (data) {
        setUserData(data)
        const key = decodeURIComponent(data.key) 
        const findKey = (tag: string) => {
          switch (tag) {
            case 'clubs':
              return AllData.Clubs[key as keyof typeof AllData.Clubs]
            case 'organizations':
              return AllData.Organizations[key as keyof typeof AllData.Organizations]
            case 'programs':
              return AllData.Programs[key as keyof typeof AllData.Programs]
            case 'gifted':
              return AllData.Gifted[key as keyof typeof AllData.Gifted]
            default:
              return undefined
          }
        }

        const keyData = findKey(data.tag)
        if (keyData) {
          setKeyData(keyData as unknown as string)
        } else {
          setError('Key data not found.')
        }
      } else {
        setError('User not found or invalid response.')
      }
    } catch (err) {
      setError('Failed to fetch user data.') 
    } finally {
      setIsLoading(false) 
    }
  }

  const handleEditSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    
    setIsSubmitting(true) 

    const email = e.currentTarget.email.value

    
    if (!email) {
      setError('Email is required.')
      setIsSubmitting(false) 
      return
    }
    if (!selectedType) {
      setError('Please select a type (e.g., clubs, organizations).')
      setIsSubmitting(false) 
      return
    }
    if (!selectedOption) {
      setError('Please select an option.')
      setIsSubmitting(false) 
      return
    }

    setError('') 

    const optionName = Object.entries(
      AllData[capitalizeFirstLetter(selectedType) as keyof typeof AllData] as Record<
        string,
        string
      >,
    ).find(([key, name]) => key === selectedOption)?.[1]

    
    const confirmation = await Swal.fire({
      icon: 'warning',
      title: 'ต้องการแก้ไขข้อมูล?',
      html: `ย้ายผู้ใช้ ${email} <p>ไป <b>${selectedType === 'clubs' ? 'ชมรม' : ''}${optionName}</b> ?</p>`,
      showCancelButton: true,
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    })

    if (!confirmation.isConfirmed) {
      setIsSubmitting(false) 
      return 
    }

    
    try {
      const response = await changeUserData(email, selectedType, selectedOption)
      if (!response) {
        Swal.fire({
          icon: 'error',
          title: 'เกิดข้อผิดพลาด',
          text: 'เกิดข้อผิดพลาดในการแก้ไขข้อมูล',
        })
        setIsSubmitting(false) 
        return
      }
      switch (response?.status) {
        case 200:
          Swal.fire({
            icon: 'success',
            title: 'สำเร็จ',
            text: 'ข้อมูลผู้ใช้ได้รับการเปลี่ยนแปลงเรียบร้อยแล้ว',
          }).then(() => {
            setEmailInput(email) 
            setActiveTab('search') 
            setUserData(null) 
          })
          break
        case 400:
          setError('Bad Request')
          break
        case 404:
          setError('User not found')
          break
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'เกิดข้อผิดพลาด',
        text: 'ไม่สามารถส่งข้อมูลได้',
      })
      setError('Failed to submit changes.')
    } finally {
      setIsSubmitting(false) 
    }
  }

  const handleTypeChange = (type: 'clubs' | 'organizations' | 'programs' | 'gifted') => {
    setSelectedType(type)
    setSelectedOption(null) 
  }

  const handleOptionChange = (option: string) => {
    setSelectedOption(option)
  }

  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-1/3 rounded-lg bg-white p-6">
        <div className="flex items-center justify-between border-b pb-4">
          <h2 className="text-xl font-bold">ระบบแก้ไขข้อมูลผู้ใช้</h2>
          <div className="flex space-x-4">
            <button
              onClick={handleSearchClick}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
            >
              ค้นหาข้อมูลผู้ใช้
            </button>
            <button
              onClick={handleEditClick}
              className="rounded-lg bg-yellow-500 px-4 py-2 text-white hover:bg-yellow-700"
            >
              แก้ไขข้อมูลผู้ใช้
            </button>
          </div>
        </div>

        {activeTab === 'search' ? (
          <div>
            <h3 className="mt-5 text-lg font-bold">ค้นหาข้อมูลผู้ใช้</h3>
            <form className="mt-4" onSubmit={handleSearchSubmit}>
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="border-gray-300 mt-2 w-full rounded-md border px-3 py-2"
                placeholder="กรอกอีเมลของผู้ใช้"
                required
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
              />
              <button
                type="submit"
                className="mt-4 rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-700"
              >
                {isLoading ? 'Loading...' : 'Search'}
              </button>
            </form>

            {isLoading && <p className="text-gray-500 mt-4">Loading...</p>}
            {error && <p className="mt-4 text-red-500">{error}</p>}
            {userData && (
              <div className="mt-4">
                <h4 className="font-bold">ข้อมูลผู้ใช้งาน:</h4>
                <pre className="bg-gray-100 mt-2 rounded-md p-4">อีเมล: {userData.email}</pre>
                <pre className="bg-gray-100 rounded-md p-4">ชื่อ: {userData.name}</pre>
                <pre className="bg-gray-100 rounded-md p-4">
                  หน่วยงาน:{' '}
                  {userData.tag === 'clubs'
                    ? 'ชมรม'
                    : userData.tag === 'organizations'
                      ? 'องค์กร'
                      : userData.tag === 'programs'
                        ? 'สายการเรียน'
                        : 'โครงการพัฒนาความสามารถพิเศษ'}
                </pre>
                <pre className="bg-gray-100 rounded-md p-4">ชื่อหน่วยงาน: {keyData}</pre>
              </div>
            )}
          </div>
        ) : (
          <div>
            <h3 className="mt-5 text-lg font-bold">แก้ไขข้อมูลผู้ใช้</h3>
            <form className="mt-4" onSubmit={handleEditSubmit}>
              <label htmlFor="email" className="block text-sm font-medium">
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="border-gray-300 mt-2 w-full rounded-md border px-3 py-2"
                placeholder="กรอกอีเมลของผู้ใช้"
                required
                value={emailInput} 
                onChange={(e) => setEmailInput(e.target.value)} 
              />

              {error && <p className="mt-4 text-red-500">{error}</p>}

              <label className="mt-5 block text-sm font-medium">ต้องการเปลี่ยนไปหน่วยงาน:</label>
              <div className="mt-2 flex space-x-4">
                {['clubs', 'organizations', 'programs', 'gifted'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <input
                      type="radio"
                      name="type"
                      value={type}
                      checked={selectedType === type}
                      onChange={() =>
                        handleTypeChange(type as 'clubs' | 'organizations' | 'programs' | 'gifted')
                      }
                      className="mr-2"
                    />
                    {type === 'clubs'
                      ? 'ชมรม'
                      : type === 'organizations'
                        ? 'องค์กร'
                        : type === 'programs'
                          ? 'สายการเรียน'
                          : 'โครงการพัฒนาความสามารถพิเศษ'}
                  </label>
                ))}
              </div>

              {selectedType && (
                <div className="mt-4">
                  <label className="block text-sm font-medium">
                    เลือก{' '}
                    {selectedType === 'clubs'
                      ? 'ชมรม'
                      : selectedType === 'organizations'
                        ? 'องค์กร'
                        : selectedType === 'programs'
                          ? 'สายการเรียน'
                          : 'โครงการ'}
                  </label>
                  <select
                    className="border-gray-300 mt-2 w-full rounded-md border px-3 py-2"
                    onChange={(e) => handleOptionChange(e.target.value)}
                    value={selectedOption || ''}
                  >
                    <option value="" disabled>
                      เลือกตัวเลือก
                    </option>
                    {Object.entries(
                      AllData[
                        capitalizeFirstLetter(selectedType) as keyof typeof AllData
                      ] as Record<string, string>,
                    ).map(([key, name]) => (
                      <option key={key} value={key}>
                        {name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <button
                type="submit"
                className={`mt-4 rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-700 ${isSubmitting ? 'cursor-not-allowed opacity-70' : ''}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'กำลังส่ง...' : 'แก้ไขข้อมูล'}
              </button>
            </form>
          </div>
        )}

        <button
          onClick={() => {
            setEmailInput('')
            setUserData(null)
            setActiveTab('search')
            onClose()
          }}
          className="mt-4 rounded-lg bg-red-500 px-4 py-2 text-white hover:bg-red-700"
        >
          ปิด
        </button>
      </div>
    </div>
  )
}

export default Modal
