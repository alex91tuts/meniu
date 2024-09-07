import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const RecipeCard = ({ title, image, participants, onClick }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <div 
      className="flex rounded-lg shadow-md overflow-hidden h-20 cursor-pointer" 
      onClick={onClick}
      style={{ backgroundColor: theme.secondary }}
    >
      <img src={image} alt={title} className="w-1/4 object-cover" />
      <div className="p-2 flex flex-col justify-between w-3/4">
        <h2 className="text-base font-semibold line-clamp-2 text-gray-400">{title}</h2>
        <div className="flex justify-between items-end">
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
      </div>
    </div>
  );
};

export default RecipeCard;
