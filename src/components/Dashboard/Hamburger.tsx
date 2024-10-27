'use client';
import React, { useState } from 'react';
import Hamburger from '@/vectors/dashboard/Hamburger';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon'; 

interface HamburgerMenuProps {
  onFilterSelect: (filter: string) => void;
  selectedFilter: string | null;
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onFilterSelect, selectedFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const filters = [
    { name: "องค์กรนักเรียน", icon: <PeopleIcon className="inline w-4 h-4 mr-4" />, key: "organizations" },
    { name: "สายการเรียน", icon: <BookIcon className="inline w-4 h-4 mr-4" />, key: "programs" },
    { name: "โครงการพัฒนาความสามารถ", icon: <PeopleIcon className="inline w-4 h-4 mr-4" />, key: "gifted" },
    { name: "ชมรม", icon: <BookIcon className="inline w-4 h-4 mr-4" />, key: "clubs" },
  ];

  const handleFilterClick = (selectedCategory: string) => {
    onFilterSelect(selectedCategory);
    setIsMenuOpen(false); // Close the menu after selection
  };

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen(prev => !prev)}>
        <Hamburger />
      </button>
      <div className={`${isMenuOpen ? 'visible' : 'invisible'} absolute left-full top-0 bg-white p-4 shadow-lg border border-gray-300 rounded transition-transform duration-300 min-w-64`}>
        {filters.map(({ name, icon, key }) => (
          <button
            key={name}
            onClick={() => handleFilterClick(key)}
            className={`w-full text-left p-2 mb-2 rounded transition-colors duration-300 
              ${selectedFilter === key ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'}
            `}
          >
            <div className="flex items-center">
              {icon}
              <span>{name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default HamburgerMenu;
