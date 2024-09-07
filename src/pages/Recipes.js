import React from 'react';
import RecipeCard from '../components/RecipeCard';
import recipes from '../data/recipes';
import users from '../data/users';

const Recipes = () => {
  const participants = users.map(user => user.picture);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Recipes</h1>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image}
            participants={participants}
          />
        ))}
      </div>
    </div>
  );
};

export default Recipes;
