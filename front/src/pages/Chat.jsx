import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import BestSeller from '../components/BestSeller';

const Chat = () => {
  const chatAppUrl = 'http://localhost:5176/';

  return (
    <div className="px-4 sm:px-8 lg:px-16 text-gray-800">
      {/* Chat Feature Section */}
      <div className="text-2xl text-center pt-6">
        <Title text1="CHAT" text2="FEATURE" />
        <hr className="bg-gray-600 my-4" />
      </div>

      {/* Chat Details */}
      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 items-center">
        {/* Chat Image */}
        <img
          className="w-full md:max-w-[480px] shadow-lg"
          src={assets.chat_img}
          alt="Chat Feature"
        />

        {/* Chat Information */}
        <div className="flex flex-col justify-center items-start gap-4">
          <p className="font-semibold text-2xl">Why Use the Chat Feature?</p>
          <p className="text-gray-600">
            Our chat feature bridges the gap between artists and art lovers, making communication instant and effortless. 
            Whether you want to discuss a custom order, ask questions, or simply connect with your favorite artist, chat makes it easy.
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Discuss commission details and requirements instantly</li>
            <li>Share progress updates and images</li>
            <li>Get quick answers to your questions</li>
            <li>Collaborate and brainstorm ideas in real time</li>
            <li>Build trust and enjoy a more personal art experience</li>
          </ul>
          <p className="text-gray-600">
            <span className="font-semibold text-indigo-700">How to use:</span> Click the button below to open the chat app in a new tab and start your conversation!
          </p>
          <button
            onClick={() => window.open(chatAppUrl, '_blank', 'noopener,noreferrer')}
            className="bg-black text-white px-6 py-2 border border-black hover:bg-gray-800 transition duration-300"
          >
            Go to Chat App
          </button>
        </div>
      </div>
      <BestSeller />
    </div>
  );
};

export default Chat;