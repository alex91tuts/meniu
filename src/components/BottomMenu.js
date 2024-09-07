import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaHome, FaUtensils, FaCalendarAlt, FaShoppingCart } from 'react-icons/fa';

const BottomMenu = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/', icon: FaHome, label: 'Home' },
    { path: '/recipes', icon: FaUtensils, label: 'Recipes' },
    { path: '/menu', icon: FaCalendarAlt, label: 'Menu' },
    { path: '/shopping', icon: FaShoppingCart, label: 'Shopping' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-lg">
      <ul className="flex justify-around items-center h-16">
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`flex flex-col items-center ${
                location.pathname === item.path
                  ? 'text-blue-500'
                  : 'text-gray-600 hover:text-blue-500'
              }`}
            >
              <item.icon className="text-2xl" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default BottomMenu;
