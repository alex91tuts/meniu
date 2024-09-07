import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaUtensils, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

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
          <Link to="/recipes" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaUtensils className="text-2xl" />
            <span className="text-xs mt-1">Recipes</span>
          </Link>
        </li>
        <li>
          <Link to="/menu" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaCalendarAlt className="text-2xl" />
            <span className="text-xs mt-1">Menu</span>
          </Link>
        </li>
        <li>
          <Link to="/shopping" className="flex flex-col items-center text-gray-600 hover:text-blue-500">
            <FaShoppingCart className="text-2xl" />
            <span className="text-xs mt-1">Shopping</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomMenu;
