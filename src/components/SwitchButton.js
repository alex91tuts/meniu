import React from 'react';

const SwitchButton = ({ activeTab, setActiveTab, options }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex rounded-full p-1 bg-[#212121] w-11/12">
        {options.map((option) => (
          <button
            key={option.value}
            className={`w-1/2 rounded-full py-2 text-xs font-medium transition-all duration-300 ${
              activeTab === option.value
                ? 'bg-[#272727] text-[#fec10d]'
                : 'text-[#525252] hover:text-white'
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
