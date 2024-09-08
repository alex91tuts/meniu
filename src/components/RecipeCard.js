import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const RecipeCard = ({ title, image, mealType, onClick, onAdd, showAddButton, profiles }) => {
  const { theme } = useContext(ThemeContext);

  const getMealTypeIcon = (mealType) => {
    switch (mealType) {
      case 'Mic dejun':
        return '☕';
      case 'Pranz':
        return '🍽️';
      case 'Cina':
        return '🌙';
      default:
        return '🍳';
    }
  };

  return (
    <div 
      className="flex rounded-lg shadow-md overflow-hidden h-20 cursor-pointer relative" 
      onClick={onClick}
      style={{ backgroundColor: theme.secondary }}
    >
      <img src={image} alt={title} className="w-1/4 object-cover" />
      <div className="p-2 flex flex-col justify-between w-3/4">
        <h2 className="text-base font-semibold line-clamp-2 text-gray-400">{title}</h2>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-lg mr-2">{getMealTypeIcon(mealType)}</span>
            <span className="text-sm text-gray-500">{mealType}</span>
          </div>
          {profiles && (
            <div className="flex -space-x-2 overflow-hidden">
              {profiles.map((profile, index) => (
                <img
                  key={index}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white"
                  src={profile.picture}
                  alt={profile.name}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      {showAddButton && (
        <button
          className="absolute top-0 right-0 bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-bl"
          onClick={(e) => {
            e.stopPropagation();
            onAdd();
          }}
        >
          +
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
