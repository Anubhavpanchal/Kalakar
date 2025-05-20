import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const ArtistSidebar = () => (
  <div className="w-[18%] min-h-screen bg-gray-100 border-r-2 border-gray-200">
    <div className="border-b-2 border-gray-200"></div>
    <div className="flex flex-col gap-4 pl-[15%] pt-6">
      <NavLink
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
        to="/add"
      >
        <img className="w-6 h-6" src={assets.add_icon} alt="Add Icon" />
        <span className="hidden md:block font-medium text-gray-700">Add Art</span>
      </NavLink>
      <NavLink
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
        to="/list"
      >
        <img className="w-6 h-6" src={assets.order_icon} alt="List Icon" />
        <span className="hidden md:block font-medium text-gray-700">My Artworks</span>
      </NavLink>
      <NavLink
        className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
        to="/orders"
      >
        <img className="w-6 h-6" src={assets.parcel_icon} alt="Orders Icon" />
        <span className="hidden md:block font-medium text-gray-700">Orders</span>
      </NavLink>
        <NavLink
          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
          to="/chat"
        >
  {/* Chat icon (Heroicons outline) */}
         <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-500">
         <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 15.75a2.25 2.25 0 01-2.25 2.25H6.25L2.75 21.25V5.25A2.25 2.25 0 015 3h14.5a2.25 2.25 0 012.25 2.25v10.5z" />
         </svg>
        <span className="hidden md:block font-medium text-gray-700">Chat</span>
      </NavLink>
    </div>
  </div>
);

export default ArtistSidebar;