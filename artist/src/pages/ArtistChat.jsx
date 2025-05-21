import React from 'react';
import { assets } from '../assets/assets';

const ArtistChat = () => {
  const chatAppUrl = 'https://kalakar-chat.onrender.com/';

  return (
    <div className=" sm:px-8 lg: text-gray-800">
      {/* Chat Feature Section */}
      {/* <div className="text-2xl text-center pt-6">
        <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 text-4xl">
          ARTIST <span className="text-indigo-600">CHAT</span>
        </span>
        <hr className="bg-gray-600 my-4" />
      </div> */}

      {/* Chat Details */}
      <div className=" flex flex-col justify-center md:flex-row gap-10 mb-28 items-center">
        {/* Chat Illustration */}
        <img
          className="w-full md:max-w-[400px]"
          src={assets.chat_img}
          alt="Artist Chat"
        />

        {/* Chat Information */}
        <div className="flex flex-col justify-center items-start gap-4">
          <p className="font-semibold text-2xl">Why Use the Chat?</p>
          <p className="text-gray-600">
            Our chat feature lets artists and clients connect instantly, making collaboration and communication seamless. Share ideas, get feedback, and keep your projects moving forward—all in real time!
          </p>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Discuss commission details and requirements instantly</li>
            <li>Share progress updates and images</li>
            <li>Answer client questions quickly</li>
            <li>Collaborate with other artists for inspiration and feedback</li>
            <li>Build trust and improve customer satisfaction</li>
          </ul>
          <p className="text-gray-600">
            <span className="font-semibold text-indigo-700">How to use:</span> Click the button below to open the chat app in a new tab and start your conversation!
          </p>
          <button
            onClick={() => window.open(chatAppUrl, '_blank', 'noopener,noreferrer')}
            className="bg-black text-white px-6 py-2 border border-black hover:bg-black hover:hover:bg-gray-800 transition duration-300"
          >
            Go to Chat App
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArtistChat;