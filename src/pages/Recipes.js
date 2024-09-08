import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import users from '../data/users';
import { addRecipe, getAllRecipes, updateRecipe, deleteRecipe } from '../utils/db';

const Recipes = () => {
  const [showForm, setShowForm] = useState(false);
  const [recipeList, setRecipeList] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const participants = users.map(user => user.picture);

  useEffect(() => {
    loadRecipes();
  }, []);

  const loadRecipes = async () => {
    try {
      const recipes = await getAllRecipes();
      console.log('Loaded recipes:', recipes);
      setRecipeList(recipes);
    } catch (error) {
      console.error('Error loading recipes:', error);
    }
  };

  const handleAddRecipe = () => {
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowForm(true);
  };

  const handleSaveRecipe = async (newRecipe) => {
    if (selectedRecipe) {
      await updateRecipe({ ...newRecipe, id: selectedRecipe.id });
    } else {
      await addRecipe(newRecipe);
    }
    await loadRecipes();
    setShowForm(false);
    setSelectedRecipe(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = async (id) => {
    await deleteRecipe(id);
    await loadRecipes();
    setShowForm(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Rețete</h1>
        <button
          onClick={handleAddRecipe}
          className="px-4 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600"
          style={{ borderRadius: '3px' }}
        >
          Adaugă
        </button>
      </div>
      {showForm ? (
        <RecipeForm 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe} 
          onCancel={handleCancelForm} 
          onDelete={handleDeleteRecipe}
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recipeList.map((recipe) => (
            <RecipeCard
              key={recipe.id}
              title={recipe.title}
              image={recipe.image}
              participants={participants}
              onClick={() => handleEditRecipe(recipe)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Recipes;
