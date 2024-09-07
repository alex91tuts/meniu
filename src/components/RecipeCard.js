import React from 'react';

const RecipeCard = ({ title, image, participants }) => {
  return (
    <div className="flex bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <img src={image} alt={title} className="w-1/3 object-cover" />
      <div className="p-4 flex flex-col justify-between w-2/3">
        <h2 className="text-xl font-semibold mb-2 dark:text-white">{title}</h2>
        <div className="flex flex-wrap">
          {participants.map((participant, index) => (
            <img 
              key={index} 
              src={participant} 
              alt={`Participant ${index + 1}`} 
              className="w-8 h-8 rounded-full mr-2 mb-2 object-cover"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
