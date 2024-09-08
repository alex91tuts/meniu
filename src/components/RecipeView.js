import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import SwitchButton from './SwitchButton';

const RecipeView = ({ recipe, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) return null;

  const switchOptions = [
    { value: 'ingredients', label: 'Ingrediente' },
    { value: 'instructions', label: 'Instrucțiuni' },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50">
      <div className="relative">
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover" />
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 text-white hover:text-gray-200 bg-black bg-opacity-50 rounded-full p-2"
        >
          <FaTimes size={24} />
        </button>
      </div>
      <div className="bg-white dark:bg-[#212121] flex-grow overflow-y-auto rounded-t-3xl -mt-10 relative z-10">
        <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 mx-auto mt-6 mb-2"></div>
        <h2 className="text-2xl font-bold dark:text-white text-center mb-4">{recipe.title}</h2>
        <div className="flex justify-center space-x-8 mb-4">
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b68e16]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs font-medium dark:text-gray-300 mt-1">{recipe.cookingTime} min</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">timp</p>
          </div>
          <div className="flex flex-col items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#b68e16]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            <p className="text-xs font-medium dark:text-gray-300 mt-1">{recipe.difficulty}</p>
            <p className="text-[10px] text-gray-500 dark:text-gray-400">dificultate</p>
          </div>
        </div>
        <div className="px-6">
          <p className="text-[0.9rem] text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>
          <SwitchButton
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            options={switchOptions}
          />
          {activeTab === 'ingredients' && (
            <div className="mb-4">
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="dark:text-gray-300 text-[0.9rem]">
                    {ingredient.quantity} {ingredient.quantityType} {ingredient.ingredient}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {activeTab === 'instructions' && (
            <div>
              <ol className="list-decimal list-inside">
                {recipe.instructions.map((instruction, index) => (
                  <li key={index} className="text-[0.9rem] mb-2 dark:text-gray-300">{instruction}</li>
                ))}
              </ol>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
