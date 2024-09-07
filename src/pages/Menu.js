import React, { useState, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import recipes from '../data/recipes';
import users from '../data/users';
import { FaCoffee, FaUtensils, FaMoon } from 'react-icons/fa';

const Menu = () => {
  const { theme } = useContext(ThemeContext);

  React.useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .menu-button {
        border-radius: 10px;
        transition: box-shadow 0.3s ease;
      }
      .menu-button.active {
        box-shadow: 0 0 15px -3px rgb(255, 194, 13);
      }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  const [showForm, setShowForm] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState(recipes);
  const [selectedMealType, setSelectedMealType] = useState('Mic dejun');

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

  const getMealTypeIcon = (mealType) => {
    switch (mealType) {
      case 'Mic dejun':
        return <FaCoffee />;
      case 'Pranz':
        return <FaUtensils />;
      case 'Cina':
        return <FaMoon />;
      default:
        return null;
    }
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
          <div className="flex justify-between mb-6">
            {Object.keys(mealTypes).map((mealType) => (
              <button
                key={mealType}
                onClick={() => setSelectedMealType(mealType)}
                className={`flex items-center px-4 py-2 focus:outline-none menu-button ${
                  selectedMealType === mealType ? 'active' : ''
                }`}
                style={{ 
                  backgroundColor: theme.secondary,
                  color: selectedMealType === mealType ? theme.accent : theme.textSecondary,
                }}
              >
                {getMealTypeIcon(mealType)}
                <span className="ml-2">{mealType}</span>
              </button>
            ))}
          </div>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold dark:text-white">{selectedMealType}</h2>
              <button 
                className="text-2xl font-bold px-2 py-1 focus:outline-none menu-button" 
                style={{ 
                  backgroundColor: theme.secondary,
                  color: theme.accent,
                }}
              >
                +
              </button>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {mealTypes[selectedMealType].map((recipe) => (
                <RecipeCard
                  key={`${selectedMealType}-${recipe.id}`}
                  title={recipe.title}
                  image={recipe.image}
                  participants={participants}
                  onClick={() => handleEditRecipe(recipe)}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Menu;
