import React from 'react'
import {assets }from '../assets/assets'
const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700'>
      <div className='hover:scale-105 hover: transition-transform duration-300 ease-in-out p-5 rounded-lg'>
        <img src={assets.exchange_icon} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Exchange & Return</p>
        <p className='text-gray-400'>We offer free exchange policy</p>
      </div>
      <div className='hover:scale-105 hover: transition-transform duration-300 ease-in-out p-5 rounded-lg'>
        <img src={assets.quality_icon} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>7 Days Return Policy</p>
        <p className='text-gray-400'>We provide 7 days free return policy</p>
      </div>
      <div className='hover:scale-105 hover: transition-transform duration-300 ease-in-out p-5 rounded-lg'>
        <img src={assets.support_img} alt="exchange" className='w-12 m-auto mb-5' />
        <p className='font-semibold'>Best customer support</p>
        <p className='text-gray-400'>we provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
