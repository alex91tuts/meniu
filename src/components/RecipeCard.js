import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const RecipeCard = ({ title, image, participants, onClick, onAdd, showAddButton }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      className="flex rounded-lg shadow-md overflow-hidden h-20 cursor-pointer relative" 
      onClick={onClick}
      style={{ backgroundColor: theme.secondary }}
    >
      <img src={image} alt={title} className="w-1/4 object-cover" />
      <div className="p-2 flex flex-col justify-between w-3/4">
        <h2 className="text-base font-semibold line-clamp-2 text-gray-400">{title}</h2>
        <div className="flex flex-wrap">
          {participants.map((participant, index) => (
            <img 
              key={index} 
              src={participant} 
              alt={`Participant ${index + 1}`} 
              className="w-5 h-5 rounded-full mr-1 mb-1 object-cover"
            />
          ))}
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
