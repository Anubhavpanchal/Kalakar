import React, { useState, useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FiSearch, FiUser, FiMenu, FiX, FiShoppingCart } from 'react-icons/fi';
import { ShopContext } from '../context/ShopContext';

const Navbar = ({ onLoginClick, onSignupClick, isLoggedIn, onLogout, onCartClick }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { getCartCount } = useContext(ShopContext);

  return (
    <div className="flex flex-col top-0 left-0 w-full z-50 fixed bg-white shadow-md">
      <div className="flex items-center justify-between py-4 px-4 sm:px-8">
        <NavLink
          to="/"
          className="prata-regular text-2xl font-bold text-gray-800 hover:text-black transition duration-300"
        >
          kalakar
        </NavLink>

        <ul
          className={`${
            menuOpen ? 'flex' : 'hidden'
          } sm:flex flex-col sm:flex-row gap-5 text-sm text-gray-700 absolute sm:static top-16 left-0 w-full sm:w-auto bg-white sm:bg-transparent shadow-lg sm:shadow-none p-4 sm:p-0 z-50`}
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-black transition duration-300 ${
                isActive ? 'underline underline-offset-3 decoration-2 decoration-black-500' : ''
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <p>Home</p>
          </NavLink>
          <NavLink
            to="/collection"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-black transition duration-300 ${
                isActive ? 'underline underline-offset-3 decoration-2 decoration-black-500' : ''
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <p>Collection</p>
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-black transition duration-300 ${
                isActive ? 'underline underline-offset-3 decoration-2 decoration-black-500' : ''
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <p>About</p>
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-black transition duration-300 ${
                isActive ? 'underline underline-offset-3 decoration-2 decoration-black-500' : ''
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <p>Contact</p>
          </NavLink>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 hover:text-black transition duration-300 ${
                isActive ? 'underline underline-offset-3 decoration-2 decoration-black-500' : ''
              }`
            }
            onClick={() => setMenuOpen(false)}
          >
            <p>Chat</p>
          </NavLink>
          {!isLoggedIn && (
            <a
              href="https://kalakar-fnlw.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1 hover:text-black transition duration-300"
              onClick={() => setMenuOpen(false)}
            >
              <p>Admin</p>
            </a>
          )}
        </ul>

        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink
            to="/collection"
            className="text-gray-700 hover:text-black transition duration-300"
            aria-label="Search"
          >
            <FiSearch size={20} />
          </NavLink>

          <NavLink
            to="/cart"
            onClick={onCartClick}
            className="relative text-gray-700 hover:text-black transition duration-300"
            aria-label="Cart"
          >
            <FiShoppingCart size={20} />
            {getCartCount && getCartCount() > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
                {getCartCount()}
              </span>
            )}
          </NavLink>

          {isLoggedIn && (
            <div className="relative">
              <button
                className={`text-gray-700 hover:text-black transition duration-300 ${
                  isLoggedIn ? 'text-green-500' : ''
                }`}
                aria-label="Profile"
                aria-expanded={profileOpen}
                aria-haspopup="true"
                onClick={() => setProfileOpen(!profileOpen)}
              >
                <FiUser size={20} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-50">
                  <div className="flex flex-col gap-2 py-3 px-4">
                    <p
                      className="cursor-pointer hover:text-black text-gray-700"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/profile');
                      }}
                    >
                      My Profile
                    </p>
                    <p
                      className="cursor-pointer hover:text-black text-gray-700"
                      onClick={() => {
                        setProfileOpen(false);
                        navigate('/orders');
                      }}
                    >
                      Orders
                    </p>
                    <p
                      className="cursor-pointer hover:text-black text-gray-700"
                      onClick={() => {
                        onLogout();
                        navigate('/');
                      }}
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {!isLoggedIn && (
            <>
              <button
                onClick={onLoginClick}
                className="flex flex-col items-center gap-1 hover:text-black transition duration-300 text-sm sm:text-base"
              >
                <p>Login</p>
              </button>
              <button
                onClick={onSignupClick}
                className="flex flex-col items-center gap-1 hover:text-black transition duration-300 text-sm sm:text-base"
              >
                <p>Signup</p>
              </button>
            </>
          )}

          <button
            className="sm:hidden text-gray-700 hover:text-black transition duration-300"
            aria-label="Toggle Menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;