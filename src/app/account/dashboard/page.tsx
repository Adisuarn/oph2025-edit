'use client';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import dynamic from 'next/dynamic';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon';
import { fetchHandler, viewHandler } from './page.action';
import { Toaster, toast } from 'react-hot-toast';
import { updateStatus } from '@components/Dashboard/ViewData.action';
import { Status } from '@utils/type';
import { useRouter } from 'next/navigation';

const HamburgerMenu = dynamic(() => import('@components/Dashboard/Hamburger'), { ssr: false });
const ViewData = dynamic(() => import('@components/Dashboard/ViewData'), { ssr: false });

interface DashboardData {
  organizations: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  programs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  clubs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  gifted: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
}

const DashboardTUCMC: React.FC = () => {
  const router = useRouter();

  const [data, setData] = useState<DashboardData>({
    organizations: [],
    programs: [],
    clubs: [],
    gifted: [],
  });

  const [filterState, setFilterState] = useState({
    selectedFilter: null as string | null,
    selectedStatus: Status.PENDING,
    viewData: null as any,
    activeButton: null as { type: string; key: string } | null,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const results = await fetchHandler();
      if (results) {
        setData({
          organizations: results.props.organizations,
          programs: results.props.programs,
          clubs: results.props.clubs,
          gifted: results.props.gifted,
        });
        setLoading(false);
      }
    } catch (error) {
      toast.error('เกิดข้อผิดพลาด!');
      router.push('/500')
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      fetchData();
    }
  }, [fetchData]);

  useEffect(() => {
    if (data.organizations.length > 0 || data.programs.length > 0 || data.clubs.length > 0 || data.gifted.length > 0) {
      setFilterState(prev => ({ ...prev, selectedStatus: Status.PENDING }));
    }
  }, [data]);

  const handleStatusUpdate = useCallback(async (item: any, status: Status, rejectionMessage: string) => {
    await updateStatus(item, status, rejectionMessage);
    fetchData();
  }, [fetchData]);

  const filterData = useCallback((items: any[]) => {
    const { selectedFilter, selectedStatus } = filterState;
    return items.filter(item => {
      const matchesFilter = !selectedFilter || item.tag === selectedFilter;
      const matchesStatus = selectedStatus === null || item.status === selectedStatus;
      return matchesFilter && matchesStatus;
    });
  }, [filterState]);

  const filteredOrganizations = useMemo(() => filterData(data.organizations), [data.organizations, filterData]);
  const filteredPrograms = useMemo(() => filterData(data.programs), [data.programs, filterData]);
  const filteredClubs = useMemo(() => filterData(data.clubs), [data.clubs, filterData]);
  const filteredGifted = useMemo(() => filterData(data.gifted), [data.gifted, filterData]);

  const handleViewData = useCallback(async (tag: string, key: string, type: 'organization' | 'program' | 'club' | 'gifted') => {
    const currentData = data[(type === "gifted" ? type : type + 's') as keyof DashboardData].find(item => item.key === key);
    if (filterState.viewData && filterState.viewData.type === type && filterState.viewData.data.data.thainame === currentData?.thainame) {
      setFilterState(prev => ({ ...prev, viewData: null, activeButton: null }));
    } else {
      const fetchedData = await viewHandler(tag, key);
      const transformedData = {
        ...fetchedData.data,
        ...(type === 'gifted' || type === 'program' ? { activities: fetchedData.data.admissions, benefits: fetchedData.data.courses, working: fetchedData.data.interests } : {}),
        ...(type === 'organization' ? { benefits: fetchedData.data.position } : {}),
      };
      setFilterState(prev => ({
        ...prev,
        viewData: { type, data: { data: transformedData } },
        activeButton: { type, key },
      }));
    }
  }, [data, filterState]);

  const clearFilter = useCallback(() => {
    setFilterState({
      selectedFilter: null,
      selectedStatus: Status.PENDING,
      viewData: null,
      activeButton: null,
    });
  }, []);

  const renderItem = useCallback((item: any, type: 'organization' | 'program' | 'club' | 'gifted', index: number) => {
    const isVisible = filterState.viewData && filterState.viewData.type === type && filterState.viewData.data.data.thainame === item.thainame;
    return (
      <div key={index}>
        <li className="flex justify-between items-center mb-4 p-5 border border-gray-300 rounded-2xl">
          <div className="flex items-center">
            {type === 'organization' ? <PeopleIcon className="mr-2 w-6 h-6" /> : <BookIcon className="mr-2 w-6 h-6" />}
            <span className="font-Thai font-medium text-lg ml-4">{item.thainame}</span>
          </div>
          <button
            className={`ml-4 p-2 px-6 text-white rounded-3xl font-Thai transition-all duration-300 
              ${filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key
                ? 'bg-custom-gradient-inverse hover:opacity-75 hover:scale-105'
                : 'bg-custom-gradient hover:opacity-75 hover:scale-105'
              }`}
            onClick={() => {
              const isActive = filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key;
              if (isActive) {
                handleViewData(item.tag, item.key, type);
              } else {
                toast.promise(handleViewData(item.tag, item.key, type), {
                  loading: 'กำลังโหลดข้อมูล...',
                  success: 'ดูข้อมูลสำเร็จ!',
                  error: 'เกิดข้อผิดพลาด!',
                });
              }
            }}
          >
            {filterState.activeButton && filterState.activeButton.type === type && filterState.activeButton.key === item.key
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
    );
  }, [filterState, handleStatusUpdate]);

  return (
    <>
      <Toaster position="top-center" />
      <div className="flex items-center justify-center m-10">
        <div className="max-w-6xl w-full">
          <div className="mb-16">
            <p className="text-center text-2xl font-bold font-Thai">ตรวจสอบข้อมูลหน่วยงานบนเว็บไซต์</p>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64">
              <div className="loader border-4 border-t-4 border-gray-200 border-t-[#FCB528] rounded-full w-16 h-16 animate-spin"></div>
              <p className="mt-5">กำลังโหลดข้อมูล...</p>
            </div>
          ) : (
            <>
              <div className="flex justify-between mt-4">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <p className={`w-4 h-4 rounded-full mr-3 ${filterState.selectedStatus === Status.PENDING ? 'bg-[#FCB528]' : filterState.selectedStatus === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]'}`}></p>
                    <p className="font-Thai text-lg">
                      {filterState.selectedStatus === Status.PENDING ? 'รอดำเนินการ' : filterState.selectedStatus === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
                    </p>
                  </div>
                </div>
                <HamburgerMenu
                  onFilterSelect={filter => setFilterState(prev => ({ ...prev, selectedFilter: filter }))}
                  selectedFilter={filterState.selectedFilter}
                />
              </div>

              <div className="flex space-x-4 mt-4 justify-between">
                <div>
                  {Object.values(Status).map(status => (
                    <button
                      key={status}
                      className={`p-2 rounded-lg transform transition-transform duration-300 ${filterState.selectedStatus === status ? (status === Status.PENDING ? 'bg-[#FCB528]' : status === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]') : 'bg-gray-200'}`}
                      onClick={() => setFilterState(prev => ({ ...prev, selectedStatus: status }))}
                    >
                      {status === Status.PENDING ? 'รอดำเนินการ' : status === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
                    </button>
                  ))}
                </div>
                <div className="flex items-end">
                  <button onClick={clearFilter} className="text-[#FCB528] text-lg font-Thai hover:underline mr-5">
                    เคลียร์การกรอง
                  </button>
                  <button
                    className="text-[#FCB528] text-lg font-Thai hover:underline"
                    onClick={() => router.push('/account')}
                  >
                    กลับไปหน้าหลัก
                  </button>
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
    </>
  );
};

export default DashboardTUCMC;
