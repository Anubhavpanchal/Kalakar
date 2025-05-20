import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import {  toast } from 'react-toastify';


const ArtistLogin = ({ setToken, onSwitchToSignup }) => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post(`${backendUrl}/api/artists/login`, {
        email: form.email,
        password: form.password,
      });

      
      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem('artistToken', res.data.token);
        localStorage.setItem('artistName', res.data.artist.name);
        localStorage.setItem('artistUser', JSON.stringify(res.data.artist));
        // Optionally redirect or update UI here
                toast.success('successful login');
        
      }
      
       else {
        setError(res.data.message || "Login failed");
        toast.error(res.data.message || "Login failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs sm:max-w-md md:max-w-lg">
        <h2 className="prata-regular text-3xl font-bold text-gray-800 text-center mb-6">Artist Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          <button
            type="submit"
            className="w-full bg-black text-white py-3 rounded-lg hover:bg-white hover:text-black border-2 transition duration-300"
          >
            Log In
          </button>
        </form>
        <p className="text-sm text-gray-500 text-center mt-4">
          Don't have an account?{' '}
          <span className="text-blue-500 cursor-pointer hover:underline" onClick={onSwitchToSignup}>
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default ArtistLogin;