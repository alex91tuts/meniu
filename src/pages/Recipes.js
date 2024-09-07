import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const users = [
    { name: 'Mariana', picture: 'https://randomuser.me/api/portraits/women/1.jpg' },
    { name: 'Alex', picture: 'https://randomuser.me/api/portraits/men/1.jpg' },
    { name: 'Matei', picture: 'https://randomuser.me/api/portraits/kids/1.jpg' }
  ];

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const mealResponse = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?f=c');
        const mealData = await mealResponse.json();

        const updatedRecipes = mealData.meals.slice(0, 6).map((meal) => ({
          id: meal.idMeal,
          title: meal.strMeal,
          image: meal.strMealThumb,
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
