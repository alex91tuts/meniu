import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HiOutlineHome, HiOutlineBookOpen, HiOutlineCalendar, HiOutlineShoppingCart, HiOutlineCog } from 'react-icons/hi';
import { ThemeContext } from '../context/ThemeContext';

const BottomMenu = () => {
  const location = useLocation();
  const { theme } = useContext(ThemeContext);

  const menuItems = [
    { path: '/', icon: HiOutlineHome, label: 'Home' },
    { path: '/recipes', icon: HiOutlineBookOpen, label: 'Recipes' },
    { path: '/menu', icon: HiOutlineCalendar, label: 'Menu' },
    { path: '/shopping', icon: HiOutlineShoppingCart, label: 'Shopping' },
    { path: '/settings', icon: HiOutlineCog, label: 'Settings' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 shadow-lg" style={{ backgroundColor: theme.secondary }}>
      <ul className="flex justify-around items-center h-16">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path} className="flex flex-col items-center">
              <Link
                to={item.path}
                className="flex flex-col items-center justify-center w-12 h-12 relative"
              >
                <item.icon
                  className="text-xl"
                  style={{
                    color: isActive ? theme.accent : 'rgba(156, 163, 175, 0.5)', // very light gray for non-focused icons
                    strokeWidth: isActive ? 2 : 1.5,
                  }}
                />
                {isActive && (
                  <span
                    className="absolute bottom-0 w-1 h-1 rounded-full"
                    style={{ backgroundColor: theme.accent }}
                  ></span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default BottomMenu;
