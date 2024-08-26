import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center mx-8 my-4">
      <div className="flex items-center gap-1">
        <h1>Home</h1>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
        </svg>
        <h1>Dashboard V2</h1>
      </div>

     
      <div className="flex-1 flex justify-center">
        <div className="relative max-w-md w-10/12">
          <input
            type="text"
            placeholder="Search Widget by its title"
            className="w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
          />
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg
              className="w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
              ></path>
            </svg>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
