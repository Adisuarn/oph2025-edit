'use client';
import React, { useState, useEffect, use } from 'react';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon';
import HamburgerMenu from '@/components/Dashboard/Hamburger';
import { handler, viewHandler } from './page.action';
import { Toaster, toast } from 'react-hot-toast';
import ViewData from '@/components/Dashboard/ViewData';
import { updateStatus } from '@/components/Dashboard/ViewData.action';
import { Status } from '@/server/utils/type';
import { useRouter } from 'next/navigation';

interface Organization {
  id: string;
  key: string;
  tag: string;
  thainame: string;
  status: string;
}

interface Program {
  id: string;
  key: string;
  tag: string;
  thainame: string;
  status: string;
}

const DashboardTUCMC = () => {
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [gifted, setGifted] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const [viewData, setViewData] = useState<{ type: 'organization' | 'program' | 'club' | 'gifted'; data: any } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [user, setUser] = useState<any>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await handler();
      setUser(data.props.userData);
      setOrganizations(data.props.organizations);
      setPrograms(data.props.programs);
      setClubs(data.props.clubs);
      setGifted(data.props.gifted);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Failed to load data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleStatusUpdate = async (data: any, status: Status) => {
    await updateStatus(data, status);
    fetchData(); // Refresh data after status update
  };

  const filterByStatus = (items: any[]) => {
    if (!selectedStatus) return items;
    return items.filter(item => item.status === selectedStatus);
  };

  const filteredOrganizations = () => {
    const filtered = organizations.filter(org => !selectedFilter || org.tag === selectedFilter);
    return filterByStatus(filtered);
  };

  const filteredPrograms = () => {
    const filtered = programs.filter(program => !selectedFilter || program.tag === selectedFilter);
    return filterByStatus(filtered);
  };

  const filteredClubs = () => {
    const filtered = clubs.filter(club => !selectedFilter || club.tag === selectedFilter);
    return filterByStatus(filtered);
  };

  const filteredGifted = () => {
    const filtered = gifted.filter(gifted => !selectedFilter || gifted.tag === selectedFilter);
    return filterByStatus(filtered);
  };

  const handleFilterSelect = (filter: string) => {
    if (filter === selectedFilter) {
      clearFilter();
    } else {
      setSelectedFilter(filter);
    }
  };

  const clearFilter = () => {
    setSelectedFilter(null);
    setSelectedStatus(null);
    setViewData(null);
  };

  if(!user) return <div>Loading...</div>;
  if(user.TUCMC === true) router.push('/403')

  const handleViewData = async (tag: string, key: string, type: 'organization' | 'program' | 'club' | 'gifted') => {
    const currentName = type === 'organization'
      ? organizations.find(org => org.key === key)?.thainame
      : type === 'program'
        ? programs.find(prog => prog.key === key)?.thainame
        : type === 'club'
          ? clubs.find(club => club.key === key)?.thainame
          : gifted.find(gifted => gifted.key === key)?.thainame;

    if (viewData && viewData.type === type && viewData.data.data.thainame === currentName) {
      setViewData(null);
    } else {
      const data = await viewHandler(tag, key);
      const transformedData: any = type === 'gifted' || type === 'program' ? {
          ...data.data,
          activities: data.data.admissions,
          benefits: data.data.benefits,
        } : type === 'organization' ? {
          ...data.data,
          benefits: data.data.position,
        } : data.data;
      setViewData({ type, data: { data: transformedData } });
    }
  };
  return (
    <>
      <div><Toaster /></div>
      <div className="flex items-center justify-center m-10">
        <div className="max-w-6xl w-full">
          <div className="mb-16">
            <p className="text-center text-2xl font-bold font-Thai">ตรวจสอบข้อมูลหน่วยงานบนเว็บไซต์</p>
          </div>

          <div className="flex justify-between mt-4">
            <div className="flex items-center">
                {(
                  <p>{
                  (() => {
                    switch (selectedStatus) {
                    case 'pending':
                      return (
                        <div className="flex items-center">
                          <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-3"></p>
                          <p className="font-Thai text-lg">หน่วยงานที่มีสถานะรอการตรวจสอบ</p>
                        </div>
                      )
                    case 'approved':
                      return (
                        <div className="flex items-center">
                          <p className="w-4 h-4 bg-[#19C57C] rounded-full mr-3"></p>
                          <p className="font-Thai text-lg">หน่วยงานที่มีสถานผ่านการตรวจสอบ</p>
                        </div>
                      )
                    case 'rejected':
                      return (
                        <div className="flex items-center">
                          <p className="w-4 h-4 bg-[#F83E3E] rounded-full mr-3"></p>
                          <p className="font-Thai text-lg">หน่วยงานที่มีสถานไม่ผ่านการตรวจสอบ</p>
                        </div>
                      )
                    default:
                      return ''
                    }
                  })()
                  }</p>
                )}
            </div>
            <div className="flex">
              {selectedFilter && (
                <div className="flex items-center">
                  <button onClick={clearFilter} className="p-2 px-4 bg-red-500 text-white rounded-md transition-opacity duration-500 hover:opacity-75">Clear Filter</button>
                  <p className="font-Thai text-lg mx-7">{selectedFilter}</p>
                </div>
              )}
              <HamburgerMenu onFilterSelect={handleFilterSelect} selectedFilter={selectedFilter} />
            </div>
          </div>

          <div className="mt-4">
            <select
              value={selectedStatus || 'pending'}
              onChange={e => setSelectedStatus(e.target.value)}
              className="p-2 border border-gray-300 rounded-md"
            >
              <option value="pending">รอการตรวจสอบ</option>
              <option value="approved">ผ่านการตรวจสอบ</option>
              <option value="rejected">ไม่ผ่านการตรวจสอบ</option>
            </select>
          </div>

          <hr className="my-7" />

          <div>
            {loading ? (
              <div className="flex flex-col justify-center items-center h-64">
                <div className="loader border-4 border-t-4 border-gray-200 border-t-[#FCB528] rounded-full w-16 h-16 animate-spin"></div>
                <p className="mt-5">กำลังโหลดข้อมูล...</p>
              </div>
            ) : (
              <ul>
                {filteredOrganizations().map(organization => (
                  <div key={organization.id}>
                    <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
                      <div className="flex items-center">
                        <PeopleIcon className="mr-2 w-6 h-6" />
                        <span className="font-Thai font-medium text-lg ml-4">{organization.thainame}</span>
                      </div>
                      <button
                        className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75"
                        onClick={() => {
                          toast.promise(handleViewData(organization.tag, organization.key, 'organization'),
                            {
                              loading: 'กำลังโหลดข้อมูล...',
                              success: (viewData === null) ? 'ดูข้อมูลสำเร็จ' : 'ปิดข้อมูล',
                              error: 'เกิดข้อผิดพลาด!'
                            })
                        }}
                      >
                        ดูข้อมูลหน่วยงาน
                      </button>
                    </li>
                    {viewData && viewData.type === 'organization' && viewData.data.data.thainame === organization.thainame && (
                      <ViewData data={viewData.data} type={viewData.type} onStatusUpdate={handleStatusUpdate} />
                    )}
                  </div>
                ))}
                {filteredPrograms().map(program => (
                  <div key={program.id}>
                    <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
                      <div className="flex items-center">
                        <BookIcon className="mr-2 w-6 h-6" />
                        <span className="font-Thai font-medium text-lg ml-4">{program.thainame}</span>
                      </div>
                      <button
                        className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75"
                        onClick={() => {
                          toast.promise(handleViewData(program.tag, program.key, 'program'), {
                            loading: 'กำลังโหลดข้อมูล...',
                            success: (viewData === null) ? 'ดูข้อมูลสำเร็จ' : 'ปิดข้อมูล',
                            error: 'เกิดข้อผิดพลาด!'
                          })
                        }}
                      >
                        ดูข้อมูลหน่วยงาน
                      </button>
                    </li>
                    {viewData && viewData.type === 'program' && viewData.data.data.thainame === program.thainame && (
                      <ViewData data={viewData.data} type={viewData.type} onStatusUpdate={handleStatusUpdate} />
                    )}
                  </div>
                ))}
                {filteredClubs().map(club => (
                  <div key={club.id}>
                    <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
                      <div className="flex items-center">
                        <BookIcon className="mr-2 w-6 h-6" />
                        <span className="font-Thai font-medium text-lg ml-4">{club.thainame}</span>
                      </div>
                      <button
                        className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75"
                        onClick={() => {
                          toast.promise(handleViewData(club.tag, club.key, 'club'), {
                            loading: 'กำลังโหลดข้อมูล...',
                            success: (viewData === null) ? 'ดูข้อมูลสำเร็จ' : 'ปิดข้อมูล',
                            error: 'เกิดข้อผิดพลาด!'
                          })
                        }}
                      >
                        ดูข้อมูลหน่วยงาน
                      </button>
                    </li>
                    {viewData && viewData.type === 'club' && viewData.data.data.thainame === club.thainame && (
                      <ViewData data={viewData.data} type={viewData.type} onStatusUpdate={handleStatusUpdate} />
                    )}
                  </div>
                ))}
                {filteredGifted().map(gifted => (
                  <div key={gifted.id}>
                    <li className="flex justify-between items-center mb-4 p-5 border border-[gray] rounded-2xl">
                      <div className="flex items-center">
                        <PeopleIcon className="mr-2 w-6 h-6" />
                        <span className="font-Thai font-medium text-lg ml-4">{gifted.thainame}</span>
                      </div>
                      <button
                        className="ml-4 p-2 px-6 text-white bg-custom-gradient rounded-3xl font-Thai transition-opacity duration-500 hover:opacity-75"
                        onClick={() => {
                          toast.promise(handleViewData(gifted.tag, gifted.key, 'gifted'), {
                            loading: 'กำลังโหลดข้อมูล...',
                            success: (viewData === null) ? 'ดูข้อมูลสำเร็จ' : 'ปิดข้อมูล',
                            error: 'เกิดข้อผิดพลาด!'
                          })
                        }}
                      >
                        ดูข้อมูลหน่วยงาน
                      </button>
                    </li>
                    {viewData && viewData.type === 'gifted' && viewData.data.data.thainame === gifted.thainame && (
                      <ViewData data={viewData.data} type={viewData.type} onStatusUpdate={handleStatusUpdate} />
                    )}
                  </div>
                ))}
              </ul>)}
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardTUCMC;
