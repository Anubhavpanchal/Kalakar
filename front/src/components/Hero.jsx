import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import h1 from '../assets/h1.jpg';
import h2 from '../assets/h2.webp';
const Hero = () => {
  return (
    <div>
      {/* Fullscreen clickable image */}
      <Link to='/collection' className='w-full h-screen block relative'>
        <img src={h1} alt='Home' className='w-full h-full object-cover' />
        <div className='absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white text-2xl font-bold hover:text-gray-300 transition duration-300'>
          Explore Collection
        </div>
      </Link>

      {/* Additional content below the hero section */}
      <div className='flex flex-col sm:flex-row border border-gray-300  shadow-lg  bg-white max-w-5xl mx-auto mt-4'>
        {/* Hero left side */}
        <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
          <div className='text-[#414141]'>
            <div className='flex items-center gap-2'>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
              <p className='font-medium text-sm md:text-base'>Our BEST</p>
            </div>
            <h1 className='prata-regular text-3xl sm:py-3 lg:text-5xl leading-relaxed'>latest Arrivals</h1>
            <div className='flex items-center gap-2'>
              <p className='font-semibold text-sm md:text-base'>New Collection</p>
              <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>

            </div>
          </div>
        </div>
        {/* Hero right side */}
        <img className='w-full sm:w-1/2 h-full object-cover ' src={h2} alt='Home' />
         
      </div>
    </div>
  );
};

export default Hero;