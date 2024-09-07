import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const RecipeCard = ({ title, image, participants }) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-20">
      <img src={image} alt={title} className="w-1/4 object-cover" />
      <div className="p-2 flex flex-col justify-between w-3/4">
        <h2 className="text-base font-semibold dark:text-white line-clamp-2">{title}</h2>
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
          <div className="flex space-x-1">
            <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              <FaEdit className="text-xs" />
            </button>
            <button className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
              <FaTrash className="text-xs" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
