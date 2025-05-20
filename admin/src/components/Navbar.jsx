import React from 'react';

const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between border-b-2 border-gray-200 bg-gray-100'>
      <h1 className="prata-regular text-2xl font-bold text-gray-800 hover:text-black transition duration-300">kalakar</h1>
      <button onClick={()=>setToken('')} className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>
        Logout
      </button>
    </div>
  );
};

export default Navbar;
