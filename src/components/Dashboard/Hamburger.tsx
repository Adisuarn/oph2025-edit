'use client'

import React, { useState } from 'react'

import BookIcon from '@/vectors/dashboard/BookIcon'
import Hamburger from '@/vectors/dashboard/Hamburger'
import PeopleIcon from '@/vectors/dashboard/PeopleIcon'

interface HamburgerMenuProps {
  onFilterSelect: (filter: string) => void
  selectedFilter: string | null
}

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ onFilterSelect, selectedFilter }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const filters = [
    {
      name: 'องค์กรนักเรียน',
      icon: <PeopleIcon className="mr-4 inline h-4 w-4" />,
      key: 'organizations',
    },
    { name: 'สายการเรียน', icon: <BookIcon className="mr-4 inline h-4 w-4" />, key: 'programs' },
    {
      name: 'โครงการพัฒนาความสามารถ',
      icon: <PeopleIcon className="mr-4 inline h-4 w-4" />,
      key: 'gifted',
    },
    { name: 'ชมรม', icon: <BookIcon className="mr-4 inline h-4 w-4" />, key: 'clubs' },
  ]

  const handleFilterClick = (selectedCategory: string) => {
    onFilterSelect(selectedCategory)
    setIsMenuOpen(false)
  }

  return (
    <div className="relative">
      <button onClick={() => setIsMenuOpen((prev) => !prev)}>
        <Hamburger />
      </button>
      <div
        className={`${isMenuOpen ? 'visible' : 'invisible'} border-gray-300 absolute left-full top-0 min-w-64 rounded border bg-white p-4 shadow-lg transition-transform duration-300`}
      >
        {filters.map(({ name, icon, key }) => (
          <button
            key={name}
            onClick={() => handleFilterClick(key)}
            className={`mb-2 w-full rounded p-2 text-left transition-colors duration-300 ${selectedFilter === key ? 'bg-blue-500 text-white' : 'hover:bg-gray-200'} `}
          >
            <div className="flex items-center">
              {icon}
              <span>{name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}

export default HamburgerMenu
