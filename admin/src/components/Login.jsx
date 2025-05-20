import axios from 'axios';
import React, { useState } from 'react';
import { backendUrl } from '../App';
import { toast } from 'react-toastify'; 

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${backendUrl}/api/user/admin`, { email, password });

      if (response.data.success) {
        localStorage.setItem('adminToken', response.data.token);
        localStorage.setItem('adminUser', JSON.stringify(response.data.admin)); // Optional
        setToken(response.data.token);
        toast.success('Login successful!');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error('An error occurred during login. Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs sm:max-w-md md:max-w-lg">
        <h2 className="prata-regular text-3xl font-bold text-gray-800 text-center mb-6">Admin Panel</h2>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-white hover:text-black border-2 transition duration-300"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
