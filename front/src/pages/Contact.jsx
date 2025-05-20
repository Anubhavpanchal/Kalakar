import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const Contact = () => {
  return (
    <div className="px-4 sm:px-8 lg:px-16  text-gray-800">
      {/* Contact Us Section */}
      <div className="text-2xl text-center pt-6">
        <Title text1="CONTACT" text2="US" />
        <hr className="bg-gray-600 my-4" />
      </div>

      {/* Contact Details */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 items-center">
        {/* Contact Image */}
        <img
          className="w-full md:max-w-[480px]  shadow-lg"
          src={assets.contact_img}
          alt="Contact Us"
        />

        {/* Contact Information */}
        <div className="flex flex-col justify-center items-start gap-3">
          <p className="font-semibold text-2xl">Our Team</p>
          <p className="text-gray-600">
          We’re a trio of creators—Anurag, Prachi and Anubhav on a mission to change the way art connects people. Each of us brings a spark of creativity, code, and passion to this platform.         
           </p>
          <p className="text-gray-600">
            Sonipat<br />
            Haryana 131101
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Email:</span><a href="https://anubhavpachal08@gmail.com" target="_blank" rel="noopener noreferrer">  contact@kalakar.com</a> 
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> +91 7027652162
          </p>
          <p className="text-gray-600">
            <span className="font-semibold"></span> Got a question, idea, or just want to say hi?
            We’d love to hear from you—reach out anytime.
          </p>
          {/* <p className="text-gray-600">
            Placeholder text for additional information.
          </p> */}
            <a href="https://www.instagram.com/art_with_.anubhav/?hl=en" target="_blank" rel="noopener noreferrer">
                <button className="bg-white text-black px-6 py-2 border border-black hover:bg-black hover:text-white transition duration-300">
                   Know Us
                </button>
            </a>
        </div>
      </div>
      <NewsletterBox />
    </div>
  );
};

export default Contact;