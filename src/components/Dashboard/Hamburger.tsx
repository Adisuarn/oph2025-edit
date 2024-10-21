'use client';
import React, { useState } from 'react';
import Hamburger from '@/vectors/dashboard/Hamburger';
import PeopleIcon from '@/vectors/dashboard/PeopleIcon';
import BookIcon from '@/vectors/dashboard/BookIcon'; 

const HamburgerMenu = ({ onFilterSelect, selectedFilter }: { onFilterSelect: (filter: string) => void, selectedFilter: string | null }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const filters = [
    { name: "องค์กรนักเรียน", icon: <PeopleIcon className="inline w-4 h-4 mr-4" /> },
    { name: "สายการเรียน", icon: <BookIcon className="inline w-4 h-4 mr-4" /> },
    { name: "โครงการพัฒนาความสามารถ", icon: <PeopleIcon className="inline w-4 h-4 mr-4" /> },
    { name: "ชมรม", icon: <BookIcon className="inline w-4 h-4 mr-4" /> },
  ];

  const handleFilterClick = (selectedCategory: string) => {
    onFilterSelect(selectedCategory);
    setIsMenuOpen(false); // Ensure this only closes the menu
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu}>
        <Hamburger />
      </button>
      <div
        className={`${
          isMenuOpen ? 'visible' : 'invisible'
        } absolute left-full top-0 bg-white p-4 shadow-lg border border-gray-300 rounded transition-transform duration-300 min-w-64`}
      >
        {filters.map(({ name, icon }) => (
          <button
            key={name}
            onClick={() => handleFilterClick(name)}
            className={`w-full text-left p-2 mb-2 rounded transition-colors duration-300 
              ${selectedFilter === name ? 'bg-blue-500 text-white' : 'hover:bg-gray'}
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
