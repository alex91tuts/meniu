import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import recipes from '../data/recipes';
import users from '../data/users';

const Recipes = () => {
  const [showForm, setShowForm] = useState(false);
  const [recipeList, setRecipeList] = useState(recipes);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const participants = users.map(user => user.picture);

  const handleAddRecipe = () => {
    setSelectedRecipe(null);
    setShowForm(true);
  };

  const handleEditRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    setShowForm(true);
  };

  const handleSaveRecipe = (newRecipe) => {
    if (selectedRecipe) {
      const updatedRecipes = recipeList.map(recipe => 
        recipe.id === selectedRecipe.id ? { ...newRecipe, id: selectedRecipe.id } : recipe
      );
      setRecipeList(updatedRecipes);
    } else {
      const updatedRecipes = [...recipeList, { ...newRecipe, id: recipeList.length + 1 }];
      setRecipeList(updatedRecipes);
    }
    setShowForm(false);
    setSelectedRecipe(null);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setSelectedRecipe(null);
  };

  const handleDeleteRecipe = (id) => {
    const updatedRecipes = recipeList.filter(recipe => recipe.id !== id);
    setRecipeList(updatedRecipes);
    setShowForm(false);
    setSelectedRecipe(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold dark:text-white">Recipes</h1>
        <button
          onClick={handleAddRecipe}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Recipe
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
