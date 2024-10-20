'use client';
import React, { useState, useRef } from 'react';
import Hamburger from '@/vectors/dashboard/Hamburger';

const HamburgerMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const getMenuPosition = () => {
    if (buttonRef.current && menuRef.current) {
      const { top, left, height } = buttonRef.current.getBoundingClientRect();
      const menuWidth = menuRef.current.offsetWidth; // Get the menu's width

      return {
        top: top + window.scrollY + height / 2 - 10, // Center vertically next to the button
        left: left + window.scrollX - menuWidth + 400, // Move left by menu width + extra space
      };
    }
    return { top: 0, left: 0 };
  };

  const { top, left } = isMenuOpen ? getMenuPosition() : { top: 0, left: 0 };

  return (
    <>
      <button ref={buttonRef} onClick={toggleMenu}>
        <Hamburger />
      </button>
      <div
        ref={menuRef}
        className={`absolute transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          top: `${top}px`,
          left: `${left}px`,
          transform: isMenuOpen ? 'translate(-100%, 0)' : 'translate(-100%, -20px)',
          visibility: isMenuOpen ? 'visible' : 'hidden', // Control visibility
        }}
      >
        <button className="p-2 px-3 bg-custom-gradient rounded-md text-white font-Thai mr-3">
          Organization
        </button>
        <button className="p-2 px-3 bg-custom-gradient rounded-md text-white font-Thai mr-3">
          Clubs
        </button>
        <button className="p-2 px-3 bg-custom-gradient rounded-md text-white font-Thai mr-3">
          Programs
        </button>
        <button className="p-2 px-3 bg-custom-gradient rounded-md text-white font-Thai mr-3">
          Gifted
        </button>
      </div>
    </>
  );
};

export default HamburgerMenu;
