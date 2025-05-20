import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { NavLink } from 'react-router-dom';


const Signup = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/register`, {
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        toast.success('Signup successful! Redirecting to login...');
        setFormData({ name: '', email: '', password: '', confirmPassword: '' });
        setTimeout(() => {
          onSwitchToLogin(); // Switch to login modal after successful signup
        }, 2000);
      } else {
        setMessage(response.data.message);
      }
   } catch (error) {
      // console.error('Error during signup:', error.response?.data || error.message);
      // Show backend error in alert if exists, else generic error
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('An error occurred during signup. Please try again.');
      }
      setMessage('An error occurred during signup. Please try again.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative  w-full max-w-xs sm:max-w-md md:max-w-ld">

        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 transition duration-300"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="prata-regular text-2xl font-bold mb-4 text-center text-gray-800">Create an Account</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="border p-2 rounded"
            required
          />
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-white hover:text-black border-2 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Already have an account?{' '}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={onSwitchToLogin}>
            Log in
          </span>
          <p className="text-sm text-gray-500 text-center mt-4">
                    Signup as Artist{' '}
                        <NavLink
                           to="http://localhost:5175/add"
                           className="text-blue-500 cursor-pointer hover:underline"
                         >
                           Sign up
                         </NavLink>
          </p>
        </p>
      </div>
    </div>
  );
};

export default Signup;