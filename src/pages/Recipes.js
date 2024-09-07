import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import users from '../data/users';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
        const mealData = await mealResponse.json();

        const updatedRecipes = mealData.meals.slice(0, 6).map((meal, index) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: `https://via.placeholder.com/300x200?text=Recipe+${index + 1}`,
          participants: users.map(user => user.picture)
        }));

        setRecipes(updatedRecipes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            participants={recipe.participants}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
