import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaHeart, FaUser } from 'react-icons/fa/index.js';

const BottomMenu = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul className="flex justify-around items-center h-16">
        <li>
          <Link to="/" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaHome className="text-2xl" />
            <span className="text-xs mt-1">Home</span>
          </Link>
        </li>
        <li>
          <Link to="/search" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaSearch className="text-2xl" />
            <span className="text-xs mt-1">Search</span>
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaHeart className="text-2xl" />
            <span className="text-xs mt-1">Favorites</span>
          </Link>
        </li>
        <li>
          <Link to="/profile" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaUser className="text-2xl" />
            <span className="text-xs mt-1">Profile</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomMenu;
