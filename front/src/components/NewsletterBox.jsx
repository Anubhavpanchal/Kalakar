import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';


const NewsletterBox = () => {
  const [error, setError] = useState(''); // State to track error message

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const email = e.target[0].value;

    if (!email) {
      setError('Email is required.'); // Set error if input is empty
      return;
    }

    setError(''); // Clear error if input is valid

    // for future this will update 11111111

    // console.log(email);
    toast.success('Thank you for subscribing!'); 

  };

  return (
    <div className='text-center '>
      <p className='text-2x1 font-medium text-gray-900'>Subscribe & get 20% off</p>
      <p className='text-gray-400 mt-3'>
      Step into a world of art and enjoy 20% off your first order—just for subscribing.
              </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
        <input className='w-full sm:flesx-1 outline-none ' type="email" placeholder='Enter your email' />
        <button className='bg-black text-white text-xs px-10 py-4 ' type='submit'>Subscribe</button>
      </form>
      {error && <p className='text-red-500 text-sm mt-2'>{error}</p>} {/* Display error message */}
    </div>
  );
};

export default NewsletterBox;