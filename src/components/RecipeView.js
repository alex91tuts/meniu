import React from 'react';
import { FaTimes } from 'react-icons/fa';

const RecipeView = ({ recipe, onClose }) => {
  if (!recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full h-full p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold dark:text-white">{recipe.title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <FaTimes size={24} />
          </button>
        </div>
        <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.description}</p>
        <div className="mb-4">
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Ingredients</h3>
          <ul className="list-disc list-inside">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="dark:text-gray-300">
                {ingredient.quantity} {ingredient.quantityType} {ingredient.ingredient}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2 dark:text-white">Instructions</h3>
          <ol className="list-decimal list-inside">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="mb-2 dark:text-gray-300">{instruction}</li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default RecipeView;
