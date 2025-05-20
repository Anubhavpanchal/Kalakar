import React, { useEffect, useState } from 'react';
import ArtistNavbar from './components/ArtistNavbar';
import ArtistSidebar from './components/ArtistSidebar';
import { Routes, Route } from 'react-router-dom';
import ArtistAdd from './pages/ArtistAdd';
import ArtistList from './pages/ArtistList';
import ArtistOrders from './pages/ArtistOrders';
import ArtistChat from './pages/ArtistChat';
import ArtistLogin from './components/ArtistLogin';
import ArtistSignup from './components/ArtistSignup';
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [token, setToken] = useState('');

  const [showSignup, setShowSignup] = useState(false);

  useEffect(() => {
    // Load token from localStorage on page load
    const savedToken = localStorage.getItem('artistToken');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('artistToken');
    localStorage.removeItem('artistName');
    localStorage.removeItem('artistUser');
    setToken('');
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <ToastContainer />
      {token === '' ? (
        showSignup ? (
          <ArtistSignup onSwitchToLogin={() => setShowSignup(false)} />
        ) : (
          <ArtistLogin setToken={setToken} onSwitchToSignup={() => setShowSignup(true)} />
        )
      ) : (
        <>
          <ArtistNavbar setToken={handleLogout} />
          <div className="flex w-full">
            <ArtistSidebar />
            <div className="w-[70%] mx-auto ml-[max(5vw,25px)] my-8 text-gray-600 text-base">
              <Routes>
                <Route path="/" element={<ArtistList token={token} />} />
                <Route path="/add" element={<ArtistAdd token={token} />} />
                <Route path="/list" element={<ArtistList token={token} />} />
                <Route path="/orders" element={<ArtistOrders token={token} />} />
                <Route path="/chat" element={<ArtistChat token={token} />} />

              </Routes>

              {/* Features Section */}
              <div className="mt-10 p-6 bg-white rounded-lg shadow text-gray-700">
                <h2 className="text-xl font-bold mb-4">Features:</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Add your art</li>
                  <li>View your artworks</li>
                  <li>View orders</li>
                </ul>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default App;
