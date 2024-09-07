import React from 'react';
import { FaTrash, FaEdit } from 'react-icons/fa';

const RecipeCard = ({ title, image, participants }) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden h-28">
      <img src={image} alt={title} className="w-1/4 object-cover" />
      <div className="p-2 flex flex-col justify-between w-3/4">
        <h2 className="text-lg font-semibold dark:text-white line-clamp-2">{title}</h2>
        <div className="flex justify-between items-end">
          <div className="flex flex-wrap">
            {participants.map((participant, index) => (
              <img 
                key={index} 
                src={participant} 
                alt={`Participant ${index + 1}`} 
                className="w-6 h-6 rounded-full mr-1 mb-1 object-cover"
              />
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300">
              <FaEdit />
            </button>
            <button className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300">
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
