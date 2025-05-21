import React, { useState } from 'react';
import axios from 'axios';
import {  toast } from 'react-toastify';
import { NavLink, } from 'react-router-dom';

const Login = ({ isOpen, onClose, onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let payload ={
 email: formData.email,
        password: formData.password,
      }
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/login`, payload);
        // Save user data and token to localStorage
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('currentUser', JSON.stringify(response.data.user));
        toast.success('successful login');
        onClose(); // Close the modal after 
        onLoginSuccess(response.data.user); // Notify parent about successful login
    } catch (error) {
      setMessage(error.response?.data?.message);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white w-full p-6 rounded-lg shadow-lg relative max-w-xs sm:max-w-md md:max-w-lg">
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-red-500 transition duration-300"
          aria-label="Close"
        >
          ✕
        </button>
        <h2 className="prata-regular text-2xl font-bold mb-4 text-center text-gray-800">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-white hover:text-black border-2 transition duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={onSwitchToSignup}>
            Sign up
          </span>
        </p> 
        <p className="text-sm text-gray-500 text-center mt-4">
          Login as Artist{' '}
              <NavLink
                 to="https://kalakar-seven.vercel.app/"
                 className="text-blue-500 cursor-pointer hover:underline"
               >
                 Log in
               </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Login;