import React, { useState, useContext, useEffect } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import RecipeCard from '../components/RecipeCard';
import RecipeForm from '../components/RecipeForm';
import SearchModal from '../components/SearchModal';
import { getAllRecipes, addRecipe, updateRecipe, deleteRecipe, addMenuItem, getMenuItemsWithProfiles, updateMenuItem, deleteMenuItem } from '../utils/db';
import { FaCoffee, FaUtensils, FaMoon, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Menu = () => {
  const { theme } = useContext(ThemeContext);
  const [showForm, setShowForm] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [recipeList, setRecipeList] = useState([]);
  const [selectedMealType, setSelectedMealType] = useState('Mic dejun');
  const [selectedDay, setSelectedDay] = useState(0);
  const [weeklyMenu, setWeeklyMenu] = useState([]);
  const [weekOffset, setWeekOffset] = useState(0);

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const currentDate = new Date();
  const startOfWeek = new Date(currentDate);
  startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + (currentDate.getDay() === 0 ? -6 : 1) + weekOffset * 7);

  useEffect(() => {
    loadRecipes();
    loadMenuItems();
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
  }, [weekOffset]);

  const loadRecipes = async () => {
    const recipes = await getAllRecipes();
    setRecipeList(recipes);
  };

  const loadMenuItems = async () => {
    try {
      const menuItemsWithProfiles = await getMenuItemsWithProfiles(startOfWeek.toISOString().split('T')[0]);
      console.log('Loaded menu items:', menuItemsWithProfiles);
      // Group menu items by date and meal type
      const groupedMenuItems = menuItemsWithProfiles.reduce((acc, item) => {
        const key = `${item.date}-${item.mealType}`;
        if (!acc[key]) {
          acc[key] = [];
        }
        acc[key].push(item);
        return acc;
      }, {});
      setWeeklyMenu(groupedMenuItems);
    } catch (error) {
      console.error('Error loading menu items:', error);
    }
  };

  const mealTypes = {
    'Mic dejun': recipeList.filter(recipe => recipe.mealType === 'Mic dejun'),
    'Pranz': recipeList.filter(recipe => recipe.mealType === 'Pranz'),
    'Cina': recipeList.filter(recipe => recipe.mealType === 'Cina'),
  };

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

  const handleAddToWeeklyMenu = async (recipe, selectedProfiles) => {
    const menuItem = {
      date: new Date(startOfWeek.getTime() + selectedDay * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      mealType: selectedMealType,
      recipeId: recipe.id,
      profiles: selectedProfiles || []
    };
    console.log('Adding menu item:', menuItem);
    try {
      const result = await addMenuItem(menuItem);
      console.log('Menu item added successfully:', result);
      await loadMenuItems();
      console.log('Menu items reloaded');
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
    setShowSearchModal(false);
  };

  const handlePreviousWeek = () => {
    setWeekOffset(prevOffset => prevOffset - 1);
  };

  const handleNextWeek = () => {
    setWeekOffset(prevOffset => prevOffset + 1);
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
          <div className="mb-4 flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              <button
                onClick={handlePreviousWeek}
                className="p-2"
              >
                <FaChevronLeft color="#ffc20d" />
              </button>
              <span className="text-sm font-medium">
                {startOfWeek.toLocaleString('default', { month: 'short' })}
                {(() => {
                  const endOfWeek = new Date(startOfWeek);
                  endOfWeek.setDate(startOfWeek.getDate() + 6);
                  return startOfWeek.getMonth() !== endOfWeek.getMonth()
                    ? `-${endOfWeek.toLocaleString('default', { month: 'short' })}`
                    : '';
                })()}
              </span>
              <button
                onClick={handleNextWeek}
                className="p-2"
              >
                <FaChevronRight color="#ffc20d" />
              </button>
            </div>
          </div>
          <div className="mb-6 w-full">
            <div className="grid grid-cols-7 gap-2">
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
              {(() => {
                const currentDate = new Date(startOfWeek);
                currentDate.setDate(currentDate.getDate() + selectedDay);
                const dateString = currentDate.toISOString().split('T')[0];
                const key = `${dateString}-${selectedMealType}`;
                const menuItems = weeklyMenu[key] || [];
                
                return menuItems.map((menuItem) => (
                  <RecipeCard
                    key={menuItem.id}
                    title={menuItem.recipe.title}
                    image={menuItem.recipe.image}
                    mealType={menuItem.recipe.mealType}
                    profiles={menuItem.profiles}
                    onClick={() => handleEditRecipe(menuItem.recipe)}
                  />
                ));
              })()}
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
      {console.log('RecipeList in Menu:', recipeList)}
    </div>
  );
};

export default Menu;
