import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import SearchModal from '../components/SearchModal';
import { getAllRecipes, addRecipe, updateRecipe, deleteRecipe } from '../utils/db';
import users from '../data/users';
import { FaCoffee, FaUtensils, FaMoon } from 'react-icons/fa';

const Menu = () => {
  const { theme } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('Mic dejun');
  const [selectedDay, setSelectedDay] = useState(0);
  const [weeklyMenu, setWeeklyMenu] = useState({});

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const currentDay = currentDate.getDay();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDay + (currentDay === 0 ? -6 : 1));

  useEffect(() => {
    loadRecipes();
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

  const loadRecipes = async () => {
    const recipes = await getAllRecipes();
    setRecipeList(recipes);
  };

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

  const handleSaveRecipe = async (newRecipe) => {
    if (selectedRecipe) {
      await updateRecipe(newRecipe);
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

  const handleAddToWeeklyMenu = (recipe, selectedProfiles) => {
    setWeeklyMenu(prevMenu => ({
      ...prevMenu,
      [selectedDay]: {
        ...prevMenu[selectedDay],
        [selectedMealType]: [
          ...(prevMenu[selectedDay]?.[selectedMealType] || []),
          { ...recipe, profiles: selectedProfiles }
        ]
      }
    }));
    setShowSearchModal(false);
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
          <div className="grid grid-cols-7 gap-2 mb-6">
            {weekDays.map((day, index) => {
              const date = new Date(startOfWeek);
              date.setDate(startOfWeek.getDate() + index);
              const isCurrentDay = date.toDateString() === currentDate.toDateString();

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`flex flex-col items-center p-2 rounded ${
                    selectedDay === index ? 'border-2 border-yellow-400' : ''
                  }`}
                  style={{ backgroundColor: theme.secondary }}
                >
                  <span className="text-sm font-medium">{day}</span>
                  <span className="text-lg font-semibold">{date.getDate().toString().padStart(2, '0')}</span>
                  {isCurrentDay && <div className="w-1 h-1 bg-red-500 rounded-full mt-1"></div>}
                </button>
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
              <h2 className="text-2xl font-bold dark:text-white">Adaugă</h2>
              <button 
                onClick={() => setShowSearchModal(true)}
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
              {weeklyMenu[selectedDay]?.[selectedMealType]?.map((recipe, index) => (
                <RecipeCard
                  key={`${selectedMealType}-${recipe.id}-${index}`}
                  title={recipe.title}
                  image={recipe.image}
                  mealType={recipe.mealType}
                  profiles={recipe.profiles ? recipe.profiles.map(profile => ({
                    id: profile.id,
                    name: profile.name,
                    picture: profile.picture
                  })) : []}
                  onClick={() => handleEditRecipe(recipe)}
                />
              ))}
            </div>
          </div>
        </>
      )}
      <SearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        recipes={recipeList}
        onAddRecipe={handleAddToWeeklyMenu}
      />
    </div>
  );
};

export default Menu;
