import React from 'react';

const Recipes = () => {
  const recipes = [
    { id: 1, title: 'Spaghetti Carbonara', description: 'Classic Italian pasta dish' },
    { id: 2, title: 'Chicken Stir Fry', description: 'Quick and easy Asian-inspired meal' },
    { id: 3, title: 'Greek Salad', description: 'Fresh and healthy Mediterranean salad' },
    { id: 4, title: 'Beef Tacos', description: 'Tasty Mexican-style tacos' },
    { id: 5, title: 'Vegetable Curry', description: 'Flavorful Indian vegetarian dish' },
    { id: 6, title: 'Grilled Salmon', description: 'Healthy and delicious fish recipe' },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Recipes</h1>
      <div className="masonry">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="pin p-4">
            <h2 className="text-xl font-semibold mb-2 dark:text-white">{recipe.title}</h2>
            <p className="dark:text-gray-300">{recipe.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
