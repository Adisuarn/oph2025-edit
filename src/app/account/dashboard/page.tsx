'use client'
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon';
import HamburgerMenu from '@/components/Dashboard/Hamburger'; // Import your HamburgerMenu component
import { handler, viewHandler } from './page.action';
import { Toaster, toast } from 'react-hot-toast';
import ViewData from '@/components/Dashboard/ViewData';
import { updateStatus } from '@/components/Dashboard/ViewData.action';
import { Status } from '@utils/type';

interface DashboardData {
  organizations: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  programs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  clubs: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
  gifted: Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>;
}

const DashboardTUCMC: React.FC = () => {
  const [data, setData] = useState<DashboardData>({
    organizations: [],
    programs: [],
    clubs: [],
    gifted: [],
  });
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<Status | null>(Status.PENDING);
  const [viewData, setViewData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [activeButton, setActiveButton] = useState<{ type: string; key: string } | null>(null);

  // Fetch data function
  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const result = await handler();
      setData(result.props);
    } catch (error) {
      toast.error("ไม่สามารถโหลดข้อมูลได้");
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Automatically set the initial status to PENDING if data is fetched
  useEffect(() => {
    if (data.organizations.length > 0) {
      setSelectedStatus(Status.PENDING);
    }
  }, [data]);

  // Handle status update
  const handleStatusUpdate = useCallback(async (item: any, status: Status) => {
    await updateStatus(item, status);
    fetchData();
  }, [fetchData]);

  // Filter data based on selected filter and status
  const filterData = useCallback((items: any[]) => {
    return items.filter(item => {
      const matchesFilter = !selectedFilter || item.tag === selectedFilter;
      const matchesStatus = selectedStatus === null || item.status === selectedStatus;
      return matchesFilter && matchesStatus;
    });
  }, [selectedFilter, selectedStatus]);

  // Memoized filtered data
  const filteredOrganizations = useMemo(() => filterData(data.organizations), [data.organizations, filterData]);
  const filteredPrograms = useMemo(() => filterData(data.programs), [data.programs, filterData]);
  const filteredClubs = useMemo(() => filterData(data.clubs), [data.clubs, filterData]);
  const filteredGifted = useMemo(() => filterData(data.gifted), [data.gifted, filterData]);

  // Handle view data
  const handleViewData = useCallback(async (tag: string, key: string, type: 'organization' | 'program' | 'club' | 'gifted') => {
    const currentData = (data[type + 's' as keyof DashboardData] as Array<{ id: string; key: string; tag: string; thainame: string; status: Status }>)
      .find((item) => item.key === key);

    if (viewData && viewData.type === type && viewData.data.data.thainame === currentData?.thainame) {
      setViewData(null);
      setActiveButton(null);
    } else {
      const fetchedData = await viewHandler(tag, key);
      const transformedData = {
        ...fetchedData.data,
        ...(type === 'gifted' || type === 'program' ? { activities: fetchedData.data.admissions, benefits: fetchedData.data.courses, working: fetchedData.data.interests } : {}),
        ...(type === 'organization' ? { benefits: fetchedData.data.position } : {}),
      };
      setViewData({ type, data: { data: transformedData } });
      setActiveButton({ type, key });
    }
  }, [data, viewData]);

  // Clear filter and reset state
  const clearFilter = useCallback(() => {
    setSelectedFilter(null);
    setSelectedStatus(Status.PENDING);
    setViewData(null);
  }, []);

  // Render items (organizations, programs, etc.)
  const renderItem = useCallback((item: any, type: 'organization' | 'program' | 'club' | 'gifted') => {
    const isVisible = viewData && viewData.type === type && viewData.data.data.thainame === item.thainame;

    return (
      <div key={item.id}>
        <li className="flex justify-between items-center mb-4 p-5 border border-gray-300 rounded-2xl">
          <div className="flex items-center">
            {type === 'organization' ? <PeopleIcon className="mr-2 w-6 h-6" /> : <BookIcon className="mr-2 w-6 h-6" />}
            <span className="font-Thai font-medium text-lg ml-4">{item.thainame}</span>
          </div>
          <button
            className={`ml-4 p-2 px-6 text-white rounded-3xl font-Thai transition-all duration-300 
              ${activeButton && activeButton.type === type && activeButton.key === item.key
                ? 'bg-custom-gradient-inverse hover:opacity-75 hover:scale-105'
                : 'bg-custom-gradient hover:opacity-75 hover:scale-105'
              }`}
            onClick={() => {
              const isActive = activeButton && activeButton.type === type && activeButton.key === item.key;
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
            {activeButton && activeButton.type === type && activeButton.key === item.key
              ? 'คลิกเพื่อปิด'
              : `ดูข้อมูล${type === 'organization' ? 'หน่วยงาน' : type === 'program' ? 'สายการเรียน' : type === 'club' ? 'ชมรม' : 'โครงการพัฒนาฯ'}`}
          </button>
        </li>
        {isVisible && (
          <div className={`overflow-hidden`}>
            <ViewData data={viewData.data} type={viewData.type} onStatusUpdate={handleStatusUpdate} />
          </div>
        )}
      </div>
    );
  }, [activeButton, handleStatusUpdate, viewData]);

  // Function to handle filter selection from HamburgerMenu
  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
  };

  // Function to handle status selection
  const handleStatusSelect = (status: Status) => {
    setSelectedStatus(status);
  };

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
                    <p className={`w-4 h-4 rounded-full mr-3 ${selectedStatus === Status.PENDING ? 'bg-[#FCB528]' : selectedStatus === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-[#F83E3E]'}`}></p>
                    <p className="font-Thai text-lg">
                      {selectedStatus === Status.PENDING ? 'รอดำเนินการ' : selectedStatus === Status.APPROVED ? 'อนุมัติ' : 'ไม่อนุมัติ'}
                    </p>
                  </div>
                </div>
                <div className="flex ">
                  <div className="flex">
                    <button onClick={clearFilter} className="text-[#FCB528] text-lg font-Thai hover:underline mr-5">
                      เคลียร์การกรอง
                    </button>
                    <HamburgerMenu
                      onFilterSelect={handleFilterSelect}
                      selectedFilter={selectedFilter}
                    />
                  </div>
                  
                </div>
              </div>

              {/* Status Selection Buttons */}
              <div className="flex space-x-4 mt-4">
                <button
                  className={`p-2 rounded-lg ${selectedStatus === Status.PENDING ? 'bg-[#FCB528]' : 'bg-gray-200'}`}
                  onClick={() => handleStatusSelect(Status.PENDING)}
                >
                  รอดำเนินการ
                </button>
                <button
                  className={`p-2 rounded-lg ${selectedStatus === Status.APPROVED ? 'bg-[#19C57C]' : 'bg-gray-200'}`}
                  onClick={() => handleStatusSelect(Status.APPROVED)}
                >
                  อนุมัติ
                </button>
                <button
                  className={`p-2 rounded-lg ${selectedStatus === Status.REJECTED ? 'bg-[#F83E3E]' : 'bg-gray-200'}`}
                  onClick={() => handleStatusSelect(Status.REJECTED)}
                >
                  ไม่อนุมัติ
                </button>
              </div>
              <hr className="my-5" />
              {/* Data List */}
              <ul className="mt-5">
                {filteredOrganizations.map(item => renderItem(item, 'organization'))}
                {filteredPrograms.map(item => renderItem(item, 'program'))}
                {filteredClubs.map(item => renderItem(item, 'club'))}
                {filteredGifted.map(item => renderItem(item, 'gifted'))}
              </ul>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardTUCMC;
