import React from 'react';
import { FaTimes } from 'react-icons/fa';

const RecipeView = ({ recipe, onClose }) => {
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
      <div className="bg-white dark:bg-gray-800 flex-grow overflow-y-auto rounded-t-lg">
        <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 mx-auto mt-4 mb-2"></div>
        <h2 className="text-2xl font-bold dark:text-white text-center mb-4">{recipe.title}</h2>
        <div className="px-6">
          <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>
          <div className="mb-4">
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Ingrediente</h3>
            <ul className="list-disc list-inside">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="dark:text-gray-300">
                  {ingredient.quantity} {ingredient.quantityType} {ingredient.ingredient}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Instrucțiuni</h3>
            <ol className="list-decimal list-inside">
              {recipe.instructions.map((instruction, index) => (
                <li key={index} className="mb-2 dark:text-gray-300">{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
