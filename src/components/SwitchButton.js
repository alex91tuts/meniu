import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const SwitchButton = ({ activeTab, setActiveTab, options }) => {
  const { theme } = useContext(ThemeContext);
  const isDarkMode = theme.mode === 'dark';

  return (
    <div className="flex justify-center mb-4">
      <div className={`inline-flex rounded-full p-1 w-11/12 ${isDarkMode ? 'bg-[#212121]' : 'bg-gray-200'}`}>
        {options.map((option) => (
          <button
            key={option.value}
            className={`w-1/2 rounded-full py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === option.value
                ? isDarkMode
                  ? 'bg-[#272727] text-[#fec10d]'
                  : 'bg-white text-gray-800'
                : isDarkMode
                  ? 'text-[#525252] hover:text-white'
                  : 'text-gray-600 hover:text-yellow-800'
            }`}
            onClick={() => setActiveTab(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SwitchButton;
