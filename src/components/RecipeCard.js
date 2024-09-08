import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { FaTrash } from 'react-icons/fa';

const RecipeCard = ({ title, image, mealType, onClick, onAdd, onDelete, showAddButton, profiles = [] }) => {
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
          {profiles && profiles.length > 0 && (
            <div className="flex -space-x-2 overflow-hidden">
              {profiles.map((profile) => (
                <img
                  key={profile.id}
                  className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover"
                  src={profile.picture}
                  alt={profile.name || 'Profile'}
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
      {onDelete && (
        <button
          className="absolute top-0 right-0 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-bl"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FaTrash size={12} />
        </button>
      )}
    </div>
  );
};

export default RecipeCard;
