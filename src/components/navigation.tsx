'use client';

import { useState } from 'react';

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="relative flex w-screen items-center justify-end bg-[#47663B] p-6">
      <div className="block lg:hidden">
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="flex items-center rounded border border-[#47663B] px-3 py-2 text-teal-200 hover:border-white hover:text-white"
        >
          <svg
            className="h-3 w-3 fill-current"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`absolute right-0 top-full bg-[#47663B] p-4 transition-all duration-300 ease-in-out lg:static lg:flex lg:items-center lg:justify-end lg:p-0 ${
          menuOpen ? 'block' : 'hidden'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:space-x-4">
          <a href="#about" className="mt-4 block text-teal-200 hover:text-white lg:mt-0">
            About
          </a>
          <a href="#contact" className="mt-4 block text-teal-200 hover:text-white lg:mt-0">
            Calendar
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
