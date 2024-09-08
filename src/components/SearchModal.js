import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import RecipeCard from './RecipeCard';
import ProfileSelectionPopup from './ProfileSelectionPopup';

const SearchModal = ({ isOpen, onClose, recipes, onAddRecipe }) => {
  const { theme } = useContext(ThemeContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMealType, setSelectedMealType] = useState('All');
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  const mealTypes = ['All', 'Mic dejun', 'Pranz', 'Cina'];

  const filteredRecipes = recipes.filter(recipe =>
    recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedMealType === 'All' || recipe.mealType === selectedMealType)
  );

  const handleAddClick = (recipe) => {
    setSelectedRecipe(recipe);
    setShowProfilePopup(true);
  };

  const handleProfileSelection = (selectedProfileIds) => {
    const selectedProfiles = selectedProfileIds.map(id => {
      const profile = profiles.find(p => p.id === id);
      return profile ? { id: profile.id, name: profile.name, picture: profile.picture } : null;
    }).filter(Boolean);
    onAddRecipe({...selectedRecipe, profiles: selectedProfiles});
    setShowProfilePopup(false);
    setSelectedRecipe(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white dark:bg-gray-800 w-full h-full p-6 overflow-y-auto">
        <h2 className="text-xl font-bold mb-4 dark:text-white">Search Recipes</h2>
        <input
          type="text"
          placeholder="Search recipes..."
          className="w-full p-2 mb-4 border rounded dark:bg-gray-700 dark:text-white"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div className="flex mb-4 space-x-2">
          {mealTypes.map((mealType) => (
            <button
              key={mealType}
              className={`px-3 py-1 rounded ${
                selectedMealType === mealType
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
              onClick={() => setSelectedMealType(mealType)}
            >
              {mealType}
            </button>
          ))}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredRecipes.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              mealType={recipe.mealType}
              onClick={() => {}}
              onAdd={() => handleAddClick(recipe)}
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
      <ProfileSelectionPopup
        isOpen={showProfilePopup}
        onClose={() => setShowProfilePopup(false)}
        onConfirm={handleProfileSelection}
      />
    </div>
  );
};

export default SearchModal;
