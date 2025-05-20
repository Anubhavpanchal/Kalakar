import React from 'react';
import { NavLink } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className='flex flex-col  sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-20 text-gray-500 px-8'>
      {/* About Section */}
      <section>
        <NavLink
          to='/'
          className='prata-regular text-2xl font-bold text-gray-800 hover:text-black transition duration-300'
        >
          kalakar
        </NavLink>
        <p className='w-full md:w-2/3 text-gray-600 mt-4'>
          Your destination for original art that speaks to the soul. From contemporary abstracts to classic portraits, each piece is a reflection of passion, creativity, and emotion. Explore our curated collections, discover emerging artists, and find the perfect artwork to transform your space. Whether you’re a seasoned collector or a first-time buyer, we’ve got something special just for you.
        </p>
      </section>

      {/* Company Section */}
      <section>
        <p className='text-xl font-medium mb-5'>COMPANY</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>
            <NavLink to='/about' className='hover:text-black transition duration-300'>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='hover:text-black transition duration-300'>
              Careers
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='hover:text-black transition duration-300'>
              Press
            </NavLink>
          </li>
          <li>
            <NavLink to='/about' className='hover:text-black transition duration-300'>
              Blog
            </NavLink>
          </li>
        </ul>
      </section>

      {/* Support Section */}
      <section>
        <p className='text-xl font-medium mb-5'>SUPPORT</p>
        <ul className='flex flex-col gap-1 text-gray-600'>
          <li>
            <NavLink to='/contact' className='hover:text-black transition duration-300'>
              Help Center
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className='hover:text-black transition duration-300'>
              Contact Us
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className='hover:text-black transition duration-300'>
              FAQs
            </NavLink>
          </li>
          <li>
            <NavLink to='/contact' className='hover:text-black transition duration-300'>
              Terms & Conditions
            </NavLink>
          </li>
        </ul>
      </section>

      {/* Footer Bottom */}
      <div className='col-span-full'>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright © 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;