import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import RecipeCard from './RecipeCard';

const SearchModal = ({ isOpen, onClose, recipes, onAddRecipe }) => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 dark:text-white">Search Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="grid gap-4 md:grid-cols-2">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              participants={[]}
              onClick={() => {}}
              onAdd={() => onAddRecipe(recipe)}
              showAddButton
            />
          ))}
        </div>
        <button
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default SearchModal;
