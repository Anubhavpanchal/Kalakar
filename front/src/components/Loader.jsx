import React from 'react';

const Loader = () => (
  <div className="fixed inset-0 flex flex-col items-center justify-center z-[9999] bg-gradient-to-br from-white via-black-100 to-gray-200 transition-all duration-300">
    {/* Glowing Spinner */}
    <div className="relative mb-6">
      <div className="absolute inset-0 rounded-full border-8 border-gray-300 opacity-50 blur-lg"></div>
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-600 border-opacity-80"></div>
    </div>
    {/* Loading Text */}
    <p className="mt-2 text-xl font-bold text-gray-700 tracking-widest animate-pulse drop-shadow-lg">
      Loading, please wait...
    </p>
  </div>
);

export default Loader;