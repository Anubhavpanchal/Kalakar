import React from 'react';

const Navbar = ({ setToken }) => {
  const handleChatClick = () => {
    window.open('http://localhost:5176/', '_blank', 'noopener,noreferrer');
  };

  return (
    <div className='flex items-center py-2 px-[4%] justify-between border-b-2 border-gray-200 bg-gray-100'>
      <h1 className="prata-regular text-2xl font-bold text-gray-800 hover:text-black transition duration-300">kalakar</h1>
      <div className="flex items-center gap-4">
        <button
          onClick={handleChatClick}
          className="p-2 rounded-full hover:bg-gray-200 transition"
          title="Open Chat"
        >
          {/* Chat icon (Heroicons outline) */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 21l1.8-4A8.96 8.96 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
        <button
          onClick={() => setToken('')}
          className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;