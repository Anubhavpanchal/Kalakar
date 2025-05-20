import React from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets';

const Sidebar = () => {
  return (
    <div className='w-[18%] min-h-screen bg-gray-100 border-r-2 border-gray-200'>
      {/* Top Gray Line */}
      <div className='border-b-2 border-gray-200'></div>

      <div className='flex flex-col gap-4 pl-[15%] pt-6'>
        
        {/* Add Item Link */}
        <NavLink 
          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300  shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
          to="/add"
        >
          <img className='w-6 h-6' src={assets.add_icon} alt='Add Icon' />
          <span className='hidden md:block font-medium text-gray-700'>Add Item</span>
        </NavLink>

        {/* List Item Link */}
        <NavLink 
          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
          to="/list"
        >
          <img className='w-6 h-6' src={assets.order_icon} alt='List Icon' />
          <span className='hidden md:block font-medium text-gray-700'>List Item</span>
        </NavLink>

        {/* Orders Link */}
        <NavLink 
          className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-300 shadow-sm hover:bg-gray-100 hover:shadow-md transition duration-300"
          to="/orders"
        >
          <img className='w-6 h-6' src={assets.parcel_icon} alt='Orders Icon' />
          <span className='hidden md:block font-medium text-gray-700'>Orders</span>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;
