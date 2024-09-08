import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';

const RecipeView = ({ recipe, onClose }) => {
  const [activeTab, setActiveTab] = useState('ingredients');

  if (!recipe) return null;

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
      <div className="bg-white dark:bg-gray-800 flex-grow overflow-y-auto rounded-t-3xl -mt-10 relative z-10">
        <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 mx-auto mt-6 mb-2"></div>
        <h2 className="text-2xl font-bold dark:text-white text-center mb-4">{recipe.title}</h2>
        <div className="px-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>
          <div className="flex justify-center mb-4">
            <div className="inline-flex rounded-md bg-[#212121] p-1 w-11/12">
              <button
                className={`w-1/2 rounded-md py-2 text-sm font-medium ${
                  activeTab === 'ingredients'
                    ? 'bg-[#272727] text-[#fec10d]'
                    : 'text-[#525252]'
                }`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingrediente
              </button>
              <button
                className={`w-1/2 rounded-md py-2 text-sm font-medium ${
                  activeTab === 'instructions'
                    ? 'bg-[#272727] text-[#fec10d]'
                    : 'text-[#525252]'
                }`}
                onClick={() => setActiveTab('instructions')}
              >
                Instrucțiuni
              </button>
            </div>
          </div>
          {activeTab === 'ingredients' && (
            <div className="mb-4">
              <ul className="list-disc list-inside">
                {recipe.ingredients.map((ingredient, index) => (
                  <li key={index} className="dark:text-gray-300">
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
                  <li key={index} className="mb-2 dark:text-gray-300">{instruction}</li>
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
