import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';
import { ThemeContext } from '../context/ThemeContext';

const BottomMenu = () => {
  const location = useLocation();
  const { isDarkMode } = useContext(ThemeContext);

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/recipes', icon: FaUtensils, label: 'Recipes' },
    { path: '/menu', icon: FaCalendarAlt, label: 'Menu' },
    { path: '/shopping', icon: FaShoppingCart, label: 'Shopping' },
  ];

  return (
    <nav className={`fixed bottom-0 left-0 right-0 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <ul className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex flex-col items-center ${
                location.pathname === item.path
                  ? 'text-red-500 dark:text-red-400'
                  : `${isDarkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-500'}`
              }`}
            >
              <item.icon className="text-xl" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomMenu;
