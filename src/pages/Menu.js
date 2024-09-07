import React, { useState } from 'react';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import recipes from '../data/recipes';
import users from '../data/users';

const Menu = () => {
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState(recipes);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  const mealTypes = {
    'Mic dejun': recipeList.filter(recipe => recipe.mealType === 'Mic dejun'),
    'Pranz': recipeList.filter(recipe => recipe.mealType === 'Pranz'),
    'Cina': recipeList.filter(recipe => recipe.mealType === 'Cina'),
  };

  const participants = users.map(user => user.picture);

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
      {showForm ? (
        <RecipeForm 
          recipe={selectedRecipe} 
          onSave={handleSaveRecipe} 
          onCancel={handleCancelForm} 
          onDelete={handleDeleteRecipe}
        />
      ) : (
        <>
          <div className="flex justify-between mb-6 overflow-x-auto">
        {weekDays.map((day, index) => {
          const date = new Date(startOfWeek);
          date.setDate(startOfWeek.getDate() + index);
          const isCurrentDay = date.toDateString() === currentDate.toDateString();

          return (
            <div key={day} className="flex flex-col items-center mx-2">
              <span className="text-sm font-medium dark:text-gray-300">{day}</span>
              <span className="text-lg font-semibold dark:text-white">{date.getDate().toString().padStart(2, '0')}</span>
              {isCurrentDay && <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>}
            </div>
          );
        })}
      </div>
      {Object.entries(mealTypes).map(([mealType, recipes]) => (
        <div key={mealType} className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold dark:text-white">{mealType}</h2>
            <button className="text-2xl font-bold text-red-500 dark:text-red-400">+</button>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recipes.map((recipe) => (
              <RecipeCard
                key={`${mealType}-${recipe.id}`}
                title={recipe.title}
                image={recipe.image}
                participants={participants}
                onClick={() => handleEditRecipe(recipe)}
              />
            ))}
          </div>
        </div>
      ))}
        </>
      )}
    </div>
  );
};

export default Menu;
