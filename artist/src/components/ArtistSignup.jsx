import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { ToastContainer, toast } from 'react-toastify';


const ArtistSignup = ({ onSwitchToLogin }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      toast.error("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${backendUrl}/api/artists/signup`, {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      if (res.data.success) {
        setSuccess("Signup successful! Please login.");
        toast.success("Signup successful! Please login.");
        setTimeout(() => {
          onSwitchToLogin();
        }, 1200);
      } else {
        setError(res.data.message || "Signup failed");
        toast.error(res.data.message || "Signup failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xs sm:max-w-md md:max-w-lg">
        <h2 className="prata-regular text-3xl font-bold text-gray-800 text-center mb-6">Artist Signup</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
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
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:border-gray-500"
            required
          />
          {error && <div className="text-red-500 text-sm text-center">{error}</div>}
          {success && <div className="text-green-600 text-sm text-center">{success}</div>}
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
        </p>
      </div>
    </div>
  );
};

export default ArtistSignup;