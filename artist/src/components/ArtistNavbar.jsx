import React, { useState } from 'react';
import { FiUser } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const ArtistNavbar = ({ setToken }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex items-center py-2 px-[4%] justify-between border-b-2 border-gray-200 bg-gray-100">
      <h1 className="prata-regular text-2xl font-bold text-gray-800 hover:text-black transition duration-300">
        Kalakar Artist
      </h1>
      <div className="flex items-center gap-4">
        {/* <div className="relative">
          <button
            className="text-gray-700 hover:text-blue-600 transition duration-300 rounded-full p-2 border border-transparent hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Profile"
            onClick={() => navigate('/profile')}
          >
            <FiUser size={24} />
          </button>
        </div> */}
        <button
          onClick={() => setToken('')}
          className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default ArtistNavbar;