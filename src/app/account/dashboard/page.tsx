'use client'

import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import { updateStatus } from '@components/Dashboard/ViewData.action'
import { Status } from '@utils/type'
import { toast, Toaster } from 'react-hot-toast'

import BookIcon from '@/vectors/dashboard/BookIcon'
import PeopleIcon from '@/vectors/dashboard/PeopleIcon'
import { fetchHandler, viewHandler } from './page.action'
import LoadingSpinner from '@/components/Dashboard/LoadingSpinner'
import Modal from '@/components/Dashboard/Modal/Modal'

const HamburgerMenu = dynamic(() => import('@components/Dashboard/Hamburger'), { 
  ssr: false,
  loading: () => <LoadingSpinner />
})
const ViewData = dynamic(() => import('@components/Dashboard/ViewData'), { 
  ssr: false,
  loading: () => <LoadingSpinner />
})

interface DashboardData {
  organizations: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>
  programs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>
  clubs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>
  gifted: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>
}

interface FilterState {
  selectedFilter: string | null
  selectedStatus: Status | null
  viewData: any
  activeButton: { type: string; key: string } | null
}

const initialState: FilterState = {
  selectedFilter: null,
  selectedStatus: Status.PENDING,
  viewData: null,
  activeButton: null,
}

const filterReducer = (state: FilterState, action: any): FilterState => {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, selectedFilter: action.payload }
    case 'SET_STATUS':
      return { ...state, selectedStatus: action.payload }
    case 'SET_VIEW_DATA':
      return { ...state, viewData: action.payload.viewData, activeButton: action.payload.activeButton }
    case 'CLEAR_FILTER':
      return initialState
    default:
      return state
  }
}

const DashboardTUCMC: React.FC = () => {
  const router = useRouter()
  const [data, setData] = useState<DashboardData>({ organizations: [], programs: [], clubs: [], gifted: [] })
  const [filterState, dispatch] = useReducer(filterReducer, initialState)
  const [loading, setLoading] = useState<boolean>(false)
  const [viewDataLoading, setViewDataLoading] = useState<boolean>(false)
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false); 

  const fetchData = useCallback(async () => {
    setLoading(true)
    try {
      const results = await fetchHandler()
      if (results) {
        setData({
          organizations: results.props.organizations,
          programs: results.props.programs,
          clubs: results.props.clubs,
          gifted: results.props.gifted,
        })
        dispatch({ type: 'CLEAR_FILTER' })
      }
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด!')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      fetchData()
    }
  }, [fetchData])

  useEffect(() => {
    if (data.organizations.length > 0 || data.programs.length > 0 || data.clubs.length > 0 || data.gifted.length > 0) {
      dispatch({ type: 'SET_STATUS', payload: Status.PENDING })
    }
  }, [data])

  const handleStatusUpdate = useCallback(
    async (item: any, status: Status, rejectionMessage: string) => {
      await updateStatus(item, status, rejectionMessage)
      fetchData()
    },
    [fetchData],
  )

  const filterData = useCallback(
    (items: any[]) => {
      const { selectedFilter, selectedStatus } = filterState
      return items.filter((item) => {
        const matchesFilter = !selectedFilter || item.tag === selectedFilter
        const matchesStatus = selectedStatus === null || item.status === selectedStatus
        return matchesFilter && matchesStatus
      })
    },
    [filterState],
  )

  const filteredOrganizations = useMemo(() => filterData(data.organizations), [data.organizations, filterData])
  const filteredPrograms = useMemo(() => filterData(data.programs), [data.programs, filterData])
  const filteredClubs = useMemo(() => filterData(data.clubs), [data.clubs, filterData])
  const filteredGifted = useMemo(() => filterData(data.gifted), [data.gifted, filterData])

  const handleViewData = useCallback(
    async (tag: string, key: string, type: 'organization' | 'program' | 'club' | 'gifted') => {
      setViewDataLoading(true)
      try {
        const currentData = data[(type === 'gifted' ? type : type + 's') as keyof DashboardData].find(
          (item: any) => item.key === key,
        )

        if (filterState.viewData && filterState.viewData.type === type && filterState.viewData.data.data.thainame === currentData?.thainame) {
          dispatch({ type: 'SET_VIEW_DATA', payload: { viewData: null, activeButton: null } })
        } else {
          const fetchedData = await viewHandler(tag, key)
          const transformedData = {
            ...fetchedData.data,
            ...(type === 'gifted' || type === 'program'
              ? {
                activities: fetchedData.data.admissions,
                benefits: fetchedData.data.courses,
                working: fetchedData.data.interests,
              }
              : {}),
            ...(type === 'organization' ? { benefits: fetchedData.data.position } : {}),
          }
          dispatch({ type: 'SET_VIEW_DATA', payload: { viewData: { type, data: { data: transformedData } }, activeButton: { type, key } } })
        }
      } catch (error) {
        toast.error('เกิดข้อผิดพลาด!')
      } finally {
        setViewDataLoading(false)
      }
    },
    [data, filterState],
  )

  const clearFilter = useCallback(() => {
    dispatch({ type: 'CLEAR_FILTER' })
  }, [])

  const renderItem = useCallback(
    (item: any, type: 'organization' | 'program' | 'club' | 'gifted', index: number) => {
      const isVisible = filterState.viewData && filterState.viewData.type === type && filterState.viewData.data.data.thainame === item.thainame
      return (
        <div key={index}>
          <li className="border-gray-300 mb-4 flex items-center justify-between rounded-2xl border p-5">
            <div className="flex items-center">
              {type === 'organization' ? <PeopleIcon className="mr-2 h-6 w-6" /> : <BookIcon className="mr-2 h-6 w-6" />}
              <span className="ml-4 font-Thai text-lg font-medium">{item.thainame}</span>
            </div>
            <button
              className={`ml-4 rounded-3xl p-2 px-6 font-Thai text-white transition-all duration-300 
                ${filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key
                  ? 'bg-custom-gradient-inverse hover:scale-105 hover:opacity-75'
                  : 'bg-custom-gradient hover:scale-105 hover:opacity-75'}
                ${viewDataLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
              onClick={() => {
                const isActive = filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key
                if (isActive) {
                  handleViewData(item.tag, item.key, type)
                } else {
                  toast.promise(handleViewData(item.tag, item.key, type), {
                    loading: 'กำลังโหลดข้อมูล...',
                    success: 'ดูข้อมูลสำเร็จ!',
                    error: 'เกิดข้อผิดพลาด!',
                  })
                }
              }}
              disabled={viewDataLoading}
            >
              {viewDataLoading
                ? 'กำลังโหลดข้อมูล...'
                : filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key
                  ? 'คลิกเพื่อปิด'
                  : `ดูข้อมูล${type === 'organization' ? 'หน่วยงาน' : type === 'program' ? 'สายการเรียน' : type === 'club' ? 'ชมรม' : 'โครงการพัฒนาฯ'}`}
            </button>
          </li>
          {isVisible && (
            <div className={`overflow-hidden`}>
              <ViewData data={filterState.viewData.data} type={filterState.viewData.type} onStatusUpdate={handleStatusUpdate} />
            </div>
          )}
        </div>
      )
    },
    [filterState, handleStatusUpdate, viewDataLoading],
  )

  return (
    <>
      <Toaster position="top-center" />
      <div className="m-10 flex items-center justify-center">
        <div className="w-full max-w-6xl">
          <div className="mb-16">
            <p className="text-center font-Thai text-2xl font-bold">ตรวจสอบข้อมูลหน่วยงานบนเว็บไซต์</p>
          </div>

          {loading ? (
            <div className="flex h-64 flex-col items-center justify-center">
              <div className="loader border-gray-200 animate-spin rounded-full border-4 border-t-4 border-t-[#FCB528]"></div>
              <p className="mt-5">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <>
              <div className="mt-4 flex justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className={`mr-3 h-4 w-4 rounded-full ${filterState.selectedStatus === Status.PENDING ? 'bg-[#FCB528]' : filterState.selectedStatus === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]'}`}></p>
                    <p className="font-Thai text-lg">
                      {filterState.selectedStatus === Status.PENDING ? 'รอดำเนินการ' : filterState.selectedStatus === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
                    </p>
                  </div>
                </div>
                <div className="flex">
                    <button
                      type="button"
                      onClick={openModal}
                      className="mr-9 font-Thai text-lg text-white bg-[#FCB528] hover:bg-[#f59e0b] px-4 py-2 rounded-lg shadow-lg transform hover:scale-105 transition-all"
                    >
                      แก้ไขข้อมูลผู้ใช้งาน
                    </button>

                    <HamburgerMenu onFilterSelect={(filter) => dispatch({ type: 'SET_FILTER', payload: filter })} selectedFilter={filterState.selectedFilter} />
                </div>
              </div>

              <div className="mt-4 flex justify-between space-x-4">
                <div>
                  {Object.values(Status).map((status) => (
                    <button
                      key={status}
                      className={`transform rounded-lg p-2 transition-transform duration-300 ${filterState.selectedStatus === status ? (status === Status.PENDING ? 'bg-[#FCB528]' : status === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]') : 'bg-gray-200'}`}
                      onClick={() => dispatch({ type: 'SET_STATUS', payload: status })}
                    >
                      {status === Status.PENDING ? 'รอดำเนินการ' : status === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
                    </button>
                  ))}
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilter} className="mr-5 font-Thai text-lg text-[#FCB528] hover:underline">เคลียร์การกรอง</button>
                  <button className="font-Thai text-lg text-[#FCB528] hover:underline" onClick={() => router.push('/account')}>กลับไปหน้าหลัก</button>
                </div>
              </div>

              <hr className="my-9" />
              <ul className="mt-5">
                {filteredOrganizations.map((item, index) => renderItem(item, 'organization', index))}
                {filteredPrograms.map((item, index) => renderItem(item, 'program', index))}
                {filteredClubs.map((item, index) => renderItem(item, 'club', index))}
                {filteredGifted.map((item, index) => renderItem(item, 'gifted', index))}
              </ul>
            </>
          )}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal} />
    </>
  )
}

export default DashboardTUCMC
