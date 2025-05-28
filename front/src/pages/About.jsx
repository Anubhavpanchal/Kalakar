import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16 mt-13">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-6">
        <Title text1="ABOUT" text2="US" />
        <hr className="bg-gray-600 my-4" />
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16 items-center">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-lg"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
          We're all about connection—real, direct, creative connection. This is where artists and art lovers meet 
          without the noise. Artists get a space to showcase their talent, sell their work, take custom requests, 
          and chat one-on-one with clients who vibe with their style.
           Clients? They get front-row access to fresh, original art and the ability to request something made just for them.
          </p>
          <p>
          No galleries, no gatekeepers—just a creative ecosystem where art flows freely, conversations spark ideas, 
          and every piece has a story. Whether you’re here to create or collect, welcome to the place where art lives and breathes online.
          </p>
          <b className="text-gray-800 text-lg">Our Mission</b>
          <p>
          To empower artists and inspire art lovers by creating a space where creativity is celebrated, connections are real, and every piece of art finds its home. We’re here to break the barriers—no middlemen,
           no limits—just pure expression and meaningful exchange.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-2xl py-4 text-center">
        <Title text1="WHY" text2="CHOOSE US" />
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20 gap-8">
        <div className="text-gray-600 border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <b className="text-lg text-gray-800">Quality Assurance</b>
          <p>
            We ensure that every product meets the highest standards of quality, providing you with
            the best experience possible.
          </p>
        </div>
        <div className="text-gray-600 border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <b className="text-lg text-gray-800">Convenience</b>
          <p>
            Our platform is designed to make your shopping experience seamless and hassle-free,
            saving you time and effort.
          </p>
        </div>
        <div className="text-gray-600 border px-10 md:px-16 py-8 sm:py-12 flex flex-col gap-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
          <b className="text-lg text-gray-800">Exceptional Customer Service</b>
          <p>
            Our dedicated support team is here to assist you 24/7, ensuring your satisfaction at
            every step.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;