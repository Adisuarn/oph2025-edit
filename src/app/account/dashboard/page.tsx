'use client';
import React, { useState, useEffect } from 'react';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon';
import HamburgerMenu from '@/components/Dashboard/Hamburger';
import { handler, viewHandler } from './page.action';
import ViewData from '@/components/Dashboard/ViewData';

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
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [clubs, setClubs] = useState<any[]>([]);
  const [gifted, setGifted] = useState<any[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [viewData, setViewData] = useState<{ type: 'organization' | 'program' | 'club' | 'gifted'; data: any } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await handler();
      setOrganizations(data.props.organizations);
      setPrograms(data.props.programs);
      setClubs(data.props.clubs);
      setGifted(data.props.gifted);
    };
    fetchData();
  }, []);

  const filteredOrganizations = () => {
    if (!selectedFilter) return organizations;
    if (selectedFilter === "องค์กรนักเรียน") {
      return organizations.filter(org => org.status === "pending");
    }
    return [];
  };

  const filteredPrograms = () => {
    if (!selectedFilter) return programs;
    if (selectedFilter === "สายการเรียน") {
      return programs.filter(prog => prog.status === "pending");
    }
    return [];
  };

  const filteredClubs = () => {
    if (!selectedFilter) return clubs;
    if (selectedFilter === "ชมรม") {
      return clubs.filter(prog => prog.status === "pending");
    }
    return [];
  };

  const filteredGifted = () => {
    if (!selectedFilter) return gifted;
    if (selectedFilter === "โครงการพัฒนาความสามารถ") {
      return gifted.filter(prog => prog.status === "pending");
    }
    return [];
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
    setViewData(null);
  };

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
      
      // Transform data based on type
      const transformedData = type === 'gifted' || type === 'program' ? {
        ...data.data,
        activities: data.data.admissions,
        benefits: data.data.courses,
        working: data.data.interests,
      } : data.data;
  
      setViewData({ type, data: { data: transformedData } }); 
    }
  };
  return (
    <div className="flex items-center justify-center m-10">
      <div className="max-w-6xl w-full">
        {/* Header */}
        <div className="mb-16">
          <p className="text-center text-2xl font-bold font-Thai">ตรวจสอบข้อมูลหน่วยงานบนเว็บไซต์</p>
        </div>

        {/* Filter and Menu */}
        <div className="flex justify-between mt-4">
          <div className="flex items-center">
            <p className="w-4 h-4 bg-[#FCB528] rounded-full mr-3"></p>
            <p className="font-Thai text-lg">หน่วยงานที่มีสถานะรอการตรวจสอบ</p>
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

        <hr className="my-7" />

        {/* List of Organizations and Programs */}
        <div>
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
                    onClick={() => handleViewData(organization.tag, organization.key, 'organization')}
                  >
                    ดูข้อมูลหน่วยงาน
                  </button>
                </li>
                {viewData && viewData.type === 'organization' && viewData.data.data.thainame === organization.thainame && (
                  <ViewData data={viewData.data} type={viewData.type}/>
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
                    onClick={() => handleViewData(program.tag, program.key, 'program')}
                  >
                    ดูข้อมูลหน่วยงาน
                  </button>
                </li>
                {viewData && viewData.type === 'program' && viewData.data.data.thainame === program.thainame && (
                  <ViewData data={viewData.data} type={viewData.type} />
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
                    onClick={() => handleViewData(club.tag, club.key, 'club')}
                  >
                    ดูข้อมูลหน่วยงาน
                  </button>
                </li>
                {viewData && viewData.type === 'club' && viewData.data.data.thainame === club.thainame && (
                  <ViewData data={viewData.data} type={viewData.type} />
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
                    onClick={() => handleViewData(gifted.tag, gifted.key, 'gifted')}
                  >
                    ดูข้อมูลหน่วยงาน
                  </button>
                </li>
                {viewData && viewData.type === 'gifted' && viewData.data.data.thainame === gifted.thainame && (
                  <ViewData data={viewData.data} type={viewData.type} />
                )}
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default DashboardTUCMC;
